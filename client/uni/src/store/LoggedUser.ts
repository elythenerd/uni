import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Subject } from "../types/Subject";
import {User, userState, userValue} from '../types/User'
const userInitialState : userValue = {value : {user : undefined} }
export const userSlice = createSlice({
    name : "user",
    initialState: userInitialState,
    reducers: {
        setLoggedUser : (state,action)=>{
            // console.log(state.value.Subjects[0])
            console.log(action.payload,'11111111111')
            state.value.user  = action.payload
        },
        
    }
    
})

export const {setLoggedUser} = userSlice.actions

