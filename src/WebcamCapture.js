import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import React, { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { setCameraImage } from "./features/cameraSlice";
import "./WebcamCapture.css";

const videoConstraints = {
  width: 400,
  height: 300,
  facingMode: "user",
};

function WebcamCapture() {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    navigate("/preview");
  }, [webcamRef]);

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
      <RadioButtonUncheckedIcon
        className="webcamCapture__button"
        onClick={capture}
        fontSize="large"
      />
    </div>
  );
}

export default WebcamCapture;
