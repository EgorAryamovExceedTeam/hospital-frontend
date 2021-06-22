import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Registration = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [loginErr, setLoginErr] = useState(false);
  const [passErr, setPasswordErr] = useState(false);
  const [repErr, setRepErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fieldsEmpty = login && password && repPassword;
    const hasErrors = !(loginErr || passErr || repErr);
    if (fieldsEmpty && hasErrors) {
      try {
        await axios
          .post("http://localhost:9000/auth/registration", {
            login: formData.get("login"),
            password: formData.get("password"),
          })
          .then((result) => {
            localStorage.setItem("token", JSON.stringify(result.data.token));
            console.log("success");
            setLogin("");
            setPassword("");
            setRepPassword("");
          });
      } catch (e) {
        let answer = window.confirm(e.response.data.message);
        if (answer) {
          // redirect to login page
        } else {
          setLogin("");
          setPassword("");
          setRepPassword("");
        }
      }
    } else {
      alert("Some fields has no correct value!");
    }
  };

  const changeLogin = (string) => {
    setLogin(string);
    const flag =
      string.length && !string.match(/^(?=.*[a-z])[A-Za-z\d@$!%*?&]{6,}$/);
    setLoginErr(flag);
  };

  const changePassword = (string) => {
    setPassword(string);
    const flag =
      string.length && !string.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);
    setPasswordErr(flag);
  };

  const changeRepeatPass = (string) => {
    setRepPassword(string);
    setRepErr(string.length && string !== password);
  };

  return (
    <div className="container">
      <div className="registration">
        <h2 className="registration-header">Регистация</h2>

        <form className="registration-form" onSubmit={handleSubmit}>
          <label>Login:</label>
          <TextField
            name="login"
            className="login"
            variant="outlined"
            placeholder="Login"
            value={login}
            onChange={(e) => changeLogin(e.target.value)}
            error={loginErr}
            helperText={loginErr ? "login length must be over 5 simbols" : ""}
          />
          <label>Password:</label>
          <TextField
            className="password"
            name="password"
            variant="outlined"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => changePassword(e.target.value)}
            error={passErr}
            helperText={
              passErr
                ? "password must contain at 6 or more simbols and least one digit"
                : ""
            }
          />
          <label>Repeat password</label>
          <TextField
            className="password"
            name="repeatPassword"
            variant="outlined"
            type="password"
            placeholder="Repeat password"
            value={repPassword}
            onChange={(e) => changeRepeatPass(e.target.value)}
            error={repErr}
            helperText={repErr ? "Password mismatch" : ""}
          />
          <Button className="send-form-registration" type="submit">
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
