import { configureStore } from "@reduxjs/toolkit"
import { SubjectSlice } from "./Subject"
import { usersSlice } from "./Users"
import { coursesSlice } from "./courses"
import { studentsSlice } from "./students"
import { TeachersSubjectsSlice } from "./TeachersSubjects"
import { courseParticipantsSlice } from "./CourseParticipants"
import { userSlice } from "./LoggedUser"
import { addGradeSlice } from "./AddGrade"
export const store = configureStore({
    reducer: {
        subject : SubjectSlice.reducer,
        users :usersSlice.reducer,
        courses : coursesSlice.reducer,
        students : studentsSlice.reducer,
        teachersSubjects: TeachersSubjectsSlice.reducer,
        courseParticipants: courseParticipantsSlice.reducer,
        user:userSlice.reducer,
        grades: addGradeSlice.reducer
    }
})