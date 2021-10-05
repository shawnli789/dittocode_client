import { Fragment, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

import FormInput from '../components/forms/FormInput';
import LogoText from '../components/logo/LogoText';
import logoSrc from '../img/logo.png'
import useInputValidation from '../hooks/use-input-validation'
import useWindowSize from '../hooks/use-window-size';
import useAxiosInstance from '../hooks/use-axios-instance';
import AuthContext from '../store/auth-context';
import { Helmet } from 'react-helmet';

function SignUp(props) {
  const windowHeight = useWindowSize().height + 'px';
  const [isLoading, setIsLoading] = useState(false);
  const { postUser, postSession } = useAxiosInstance();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const {
    value: enteredUsername,
    errors: usernameErrors,
    showErrors: showUsernameErrors,
    valueChangeHandler: usernameChangedHandler,
    inputBlurHandler: usernameBlurHandler,
    submitHandler: usernameSubmitHandler,
    displayMessages: displayUsernameMessages,
    // reset: resetUsername
  } = useInputValidation(usernameValidationFnc)

  const {
    value: enteredEmail,
    errors: emailErrors,
    showErrors: showEmailErrors,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    submitHandler: emailSubmitHandler,
    displayMessages: displayEmailMessages,
    // reset: resetEmail
  } = useInputValidation(emailValidationFnc)

  const {
    value: enteredPassword,
    errors: passwordErrors,
    showErrors: showPasswordErrors,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
    submitHandler: passwordSubmitHandler,
    displayMessages: displayPasswordMessages,
    // reset: resetPassword
  } = useInputValidation(passwordValidationFnc)

  const {
    value: enteredConfirmPassword,
    errors: confirmPasswordErrors,
    showErrors: showConfirmPasswordErrors,
    valueChangeHandler: confirmPasswordChangedHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    submitHandler: confirmPasswordSubmitHandler,
    displayMessages: displayConfirmPasswordMessages,
    // reset: resetConfirmPassword
  } = useInputValidation(confirmPasswordValidationFnc)


  let formIsValid = false;

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    usernameSubmitHandler();
    emailSubmitHandler();
    passwordSubmitHandler();
    confirmPasswordSubmitHandler();

    const err = confirmPasswordValidationOnSubmit(enteredConfirmPassword, enteredPassword);
    displayConfirmPasswordMessages(err);

    if (usernameErrors.length === 0
      && emailErrors.length === 0
      && passwordErrors.length === 0
      && confirmPasswordErrors.length === 0
      && err.length === 0) {
      formIsValid = true;
    }

    if (!formIsValid) {
      return;
    }

    setIsLoading(true);

    postUser({
      "username": enteredUsername.trim(),
      "email": enteredEmail.trim(),
      "password": enteredPassword,
    }).then(function (response) {
      // resetUsername();
      // resetEmail();
      // resetPassword();
      // resetConfirmPassword();
      postSession({
        "user_identifier": enteredUsername.trim(),
        "password": enteredPassword,
      }).then(function (response) {
        const jwt_token = response.data.token
        authCtx.login(jwt_token);
        setIsLoading(false);
      }).then(() => {
        history.replace('/');
      }).catch(function (error) {
        if (error.response) {
          alert(error.response);
        } else {
          alert(error);
        }
      })
    }).then(function () {
      setIsLoading(false);
    }).catch(function (error) {
      setIsLoading(false);
      if (error.response) {
        const data = error.response.data;
        if (data["username"]) {
          displayUsernameMessages(data["username"])
        }
        if (data["email"]) {
          displayEmailMessages(data["email"])
        }
        if (data["password"]) {
          displayPasswordMessages(data["password"])
        }
      } else {
        alert(error)
      }
    });
  };

  const usernameClasses = showUsernameErrors ? 'form-control is-invalid' : 'form-control';
  const emailClasses = showEmailErrors ? 'form-control is-invalid' : 'form-control';
  const passwordClasses = showPasswordErrors ? 'form-control is-invalid' : 'form-control';
  const confirmPasswordClasses = showConfirmPasswordErrors ? 'form-control is-invalid' : 'form-control';
  const buttonClasses = isLoading ? "btn btn-lg w-100 btn-primary mb-3 invisible" : 'btn btn-lg w-100 btn-primary mb-3';
  const textClasses = isLoading ? "text-center invisible" : 'text-center';

  return (
    <Fragment>
      <Helmet>
        <title>Sign Up</title>
        <meta
          name="description"
          content="Advanced table, real time dashboard and built in pomodoro timer provide all in one solution to boost your productivity." />
      </Helmet>
      <div className="d-flex align-items-center bg-auth border-top border-top-2 border-primary" style={{ height: windowHeight }}>
        <div className="container">

          <div className="row justify-content-center mt-5 mb-3">
            <LogoText logoSrc={logoSrc} title='Sign up' />
          </div>

          <div className="row justify-content-center mb-5">
            <div className="col-12 col-md-6 col-xl-4 ">
              <form onSubmit={formSubmissionHandler}>
                <FormInput
                  className={usernameClasses}
                  type='text'
                  label='Username'
                  placeholder='username'
                  onChange={usernameChangedHandler}
                  onBlur={usernameBlurHandler}
                  value={enteredUsername}
                  errors={showUsernameErrors && usernameErrors}
                />
                <FormInput
                  className={emailClasses}
                  type='email'
                  label='Email Address'
                  placeholder='name@address.com'
                  onChange={emailChangedHandler}
                  onBlur={emailBlurHandler}
                  value={enteredEmail}
                  errors={showEmailErrors && emailErrors}
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
                <FormInput
                  className={confirmPasswordClasses}
                  type='password'
                  label='Confirm Password'
                  placeholder='Confirm your password'
                  onChange={confirmPasswordChangedHandler}
                  onBlur={confirmPasswordBlurHandler}
                  value={enteredConfirmPassword}
                  errors={showConfirmPasswordErrors && confirmPasswordErrors}
                />
                <button className={buttonClasses}>
                  Sign up
                </button>
                <div className={textClasses}>
                  <small className="text-muted text-center">
                    Already have an account? <Link to="/sign-in">Sign in</Link>.
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

export default SignUp;


const usernameValidationFnc = (username) => {
  /* 
  1. username can not be empty
  2. username's length must be between 5 ~ 30
  3. username can only contain letters (a-z), numbers(0-9), and periods (.)
  4. username can not start or end with periods
  */
  let messages = []
  username = username.trim();
  if (!username) {
    messages.push("Username is required")
  } else if (username.length < 5 || username.length > 30) {
    messages.push("Length must be between 5 and 30 characters")
  }
  for (let i = 0; i < username.length; i++) {
    let c = username.charAt(i);
    if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9') || c === '.') {
      continue;
    } else {
      messages.push("Can only contain letters, numbers and periods");
      break;
    }
  }
  for (let i = 1; i < username.length; i++) {
    let prev = username.charAt(i - 1);
    let c = username.charAt(i);
    if (c === prev && c === '.') {
      messages.push("Can not contain more than one period in a row");
      break;
    }
  }
  if (username.charAt(0) === '.' || username.charAt(username.length - 1) === '.') {
    messages.push("Can not start or end with periods")
  }
  return messages;
};

const emailValidationFnc = (email) => {
  /*
  1. email can not be empty 
  2. email must be a valid email address
  */
  let messages = []
  email = email.trim();
  if (!email) {
    messages.push("Email address is required")
  } else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    messages.push("Not a valid email address")
  }
  return messages;
};

const passwordValidationFnc = (password) => {
  /* 
  1. password can not be empty
  2. password's length must be between 8 ~ 128
  */
  let messages = []
  if (!password) {
    messages.push("Password is required")
  } else if (password.length < 8 || password.length > 128) {
    messages.push("Length must be between 8 and 128 characters")
  }
  return messages;
};

const confirmPasswordValidationFnc = (confirmPassword) => {
  /* 
  1. confirm-password can not be empty
  */
  let messages = []
  if (!confirmPassword) {
    messages.push("Please confirm your password")
  }
  return messages;
};

const confirmPasswordValidationOnSubmit = (confirmPassword, password) => {
  /* 
  1. confirm-password must match password
  */
  let messages = []
  if (!confirmPassword) {
    messages.push("Please confirm your password")
  } else if (confirmPassword !== password) {
    messages.push("Password does not match")
  }
  return messages;
};

