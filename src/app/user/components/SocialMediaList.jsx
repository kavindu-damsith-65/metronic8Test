import React from "react";
import { Link } from "react-router-dom";

const SocialMediaList = () => {
  return (
    <>
      <div className="top_1r text-end text-nowrap">
        <ul className="social-network social-circle mb-0">
          <li>
            <button
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              className="icoRss mx-1"
              title="Rss"
            >
              <i className="fa fa-instagram"></i>
            </button>
          </li>
          <li>
            <button
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              className="icoRss mx-1"
              title="Rss"
            >
              <i className="fa fa-instagram"></i>
            </button>
          </li>
          <li>
            <button
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              className="icoFacebook mx-1"
              title="Facebook"
            >
              <i className="fa fa-facebook"></i>
            </button>
          </li>
          <li>
            <button
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              className="icoTwitter mx-1"
              title="Twitter"
            >
              <i className="fa fa-twitter"></i>
            </button>
          </li>
          <li>
            <button
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              className="icoGoogle mx-1"
              title="Google +"
            >
              <i className="fa fa-youtube"></i>
            </button>
          </li>
          <li>
            <button
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              className="icoLinkedin mx-1"
              title="Linkedin"
            >
              <i className="fa fa-linkedin"></i>
            </button>
          </li>
        </ul>
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5 text-black"
                id="staticBackdropLabel"
              >
                Stay Connected!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-black">
              We’re excited to have you here. Our social media pages are coming
              soon! In the meantime, stay engaged with us for the latest
              updates, news, and exclusive content. Keep an eye out for our
              social media launch, and be the first to connect with us.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialMediaList;
