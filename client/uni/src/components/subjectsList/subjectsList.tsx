import React from "react";
import { useSelector, UseSelector } from "react-redux";
import { subjectState } from "../../types/Subject";
import SubjectCard from "../subjectCard/SubjectCard";
import { Box, Grid } from "@mui/material";
const SubjectsList = () => {
    const Subjects = useSelector((state: subjectState) => state.subject.value.Subjects)

    return (
        
            <Grid container  sx={{direction:'rtl'}} >
                {
                    Subjects.filter((subject)=>subject.Active).map((subject) => {
                        return (
                            <Grid item xs={2} sx={{padding:'10px'}} >
                                <SubjectCard key={subject.ID} subject={subject}></SubjectCard>
                            </Grid>)
                    })
                }
            </Grid>


    )
}
export default SubjectsList