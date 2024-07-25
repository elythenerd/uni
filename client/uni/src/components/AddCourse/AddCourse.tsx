import React, { useState } from "react";
import { CourseInterface, coursesState } from "../../types/Course";
import { Box, TextField, Typography, Button, MenuItem } from "@mui/material";
import { ChangeEvent } from "react";
import { useDispatch, useSelector, UseSelector } from "react-redux";
import { subjectState } from "../../types/Subject";
import { v4 as uuidv4 } from 'uuid';
import { usersState } from "../../types/User";
import { Dispatch } from "@reduxjs/toolkit";
import { addCourse, setCourses } from "../../store/courses";
import { Subject } from "../../types/Subject";
import axios from "axios";
import { checkEnrollmentYear } from "../../utils/checkEnrollmentYear";
const AddCourse = ({ setOpenCourse }: { setOpenCourse: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [Name, setName] = useState<string>('')
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [Id, setId] = useState<number>()
    const [SubjectId, setSubjectId] = useState<string>('')
    const [TeacherId, setTeacherId] = useState<string>('')
    const [birthDate, setbirthDate] = useState<string>('')
    const [yearError,setYearError] = useState<boolean>()
    const [enable, setEnable] = useState<boolean>(false)
    // const [Courses, setCourses] = useState<CourseInterface[]>()
    const Subjects = useSelector((state: subjectState) => state.subject.value.Subjects.filter((subject: Subject) => subject.Active))
    const Users = useSelector((state: usersState) => state.users.value.users)
    const teachers = Users.filter((user) => { return user.Job === 'teacher' })
    const dispatch = useDispatch()
    async function createCourse(newCourse: CourseInterface) {
        try {
            const res = await axios.post('http://localhost:8000/api/courses/create', newCourse)
            console.log('post created')
        } catch (e) {
            console.log('posting user failed:', e)
        }


    }
    async function getSubjectOptions(id: string,birthDate:string) {
        console.log(TeacherId)
        try{
        const res = await axios.get(`http://localhost:8000/api/ts/options/${id}/${birthDate}`)
        const subjects: Subject[] = res.data
        console.log(subjects)
        if (subjects.length>0){
            setEnable(true)
        }else{
            setEnable(false)
        }
        
        setSubjects(subjects)}catch(e){
            setEnable(false)
            console.log(e)
        }
        // return subjects
    }
    


    const checkAddCourse = () => {
        if (Name && SubjectId && TeacherId && !yearError && enable) {

            console.log(SubjectId)
            const NewCourse: CourseInterface = {
                Id: uuidv4(),
                Name: Name,
                SubjectId: SubjectId,
                TeacherId: TeacherId,
                Status: true,
                enrollementYear:birthDate

            }
            // setCourses((prev) => {
            //     return [NewCourse]

            // })
            // dispatch(setCourses(NewCourse))
            createCourse(NewCourse)
            dispatch(addCourse(NewCourse))
            setOpenCourse(false)
        } else {
            // console.log(teachers)
        }

    }
    return (
        <Box sx={{
            

            borderRadius: '5px',
            width: '25rem',
            height: '20rem',
            alignItems: 'center',
            display: "flex",
            flexDirection: 'column',
            gap: '1rem'
        }}>

            <Box sx={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '5px'
            }}>
                <TextField required label='שם' onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                <TextField error={yearError} onBlur={()=>{getSubjectOptions(TeacherId,birthDate)}}  required label={yearError?'נא להזין שנתון עם ארבע ספרות':'שנתון'} onChange={(e: ChangeEvent<HTMLInputElement>) => checkEnrollmentYear(e.target.value,setYearError,setbirthDate)} />
                <TextField select label='מורה' >
                    {
                        teachers.map((option) => {

                            return <MenuItem onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                                setTeacherId(option.Id)
                                getSubjectOptions(option.Id,birthDate)
                            }} key={option.Id} value={option.Id}>{option.Name}</MenuItem>
                        })

                    }
                </TextField>



                <TextField select disabled={!enable}  label='מקצוע' >
                    {
                        subjects.map((option) => {
                            return <MenuItem onClick={(e: React.MouseEvent<HTMLLIElement>) => setSubjectId(option.Id)} key={option.Id} value={option.Id}>{enable&&option.Name}</MenuItem>
                        })

                    }
                </TextField>



            </Box>
            <Button onClick={() => checkAddCourse()}>הוסף</Button>

        </Box>
    )
}

export default AddCourse