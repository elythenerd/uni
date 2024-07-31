import { configureStore, createSlice } from "@reduxjs/toolkit";
import { cpInterface } from "../types/CourseParticicpants";
import { StudentsInterface } from "../types/Students";
const avgGradeInitialState = { value: { courseParticipants: [] as cpInterface[] } }
export const addGradeSlice = createSlice({
    name: "avgGrade",
    initialState: avgGradeInitialState,
    reducers: {
        setAvgGrade: (state, action) => {
            // console.log(state.value.Subjects[0])
            // console.log(action.payload)
            state.value.courseParticipants = action.payload

        },
        changegrade: (state, action) => {
            
            let index: number = state.value.courseParticipants.findIndex(cp => cp.StudentId == action.payload.StudentId)
            // console.log(index)
            // console.log(state.value.courses)
            state.value.courseParticipants[index] = { ...state.value.courseParticipants[index], Grade: action.payload.Grade }
            // console.log(state.value.courses[0])
            // console.log(action.payload)
        },
        addGrade: (state, action) => {
            state.value.courseParticipants.push(action.payload)
            // console.log(action.payload)
        },
        addCp: (state, action) => {
            state.value.courseParticipants.push(action.payload)
            console.log(state.value.courseParticipants[1])
        }
       

    }
})

export const { setAvgGrade, addGrade,changegrade,addCp } = addGradeSlice.actions

