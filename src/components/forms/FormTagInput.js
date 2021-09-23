import Creatable from 'react-select/creatable';

function FormTagInput(props) {
  const errorElements = props.errors && props.errors.map(function (errorMsg, index) {
    errorMsg = '\u2022 ' + errorMsg;
    return <div key={index} className="invalid-feedback d-block">{errorMsg}</div>;
  });

  return (
    <div className="form-group">
      <label className='form-label'>{props.label}</label>
      <Creatable 
        value={props.value}
        className={props.className}
        onChange={props.onChange}
        onBlur={props.onBlur}
        options={props.options}
        styles={props.styles}
        components={props.components}
        placeholder={props.placeholder}
        isClearable
        isMulti
      >
      </Creatable>
      {errorElements}
    </div>
  );
}

export default FormTagInput;