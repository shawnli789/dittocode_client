import Select from 'react-select'
function SelectFilter(props) {
  const components = {
    IndicatorSeparator: null
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: '1px solid hsl(0, 0%, 85%)',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid hsl(0, 0%, 85%)',
      }
    }),
  }

  const customThemeFn = (theme) => ({
    ...theme,
    spacing: {
      ...theme.spacing,
      controlHeight: 34,
      baseUnit: 3,
      colors: "primary25"
    }
  })

  return (
    <Select
      options={props.options}
      placeholder=""
      components={components}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
      isSearchable={false}
      theme={customThemeFn}
      styles={customStyles}
      ref={props.innerRef}
      value={props.value}
    />
  )
}

export default SelectFilter;