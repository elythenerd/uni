import { configureStore, createSlice } from "@reduxjs/toolkit";
// import { Subject } from "../types/Subject";
import { StudentsInterface } from "../types/Students";
import { PieGradesInterface } from "../types/CourseParticicpants";
const pieGradesInitialState = {value : {pieGrades : [] as PieGradesInterface[]} }
export const PieGradesSlice = createSlice({
    name : "PieGrades",
    initialState: pieGradesInitialState,
    reducers: {
        setPieGrades : (state,action)=>{
            // console.log(state.value.Subjects[0])
            // console.log(action.payload)
            state.value.pieGrades = action.payload
            
        },
        addPieGrades: (state,action) =>{
            state.value.pieGrades.push(action.payload)

        },
        deleteaddPieGrade: (state, action) => {
            // console.log(action.payload)
            // let index: number = state.value.pieGrades.findIndex(student => student.Id == action.payload)
            // console.log(index)
            // console.log(state.value.courses)
            state.value.pieGrades = state.value.pieGrades.filter((grade)=>grade._id!==action.payload)
            // console.log(state.value.courses[0])

    }}
    
})

export const {setPieGrades,addPieGrades,deleteaddPieGrade} = PieGradesSlice.actions

