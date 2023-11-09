import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chats from "./Chats";
import ChatView from "./ChatView";
import { selectUser } from "./features/appSlice";
import Login from "./Login";
import Preview from "./Preview";
import WebcamCapture from "./WebcamCapture";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
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
