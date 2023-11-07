import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chats from "./Chats";
import ChatView from "./ChatView";
import Preview from "./Preview";
import WebcamCapture from "./WebcamCapture";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<WebcamCapture />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chats/view" element={<ChatView />} />
      </Routes>
    </div>
  );
}

export default App;
