import { Fragment } from 'react'
import { Link } from 'react-router-dom';

function LogoText(props) {
  return (
    <Fragment>
      <Link to='/' className="col-1 px-0">
        <img src={props.logoSrc} className="logo-img float-end" alt="..." />
      </Link>

      <div style={{width: '8.5rem'}}>
        <h1 className="display-4 text-center mb-3">
          {props.title}
        </h1>
      </div>

      <div className="col-1 px-0" />
    </Fragment>
  );
}

export default LogoText;