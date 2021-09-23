import { Link } from "react-router-dom";

function RedirectButton(props) {
  const classes = props.className? props.className : "btn btn-primary lift";
  return (
    <Link to={props.href} className={classes}>
      {props.children}
    </Link>
  );
}

export default RedirectButton;