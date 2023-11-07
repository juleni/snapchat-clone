import { uploadString } from "@firebase/storage";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import CropIcon from "@mui/icons-material/Crop";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import NoteIcon from "@mui/icons-material/Note";
import SendIcon from "@mui/icons-material/Send";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import TimerIcon from "@mui/icons-material/Timer";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { resetCameraImage, selectCameraImage } from "./features/cameraSlice";
import { db, storage } from "./firebase";

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

  const sendPost = async () => {
    const id = uuid();
    const imageRef = ref(storage, `posts/${id}`);
    //const uploadTask = uploadBytesResumable(imageRef, cameraImage);
    // console.log("cameraImage=", cameraImage);
    const uploadTask = await uploadString(
      imageRef,
      cameraImage,
      "data_url"
    ).then((snapshot) => {
      // console.log("uploadTask=", uploadTask);
      // console.log("posts/Id=", `posts/${id}`);
      // console.log("cameraImage=", cameraImage);
      console.log("snapshot=", snapshot);
      console.log("snapshot.ref=", snapshot.ref);
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        // console.log("File available at", downloadURL);
        setDoc(doc(db, "posts", "image"), {
          imageUrl: downloadURL,
          userName: "Juleni Dev",
          read: false,
          profilePic: "",
          timestamp: serverTimestamp(),
        });
      });
      navigate("/chats", { replace: true });
    });
    /*
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("snapshot=", snapshot);
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload progress is: " + progress);
      },
      (error) => {
        // ERROR
        console.log(error);
      },
      () => {
        // COMPLETE
        console.log("COMPLETE");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setDoc(doc(db, "posts", "image"), {
            imageUrl: downloadURL,
            userName: "Juleni Dev",
            read: false,
            profilePic: "",
            timestamp: serverTimestamp(),
          });
          navigate("/chats", { replace: true });
        });
      }
    );
    */
  };

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
