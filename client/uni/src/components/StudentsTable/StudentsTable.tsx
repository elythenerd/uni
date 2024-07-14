import { Paper, Table, TableContainer, TableHead, TableCell, TableRow, TableBody } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { studentsState } from "../../types/Students";

const StudentsTable = () => {
    const students = useSelector((state: studentsState) => state.students.value.students)
    return (
        <TableContainer component={Paper}>
            <Table>
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