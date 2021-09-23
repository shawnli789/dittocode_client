import Select from 'react-select'

function FormSelectInput(props) {
  const errorElements = props.errors && props.errors.map(function (errorMsg, index) {
    errorMsg = '\u2022 ' + errorMsg;
    return <div key={index} className="invalid-feedback d-block">{errorMsg}</div>;
  });

  const optionalElements = props.optional && <label className='form-label input_optional'> &nbsp;- optional</label>

  return (
    <div className="form-group">
      <label className='form-label'>{props.label}</label>
      {optionalElements}
      <Select 
        isMulti={props.isMulti}
        value={props.value}
        className={props.className}
        onChange={props.onChange}
        onBlur={props.onBlur}
        options={props.options}
        styles={props.styles}
        components={props.components}
      >
      </Select>
      {errorElements}
    </div>
  );
}

export default FormSelectInput;