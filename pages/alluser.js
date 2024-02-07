import React, { useContext, useState, useEffect } from "react";

//INTERNAL IMPORTS
import { UserCard, userCard } from "../Components/index";
import Style from "../styles/alluser.module.css";
import { ChatAppContext } from "../Context/ChatAppContext";

const allUser = () => {
  const { userLists, addFriends } = useContext(ChatAppContext);
  return (
    <div>
      <div className={Style.allUser_info}>
        <h1>Find Your Friends</h1>
      </div>

      <div className={Style.alluser}>
        {userLists.map((el, i) => (
          <UserCard key={i + 1} el={el} i={i} addFriends={addFriends}/>
        ))}
      </div>
    </div>
  );
};

export default allUser;
