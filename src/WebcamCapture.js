import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 400,
  height: 300,
  facingMode: "user",
};

function WebcamCapture() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setImage(imageSrc);
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
      <img src={image} alt="" />
    </div>
  );
}

export default WebcamCapture;
