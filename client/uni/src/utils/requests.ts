import axios from "axios"
import React from "react"
import { setCourses } from "../store/courses"
import { CourseInterface } from "../types/Course"
import Methods from "./methods"
import methods from "./methods"
import { useDispatch } from "react-redux"
// const method = new methods()
// const dispatch = useDispatch()
export const FetchCourses = async () => {
    const dispatch = useDispatch()
    try {

        const res = methods.get('http://localhost:8000/api/courses/get/names')
        const courses: CourseInterface[] = (await res).data
        // console.log(users)
        dispatch(setCourses(courses))
        return courses
    } catch (e) {
        console.log('users not fetched', e)
    }
}