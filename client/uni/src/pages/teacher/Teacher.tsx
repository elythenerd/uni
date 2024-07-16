import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Box, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import CourseCard from "../../components/courseCard/CourseCard";
import { useSelector } from "react-redux";
import { coursesState } from "../../types/Course";
import CourseGrid from "../../components/CourseGrid/CourseGrid";

const Teacher = () => {
    const courses = useSelector((state: coursesState) => state.courses.value.courses)

    return (
        <Box sx={{ width: '100vw', height: '100vh' }}>
            <Stack>
                <Navbar />
                <Divider><Chip label='קורסים פתוחים'></Chip></Divider>
                {courses.filter((course) => course.Status).length?<CourseGrid courses={courses.filter((course) => course.Status)}/>:<Typography sx={{textAlign:'center'}}>אין קורסים פתוחים</Typography>}
                {<Divider ><Chip label='קורסים סגורים'></Chip></Divider>}
                <CourseGrid courses={courses.filter((course) => !course.Status)} />

            </Stack>
        </Box>


    )
}

export default Teacher