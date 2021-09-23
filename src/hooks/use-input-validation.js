import { useState, useEffect } from "react";

function useInputValidation(validationFcn) {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState([]);
  const showErrors = isTouched && errorMsgs.length > 0;

  useEffect(() => {
    setErrorMsgs(validationFcn(enteredValue))
  }, [enteredValue, validationFcn])


  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueSelectChangeHandler = (event) => {
      setEnteredValue(event);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  const resetSelect = () => {
    setEnteredValue(null);
    setIsTouched(false);
  };

  const submitHandler = (messages) => {
    setIsTouched(true);
  };

  const displayMessages = (messages) => {
    if (!messages) {
      setErrorMsgs([]);
    } else {
      setErrorMsgs(messages)
    }
  };

  return {
    value: enteredValue,
    errors: errorMsgs,
    showErrors: showErrors,
    valueChangeHandler: valueChangeHandler,
    valueSelectChangeHandler: valueSelectChangeHandler,
    inputBlurHandler: inputBlurHandler,
    submitHandler: submitHandler,
    displayMessages: displayMessages,
    reset: reset,
    resetSelect: resetSelect
  };
}

export default useInputValidation;