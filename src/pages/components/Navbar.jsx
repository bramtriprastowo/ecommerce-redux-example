import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
        <span className="navbar-brand fw-bold fs-4">
          eSTORE
        </span>
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
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link ms-2" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link ms-2" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link ms-2" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link ms-2" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <div className="buttons">
            <Link to="/cart" className="btn btn-outline-dark ms-2 nav-btn-text">
              <i className="fa fa-shopping-cart me-1"></i> Cart ({itemCount})
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
