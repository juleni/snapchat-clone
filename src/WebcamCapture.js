import React, { useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

function WebcamCapture() {
  const webcamRef = useRef(null);

  return (
    <div className="webcamCapture">
      <Webcam
        ref={webcamRef}
        audio={false}
        height={videoConstraints.height}
        width={videoConstraints.width}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
    </div>
  );
}

export default WebcamCapture;
