import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import CropIcon from "@mui/icons-material/Crop";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import NoteIcon from "@mui/icons-material/Note";
import SendIcon from "@mui/icons-material/Send";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import TimerIcon from "@mui/icons-material/Timer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCameraImage, selectCameraImage } from "./features/cameraSlice";
import "./Preview.css";

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cameraImage) navigate("/", { replace: true });
  }, [cameraImage, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = () => {};

  return (
    <div className="preview">
      <CloseIcon onClick={closePreview} className="preview__close" />
      <div className="preview__toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="" />
      <div onClick={sendPost} className="preview__footer">
        <h2>Send Now</h2>
        <SendIcon fontSize="small" className="preview__sendIcon" />
      </div>
    </div>
  );
}

export default Preview;
