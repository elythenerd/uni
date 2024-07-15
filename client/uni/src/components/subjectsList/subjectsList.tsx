import React from "react";
import { useSelector, UseSelector } from "react-redux";
import { subjectState } from "../../types/Subject";
import SubjectCard from "../subjectCard/SubjectCard";
import { Box, Grid } from "@mui/material";
const SubjectsList = () => {
    const Subjects = useSelector((state: subjectState) => state.subject.value.Subjects)

    return (
        <Box>
            <Grid container spacing={0.5} sx={{direction:'rtl'}} >
                {
                    Subjects.filter((subject)=>subject.Active).map((subject) => {
                        return (
                            <Grid item xs={7} sm={7} md={5} >
                                <SubjectCard key={subject.ID} subject={subject}></SubjectCard>
                            </Grid>)
                    })
                }
            </Grid>

        </Box>

    )
}
export default SubjectsList