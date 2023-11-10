import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";
import "./Chats.css";
import { selectUser } from "./features/appSlice";
import { resetCameraImage } from "./features/cameraSlice";
import { auth, db } from "./firebase";

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    //console.log("--- Chats useEffect");

    const getData = async () => {
      try {
        //console.log("getdata --- q  = ", q);
        const querySnapshot = await getDocs(q);
        //console.log("querySnapshot=", querySnapshot);
        //console.log("querySnapshot.docs=", querySnapshot.docs);
        setPosts(
          querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
        //console.log("INSIDE posts=", posts);
      } catch (error) {
        console.log("Error getting Documents", error);
      }
    };

    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("timestamp", "desc"));
    getData();

    // console.log("posts=", posts);
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    navigate("/", { replace: true });
  };
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className="chats__avatar"
        />
        <div className="chats__search">
          <SearchIcon className="chats__searchIcon" />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubbleIcon className="chats__chatIcon" />
      </div>
      <div className="chats__posts">
        {posts?.map(
          ({
            id,
            data: { imageUrl, read, timestamp, userName, profilePic },
          }) => (
            <Chat
              key={id}
              id={id}
              userName={userName}
              imageUrl={imageUrl}
              read={read}
              timestamp={timestamp}
              profilePic={profilePic}
            />
          )
        )}
      </div>
      <RadioButtonUncheckedIcon
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
}

export default Chats;
