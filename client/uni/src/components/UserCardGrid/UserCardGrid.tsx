import React, { useContext, useEffect } from "react";
import UserContext from "../../context/usersContext";
import { UserCard } from "../UserCard/UserCard";
import './UserCardGrid.css'
import { useDispatch, useSelector, UseSelector } from "react-redux";
import { User, usersState } from "../../types/User";
import axios from "axios";
import { setUsers } from "../../store/Users";
import { Grid } from "@mui/material";
const UserCardGrid = ({ set,Users }: { set: boolean,Users:User[] }) => {
   
    // const Users = useSelector((state: usersState) => state.users.value.users)

    return (
        <Grid container sx={{overflowY: 'auto',maxHeight:'80vh'}} >

            {Users.map((user) => {
                return (<Grid item
                    xs={3}
                  
                    key={user.Id}
                    sx={{
                        padding: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        
                    }}> <UserCard set={set} key={user.Id} user={user} /></Grid>)
            })}
        </Grid>



    )
}
export default UserCardGrid