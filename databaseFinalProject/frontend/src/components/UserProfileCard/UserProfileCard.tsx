import React from 'react'
import { useState } from 'react';
import './UserProfileCard.scss'

import { FaPenAlt } from "react-icons/fa";

const getData = async () => {
  let response = await fetch("/api/get_username/");
  let Data = await response.json();
  return Data;
};
let Data = await getData();
if(Data["username"] == " "){
  window.location.replace("/login/");
}

const UserProfileCard = () => {
  const [userNames, setUserNames] = useState(Data["username"])


  return (
    <div className='userProfileCard'>
      <div className="userProfileCard__gradient"></div>
      <div className="userProfileCard__profile-down">
        <img src={"http://localhost:5173/static/src/assets/images/profileIcon.png"} alt="" />
        <div className="userProfileCard__title">{userNames}</div>
        <form action="../api/deleteAccount/" role="form" method="post">
          <button style={{color: "red", border: "none", background: "none"}}>Delete Account</button>
        </form>
      </div>
    </div>
  )
}

export default UserProfileCard
