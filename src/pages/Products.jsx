import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      fetch(import.meta.env.VITE_BASE_URL)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          setFilter(data);
        })
        .catch((err) => console.log(err));
    };

    getProducts();
  }, []);

  const filterProduct = (category) => {
    const updatedList = products.filter(
      (product) => product.category.includes(category)
    );
    setFilter(updatedList);
  };

  return (
    <Fragment>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <p className="display-6 fw-bolder text-center">Latest Products</p>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className={`d-flex mb-5 ${styles.buttons}`}>
            <div
              className="btn btn-outline-dark me-2"
              onClick={() => setFilter(products)}
            >
              All
            </div>
            <div
              className="btn btn-outline-dark me-2"
              onClick={() => filterProduct("men's clothing")}
            >
              Men's Clothing
            </div>
            <div
              className="btn btn-outline-dark me-2"
              onClick={() => filterProduct("women's clothing")}
            >
              Women's Clothing
            </div>
            <div
              className="btn btn-outline-dark me-2"
              onClick={() => filterProduct("jewelery")}
            >
              Jewelry
            </div>
            <div
              className="btn btn-outline-dark me-2"
              onClick={() => filterProduct("electronics")}
            >
              Electronics
            </div>
          </div>
          {filter
            ? filter.map((product, index) => {
                return (
                  <div className="col-6 col-md-4 col-xl-3 mb-4" key={index}>
                    <div className={`card h-100 ${styles.card}`}>
                      <Link to={`${product.id}`}>
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
        </div>
      </div>
    </Fragment>
  );
};

export default Products;
