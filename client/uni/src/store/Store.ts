import { configureStore } from "@reduxjs/toolkit"
import { SubjectSlice } from "./Subject"
import { usersSlice } from "./Users"
import { coursesSlice } from "./courses"
export const store = configureStore({
    reducer: {
        subject : SubjectSlice.reducer,
        users :usersSlice.reducer,
        courses : coursesSlice.reducer
    }
})