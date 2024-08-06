import { configureStore, createSlice } from "@reduxjs/toolkit";
// import { Subject } from "../types/Subject";
import { StudentsInterface } from "../types/Students";
const studentOptionsInitialState = {value : {studentOptions : [] as StudentsInterface[]} }
export const studentOptionsSlice = createSlice({
    name : "studentOptions",
    initialState: studentOptionsInitialState,
    reducers: {
        setStudentOptions : (state,action)=>{
            // console.log(state.value.Subjects[0])
            // console.log(action.payload,22222)
            state.value.studentOptions = action.payload
            
        },
        addStudentOption: (state,action) =>{
            state.value.studentOptions.push(action.payload)

        },
        deleteStudentOption: (state, action) => {
            // console.log(action.payload)
            // let index: number = state.value.studentOptions.findIndex(student => student.Id == action.payload)
            // console.log(index)
            // console.log(state.value.courses)
            state.value.studentOptions = state.value.studentOptions.filter((student)=>student.Id!==action.payload)
            // console.log(state.value.courses[0])

    }}
    
})

export const {setStudentOptions,addStudentOption,deleteStudentOption} = studentOptionsSlice.actions

