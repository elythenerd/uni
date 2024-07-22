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
            state.value.students = action.payload
            
        },
        addStudent: (state,action) =>{
            state.value.students.push(action.payload)

        },
        deleteStudent: (state, action) => {
            // console.log(action.payload)
            let index: number = state.value.students.findIndex(student => student.Id == action.payload)
            // console.log(index)
            // console.log(state.value.courses)
            state.value.students[index] = { ...state.value.students[index], Status: false }
            // console.log(state.value.courses[0])

    }}
    
})

export const {setStudents,addStudent,deleteStudent} = studentsSlice.actions

