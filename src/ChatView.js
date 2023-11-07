import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ChatView.css";
import { selectSelectedImage } from "./features/appSlice";

function ChatView() {
  const selectedImage = useSelector(selectSelectedImage);
  const navigate = useNavigate();
  console.log("-- ChatView --", selectedImage);

  useEffect(() => {
    console.log("selectedImage=", selectedImage);
    if (!selectedImage) exit();
    
    // navigate("/chats", { replace: true });
  }, [selectedImage]);

  const exit = () => {
    navigate("/chats", { replace: true });
  };

  return (
    <div className="chatView">
      <img src={selectedImage} onClick={exit} alt="" />
    </div>
  );
}

export default ChatView;
