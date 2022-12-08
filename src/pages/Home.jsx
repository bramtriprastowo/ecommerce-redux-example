import React, { Fragment, useEffect, useState } from "react";
import ImgHero from "../assets/bg-hero.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      fetch(import.meta.env.VITE_BASE_URL)
        .then((response) => response.json())
        .then((data) => setProducts(data.filter((product) => product.id < 5)))
        .catch((err) => console.log(err));
    };
    getProducts()
    .then(() => products ?? filterProduct);
  }, []);

  return (
    <Fragment>
      <div className="d-flex justify-content-center">
        <img src={ImgHero} alt="hero" width="90%" className="mt-2" />
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
          {products
            ? products.map((product, index) => {
                return (
                  <div className="col-6 col-md-4 col-xl-3 mb-4" key={index}>
                    <div className="card h-100 p-4">
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.title}
                        height="250px"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text lead fw-bold">
                          Rp{" "}
                          {product.price
                            ? (product.price * 12000).toLocaleString("id-ID")
                            : "-"}
                        </p>
                        <Link
                          to={`products/${product.id}`}
                          className="btn btn-outline-dark"
                        >
                          Buy Now
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
            <Link to="/products" className="text-end fs-5 text-decoration-none text-black">More Products <i className="fa fa-arrow-right"></i></Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
