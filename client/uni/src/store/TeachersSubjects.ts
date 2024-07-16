import { configureStore, createSlice } from "@reduxjs/toolkit";
import { TeachersSubjects } from "../types/TeachersSubjects";
// import { Subject } from "../types/Subject";
const teachersSubjectsInitialState = {value : {teachersSubjects : [] as TeachersSubjects[]} }
export const TeachersSubjectsSlice = createSlice({
    name : "teachersSubjects",
    initialState: teachersSubjectsInitialState,
    reducers: {
        setTeachersSubjects : (state,action)=>{
             console.log(state.value.teachersSubjects[0])
             console.log(action.payload)
            state.value.teachersSubjects.push(action.payload)
            
        },
        removeTeachersSubjects: (state,action)=>{
             console.log(action.payload)
            let index:number = state.value.teachersSubjects.findIndex(teachersSubject=>teachersSubject.Id==action.payload.Id)
            console.log(index)
            state.value.teachersSubjects[index] = {...state.value.teachersSubjects[index],Active:false}
            console.log(state.value.teachersSubjects[0])

        }
    }
    
})

export const {setTeachersSubjects,removeTeachersSubjects} = TeachersSubjectsSlice.actions

