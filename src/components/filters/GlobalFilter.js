function GlobalFilter(props) {
  return (
    <div className="input-group input-group-flush input-group-merge input-group-reverse">
      <input value={props.filter || ''} type="search" ref={props.innerRef} className="form-control list-search pb-2" placeholder="Search" onChange={props.onChange} />
      <div className="input-group-text pb-2">
        <span className="fe fe-search"></span>
      </div>
    </div>
  )
}

export default GlobalFilter;


