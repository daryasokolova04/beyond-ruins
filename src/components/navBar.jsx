import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const NavBar = () => {
  const [isLogged, setIsLogged] = useState();

  useEffect(() => {
    console.log(isLogged);
    let isMounted = true;
    api.data.getIsLogged().then((data) => setIsLogged(data));
    return () => {
      isMounted = false;
    };
  }, [isLogged]);

  return !isLogged ? (
    <div className="fixed-top m-2">
      <nav className="navbar justify-content-center">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/posts">
              home
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/register">
              register
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/login">
              login
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  ) : (
    <nav className="navbar justify-content-center fixed-top">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link" to="/posts">
            posts
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`/profile/${isLogged}`}>
            profile
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/logout">
            log out
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
