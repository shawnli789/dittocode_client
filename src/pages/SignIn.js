import { Fragment, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthContext from '../store/auth-context';
import FormInput from '../components/forms/FormInput';
import LogoText from '../components/logo/LogoText';
import logoSrc from '../img/logo.png'
import useInputValidation from '../hooks/use-input-validation'
import useWindowSize from '../hooks/use-window-size';
import useAxiosInstance from '../hooks/use-axios-instance';
import { Helmet } from 'react-helmet';


function SignIn(props) {
  const windowHeight = useWindowSize().height + 'px';
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const { postSession } = useAxiosInstance();
  const history = useHistory();

  const {
    value: enteredUserIdentifier,
    errors: userIdentifierErrors,
    showErrors: showUserIdentifierErrors,
    valueChangeHandler: userIdentifierChangedHandler,
    inputBlurHandler: userIdentifierBlurHandler,
    submitHandler: userIdentifierSubmitHandler,
    displayMessages: displayUserIdentifierMessages,
    reset: resetUserIdentifier
  } = useInputValidation(userIdentifierValidationFnc)

  const {
    value: enteredPassword,
    errors: passwordErrors,
    showErrors: showPasswordErrors,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    submitHandler: passwordSubmitHandler,
    displayMessages: displayPasswordMessages,
    reset: resetPassword
  } = useInputValidation(passwordValidationFnc)



  let formIsValid = false;

  if (userIdentifierErrors.length === 0 && passwordErrors.length === 0) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    userIdentifierSubmitHandler();
    passwordSubmitHandler();

    if (!formIsValid) {
      return;
    }

    setIsLoading(true);
    postSession({
      "user_identifier": enteredUserIdentifier.trim(),
      "password": enteredPassword,
    }).then(function (response) {
      const jwt_token = response.data.token
      authCtx.login(jwt_token);
      resetUserIdentifier();
      resetPassword();
      setIsLoading(false);
    }).then(() => {
      history.replace('/');
    }).catch(function (error) {
      setIsLoading(false);
      if (error.response) {
        const data = error.response.data;
        if (data["user_identifier"]) {
          displayUserIdentifierMessages(data["user_identifier"])
        }
        if (data["password"]) {
          displayPasswordMessages(data["password"])
        }
      } else {
        alert(error)
      }
    });
  };

  const userIdentifierClasses = showUserIdentifierErrors ? 'form-control is-invalid' : 'form-control';
  const passwordClasses = showPasswordErrors ? 'form-control is-invalid' : 'form-control';
  const buttonClasses = isLoading ? "btn btn-lg w-100 btn-primary mb-3 invisible" : 'btn btn-lg w-100 btn-primary mb-3';
  const textClasses = isLoading ? "text-center invisible" : 'text-center';

  return (
    <Fragment>
      <Helmet>
        <title>Sign In</title>
        <meta
          name="description"
          content="Login to DittoCode to keep track of your progress." />
      </Helmet>
      <div className="d-flex align-items-center bg-auth border-top border-top-2 border-primary" style={{ height: windowHeight }}>
        <div className="container">

          <div className="row justify-content-center mt-5 mb-3">
            <LogoText logoSrc={logoSrc} title='Sign in' />
          </div>

          <div className="row justify-content-center mb-5">
            <div className="col-12 col-md-6 col-xl-4 ">
              <form onSubmit={formSubmissionHandler}>
                <FormInput
                  className={userIdentifierClasses}
                  type='text'
                  label='Email / Username'
                  placeholder='Enter your email or username'
                  onChange={userIdentifierChangedHandler}
                  onBlur={userIdentifierBlurHandler}
                  value={enteredUserIdentifier}
                  errors={showUserIdentifierErrors && userIdentifierErrors}
                />
                <FormInput
                  className={passwordClasses}
                  type='password'
                  label='Password'
                  placeholder='Enter your password'
                  onChange={passwordChangedHandler}
                  onBlur={passwordBlurHandler}
                  value={enteredPassword}
                  errors={showPasswordErrors && passwordErrors}
                />
                <button className={buttonClasses}>
                  Sign in
                </button>
                <div className={textClasses}>
                  <small className="text-muted text-center">
                    Don't have an account yet? <Link to="/sign-up">Sign up</Link>.
                  </small>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>

    </Fragment>
  );
}

export default SignIn;



const userIdentifierValidationFnc = (userIdentifier) => {
  /*
  1. email or username can not be empty 
  2. email must be a valid email address
  */
  let messages = [];
  userIdentifier = userIdentifier.trim();
  if (!userIdentifier) {
    messages.push("Email or username is required")
  } else if (userIdentifier.includes("@")) {
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userIdentifier))) {
      messages.push("Not a valid email address")
    }
  }
  return messages;
};

const passwordValidationFnc = (password) => {
  /* 
  1. password can not be empty
  2. password's length must be between 8 ~ 128
  */
  let messages = [];
  if (!password) {
    messages.push("Password is required")
  } else if (password.length < 8 || password.length > 128) {
    messages.push("Length must be between 8 and 128 characters")
  }
  return messages;
};
