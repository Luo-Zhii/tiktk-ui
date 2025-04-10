import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Auth.module.scss";
import * as authService from "../../services/authService";

const cn = classNames.bind(styles);

const Input = ({ id, type, label, disabled, value, onChange }) => (
  <input
    className={cn("form-group__input")}
    type={type}
    id={id}
    placeholder={label}
    disabled={disabled}
    value={value}
    onChange={onChange}
  />
);

const LoginForm = ({ mode, formData, handleChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className={cn("form-block__input-wrapper")}>
        <div className={cn("form-group", "form-group--login")}>
          <Input
            type="username"
            id="username"
            label="Enter username"
            disabled={mode === "signup"}
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            type="password"
            id="password"
            label="Enter password"
            disabled={mode === "signup"}
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className={cn("form-group", "form-group--signup")}>
          <Input
            type="text"
            id="name"
            label="Enter name"
            disabled={mode === "login"}
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            type="username"
            id="username"
            label="Enter username"
            disabled={mode === "login"}
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            type="password"
            id="password"
            label="Enter password"
            disabled={mode === "login"}
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            type="text"
            id="age"
            label="Enter age"
            disabled={mode === "login"}
            value={formData.age}
            onChange={handleChange}
          />
          <Input
            type="text"
            id="address"
            label="Enter address"
            disabled={mode === "login"}
            value={formData.address}
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        className={cn("button", "button--primary", "full-width")}
        type="submit"
      >
        {mode === "login" ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
};

function Login() {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    age: "",
    address: "",
  });

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setFormData({
      name: "",
      username: "",
      password: "",
      age: "",
      address: "",
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        const res = await authService.login(formData.username, formData.password);
        console.log("Login successful", res);
      } else {
        console.log("Signup info:", formData);
      }
    } catch (err) {
      console.error("Auth failed:", err);
    }
  };

  return (
    <div className={cn("wrapper")}>
      <div
        className={cn("form-block-wrapper", `form-block-wrapper--is-${mode}`)}
      >
        <section className={cn("form-block", `form-block--is-${mode}`)}>
          <header className={cn("form-block__header")}>
            <h1>{mode === "login" ? "Welcome back!" : "Sign up"}</h1>
            <div className={cn("form-block__toggle-block")}>
              <span className={cn("form-text")}>
                {mode === "login" ? "Don't" : "Already"} have an account? Click
                here →
              </span>
              <input id="form-toggler" type="checkbox" onClick={toggleMode} />
              <label htmlFor="form-toggler"></label>
            </div>
          </header>
          <LoginForm
            mode={mode}
            formData={formData}
            handleChange={handleChange}
            onSubmit={handleSubmit}
          />
        </section>
      </div>
    </div>
  );
}

export default Login;
