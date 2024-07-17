import React, { useEffect } from "react";
import { CourseInterface, coursesState } from "../../types/Course";
import { Grid } from "@mui/material";
import CourseCard from "../courseCard/CourseCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCourses } from "../../store/courses";

const CourseGrid = ()=>{
    
    const dispatch  = useDispatch()
    useEffect(()=>{
        fetchCourses()
    },[])
    const fetchCourses = async ()=>{
        try{
        const res = axios.get('http://localhost:8000/api/courses/get')
        const courses : CourseInterface[] = (await res).data
        // console.log(users)
        dispatch(setCourses(courses))
        return courses
        }catch(e){
            console.log('users not fetched',e)
        }
    }
    const courses:CourseInterface[] = useSelector((state: coursesState) => state.courses.value.courses)

    return(
        <Grid container sx={{direction:'rtl'}}>
                    {
                        courses.map((course) => {
                            console.log(course.SubjectId)
                            return <Grid item
                                xs={3}
                                key={course.Id}
                                sx={{
                                    padding: '10px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}><CourseCard course={course}></CourseCard></Grid>
                        })
                    }
                </Grid>
    )
}

export default CourseGrid