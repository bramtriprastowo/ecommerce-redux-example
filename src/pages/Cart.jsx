import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, removeCart, deleteCart } from "../redux/action";
import styles from "./Cart.module.css";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const itemsCount = state.reduce((total, item) => total + item.qty, 0);
  const totalPrice = state.reduce(
    (total, item) => total + item.price * 12000 * item.qty,
    0
  );
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className="container my-4">
        <div className="row justify-content-center gx-5">
          <div className="col-12 col-lg-8">
            <div className="row gy-5 mt-2">
              {state.length !== 0 ? (
                state.map((cartItem, index) => {
                  return (
                    <Fragment key={index}>
                      <div className="col-1 col-sm-1 col-xl-2 text-center">
                        <p className={styles.cartNum}>{index + 1}</p>
                      </div>
                      <div className={`col-5 col-sm-5 text-end`}>
                        <div className={`${styles.boxImage}`}>
                          <img
                            src={cartItem.image}
                            alt={cartItem.title}
                            className={`${styles.cartImage}`}
                          />
                        </div>
                      </div>
                      <div className="col-6 col-sm-6 col-xl-5">
                        <h3 className={styles.cartTitle}>{cartItem.title}</h3>
                        <p className={styles.cartPrice}>
                          {cartItem.qty} X Rp{" "}
                          {cartItem.price
                            ? (cartItem.price * 12000).toLocaleString("id-ID")
                            : "-"}{" "}
                          = Rp{" "}
                          {cartItem.price
                            ? (
                                cartItem.qty *
                                cartItem.price *
                                12000
                              ).toLocaleString("id-ID")
                            : "-"}
                        </p>
                        <div className="d-flex">
                          <button
                            className={`btn btn-outline-dark ${styles.cartBtnFs}`}
                            onClick={() => dispatch(removeCart(cartItem))}
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                          <button
                            className={`btn btn-outline-dark ${styles.cartBtnFs} ${styles.cartBtnPlus}`}
                            onClick={() => dispatch(addCart(cartItem))}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                          <button className={`${styles.cartBtnTrash}`}>
                            <i
                              className="fa fa-trash"
                              onClick={() => dispatch(deleteCart(cartItem))}
                            ></i>
                          </button>
                        </div>
                      </div>
                    </Fragment>
                  );
                })
              ) : (
                <div className="px-4">
                  <div className="container py-4">
                    <div className="row justify-content-center">
                      <div className="col">
                        <h3>Your cart is empty.</h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 col-md-10 col-lg-4 col-xl-3">
            <div className="card sticky-top mt-5" style={{ top: "100px" }}>
              <div className="card-body">
                <h5 className="card-title mb-3">Your Cart</h5>
                <h6 className={`card-subtitle text-muted ${styles.cartItems}`}>
                  {itemsCount} item(s)
                </h6>
                <p className="fs-5 mt-5 mb-0">Total</p>
                <p className={`fw-bold fs-3 ${styles.cartItems}`}>
                  Rp {totalPrice.toLocaleString("id-ID")}
                </p>
                <button className="btn btn-outline-dark w-100">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
