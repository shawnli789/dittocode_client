import { Link } from "react-router-dom";

function LogoNav(props) {
  return (
      <Link to="/" className="navbar-brand me-auto navbar-logo">
      <img src={props.src} alt="..." className="navbar-brand-img mb-2 mx-2" />
        <p className="d-inline fw-bold">Dittocode</p>
        
      </Link>
  );
}

export default LogoNav;