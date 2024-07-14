import { configureStore, createSlice } from "@reduxjs/toolkit";
import { CourseInterface } from "../types/Course";
import { Subject } from "../types/Subject";
const coursesInitialState = {value : {courses : [] as CourseInterface[]} }
export const coursesSlice = createSlice({
    name : "courses",
    initialState: coursesInitialState,
    reducers: {
        setCourses : (state,action)=>{
            // console.log(state.value.Subjects[0])
            // console.log(action.payload)
            state.value.courses.push(action.payload)
            
        }
    }
    
})

export const {setCourses} = coursesSlice.actions

