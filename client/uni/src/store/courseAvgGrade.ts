import { configureStore, createSlice } from "@reduxjs/toolkit";
import { avgGradesInterface, cpInterface } from "../types/CourseParticicpants";
import { StudentsInterface } from "../types/Students";
const courseAvgGradeInitialState = { value: { avgGrade: [] as avgGradesInterface[] } }
export const courseAvgGradeSlice = createSlice({
    name: "courseAvgGrade",
    initialState: courseAvgGradeInitialState,
    reducers: {
        setCourseAvgGrade: (state, action) => {
            // console.log(state.value.Subjects[0])
            // console.log(action.payload)
            state.value.avgGrade = action.payload

        },
        // changegrade: (state, action) => {
            
        //     let index: number = state.value.avgGrade.findIndex(cp => cp.StudentId == action.payload.StudentId)
        //     // console.log(index)
        //     // console.log(state.value.courses)
        //     state.value.courseParticipants[index] = { ...state.value.avgGrade[index], Grade: action.payload.Grade }
        //     // console.log(state.value.courses[0])
        //     // console.log(action.payload)
        // },
        // addGrade: (state, action) => {
        //     state.value.courseParticipants.push(action.payload)
        //     // console.log(action.payload)
        // },
        // addCp: (state, action) => {
        //     state.value.courseParticipants.push(action.payload)
        //     console.log(state.value.courseParticipants[1])
        // }
       

    }
})

export const { setCourseAvgGrade } = courseAvgGradeSlice.actions

