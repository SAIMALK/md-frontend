import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorImage from "../assets/error.jpg";
const ErrorPage = () => {
  const navigate = useNavigate();
  const homeRoute = () => {
    navigate("/");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "50vh", marginTop: "12%" }}
    >
      <div className="text-center">
        <img
          src={ErrorImage}
          alt="Error_Picture"
          width={220}
          height={220}
          style={{ marginRight: "5%" }}
        />
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger">Oops!</span> Page not found.
        </p>
        <p className="lead">The page you’re looking for doesn’t exist.</p>
        <button
          className="btn btn-light"
          style={{ width: "40%", borderRadius: "25px" }}
          type="button"
          onClick={homeRoute}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
