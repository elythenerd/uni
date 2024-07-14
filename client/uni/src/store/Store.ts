import { configureStore } from "@reduxjs/toolkit"
import { SubjectSlice } from "./Subject"
import { usersSlice } from "./Users"
import { coursesSlice } from "./courses"
import { studentsSlice } from "./students"
export const store = configureStore({
    reducer: {
        subject : SubjectSlice.reducer,
        users :usersSlice.reducer,
        courses : coursesSlice.reducer,
        students : studentsSlice.reducer
    }
})