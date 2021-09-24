function FormInput(props) {
  const errorElements = props.errors && props.errors.map(function (errorMsg, index) {
    errorMsg = '\u2022 ' + errorMsg;
    return <div key={index} className="invalid-feedback d-block">{errorMsg}</div>;
  });

  const optionalElements = props.optional && <label className='form-label input_optional'> &nbsp;- optional</label>

  return (
    <div className='form-group' id={props.id}>
      <label className='form-label'>{props.label}</label>
      {optionalElements}
      <input
        className={props.className}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value} 
        placeholder={props.placeholder} 
        />
        {errorElements}
    </div>
  );
}

FormInput.defaultProps = {
  className: 'form-control'
}

export default FormInput;