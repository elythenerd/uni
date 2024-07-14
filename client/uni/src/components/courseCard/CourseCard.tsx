import React from "react";
import { Box, Typography } from "@mui/material";
import { CourseInterface } from "../../types/Course";
import { useSelector } from "react-redux";
import { usersState } from "../../types/User";
import { subjectState } from "../../types/Subject";
const CourseCard = ({course}:{course:CourseInterface})=>{
    const Users = useSelector((state: usersState) => state.users.value.users)
    const Subjects = useSelector((state: subjectState) => state.subject.value.Subjects)

    const teacher = Users.find(user => user.Id === course.TeacherId)
    const subject = Subjects.find(subject => subject.ID === course.SubjectId)

    return (
        <Box sx={{backgroundColor:"rgb(80, 139, 241)",borderRadius:'5px',height:'5rem',width:'5rem'}}>
            <Typography  sx={{color:'white'}}>{course.Name}</Typography>
            <Typography  sx={{color:'white'}}>{teacher?.Name}</Typography>
            <Typography  sx={{color:'white'}}>{subject?.Name}</Typography>
        </Box>
    )
}
export default CourseCard