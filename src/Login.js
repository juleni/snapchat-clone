import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/appSlice";
import { auth, provider } from "./firebase";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src="snapchat.png" alt="" />
        <Button variant="outlined" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Login;
