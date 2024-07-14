import React from "react";
import { Subject } from "../../types/Subject";
import { Box, Typography } from "@mui/material";

const SubjectCard = ({subject}:{subject:Subject})=>{
    return (
        <Box sx={{backgroundColor:"rgb(80, 139, 241)",borderRadius:'5px',height:'5rem',width:'5rem'}}>
            <Typography  sx={{color:'white'}}>{subject.Name}</Typography>
        </Box>
    )
}
export default SubjectCard