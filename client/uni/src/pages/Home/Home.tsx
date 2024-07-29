import React, { useEffect, useState } from "react";
import { UserCard } from "../../components/UserCard/UserCard";
import UserCardGrid from "../../components/UserCardGrid/UserCardGrid";
import Navbar from "../../components/Navbar/Navbar";
import './Home.css'
import { useDispatch, useSelector } from "react-redux";
import { User, usersState } from "../../types/User";
import methods from "../../utils/methods";
import { setUsers } from "../../store/Users";

export const Home = () => {
    const [Users,setUsers] = useState<User[]>([])
    const dispatch = useDispatch()
    useEffect(()=>{
        fetchUsers()
    },[])
   
    const fetchUsers = async () => {
        try {
            const res = methods.get('http://localhost:8000/api/users/get')
            const users: User[] = (await res).data
            // console.log(users)
            setUsers(users)
            return users
        } catch (e) {
            console.log('users not fetched', e)
        }
    }
    // const Users = useSelector((state: usersState) => state.users.value.users)
    return <div className="home-container">
        <Navbar></Navbar>
        <UserCardGrid Users={Users.filter((user)=>user.Active!==false)} set={false} />
    </div>
}

