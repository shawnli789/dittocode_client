import Toggler from './Toggler';
import LogoNav from '../logo/LogoNav';
import DropdownLink from '../buttons/DropdownLink';
import NavItem from './NavItem';
import logoSrc from '../../img/logo.png'
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import { useContext } from 'react';
import useAxiosInstance from '../../hooks/use-axios-instance';
import { useState, useEffect } from 'react';

function Navbar() {
  const authCtx = useContext(AuthContext);
  const { getUser } = useAxiosInstance();
  const [user, setUser] = useState('');
  useEffect(() => {
    getUser().then((response) => {
      setUser(response.data.username)
    }).catch(function (err) {
      alert(err)
    });
  }, [getUser])

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Toggler />

        <LogoNav src={logoSrc} />

        <div className="navbar-user">
          <div className="dropdown">
            <DropdownLink>{user}</DropdownLink>
            <div className="dropdown-menu dropdown-menu-end">
              <Link to="/" className="dropdown-item" onClick={authCtx.logout}>
                Sign Out <span className="fe fe-log-out float-end"></span>
              </Link>
            </div>
          </div>
        </div>

        <div className="collapse navbar-collapse me-lg-auto order-lg-first" id="navbar">
          <ul className="navbar-nav me-lg-auto">
            <NavItem url="/">Dashboard</NavItem>
            <NavItem url="/problems">Problems</NavItem>
          </ul>
        </div>
      </div>
    </nav>
  );


}

export default Navbar;