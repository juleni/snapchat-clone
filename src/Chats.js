import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import "./Chats.css";
import { db } from "./firebase";

function Chats() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await getDocs(q);
        setPosts(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        console.log("posts=", posts);

        //querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        //setPosts()
        //});
      } catch (error) {
        console.log("Error getting Documents", error);
      }
    };

    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("timestamp", "desc"));
    getData();
  }, []);

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar className="chats__avatar" />
        <div className="chats__search">
          <SearchIcon />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubbleIcon className="chats__chatIcon" />
      </div>
      <div className="chats__posts">
        {posts.map(({ id, data: { imageUrl, read, timestamp, userName, profilePic } }) => (
          <Chat
            key={id}
            id={id}
            userName={userName}
            imageUrl={imageUrl}
            read={read}
            timestamp={timestamp}
            profilePic={profilePic}
          />
        ))}
      </div>
    </div>
  );
}

export default Chats;
