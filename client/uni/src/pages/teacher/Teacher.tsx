import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Box, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import CourseCard from "../../components/courseCard/CourseCard";
import { useDispatch, useSelector } from "react-redux";
import { CourseInterface, coursesState } from "../../types/Course";
import CourseGrid from "../../components/CourseGrid/CourseGrid";
import axios from "axios";
import { setCourses } from "../../store/courses";
import { JobType, userState } from "../../types/User";
import { useLocation } from "react-router-dom";

const Teacher = () => {
    const location = useLocation()
    const loggedUser = useSelector((state:userState)=> state.user.value.user)
    const id : string = loggedUser?.Job===JobType.Boss? location.state.id:loggedUser?.Id
    const courses = useSelector((state: coursesState) => state.courses.value.courses)

    
    const dispatch  = useDispatch()
    useEffect(()=>{
        fetchCourses()
    },[])
    const fetchCourses = async ()=>{
        try{
        const res = axios.get(`http://localhost:8000/api/courses/get/names/byId/${id}`,{withCredentials:true})
        const courses : CourseInterface[] = (await res).data
        // console.log(users)
        dispatch(setCourses(courses))
        return courses
        }catch(e){
            console.log('users not fetched',e)
        }
    }
    // const courses:CourseInterface[] = useSelector((state: coursesState) => state.courses.value.courses)


    return (
        <Box >
            <Stack>
               
                <Divider><Chip label='קורסים פתוחים'></Chip></Divider>
                {courses.filter((course) => course.Status).length?<CourseGrid courses={courses.filter((course) => course.Status)}/>:<Typography sx={{textAlign:'center'}}>אין קורסים פתוחים</Typography>}
                {<Divider ><Chip label='קורסים סגורים'></Chip></Divider>}
                <CourseGrid courses={courses.filter((course) => !course.Status)} />

            </Stack>
        </Box>


    )
}

export default Teacher