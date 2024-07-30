import { configureStore, createSlice } from "@reduxjs/toolkit";
import { cpInterface } from "../types/CourseParticicpants";
import { StudentsInterface } from "../types/Students";
const cpInitialState = { value: { courseParticipants: [] as StudentsInterface[] } }
export const courseParticipantsSlice = createSlice({
    name: "courseParticipants",
    initialState: cpInitialState,
    reducers: {
        setCp: (state, action) => {
            // console.log(state.value.Subjects[0])
            // console.log(action.payload)
            state.value.courseParticipants = action.payload

        },
        changegrade: (state, action) => {
            
            let index: number = state.value.courseParticipants.findIndex(cp => cp.Id == action.payload.StudentId)
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
        },
        removeCp: (state, action) => {
            // console.log(action.payload)
            // let index: number = state.value.courseParticipants.findIndex(student => student.Id == action.payload)
            // console.log(index)
            // console.log(state.value.courseParticipants.slice(index,1))
            state.value.courseParticipants = state.value.courseParticipants.filter(student => student.Id !== action.payload)
            // console.log(state.value.courseParticipants.length)

        }
       

    }
})

export const { setCp, addGrade,changegrade,addCp,removeCp } = courseParticipantsSlice.actions

