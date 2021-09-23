import { NavLink } from "react-router-dom";

function NavItem(props) {
  return (
    <li className="nav-item">
      <NavLink exact to={props.url} className="nav-link" activeClassName="active" id={props.id}>
        {props.children}
      </NavLink>
    </li>
  );
}

export default NavItem;
