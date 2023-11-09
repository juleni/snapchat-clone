import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const signIn = () => {};

  return (
    <div className="login">
      <div className="login__container">
        <img src="snapchat.png" alt="" />
        <Button variant="outline" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Login;
