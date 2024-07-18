import React, { useContext, useEffect } from "react";
import UserContext from "../../context/usersContext";
import { UserCard } from "../UserCard/UserCard";
import './UserCardGrid.css'
import { useDispatch, useSelector, UseSelector } from "react-redux";
import { User, usersState } from "../../types/User";
import axios from "axios";
import { setUsers } from "../../store/Users";
const UserCardGrid = ({ set }: { set: boolean }) => {
    const dispatch  = useDispatch()
    useEffect(()=>{
        fetchUsers()
    },[])
    const fetchUsers = async ()=>{
        try{
        const res = axios.get('http://localhost:8000/api/users/get')
        const users : User[] = (await res).data
        // console.log(users)
        dispatch(setUsers(users))
        return users
        }catch(e){
            console.log('users not fetched',e)
        }
    }
    
    const Users = useSelector((state: usersState) => state.users.value.users)

    return (
        <div className="cardGrid">
            {Users.map((user) => {
                return <UserCard set={set} key={user.Id} user={user} />
            })}
        </div>


    )
}
export default UserCardGrid