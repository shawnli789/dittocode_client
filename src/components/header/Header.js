function Header(props) {
  const headerClass = props.className? "header " + props.className : "header"
  return (
    <div className={headerClass}>
        <div className="header-body">
          <div className="row align-items-end">
           {props.children}
          </div>
        </div>
    </div>
  );
}

export default Header;