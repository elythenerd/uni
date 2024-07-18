import React, { useEffect } from "react";
import { CourseInterface, coursesState } from "../../types/Course";
import { Grid } from "@mui/material";
import CourseCard from "../courseCard/CourseCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCourses } from "../../store/courses";

const CourseGrid = ({courses}:{courses:CourseInterface[]})=>{
    
    

    return(
        <Grid container sx={{direction:'rtl'}}>
                    {
                        courses.map((course) => {
                            // console.log(course.SubjectId)
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