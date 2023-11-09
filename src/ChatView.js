import React, { useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ChatView.css";
import { selectSelectedImage } from "./features/appSlice";

function ChatView() {
  const selectedImage = useSelector(selectSelectedImage);
  const navigate = useNavigate();
  //console.log("-- ChatView --", selectedImage);

  useEffect(() => {
    //console.log("selectedImage=", selectedImage);
    if (!selectedImage) exit();

    // navigate("/chats", { replace: true });
  }, [selectedImage]);

  const exit = () => {
    navigate("/chats", { replace: true });
  };

  return (
    <div className="chatView">
      <img src={selectedImage} onClick={exit} alt="" />
      <div className="chatView__timer">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={["#004777", "#F7B801", "#A30000"]}
          colorsTime={[3, 3, 3]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) exit();
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default ChatView;
