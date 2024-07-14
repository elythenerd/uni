import { configureStore, createSlice } from "@reduxjs/toolkit";
// import { Subject } from "../types/Subject";
import { StudentsInterface } from "../types/Students";
const studentsInitialState = {value : {students : [] as StudentsInterface[]} }
export const studentsSlice = createSlice({
    name : "students",
    initialState: studentsInitialState,
    reducers: {
        setStudents : (state,action)=>{
            // console.log(state.value.Subjects[0])
            // console.log(action.payload)
            state.value.students.push(action.payload)
            
        }
    }
    
})

export const {setStudents} = studentsSlice.actions

