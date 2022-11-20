import React, { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, dispayAlert, registerUser, user, setupUser } =
    useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, name, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      dispayAlert();
    }
    const currentUser = { email, password, name };
    if (isMember) {
      setupUser({
        currentUser,
        endpoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endpoint: "register",
        alertText: "User Created! Redirecting...",
      });
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, navigate]);
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}

        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block">
          submit
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            setupUser({
              currentUser: {
                email: "federico@gmail.com",
                password: "federico",
              },
              endpoint: "login",
              alertText: "Login Successful! Redirecting...",
            });
          }}
        >
          {isLoading ? "loading..." : "demo app"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}{" "}
          <button
            className="member-btn"
            onClick={toggleMember}
            disabled={isLoading}
            type="button"
          >
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
