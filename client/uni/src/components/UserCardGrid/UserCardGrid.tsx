import React, { useContext } from "react";
import UserContext from "../../context/usersContext";
import { UserCard } from "../UserCard/UserCard";
import './UserCardGrid.css'
const UserCardGrid = () => {
    const { Users } = useContext(UserContext) || { Users: [] }
    return (
    <div className="cardGrid">
        {Users.map((user) => {
            return <UserCard key={user.Id} user={user} />
        })}
    </div>


    )
}
export default UserCardGrid