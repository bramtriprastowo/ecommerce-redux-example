import React, { Fragment, useEffect, useState } from "react";
import ImgHero from "../assets/bg-hero.jpg";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      fetch(import.meta.env.VITE_BASE_URL)
        .then((response) => response.json())
        .then((data) => setProducts(data.filter((product) => product.id < 5)))
        .catch((err) => console.log(err));
    };
    getProducts().then(() => products ?? filterProduct);
  }, []);

  return (
    <Fragment>
      <div className="d-flex justify-content-center">
        <img src={ImgHero} alt="hero" width="80%" className="mt-2" />
      </div>
      <p className="text-center fs-6">
        <i>Image by Freepik</i>
      </p>
      <div className="container my-5 py-5">
        <div className="row justify-content-center">
          <div className="col-12 mb-5">
            <p className="display-6 fw-bolder text-center">New Arrivals</p>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {products
            ? products.map((product, index) => {
                return (
                  <div className="col-6 col-md-4 col-xl-3 mb-4" key={index}>
                    <div className={`card h-100 ${styles.card}`}>
                      <Link to={`products/${product.id}`}>
                        <img
                          src={product.image}
                          className="card-img-top d-block"
                          alt={product.title}
                        />
                        <div className={`card-body ${styles.cardBody}`}>
                          <p className={`card-title ${styles.cardTitle}`}>
                            {product.title}
                          </p>
                          <p className={`card-text fw-bold ${styles.cardText}`}>
                            Rp{" "}
                            {product.price
                              ? (product.price * 12000).toLocaleString("id-ID")
                              : "-"}
                          </p>
                          <p
                            className={`text-uppercase fw-bold text-black-50 ${styles.cardCategory}`}
                          >
                            {product.category}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })
            : ""}
          <Link
            to="/products"
            className="text-end fs-6 text-decoration-none text-black"
          >
            More Products <i className="fa fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
