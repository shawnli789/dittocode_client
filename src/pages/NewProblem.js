import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";
import FormInput from '../components/forms/FormInput';
import FormSelectInput from "../components/forms/FormSelectInput";
import FormTagInput from "../components/forms/FormTagInput";
import useInputValidation from "../hooks/use-input-validation";
import { Fragment, useState, useContext } from 'react'
import { typeOptions, difficultyOptions, completedOptions, timeSpentOptions, tagsOptions } from '../utils/options';
import useAxiosInstance from "../hooks/use-axios-instance";
import TimerContext from "../store/timer-context";


function NewProblem(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { postProblemValidator } = useAxiosInstance();
  const timerCtx = useContext(TimerContext)


  const {
    value: enteredNumber,
    errors: numberErrors,
    showErrors: showNumberErrors,
    valueChangeHandler: numberChangedHandler,
    inputBlurHandler: numberBlurHandler,
    submitHandler: numberSubmitHandler,
    displayMessages: displayNumberMessages,
    reset: resetNumber
  } = useInputValidation(numberValidationFnc)

  const {
    value: enteredTitle,
    errors: titleErrors,
    showErrors: showTitleErrors,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    submitHandler: titleSubmitHandler,
    displayMessages: displayTitleMessages,
    reset: resetTitle
  } = useInputValidation(titleValidationFnc)

  const {
    value: enteredTags,
    errors: tagsErrors,
    showErrors: showTagsErrors,
    valueSelectChangeHandler: tagsSelectChangedHandler,
    inputBlurHandler: tagsBlurHandler,
    submitHandler: tagsSubmitHandler,
    displayMessages: displayTagsMessages,
    resetSelect: resetSelectTags
  } = useInputValidation(tagsValidationFnc)

  const {
    value: enteredURL,
    errors: URLErrors,
    showErrors: showURLErrors,
    valueChangeHandler: URLChangedHandler,
    inputBlurHandler: URLBlurHandler,
    submitHandler: URLSubmitHandler,
    displayMessages: displayURLMessages,
    reset: resetURL
  } = useInputValidation(URLValidationFnc)

  const {
    value: enteredType,
    errors: typeErrors,
    showErrors: showTypeErrors,
    valueSelectChangeHandler: typeSelectChangedHandler,
    inputBlurHandler: typeBlurHandler,
    submitHandler: typeSubmitHandler,
    displayMessages: displayTypeMessages,
    resetSelect: resetSelectType
  } = useInputValidation(typeValidationFnc)

  const {
    value: enteredDifficulty,
    errors: difficultyErrors,
    showErrors: showDifficultyErrors,
    valueSelectChangeHandler: difficultySelectChangedHandler,
    inputBlurHandler: difficultyBlurHandler,
    submitHandler: difficultySubmitHandler,
    displayMessages: displayDifficultyMessages,
    resetSelect: resetSelectDifficulty
  } = useInputValidation(difficultyValidationFnc)



  const numberClasses = showNumberErrors ? 'form-control is-invalid' : 'form-control';
  const titleClasses = showTitleErrors ? 'form-control is-invalid' : 'form-control';
  const tagsClasses = showTagsErrors ? 'form-control p-0 is-invalid' : 'form-control p-0';
  const URLClasses = showURLErrors ? 'form-control is-invalid' : 'form-control';
  const typeClasses = showTypeErrors ? 'form-control p-0 is-invalid' : 'form-control p-0';
  const difficultyClasses = showDifficultyErrors ? 'form-control p-0 is-invalid' : 'form-control p-0';
  const buttonClasses = isLoading ? "btn btn-primary invisible" : 'btn btn-primary';

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      border: '0px',
      borderRadius: '0.375rem',
    }),
    placeholder: () => ({
      color: '#B1C2D9',
      opacity: 1
    })
  }

  const tagStyles = selectStyles

  const selectComponents = {
    IndicatorSeparator: null,
  };

  const tagComponents = {
    IndicatorSeparator: null,
    DropdownIndicator: null
  };

  let formIsValid = false;

  if (numberErrors.length === 0
    && titleErrors.length === 0
    && tagsErrors.length === 0
    && URLErrors.length === 0
    && typeErrors.length === 0
    && difficultyErrors.length === 0
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    console.log("submit")
    event.preventDefault();

    numberSubmitHandler();
    titleSubmitHandler();
    tagsSubmitHandler();
    URLSubmitHandler();
    typeSubmitHandler();
    difficultySubmitHandler();

    if (!formIsValid) {
      return;
    }
    setIsLoading(true);

    postProblemValidator({
      "number": enteredNumber.trim(),
      "title": enteredTitle.trim(),
      "tags": enteredTags.map(tag => tag.value).join(', '),
      "url": enteredURL.trim(),
      "type": enteredType.value,
      "difficulty": enteredDifficulty.value
    }).then(function () {
      resetNumber();
      resetTitle();
      resetSelectTags();
      resetURL();
      resetSelectType();
      resetSelectDifficulty();
      setIsLoading(false);
    }).then(function () {
      const problemInfo = {
        "number": enteredNumber.trim(),
        "title": enteredTitle.trim(),
        "tags": enteredTags.map(tag => tag.value).join(', '),
        "url": enteredURL.trim(),
        "type": enteredType.value,
        "difficulty": enteredDifficulty.value
      }
      timerCtx.setProblemInfo(problemInfo)
      timerCtx.setShowTimer(true);
    }).catch(function (error) {
      setIsLoading(false);
      if (error.response) {
        const data = error.response.data;
        if (data['number']) {
          displayNumberMessages(data['number'])
        }
        if (data['title']) {
          displayTitleMessages(data['title'])
        }
        if (data['tags']) {
          displayTagsMessages(data['tags'])
        }
        if (data['url']) {
          displayURLMessages(data['url'])
        }
        if (data['type']) {
          displayTypeMessages(data['type'])
        }
        if (data['difficulty']) {
          displayDifficultyMessages(data['difficulty'])
        }
      } else {
        alert(error)
      }
    });
  };


  return (
    <Fragment>
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
                  <div className="col-12 col-md-6">
                    <FormInput
                      className={numberClasses}
                      type='text'
                      label='Number'
                      onChange={numberChangedHandler}
                      onBlur={numberBlurHandler}
                      value={enteredNumber}
                      errors={showNumberErrors && numberErrors}
                    ></FormInput>
                  </div>

                  <div className="col-12 col-md-6">
                    <FormInput
                      className={titleClasses}
                      type='text'
                      label='Title'
                      onChange={titleChangedHandler}
                      onBlur={titleBlurHandler}
                      value={enteredTitle}
                      errors={showTitleErrors && titleErrors}
                    ></FormInput>
                  </div>

                  <div className="col-12 col-md-6">
                    <FormTagInput
                      className={tagsClasses}
                      label='Tags'
                      onChange={tagsSelectChangedHandler}
                      onBlur={tagsBlurHandler}
                      value={enteredTags}
                      errors={showTagsErrors && tagsErrors}
                      options={tagsOptions}
                      styles={tagStyles}
                      placeholder=""
                      components={tagComponents}
                    >
                    </FormTagInput>
                  </div>

                  <div className="col-12 col-md-6">
                    <FormInput
                      className={URLClasses}
                      type='text'
                      label='URL'
                      optional='true'
                      onChange={URLChangedHandler}
                      onBlur={URLBlurHandler}
                      value={enteredURL}
                      errors={showURLErrors && URLErrors}
                    ></FormInput>
                  </div>

                  <div className="col-12 col-md-6">
                    <FormSelectInput
                      className={typeClasses}
                      label='Type'
                      onChange={typeSelectChangedHandler}
                      onBlur={typeBlurHandler}
                      value={enteredType}
                      errors={showTypeErrors && typeErrors}
                      options={typeOptions}
                      styles={selectStyles}
                      components={selectComponents}
                    >
                    </FormSelectInput>
                  </div>

                  <div className="col-12 col-md-6">
                    <FormSelectInput
                      className={difficultyClasses}
                      label='Difficulty'
                      onChange={difficultySelectChangedHandler}
                      onBlur={difficultyBlurHandler}
                      value={enteredDifficulty}
                      errors={showDifficultyErrors && difficultyErrors}
                      options={difficultyOptions}
                      styles={selectStyles}
                      components={selectComponents}
                    >
                    </FormSelectInput>
                  </div>

                </div>

                <hr className="mt-4 mb-4" />
                <div className="row justify-content-between">
                  <div className="col-12 col-md-6" />
                  <div className="col-auto">
                    <button className={buttonClasses}>
                      Create
                    </button>
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


const numberValidationFnc = (number) => {
  /*
  1. number can not be empty 
  2. number must only contain numbers
  3. number must be in range of 0 ~ 1000000
  */

  let messages = [];
  number = number.trim();
  if (!number) {
    messages.push("Problem number is required")
  } else {
    for (let i = 0; i < number.length; i++) {
      let c = number.charAt(i);
      if (c < '0' || c > '9') {
        messages.push("Not a valid number")
        return messages;
      }
    }
    if (parseInt(number) < 0 || parseInt(number) > 1000000) {
      messages.push("Value must be between 0 and 1000000")
    }
  }
  return messages;
}


const titleValidationFnc = (title) => {
  /*
  1. title can not be empty 
  2. title's length must be between 0 ~ 128
  */

  let messages = [];
  title = title.trim();
  if (!title) {
    messages.push("Problem title is required");
  } else if (title.length > 128) {
    messages.push("Length must be less than 128 characters");
  }
  return messages;
}


const URLValidationFnc = (url) => {
  /*
  1. url's length must be between 0 ~ 3000
  */

  let messages = [];
  url = url.trim();
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

  if (url && !pattern.test(url)) {
    messages.push("Not a valid URL");
  }
  if (url.length > 3000) {
    messages.push("Length must be less than 3000 characters");
  }
  return messages;
}


const tagsValidationFnc = (tags) => {
  /*
  1. tags can not be empty
  2. tags' length must be between 0 ~ 300
  */
  let messages = [];
  if (!tags) {
    messages.push('Problem tags is required')
  } else if (tags.length > 300) {
    messages.push('Length must be less than 300 characters')
  }
  return messages;

}

const typeValidationFnc = (type) => {
  /*
  1. type can not be empty
  */
  let messages = [];
  if (!type) {
    messages.push('Problem type is required')
  }
  return messages;
}

const difficultyValidationFnc = (difficulty) => {
  /*
  1. difficulty can not be empty
  */
  let messages = [];
  if (!difficulty) {
    messages.push('Problem difficulty is required')
  }
  return messages;
}

