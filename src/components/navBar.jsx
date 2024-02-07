import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

const NavBar = () => {
  return (
    <ul className="nav justify-content-center">
      <li className="nav-item">
        <Link className="nav-link" to="/login/register">
          register
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/posts">
          home
        </Link>
      </li>
    </ul>
  );
};

export default NavBar;
