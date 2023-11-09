import StopRoundedIcon from "@mui/icons-material/StopRounded";
import { Avatar } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactTimeago from "react-timeago";
import "./Chat.css";
import { selectImage } from "./features/appSlice";
import { db } from "./firebase";

function Chat({ id, userName, timestamp, read, imageUrl, profilePic }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log("--- Chat ---");

  const open = async () => {
    // console.log("---OPEN read=", read);
    // console.log("---imageUrl=", imageUrl);
    if (!read) {
      dispatch(selectImage(imageUrl));
      const docRef = doc(db, "posts", id);
      await updateDoc(docRef, { read: true });
      navigate("/chats/view", { replace: true });
    }
  };

  return (
    <div onClick={open} className="chat">
      <Avatar className="chat__avatar" src={profilePic} />
      <div className="chat__info">
        <h4>{userName}</h4>
        <p>
          {!read && "Tap to view - "}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>
      {!read && <StopRoundedIcon className="chat__readIcon" />}
    </div>
  );
}

export default Chat;
