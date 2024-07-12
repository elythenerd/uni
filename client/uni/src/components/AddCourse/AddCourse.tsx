import React, { useState } from "react";
import { CourseInterface } from "../../types/Course";
import { Box, TextField, Typography } from "@mui/material";
import { ChangeEvent } from "react";
// import { v4 as uuidv4 } from 'uuid';
const AddCourse = () => {
    const [Name, setName] = useState<string>('')
    const [Subject, SetSubject] = useState<string>()

    const [Id, setId] = useState<number>()
    const [SubjectId, setSubjectId] = useState<number>()
    const [Status, setStatus] = useState<boolean>(true)
    const [Courses, setCourses] = useState<CourseInterface[]>()
    const checkAddCourse = ()=>{
        const NewCourse:CourseInterface = {
            Id:123,
            Name:Name,
            SubjectId:1,
            TeacherId:1,
            Status:true

        }
        setCourses((prev) => {
            return [...prev, NewCourse]
        })
    }
    return (
        <Box sx={{
            direction: 'rtl',
            
            borderRadius: '5px',
            width:'25rem',
            height:'20rem',
            alignItems:'center',
            display:"flex",
            flexDirection:'column',
            gap: '1rem'
        }}>
            
            <Box sx={{
                display:"flex",
                flexDirection:'column',
                justifyContent:'center',
                gap:'5px'
            }}>
                <TextField required label='שם' onChange={(e:ChangeEvent<HTMLInputElement>)=>setName(e.target.value)} />
                <TextField required label='מקצוע' sx={{direction:'rtl'}} onChange={(e:ChangeEvent<HTMLInputElement>)=>SetSubject(e.target.value)} />

            </Box>
        </Box>
    )
}

export default AddCourse