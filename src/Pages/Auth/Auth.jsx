import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Auth.module.scss";

const cn = classNames.bind(styles);

const Input = ({ id, type, label, disabled }) => (
  <input
    className={cn("form-group__input")}
    type={type}
    id={id}
    placeholder={label}
    disabled={disabled}
  />
);

const LoginForm = ({ mode, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className={cn("form-block__input-wrapper")}>
        <div className={cn("form-group", "form-group--login")}>
          <Input
            type="text"
            id="username"
            label="user name"
            disabled={mode === "signup"}
          />
          <Input
            type="password"
            id="password"
            label="password"
            disabled={mode === "signup"}
          />
        </div>
        <div className={cn("form-group", "form-group--signup")}>
          <Input
            type="text"
            id="fullname"
            label="full name"
            disabled={mode === "login"}
          />
          <Input
            type="email"
            id="email"
            label="email"
            disabled={mode === "login"}
          />
          <Input
            type="password"
            id="createpassword"
            label="password"
            disabled={mode === "login"}
          />
          <Input
            type="password"
            id="repeatpassword"
            label="repeat password"
            disabled={mode === "login"}
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

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
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
            onSubmit={() => {
              console.log("submit");
            }}
          />
        </section>
      </div>
    </div>
  );
}

export default Login;
