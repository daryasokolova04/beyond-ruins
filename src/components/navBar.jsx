import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
              Посты
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link link-dark" to="/register">
              Регистрация
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link link-dark" to="/login">
              Войти
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
            Посты
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link link-dark" to={`/profile/${id}`}>
            Профиль
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link link-dark" to="/logout">
            Выйти
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
