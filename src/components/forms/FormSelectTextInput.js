import Creatable from 'react-select/creatable';

function FormSelectTextInput(props) {
  const errorElements = props.errors && props.errors.map(function (errorMsg, index) {
    errorMsg = '\u2022 ' + errorMsg;
    return <div key={index} className="invalid-feedback d-block">{errorMsg}</div>;
  });

  return (
    <div className="form-group">
      <label className='form-label'>{props.label}</label>
      <Creatable {...props} />
      {errorElements}
    </div>
  );
}

export default FormSelectTextInput;