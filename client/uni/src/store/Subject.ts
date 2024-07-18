import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Subject } from "../types/Subject";
const subjectInitialState = { value: { Subjects: [] as Subject[] } }
export const SubjectSlice = createSlice({
    name: "subject",
    initialState: subjectInitialState,
    reducers: {
        setSubjects: (state, action) => {
            // console.log(state.value.Subjects[0])
            // console.log(action.payload)
            state.value.Subjects = action.payload
            // console.log(state.value.Subjects)
        },
        removeSubject: (state, action) => {
            console.log(action.payload)
            let index: number = state.value.Subjects.findIndex(subject => subject.Id == action.payload)
            console.log(index)
            console.log(state.value.Subjects)
            state.value.Subjects[index] = { ...state.value.Subjects[index], Active: false }
            console.log(state.value.Subjects[0])

        },
        addSubject: (state,action)=> {
            state.value.Subjects.push(action.payload)
        }
    }

})

export const { setSubjects, removeSubject,addSubject } = SubjectSlice.actions

