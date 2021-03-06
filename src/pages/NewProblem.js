import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";
import useInputValidation from "../hooks/use-input-validation";
import { Fragment, useState, useContext } from 'react'
import useAxiosInstance from "../hooks/use-axios-instance";
import TimerContext from "../store/timer-context";
import { Helmet } from "react-helmet";
import FormSelectTextInput from "../components/forms/FormSelectTextInput";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { createFilter } from "react-select";

function NewProblem(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOption, setIsLoadingOption] = useState(false);
  const [titleOptions, setTitleOptions] = useState(null);
  const { postProblemValidator, getLeetCodeProblems, getLeetCodeProblem } = useAxiosInstance();
  const timerCtx = useContext(TimerContext)

  useEffect(() => {
    let isSubscribed = true;
    setIsLoadingOption(true);
    getLeetCodeProblems().then((result) => {
      const questions = result.data.data.problemsetQuestionList.questions;
      const options = questions.map((q) => {
        return {
          label: q.title,
          value: q.titleSlug
        }
      });
      if (isSubscribed) {
        setTitleOptions(options);
        setIsLoadingOption(false);
      }
    })

    return () => {
      isSubscribed = false;
    }
  }, [getLeetCodeProblems])

  const {
    value: enteredTitle,
    errors: titleErrors,
    showErrors: showTitleErrors,
    valueSelectChangeHandler: titleSelectChangedHandler,
    inputBlurHandler: titleBlurHandler,
    submitHandler: titleSubmitHandler,
    displayMessages: displayTitleMessages,
    reset: resetTitle
  } = useInputValidation(titleValidationFnc)

  const titleClasses = showTitleErrors ? 'form-control p-0 is-invalid' : 'form-control p-0';
  const buttonClasses = isLoading ? "btn btn-primary invisible" : 'btn btn-primary';
  let formIsValid = false;

  if (titleErrors.length === 0) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    titleSubmitHandler();

    if (!formIsValid) {
      return;
    }
    setIsLoading(true);
    getLeetCodeProblem(enteredTitle.value)
      .then((result) => {
        const question = result.data.data.question;
        if (!question) {
          displayTitleMessages(["Does not match any problem on Leetcode", "Please check your spelling or try creating a custom problem"]);
          setIsLoading(false);
          return;
        }
        const metadata = {
          "title": question.title,
          "number": question.questionFrontendId,
          "tags": question.topicTags.map(tag => tag.name).join(', '),
          "url": "https://leetcode.com" + question.questionDetailUrl,
          "type": question.categoryTitle.toLowerCase(),
          "difficulty": question.difficulty.toLowerCase()
        }
        postProblemValidator(
          metadata
        ).then(function () {
          resetTitle();
          setIsLoading(false);
        }).then(function () {
          timerCtx.setProblemInfo(metadata)
          timerCtx.setShowTimer(true);
        }).catch(function (error) {
          setIsLoading(false);
          if (error.response) {
            const data = error.response.data;
            if (data['title']) {
              displayTitleMessages(data['title'])
            } else {
              alert(error)
            }
          } else {
            alert(error)
          }
        });
      }).catch(function (error) {
        alert(error)
      })
  };

  const titleStyles = {
    control: (provided) => ({
      ...provided,
      border: '0px',
      borderRadius: '0.375rem',
      height: "60px",
      fontSize: "20px",
      background: "transparent",
    }),
    placeholder: () => ({
      color: '#B1C2D9',
      opacity: 1
    })
  }

  const titleComponents = {
    IndicatorSeparator: null,
    DropdownIndicator: null
  };

  return (
    <Fragment>
      <Helmet>
        <title>New Problem</title>
        <meta
          name="description"
          content="Start a new coding challenge." />
      </Helmet>
      <Navbar />
      <div className="main-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div className="mt-md-5">
                <Header>
                  <div className="col">
                    <h1 className="header-title">
                      New Problem
                    </h1>
                  </div>
                </Header>
              </div>


              <form onSubmit={formSubmissionHandler}>
                <div className="row">

                  <div className="col-12">
                    <FormSelectTextInput
                      className={titleClasses}
                      label='Type in a LeetCode Problem Title ...'
                      labelSize="20px"
                      labelIsMuted={true}
                      onChange={titleSelectChangedHandler}
                      onBlur={titleBlurHandler}
                      value={enteredTitle}
                      errors={showTitleErrors && titleErrors}
                      styles={titleStyles}
                      options={titleOptions}
                      placeholder=""
                      components={titleComponents}
                      isMulti={false}
                      isClearable
                      isLoading={isLoadingOption}
                      aria-live="off"
                      filterOption={createFilter({ ignoreAccents: false })}
                    ></FormSelectTextInput>
                  </div>
                </div>

                <div className="row justify-content-between">
                  <div className="col-12 col-md-6" />
                  <div className="col-auto">
                    <button className={buttonClasses}>
                      Create
                    </button>
                  </div>
                </div>

                <hr className="mt-4 mb-4" />
                <div className="row justify-content-between mt-5">
                  <div className="col-12 col-md-6" />
                  <div className="col-auto">
                    <p className="text-muted">Can not find what you want? <Link to="/new-custom-problem">
                        Create Custom Problem
                      </Link>
                    </p>

                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}



export default NewProblem;




const titleValidationFnc = (title) => {
  /*
  1. title can not be empty 
  2. title's length must be between 0 ~ 128
  */

  let messages = [];
  if (!title) {
    messages.push("Problem title is required");
  }
  return messages;
}