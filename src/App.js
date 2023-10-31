import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chats from "./Chats";
import Preview from "./Preview";
import WebcamCapture from "./WebcamCapture";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/chats" element={<Chats />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/" element={<WebcamCapture />} />
      </Routes>
    </div>
  );
}

export default App;
