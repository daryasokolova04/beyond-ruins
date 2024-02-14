import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import axios from "axios";

const NavBar = () => {
  const [id, setId] = useState();

  useEffect(() => {
    setId(localStorage.getItem("id"));
  }, [id]);

  return !id ? (
    <div className="fixed-top m-2">
      <nav className="navbar justify-content-center">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link link-dark" to="/posts">
              home
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link link-dark" to="/register">
              register
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link link-dark" to="/login">
              login
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  ) : (
    <nav className="navbar justify-content-center">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link link-dark" to="/posts">
            posts
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link link-dark" to={`/profile/${id}`}>
            profile
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link link-dark" to="/logout">
            log out
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
