import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loader, setLoader } =
    useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);

  console.log(isAuthenticated);

  const logoutHandler = async (e) => {
    setLoader(true);
    try {
      const { data } = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(false);
      setLoader(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoader(false);
    }
  };

  return (
    <nav className="header-nav">
      <div className="header-container">
        <div className="header-title">
          <h2>ToDo App</h2>
        </div>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
        </button>
        <div className={`header-links ${menuOpen ? "show" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link
            to="/profile"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>
        </div>
        <div className={`header-action ${menuOpen ? "show" : ""}`}>
          {isAuthenticated ? (
            <button
              className="logout-btn"
              disabled={loader}
              onClick={logoutHandler}
            >
              LogOut
            </button>
          ) : (
            <Link
              className="login-btn"
              to="/login"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>
      )}
    </nav>
  );
};

export default Header;
