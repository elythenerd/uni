import { configureStore, createSlice } from "@reduxjs/toolkit";
// import { Subject } from "../types/Subject";
import {User} from '../types/User'
const usersInitialState = {value : {users : [] as User[]} }
export const usersSlice = createSlice({
    name : "users",
    initialState: usersInitialState,
    reducers: {
        setUsers : (state,action)=>{
            // console.log(state.value.Subjects[0])
            // console.log(action.payload)
            state.value.users = action.payload
        },
        
    }
    
})

export const {setUsers} = usersSlice.actions

