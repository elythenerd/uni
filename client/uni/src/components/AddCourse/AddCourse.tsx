import React, { useState } from "react";
import { CourseInterface, coursesState } from "../../types/Course";
import { Box, TextField, Typography, Button, MenuItem, DialogContent, Dialog, DialogTitle, DialogActions } from "@mui/material";
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
const AddCourse = ({ setOpenCourse, openCourse }: { setOpenCourse: React.Dispatch<React.SetStateAction<boolean>>, openCourse: boolean }) => {
    const [Name, setName] = useState<string>('')
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [Id, setId] = useState<number>()
    const [SubjectId, setSubjectId] = useState<string>('')
    const [TeacherId, setTeacherId] = useState<string>('')
    const [birthDate, setbirthDate] = useState<string>('')
    const [yearError, setYearError] = useState<boolean>()
    const [enable, setEnable] = useState<boolean>(false)
    // const [Courses, setCourses] = useState<CourseInterface[]>()
    const Subjects = useSelector((state: subjectState) => state.subject.value.Subjects.filter((subject: Subject) => subject.Active))
    const Users = useSelector((state: usersState) => state.users.value.users)
    const teachers = Users.filter((user) => { return user.Job === 'teacher' && user.Active !== false })
    const dispatch = useDispatch()
    async function createCourse(newCourse: CourseInterface) {
        try {
            const res = await axios.post('http://localhost:8000/api/courses/create', newCourse)
            console.log('post created')
        } catch (e) {
            console.log('posting user failed:', e)
        }


    }
    async function getSubjectOptions(id: string, birthDate: string) {
        console.log(TeacherId)
        try {
            const res = await axios.get(`http://localhost:8000/api/ts/options/${id}/${birthDate}`)
            const subjects: Subject[] = res.data
            console.log(subjects)
            if (subjects.length > 0) {
                setEnable(true)
            } else {
                setEnable(false)
            }

            setSubjects(subjects)
        } catch (e) {
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
                enrollementYear: birthDate

            }
            // setCourses((prev) => {
            //     return [NewCourse]

            // })
            // dispatch(setCourses(NewCourse))
            createCourse(NewCourse)
            // dispatch(addCourse(NewCourse))
            setOpenCourse(false)
        } else {
            // console.log(teachers)
        }

    }
    return (



        <Dialog sx={{ '& .MuiPaper-root': {border:'20px solid blue'} }} fullWidth maxWidth='xs' open={openCourse} onClose={() => setOpenCourse(false)}>
            <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>הוסף קורס</DialogTitle>
            <DialogContent sx={{ '&.MuiDialogContent-root': {pt: '10px'}, display: 'flex',gap:'10px',flexDirection:'column'}} >
                <TextField  fullWidth required label='שם' onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                <TextField  fullWidth error={yearError} onBlur={() => { getSubjectOptions(TeacherId, birthDate) }} required label={yearError ? 'נא להזין שנתון עם ארבע ספרות' : 'שנתון'} onChange={(e: ChangeEvent<HTMLInputElement>) => checkEnrollmentYear(e.target.value, setYearError, setbirthDate)} />
                <TextField  fullWidth select label='מורה' >
                    {
                        teachers.map((option) => {

                            return <MenuItem onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                                setTeacherId(option.Id)
                                getSubjectOptions(option.Id, birthDate)
                            }} key={option.Id} value={option.Id}>{option.Name}</MenuItem>
                        })

                    }
                </TextField>



                <TextField  fullWidth select disabled={!enable} label='מקצוע' >
                    {
                        subjects.map((option) => {
                            return <MenuItem onClick={(e: React.MouseEvent<HTMLLIElement>) => setSubjectId(option.Id)} key={option.Id} value={option.Id}>{enable && option.Name}</MenuItem>
                        })

                    }
                </TextField>


            </DialogContent>
            <DialogActions>
                <Button onClick={() => checkAddCourse()}>הוסף</Button>
            </DialogActions>
        </Dialog>

    )
}

export default AddCourse