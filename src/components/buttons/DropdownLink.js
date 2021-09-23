function DropdownLink(props) {
  return (
    <button
      className="btn btn-link dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      {props.children}
    </button>
  );
}

export default DropdownLink;