import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      (product) => product.category === category
    );
    setFilter(updatedList);
  };

  const ShowProduct = () => {
    return (
      <Fragment>
        <div className="buttons d-flex justify-content-center mb-5">
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
                        to={`${product.id}`}
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
      </Fragment>
    );
  };

  return (
    <div className="container my-5 py-5">
      <div className="row">
        <div className="col-12 mb-5">
          <p className="display-6 fw-bolder text-center">Latest Products</p>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        <ShowProduct />
      </div>
    </div>
  );
};

export default Products;
