import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import "./Chats.css";
import { db } from "./firebase";

function Chats() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //console.log("--- Chats useEffect");
    /**
    const getData = async () => {
      try {
        //console.log("getdata --- q  = ", q);
        const querySnapshot = await getDocs(q);
        //console.log("querySnapshot=", querySnapshot);
        //console.log("querySnapshot.docs=", querySnapshot.docs);

        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          setPosts([
            {
              id: doc.id,
              data: doc.data(),
            },
          ]);
          console.log("INSIDE posts=", posts);
        });
        console.log("INSIDE posts1 =", posts);

        //querySnapshot.docs.map((doc) => ())

        //querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        //setPosts()
        //});
      } catch (error) {
        console.log("Error getting Documents", error);
      }
    };
 */
    const postsRef = collection(db, "posts");
    //console.log("postsRef=", postsRef);
    const q = query(postsRef, orderBy("timestamp", "desc"));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //console.log("doc=", doc);
        // console.log(doc.id, " => ", doc.data());
        setPosts([
          {
            id: doc.id,
            data: doc.data(),
          },
        ]);
      });
      //console.log("INSIDE posts=", posts);
    });

    //getData();
    //console.log("posts=", posts);
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
    </div>
  );
}

export default Chats;
