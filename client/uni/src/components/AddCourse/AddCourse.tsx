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
const AddCourse = ({ setOpenCourse }: { setOpenCourse: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [Name, setName] = useState<string>('')
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [Id, setId] = useState<number>()
    const [SubjectId, setSubjectId] = useState<string>('')
    const [TeacherId, setTeacherId] = useState<string>('')
    const [Status, setStatus] = useState<boolean>(true)
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
    async function getSubjectOptions(id: string) {
        console.log(TeacherId)

        const res = await axios.get(`http://localhost:8000/api/ts/options/${id}`)
        const subjects: Subject[] = res.data
        console.log(subjects)
        setSubjects(subjects)
        // return subjects
    }


    const checkAddCourse = () => {
        if (Name && SubjectId && TeacherId) {

            console.log(SubjectId)
            const NewCourse: CourseInterface = {
                Id: uuidv4(),
                Name: Name,
                SubjectId: SubjectId,
                TeacherId: TeacherId,
                Status: true

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
            direction: 'rtl',

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

                <TextField select label='מורה' sx={{ direction: 'rtl' }}>
                    {
                        teachers.map((option) => {

                            return <MenuItem onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                                setTeacherId(option.Id)
                                getSubjectOptions(option.Id)
                            }} key={option.Id} value={option.Id}>{option.Name}</MenuItem>
                        })

                    }
                </TextField>



                <TextField select disabled={TeacherId?false:true}  label='מקצוע' sx={{ direction: 'rtl' }}>
                    {
                        subjects.map((option) => {
                            return <MenuItem onClick={(e: React.MouseEvent<HTMLLIElement>) => setSubjectId(option.Id)} key={option.Id} value={option.Id}>{option.Name}</MenuItem>
                        })

                    }
                </TextField>



            </Box>
            <Button onClick={() => checkAddCourse()}>הוסף</Button>

        </Box>
    )
}

export default AddCourse