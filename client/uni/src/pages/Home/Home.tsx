import React from "react";
import { UserCard } from "../../components/UserCard/UserCard";
import UserCardGrid from "../../components/UserCardGrid/UserCardGrid";
import Navbar from "../../components/Navbar/Navbar";
import './Home.css'

export const Home = ()=>{
    return <div className="home-container">
    <Navbar></Navbar>
    <UserCardGrid/>
    </div>
}
