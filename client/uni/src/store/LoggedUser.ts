import { configureStore, createSlice } from "@reduxjs/toolkit";
// import { Subject } from "../types/Subject";
import {User} from '../types/User'
const userInitialState = {value : {user : {}  as  User} }
export const userSlice = createSlice({
    name : "user",
    initialState: userInitialState,
    reducers: {
        setUser : (state,action)=>{
            // console.log(state.value.Subjects[0])
            console.log(action.payload,'11111111111')
            state.value.user  = action.payload
        },
        
    }
    
})

export const {setUser} = userSlice.actions

