import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cpInterface, studentOptionsState } from "../../types/CourseParticicpants";
import methods from "../../utils/methods";
import { Dialog, Stack, Typography, TextField, MenuItem, Button, DialogContent, DialogTitle, DialogActions } from "@mui/material";
import { setStudentOptions } from "../../store/CourseParticipantOptions";

const AddCourseParticipant = ({ OpenAddStudent, setOpenAddStudent, courseId,year }: { OpenAddStudent: boolean, setOpenAddStudent: React.Dispatch<React.SetStateAction<boolean>>, courseId: string,year:string }) => {
    const [studentId, setStudentId] = useState<string>('')
    const studentOptions = useSelector((state: studentOptionsState) => state.studentOptions.value.studentOptions)
    const dispatch = useDispatch()
   useEffect(()=>{
    getStudentOptions(courseId,year)
   },[])
    async function getStudentOptions(id: string,year:string) {
        try {
            const res = await methods.get(`http://localhost:8000/api/students/get/course/options/${id}/${year}`)
            const options = res.data
            // console.log(options, 'options')
            dispatch(setStudentOptions(options))
        } catch (e) {
            console.log(e)
        }

    }
    
    
    async function postCourseParticipant(body: cpInterface) {
        try {
            // body.forEach((cp)=> cp.Active=true)
            console.log(body)
            const req = await methods.post('http://localhost:8000/api/cp/create', body)
            console.log('post created \n', req)
        } catch (e) {
            console.log(e, 'error')
        }
    }
    const addStudent = () => {
        const newStudent: cpInterface = {
            StudentId: studentId,
            CourseId: courseId,

        }
        if (studentId) {
            postCourseParticipant(newStudent)
            setOpenAddStudent(false)
        }
    }
    return (
        <Dialog  open={OpenAddStudent} onClose={() => setOpenAddStudent(false)} fullWidth maxWidth='sm' >
            <DialogTitle>הוסף לתלמיד לקורס</DialogTitle>
            <DialogContent >

                <TextField variant="standard" fullWidth select>
                    {
                        studentOptions?.filter((student) => student.Status).map((student) => {
                            return <MenuItem key={student.Id} value={student.Name} sx={{ direction: 'rtl' }} onClick={(e: React.MouseEvent<HTMLLIElement>) => setStudentId(student.Id)} >
                                {`${student.Name}-${student.Id}`}
                            </MenuItem>
                        }

                        )
                    }

                </TextField>
                {/* <StudentsTable courseId={courseId}></StudentsTable> */}
                {/* <Button sx={{ padding: '5px' }} onClick={() => checkAddTest()}>שמור מבחן</Button> */}

            </DialogContent>
            <DialogActions>
                <Button onClick={() => addStudent()}>הוסף</Button>

            </DialogActions>
        </Dialog>
    )
}

export default AddCourseParticipant