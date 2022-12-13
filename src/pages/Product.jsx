import React, { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link } from "react-router-dom";
import styles from "./Product.module.css";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase-config";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [comments, setComments] = useState([]);
  const [showNewComment, setShowNewComment] = useState(false);
  const [newComment, setNewComment] = useState({
    id_product: Number(id),
    name: "",
    comment: "",
  });
  const commentsCollectionRef = useRef(collection(db, "comments")).current;
  const dispatch = useDispatch();
  let activeClass = (showNewComment ? "d-block" : "d-none");

  const handleChange = (e) => {
    setNewComment((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(e.target.name);
  };

  const addComment = async () => {
    if (newComment.name.length > 0 && newComment.comment.length > 0) {
      await addDoc(commentsCollectionRef, newComment);
      window.location.reload();
    } else {
      alert("Name and comment field are required!");
    }
  };

  const deleteComment = async (_id) => {
    let deleteConfirm = window.confirm("Delete this comment?");
    if (deleteConfirm) {
      const commentDoc = doc(db, "comments", _id);
      await deleteDoc(commentDoc);
      window.location.reload();
    }
  };

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

  useEffect(() => {
    const getComments = async () => {
      let commentsByIdProduct = [];
      const q = query(
        commentsCollectionRef,
        where("id_product", "==", Number(id))
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        commentsByIdProduct.push({ ...doc.data(), id: doc.id });
      });
      setComments(commentsByIdProduct);
    };
    getComments();
  }, [commentsCollectionRef, id]);

  return (
    <Fragment>
      <div className="container my-5">
        {product ? (
          <div className="row">
            <div className="col-md-6 d-flex">
              <img
                src={product.image}
                alt={product.title}
                className={`${styles.image} mb-4`}
              />
            </div>
            <div className="col-md-6">
              <h4 className="text-uppercase text-black-50 fs-5">
                {product.category}
              </h4>
              <h1 className={`display-5 ${styles.productTitle}`}>
                {product.title}
              </h1>
              <p className="lead fw-bolder">
                <i className="fa fa-star"></i>{" "}
                {product.rating && product.rating.rate}
              </p>
              <h3 className={`display-6 fw-bold my-4 ${styles.productPrice}`}>
                Rp{" "}
                {product.price
                  ? (product.price * 12000).toLocaleString("id-ID")
                  : "-"}
              </h3>
              <p className="lead">{product.description}</p>
              <button
                className="btn btn-outline-dark"
                onClick={() => dispatch(addCart(product))}
              >
                Add to Cart
              </button>
              <Link to="../../cart" className="btn btn-dark ms-2 px-3">
                Go to Cart
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 mb-4">
            <p className="fw-bold">{comments.length} comments</p>
            <div className="mb-3">
              <input
                type="text"
                className={`form-control w-100 border-0 border-bottom ${activeClass}`}
                name="name"
                placeholder="Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control w-100 border-0 border-bottom"
                name="comment"
                placeholder="Add a comment ..."
                aria-describedby="comment"
                onChange={handleChange}
                onClick={() => setShowNewComment(true)}
                required
              />
            </div>
            <div className={`mb-5 ${activeClass}`}>
              <button
                type="submit"
                className={`btn btn-primary ${styles.btnComment}`}
                onClick={addComment}
              >
                Submit
              </button>
              <button type="submit" className={`btn ms-3 ${styles.btnComment}`} onClick={() => setShowNewComment(false)}>
                Cancel
              </button>
            </div>
          </div>
          {comments.length > 0 ? (
            comments.map((comment, index) => {
              return (
                <div className="col-12 col-sm-10 border-bottom mt-2" key={index}>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 fw-bold">{comment.name}</p>
                    <i className="me-auto" style={{ fontSize: "14px" }}>
                      {" "}
                      &nbsp; commented
                    </i>
                    <i
                      className="fa fa-times"
                      role="button"
                      onClick={() => deleteComment(comment.id)}
                    ></i>
                  </div>
                  <p>{comment.comment}</p>
                </div>
              );
            })
          ) : (
            <div className="col-12 col-sm-8 border-bottom">
              <p>Belum ada komentar</p>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Product;
