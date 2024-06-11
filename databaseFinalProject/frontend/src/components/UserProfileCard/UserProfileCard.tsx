import React from 'react'
import { useState } from 'react';
import './UserProfileCard.scss'

import { FaPenAlt } from "react-icons/fa";


import profileIcon from '../../assets/images/profileIcon.png';


const UserProfileCard = () => {
  const [userNames, setUserNames] = useState('User01')


  return (
    <div className='userProfileCard'>
      <div className="userProfileCard__gradient"></div>
      <div className="userProfileCard__profile-down">
        <img src={profileIcon} alt="" />
        <div className="userProfileCard__title">{userNames}</div>
        <div className="userProfileCard__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure at illum quam aperiam architecto a in, quo, dignissimos animi, perspiciatis vero molestiae officia inventore. Amet ea deleniti nesciunt obcaecati sapiente!
        </div>
      </div>
      <div className="userProfileCard__button">
        <a><FaPenAlt></FaPenAlt></a>
      </div>



    </div>
  )
}

export default UserProfileCard
