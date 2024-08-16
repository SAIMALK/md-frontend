import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [emailEmpty, setEmailEmpty] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordEmpty, setPasswordEmpty] = React.useState(false);

  const inputError = {
    border: `2px solid red`,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  React.useEffect(() => {
    setEmailEmpty(false);
  }, [email]);

  React.useEffect(() => {
    setPasswordEmpty(false);
  }, [password]);

  const submitHandler = async (e) => {
    if (email.length === 0) {
      setEmailEmpty(true);
      return;
    } else if (password.length === 0) {
      setPasswordEmpty(true);
      return;
    } else {
      e.preventDefault();
      try {
        const res = await login({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
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
        <div className="card-header">Login Details</div>
        <div className="card-body">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="email-address" className="form-label">
                Email address
              </label>
              <input
                className="form-control"
                id="email-address"
                name="email"
                type="email"
                value={email}
                required
                placeholder="Email address"
                onChange={(event) => setEmail(event.target.value)}
                style={emailEmpty ? inputError : null}
              />
              {emailEmpty ? (
                <div className="error-message">
                  <small style={{ color: "red" }}>Email cannot be empty!</small>
                </div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                className="form-control"
                id="password"
                name="password"
                type="password"
                value={password}
                required
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                style={passwordEmpty ? inputError : null}
              />
              {passwordEmpty ? (
                <div className="error-message">
                  <small style={{ color: "red" }}>
                    Password cannot be empty!
                  </small>
                </div>
              ) : null}
            </div>

            <div>
              <button
                className="btn"
                style={{backgroundColor:"#000000" , color:"#ffffff"}}
                disabled={isLoading}
                type="submit"
              >
                Sign In
              </button>
              <br />
              <br />
            </div>
          </form>
        </div>
        <div className="card-footer text-body-secondary">
          <p className="text-sm text-center" style={{ marginBottom: "0" }}>
            No account yet?{" "}
            <Link
              to={redirect ? `/Register?redirect=${redirect}` : "/Register"}
            >
              Register!
            </Link>
          </p>
        
        </div>
      </div>
    </div>
  );
};

export default Login;
