import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Subject } from "../types/Subject";
const subjectInitialState = {value : {Subjects : [] as Subject[]} }
export const SubjectSlice = createSlice({
    name : "subject",
    initialState: subjectInitialState,
    reducers: {
        setSubjects : (state,action)=>{
            // console.log(state.value.Subjects[0])
            // console.log(action.payload)
            state.value.Subjects.push(action.payload)
            
        }
    }
    
})

export const {setSubjects} = SubjectSlice.actions

