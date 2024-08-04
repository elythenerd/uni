import { Box, Button, Card, CardContent, Dialog, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import react, { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import StudentsTable from '../../components/StudentsTable/StudentsTable';
import { useDispatch, useSelector } from 'react-redux';
import { avgGradesInterface, courseAvgGradeState, cpInterface, cpState, cpStateStudents, studentOptionsState } from '../../types/CourseParticicpants';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { StudentsInterface } from '../../types/Students';
import { setStudents } from '../../store/students';
import { Doughnut, Pie } from "react-chartjs-2";
import PieChart from '../../components/PieChart/PieChart';
import methods from '../../utils/methods';
import { setCp } from '../../store/CourseParticipants';
import { setStudentOptions } from '../../store/CourseParticipantOptions';
import { setCourseAvgGrade } from '../../store/courseAvgGrade';

const Course = () => {
    // const mehtod = new methods()
    const [OpenAddTest, setOpenAddTest] = useState<boolean>(false)
    const [OpenAddStudent, setOpenAddStudent] = useState<boolean>(false)
    // const [studentOptions, setstudentOptions] = useState<StudentsInterface[]>()
    const [students, setStudents] = useState<StudentsInterface[]>()
    const [Grade, setGrade] = useState<avgGradesInterface[]>()

    const [studentId, setStudentId] = useState<string>('')
    const dispatch = useDispatch()
    const grades = useSelector((state: cpState) => state.grades.value.courseParticipants)
    const studentOptions = useSelector((state: studentOptionsState) => state.studentOptions.value.studentOptions)
    const courseAvgGrade = useSelector((state: courseAvgGradeState) => state.courseAvgGrade.value.avgGrade)
    const courseParticipants = useSelector((state: cpStateStudents) => state.courseParticipants.value.courseParticipants)
    const location = useLocation()
    const courseId = location.state.CourseId
    const year = location.state.year
    const isclosed = location.state.isclosed
    // console.log(courseId)
    useEffect(() => {
        getStudentOptions(courseId)
        fetchStudents()
        fetchGrade(courseId)
    }, [])
    useEffect(() => {
        console.log('--------------------', studentOptions)
    }, [studentOptions])

    async function getStudentOptions(id: string) {
        try {
            const res = await methods.get(`http://localhost:8000/api/students/get/course/options/${id}/${year}`)
            const options = res.data
            // console.log(options, 'options')
            dispatch(setStudentOptions(options))
        } catch (e) {
            console.log(e)
        }

    }
    const fetchStudents = async () => {
        try {
            const res = methods.get(`http://localhost:8000/api/students/get/course/${courseId}/grades/avg`)
            const res_students: StudentsInterface[] = (await res).data
            // console.log(res_students)
            // setStudents(res_students)
            dispatch(setCp(res_students))
            return students
        } catch (e) {
            console.log('users not fetched', e)
        }
    }
    const fetchGrade = async (id: string) => {
        try {
            const res = await methods.get(`http://localhost:8000/api/cp/get/Grade/${id}`)
            const res_Grade: avgGradesInterface[] = res.data
            // console.log(res_students)
            // setGrade(res_Grade)
            dispatch(setCourseAvgGrade(res_Grade))
            return res_Grade
        } catch (e) {
            console.log('users not fetched', e)
        }
    }
    async function postCourseParticipants(body: cpInterface[]) {
        try {
            // body.forEach((cp)=> cp.Active=true)
            console.log(body)
            const req = await methods.post('http://localhost:8000/api/cp/createMany', body)
            console.log('post created \n', req)
        } catch (e) {
            console.log(e, 'error')
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

    const checkAddTest = () => {
        if (grades.filter((cp) => parseInt(cp.Grade as string) >= 0 && parseInt(cp.Grade as string) <= 100).length === grades.length) {
            postCourseParticipants(grades)
            console.log(grades)
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
            postCourseParticipant(newStudent)
            setOpenAddStudent(false)
        }
    }
    // console.log(studentOptions, 111111)
    return (
        <Stack sx={{ width: '100vw', height: '100vh', alignItems: 'center' }}>
            <Navbar></Navbar>
            <Box>
                <Button disabled={!isclosed} onClick={() => setOpenAddStudent(true)}>הוסף תלמיד</Button>
                <Button disabled={!isclosed} onClick={() => setOpenAddTest(true)}>הוסף מבחן</Button>
            </Box>

            <Dialog open={OpenAddTest} onClose={() => setOpenAddTest(false)} maxWidth='lg' >
                <Stack >
                    <StudentsTable students={courseParticipants as StudentsInterface[]} course={true} addGrade={true} ></StudentsTable>
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
            <StudentsTable students={courseParticipants as StudentsInterface[]} course={true}></StudentsTable>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PieChart courseId={courseId}></PieChart>
                <Card sx={{ height: '30%', alignItems: 'center', justifyContent: 'center', display: 'flex', width: '30%', direction: 'rtl' }}>
                    <CardContent >
                        <Typography sx={{ fontSize: 30 }}>ציון ממוצע</Typography>
                        <Divider></Divider>
                        <Typography>{courseAvgGrade?.map((value) => value.avgGrade)}</Typography>
                    </CardContent>
                </Card>
            </Box>

        </Stack>
    )
}

export default Course

