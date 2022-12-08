import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const cart = useSelector((state) => state.handleCart);
  const itemCount = cart.reduce((total, item) => total + item.qty, 0);
  
  // Hide and show navbar on scroll
  let prevScrollpos = window.pageYOffset;
  window.onscroll = () => {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.querySelector(".navbar").style.top = "0";
    } else {
      document.querySelector(".navbar").style.top = "-78px";
    }
    prevScrollpos = currentScrollPos;
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-white py-3 shadow-sm sticky-top"
    >
      <div className="container">
        <a className="navbar-brand fw-bold fs-4" href="#">
          GNA CER EN
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link ms-2" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link ms-2" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link ms-2" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="buttons">
            <NavLink to="#" className="btn btn-outline-dark">
              <i className="fa fa-sign-in me-1"></i> Login
            </NavLink>
            <NavLink to="#" className="btn btn-outline-dark ms-2">
              <i className="fa fa-user-plus me-1"></i> Register
            </NavLink>
            <NavLink to="/cart" className="btn btn-outline-dark ms-2">
              <i className="fa fa-shopping-cart me-1"></i> Cart ({itemCount})
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
