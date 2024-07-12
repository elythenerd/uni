import React,{useContext} from "react";
import './UserCard.css'
import UserContext from "../../context/usersContext";
import { Avatar } from "@mui/material";
import { JobType, User } from "../../types/User";
export const UserCard = ({user}:{user:User}) => {
    // console.log(Users)
    function getInitials(name:string) {
        const initials = name.match(/\b\p{L}/gu) || [];
        return initials.join('');
    }
    
    return (
        <div className="userCardContainer">
            <div className="avatar-name-container">
                <Avatar alt="Remy Sharp" src={user.ProfilePicture}>{getInitials(user.Name)}</Avatar>
                <label className="cardName">{user.Name}</label>
                <label className="cardJob">{user.Job==JobType.Boss?JobType.BossLabel:JobType.TeacherLabel}</label>
            </div>
            <div className="card-line"></div>
            <div className="userCard-body">
                
                <label>{user.DareOfBirth}</label>
            </div>
        </div>
    )
}