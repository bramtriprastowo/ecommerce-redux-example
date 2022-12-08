import React, { Fragment } from "react";

const Contact = () => {
  return (
    <Fragment>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-8">
            <p className="display-6 fw-bold mb-5 text-center">Contact Us</p>
            <form>
              <div className="mb-3 mt-4">
                <label for="email" className="form-label lead fs-6">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control lead"
                  id="email"
                  aria-describedby="email"
                />
              </div>
              <div className="mb-3">
                <label for="name" className="form-label lead fs-6">
                  Name
                </label>
                <input type="text" className="form-control lead" id="name" />
              </div>
              <div className="mb-3">
                <label for="message" className="form-label lead fs-6">
                  Message
                </label>
                <textarea className="form-control lead" id="message" rows="3" />
              </div>
              <button type="button" className="btn btn-dark w-100">
                <span className="lead fs-6">Submit</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Contact;
