import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
const Register = () => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [usernameLength, setusernameLength] = React.useState(false);
  const [usernameEmpty, setUsernameEmpty] = React.useState(false);
  const [usernameTaken, setUsernameTaken] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailEmpty, setEmailEmpty] = React.useState(false);
  const [emailTaken, setEmailTaken] = React.useState(false);
  const [passwordMismatch, setPasswordMismatch] = React.useState(false);
  const [passwordEmpty, setPasswordEmpty] = React.useState(false);
  const [passwordTooShort, setPasswordTooShort] = React.useState(false);

  React.useEffect(() => {
    setEmailError(false);
    setEmailEmpty(false);
    setEmailTaken(false);
  }, [email]);

  React.useEffect(() => {
    setUsernameEmpty(false);
    setusernameLength(false);
    setUsernameTaken(false);
  }, [name]);

  React.useEffect(() => {
    setPasswordMismatch(false);
  }, [passwordConfirm, password]);

  React.useEffect(() => {
    setPasswordEmpty(false);
  }, [password]);

  React.useEffect(() => {
    setPasswordTooShort(false);
  }, [password]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (email.length === 0) {
      setEmailEmpty(true);
      return;
    } else if (name.length === 0) {
      setUsernameEmpty(true);
      return;
    } else if (name.length < 3 || name.length > 15) {
      setusernameLength(true);
      return;
    } else if (password.length === 0) {
      setPasswordEmpty(true);
      return;
    } else if (password !== passwordConfirm) {
      setPasswordMismatch(true);
      return;
    } else if (password.length < 6) {
      setPasswordTooShort(true);
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const inputError = {
    border: "2px solid  red",
  };

  return (
    <>
      <div
        className="container"
        style={{
          marginTop: "10%",
          maxWidth: "900px",
        }}
      >
        <div
          className={`card text-bg-light`}
          style={{ boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.5)" }}
        >
          <div className="card-header">Registration Form</div>
          <div className="card-body">
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="email-address" className="form-label">
                  Email address
                </label>
                <input
                  className="form-control"
                  type="email"
                  label="Email address"
                  value={email}
                  placeholder="Email address"
                  onChange={(event) => setEmail(event.target.value)}
                  style={
                    emailError || emailEmpty || emailTaken ? inputError : null
                  }
                />
                {emailEmpty ? (
                  <div className="error-message">
                    <small style={{ color: "red" }}>
                      Email cannot be empty!
                    </small>
                  </div>
                ) : emailError ? (
                  <div className="error-message">
                    <small style={{ color: "red" }}>Email invalid!</small>
                  </div>
                ) : emailTaken ? (
                  <div className="error-message">
                    <small style={{ color: "red" }}>
                      An account with that email address is already registered!
                    </small>
                  </div>
                ) : null}
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Username
                </label>
                <input
                  className="form-control"
                  type="text"
                  label="Username"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required={true}
                  placeholder="Username"
                  style={
                    usernameEmpty || usernameLength || usernameTaken
                      ? inputError
                      : null
                  }
                />
                {usernameEmpty ? (
                  <div className="error-message">
                    <small style={{ color: "red" }}>
                      Username cannot be empty!
                    </small>
                  </div>
                ) : usernameLength ? (
                  <div className="error-message">
                    <small style={{ color: "red" }}>
                      Username must be between 3 and 15 characters!
                    </small>
                  </div>
                ) : usernameTaken ? (
                  <div className="error-message">
                    <small style={{ color: "red" }}>
                      Username is Already taken!
                    </small>
                  </div>
                ) : null}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  label="Create password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required={true}
                  placeholder="Password"
                  style={passwordEmpty || passwordTooShort ? inputError : null}
                />
                {passwordEmpty ? (
                  <div className="error-message">
                    <small style={{ color: "red" }}>
                      Password Cannot be empty!
                    </small>
                  </div>
                ) : passwordTooShort ? (
                  <div className="error-message">
                    <small style={{ color: "red" }}>
                      Password cannot be less than 6 characters!
                    </small>
                  </div>
                ) : null}
              </div>

              <div className="mb-3">
                <label htmlFor="passwordconfirm" className="form-label">
                  Confirm Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  label="Confirm password"
                  value={passwordConfirm}
                  onChange={(event) => setPasswordConfirm(event.target.value)}
                  required={true}
                  placeholder="Confirm Password"
                  style={passwordMismatch ? inputError : null}
                />
                {passwordMismatch && (
                  <div className="error-message">
                    <small style={{ color: "red" }}>
                      Passwords do not match!
                    </small>
                  </div>
                )}
              </div>

              <button
                className="btn"
                style={{backgroundColor:"#000000" , color:"#ffffff"}}

                type="submit"
                disabled={isLoading}
              >
                Register
              </button>
            </form>
          </div>
          <div className="card-footer text-body-secondary">
            <p className="text-sm text-center" style={{ marginBottom: "0" }}>
              Already have an account?{" "}
              <Link
                to={redirect ? `/Login?redirect=${redirect}` : "/Login"}
                style={{ color: null }}
              >
                Sign in
              </Link>
            </p>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
