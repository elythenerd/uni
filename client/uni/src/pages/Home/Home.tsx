import React from "react";
import { UserCard } from "../../components/UserCard/UserCard";
import UserCardGrid from "../../components/UserCardGrid/UserCardGrid";
import Navbar from "../../components/Navbar/Navbar";
import './Home.css'
import { useSelector } from "react-redux";
import { usersState } from "../../types/User";

export const Home = () => {
    const Users = useSelector((state: usersState) => state.users.value.users)

    return <div className="home-container">
        <Navbar></Navbar>
        <UserCardGrid Users={Users} set={false} />
    </div>
}
