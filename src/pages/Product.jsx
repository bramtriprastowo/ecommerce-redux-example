import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action"
import { Link } from "react-router-dom"

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      fetch(import.meta.env.VITE_BASE_URL + id)
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
        })
        .catch((error) => console.log(error));
    };
    getProduct();
  }, [id]);

  return (
    <Fragment>
      <div className="container mt-5">
      {product ? 
        <div className="row">
          <div className="col-md-6">
            <img src={product.image} alt={product.title} width="400px" height="auto"/>
          </div>
          <div className="col-md-6">
            <h4 className="text-uppercase text-black-50 fs-5">{product.category}</h4>
            <h1 className="display-5">{product.title}</h1>
            <p className="lead fw-bolder">
            <i className="fa fa-star"></i> {" "} {product.rating && product.rating.rate}
            </p>
            <h3 className="display-6 fw-bold my-4">Rp {product.price ? (product.price * 12000).toLocaleString('id-ID') : "-"}</h3>
            <p className="lead">{product.description}</p>
            <button className="btn btn-outline-dark" onClick={() => dispatch(addCart(product))}>
              Add to Cart  
            </button>
            <Link to="../../cart" className="btn btn-dark ms-2 px-3">
              Go to Cart  
            </Link>
          </div>
        </div>
        : ""}
      </div>
    </Fragment>
  );
};

export default Product;
