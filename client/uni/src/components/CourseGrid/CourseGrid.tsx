import React from "react";
import { CourseInterface } from "../../types/Course";
import { Grid } from "@mui/material";
import CourseCard from "../courseCard/CourseCard";

const CourseGrid = ({courses}:{courses:CourseInterface[]})=>{
    return(
        <Grid container sx={{direction:'rtl'}}>
                    {
                        courses.map((course) => {
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