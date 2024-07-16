import { configureStore, createSlice } from "@reduxjs/toolkit";
import { CourseInterface } from "../types/Course";
import { Subject } from "../types/Subject";
const coursesInitialState = { value: { courses: [] as CourseInterface[] } }
export const coursesSlice = createSlice({
    name: "courses",
    initialState: coursesInitialState,
    reducers: {
        setCourses: (state, action) => {
            // console.log(state.value.Subjects[0])
            // console.log(action.payload)
            state.value.courses.push(action.payload)

        },
        removeCourse: (state, action) => {
            console.log(action.payload)
            let index: number = state.value.courses.findIndex(course => course.Id == action.payload)
            console.log(index)
            console.log(state.value.courses)
            state.value.courses[index] = { ...state.value.courses[index], Status: false }
            console.log(state.value.courses[0])

        }

    }})

export const { setCourses,removeCourse } = coursesSlice.actions

