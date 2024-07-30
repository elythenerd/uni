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
        removeUser: (state, action) => {
            // console.log(action.payload)
            let index: number = state.value.users.findIndex(users => users.Id == action.payload)
            // console.log(index)
            // console.log(state.value.courses)
            state.value.users[index] = { ...state.value.users[index], Active: false }
            // console.log(state.value.courses[0])

        },
        addUser: (state,action) =>{
            state.value.users.push(action.payload)

        }
    }
    
})

export const {setUsers,removeUser,addUser} = usersSlice.actions

