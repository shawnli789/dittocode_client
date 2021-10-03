import Creatable from 'react-select/creatable';

function FormSelectTextInput(props) {
  const errorElements = props.errors && props.errors.map(function (errorMsg, index) {
    errorMsg = '\u2022 ' + errorMsg;
    return <div key={index} className="invalid-feedback d-block">{errorMsg}</div>;
  });

  const labelClass = props.labelIsMuted? "form-group text-muted" : "form-group";

  return (
    <div className={labelClass} style={{fontSize: props.labelSize}}>
      <label className='form-label'>{props.label}</label>
      <Creatable {...props} />
      {errorElements}
    </div>
  );
}

export default FormSelectTextInput;