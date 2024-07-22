import { Paper, Table, TableContainer, TableHead, TableCell, TableRow, TableBody, TextField, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StudentsInterface, studentsState } from "../../types/Students";
import { deleteStudent, setStudents } from "../../store/students";
import axios from "axios";
import { cpInterface } from "../../types/CourseParticicpants";
import AddGrade from "../AddGrade/AddGrade";
import { FaTrash } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Doughnut, Pie } from "react-chartjs-2";
const StudentsTable = ({ students, addGrade = false, course = false }: { students: StudentsInterface[], addGrade?: boolean, course?: boolean }) => {
    const [coursParticipants, setCourseParticicpants] = useState<cpInterface[]>([])
    const location = useLocation()
    const courseId = course ? location.state.CourseId : ''
    const dispatch = useDispatch()
    console.log(courseId)
    // const courseId = '123456789'

    // const students = useSelector((state: studentsState) => state.students.value.students)
    const removeStudent = (id: string) => {
        try {
            const res = axios.patch(`http://localhost:8000/api/students/delete/${id}`)
            dispatch(deleteStudent(id))
            console.log('deleted student')
        } catch (e) {
            console.log('student not deleted', e)
        }
    }
    const removeStudentParticipation = (id: string,courseId:string) => {
        try {
            const res = axios.delete(`http://localhost:8000/api/cp/delete/${id}/${courseId}`)
            // dispatch(deleteStudent(id))
            console.log('deleted student from course')
        } catch (e) {
            console.log('student not deleted from course', e)
        }
    }
    return (
        <TableContainer component={Paper} sx={{ width: '80vw', maxHeight: '70vh', overflowY: 'auto' }}>
            <Table stickyHeader >
                <TableHead sx={{ direction: 'rtl' }}>
                    <TableRow sx={{ direction: 'rtl' }}>
                        {course && <>
                            {addGrade && <TableCell align="center">הזן ציון</TableCell>}
                            {!addGrade && <TableCell align="center">ציון</TableCell>}</>}
                        <TableCell align="center">שנתון</TableCell>
                        <TableCell align="center">שם</TableCell>
                        <TableCell align="center">ת.ז</TableCell>


                    </TableRow>
                </TableHead>
                <TableBody>
                    {students?.map((row) => (
                        <TableRow
                            key={row.Id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                            {course && <>{addGrade &&<TableCell align="center">

                                 <AddGrade id={row.Id} courseId={courseId} ></AddGrade>
                            </TableCell>}
                                {!addGrade && <TableCell align="center">{row.Grade?row.Grade:'-'}</TableCell>}</>}
                            <TableCell align="center">{row.BirthYear}</TableCell>
                            <TableCell align="center">{row.Name}</TableCell>
                            <TableCell align="center">{row.Id}</TableCell>
                            {!addGrade &&<TableCell align="center">
                                <IconButton onClick={() => course?removeStudentParticipation(row.Id,courseId):removeStudent(row.Id)}>
                                    <FaTrash></FaTrash>
                                </IconButton>

                            </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default StudentsTable