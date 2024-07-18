import { Paper, Table, TableContainer, TableHead, TableCell, TableRow, TableBody } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StudentsInterface, studentsState } from "../../types/Students";
import { setStudents } from "../../store/students";
import axios from "axios";

const StudentsTable = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        fetchSubjects()
    }, [])
    const fetchSubjects = async () => {
        try {
            const res = axios.get('http://localhost:8000/api/students/get')
            const students: StudentsInterface[] = (await res).data
            // console.log(subjects)
            dispatch(setStudents(students))
            return students
        } catch (e) {
            console.log('users not fetched', e)
        }
    }
    const students = useSelector((state: studentsState) => state.students.value.students)
    return (
        <TableContainer component={Paper} sx={{ width: '80vw', maxHeight: '70vh', overflowY: 'auto' }}>
            <Table stickyHeader >
                <TableHead sx={{ direction: 'rtl' }}>
                    <TableRow sx={{ direction: 'rtl' }}>
                        <TableCell align="center">שנתון</TableCell>
                        <TableCell align="center">שם</TableCell>
                        <TableCell align="center">ת.ז</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((row) => (
                        <TableRow
                            key={row.Id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                            <TableCell align="center">{row.BirthYear}</TableCell>
                            <TableCell align="center">{row.Name}</TableCell>
                            <TableCell align="center">{row.Id}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default StudentsTable