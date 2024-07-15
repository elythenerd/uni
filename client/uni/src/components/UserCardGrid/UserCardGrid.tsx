import React, { useContext } from "react";
import UserContext from "../../context/usersContext";
import { UserCard } from "../UserCard/UserCard";
import './UserCardGrid.css'
import { useSelector, UseSelector } from "react-redux";
import { User, usersState } from "../../types/User";
const UserCardGrid = ({ set }: { set: boolean }) => {
    const Users = useSelector((state: usersState) => state.users.value.users)
    console.log(Users)
    return (
        <div className="cardGrid">
            {Users.map((user) => {
                return <UserCard set={set} key={user.Id} user={user} />
            })}
        </div>


    )
}
export default UserCardGrid