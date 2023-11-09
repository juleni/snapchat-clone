import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chats from "./Chats";
import ChatView from "./ChatView";
import { login, logout, selectUser } from "./features/appSlice";
import { auth } from "./firebase";
import Login from "./Login";
import Preview from "./Preview";
import WebcamCapture from "./WebcamCapture";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        // User is signed out
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Routes>
            <Route path="/" element={<WebcamCapture />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/chats/view" element={<ChatView />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
