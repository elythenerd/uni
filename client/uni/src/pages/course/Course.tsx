import { Box, Button, Dialog, MenuItem, Stack, TextField, Typography } from '@mui/material';
import react, { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import StudentsTable from '../../components/StudentsTable/StudentsTable';
import { useSelector } from 'react-redux';
import { cpInterface, cpState } from '../../types/CourseParticicpants';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { StudentsInterface } from '../../types/Students';
import { setStudents } from '../../store/students';
import { Doughnut, Pie } from "react-chartjs-2";
import PieChart from '../../components/PieChart/PieChart';

const Course = () => {
    const [OpenAddTest, setOpenAddTest] = useState<boolean>(false)
    const [OpenAddStudent, setOpenAddStudent] = useState<boolean>(false)
    const [studentOptions, setstudentOptions] = useState<StudentsInterface[]>()
    const [students, setStudents] = useState<StudentsInterface[]>()
    const [studentId, setStudentId] = useState<string>('')

    const courseParticipants = useSelector((state: cpState) => state.courseParticipants.value.courseParticipants)
    const location = useLocation()
    const courseId = location.state.CourseId
    // console.log(courseId)
    useEffect(() => {
        getStudentOptions(courseId)
        fetchStudents()
    }, [])
    async function getStudentOptions(id: string) {
        const res = await axios.get(`http://localhost:8000/api/students/get/course/options/${id}`)
        const options = res.data
        console.log(options)
        setstudentOptions(options)
    }
    const fetchStudents = async () => {
        try {
            const res = axios.get(`http://localhost:8000/api/students/get/course/${courseId}/grades/avg`)
            const res_students: StudentsInterface[] = (await res).data
            // console.log(res_students)
            setStudents(res_students)
            // dispatch(setStudents(students))
            return students
        } catch (e) {
            console.log('users not fetched', e)
        }
    }
    async function postCourseParticipants(body: cpInterface[]) {
        try {
            // body.forEach((cp)=> cp.Active=true)
            console.log(body)
            const req = await axios.post('http://localhost:8000/api/cp/createMany', body)
            console.log('post created \n', req)
        } catch (e) {
            console.log(e, 'error')
        }
    }

    const checkAddTest = () => {
        if (courseParticipants.filter((cp) => parseInt(cp.Grade as string) >= 0 && parseInt(cp.Grade as string) <= 100).length === courseParticipants.length) {
            postCourseParticipants(courseParticipants)

            setOpenAddTest(false)
        } else {
            console.log('not good')
        }
    }
    const addStudent = () => {
        const newStudent: cpInterface = {
            StudentId: studentId,
            CourseId: courseId,

        }
        if (studentId) {
            postCourseParticipants([newStudent])
        }
    }

    return (
        <Stack sx={{ width: '100vw', height: '100vh', alignItems: 'center' }}>
            <Navbar></Navbar>
            <Box>
                <Button onClick={() => setOpenAddStudent(true)}>הוסף תלמיד</Button>
                <Button onClick={() => setOpenAddTest(true)}>הוסף מבחן</Button>
            </Box>

            <Dialog open={OpenAddTest} onClose={() => setOpenAddTest(false)} maxWidth='lg' >
                <Stack >
                    <StudentsTable students={students as StudentsInterface[]} course={true} addGrade={true} ></StudentsTable>
                    <Button sx={{ padding: '5px' }} onClick={() => checkAddTest()}>שמור מבחן</Button>

                </Stack>
            </Dialog>
            <Dialog open={OpenAddStudent} onClose={() => setOpenAddStudent(false)} maxWidth='lg' >
                <Stack sx={{ padding: '5px' }}>
                    <Typography>הוסף לתלמיד לקורס</Typography>
                    <TextField select>
                        {
                            studentOptions?.filter((student) => student.Status).map((student) => {
                                return <MenuItem key={student.Id} value={student.Name} sx={{ direction: 'rtl' }} onClick={(e: React.MouseEvent<HTMLLIElement>) => setStudentId(student.Id)} >
                                    {`${student.Name}-${student.Id}`}
                                </MenuItem>
                            }

                            )
                        }

                    </TextField>
                    <Button onClick={() => addStudent()}>הוסף</Button>
                    {/* <StudentsTable courseId={courseId}></StudentsTable> */}
                    {/* <Button sx={{ padding: '5px' }} onClick={() => checkAddTest()}>שמור מבחן</Button> */}

                </Stack>
            </Dialog>
            <StudentsTable students={students as StudentsInterface[]} course={true}></StudentsTable>
            <Box>
                <PieChart></PieChart>
            </Box>

        </Stack>
    )
}

export default Course
