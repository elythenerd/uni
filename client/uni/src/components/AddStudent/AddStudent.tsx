import React, { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import TextField from "@mui/material/TextField";
import { StudentsInterface } from "../../types/Students";
import { useDispatch } from "react-redux";
import { addStudent, deleteStudent, setStudents } from "../../store/students";
import axios from "axios";
import { checkID } from "../../utils/checkId";
const AddStudent = ({ setopenStudent, openStudent }: { setopenStudent: React.Dispatch<React.SetStateAction<boolean>>, openStudent: boolean }) => {
    const [name, setName] = useState<string>('')
    const [Id, setId] = useState<string>('')
    const [birthDate, setbirthDate] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [yearError, setYearError] = useState<boolean>()
    const [nameError, setNameError] = useState<boolean>()

    const dispatch = useDispatch()
    const [error, setError] = useState<boolean>(false)
    async function createStudent(newStudent: StudentsInterface) {
        try {
            const res = await axios.post('http://localhost:8000/api/students/create', newStudent)

            console.log('post created')
        } catch (e) {
            console.log('posting user failed:', e)
        }


    }

    function checkAddStudent() {

        if (name && birthDate && Id && !error) {
            const newStudent: StudentsInterface = {
                Id,
                Name: name,
                BirthYear: birthDate,
                Status: true
            }
            // dispatch(addStudent(newStudent))
            setopenStudent(false)
            createStudent(newStudent)

        } else {
            console.log(birthDate)
        }
    }
    const checkEnrollmentYear = (year: string) => {
        if ((parseInt(year) && year.length === 4 && parseInt(year) > 1999) || (year.length === 0)) {
            setYearError(false)
            setbirthDate(year)
        } else {
            setYearError(true)
        }
    }
    return (
        <Dialog fullWidth open={openStudent} onClose={() => setopenStudent(false)}>
            <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>הוסף תלמיד</DialogTitle>

            <DialogContent sx={{display:'flex',flexDirection:'column',gap:'20px',pt:'20px'}}>
                <TextField required error={nameError} label='שם' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                <TextField error={error} label={error ? errorMessage : 'ת.ז'} required onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkID(e.target.value, setId, setError, setErrorMessage)} />
                <TextField error={yearError} required label={yearError ? 'נא להזין שנתון עם ארבע ספרות' : 'שנתון'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkEnrollmentYear(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => checkAddStudent()} >הוסף</Button>

            </DialogActions>
        </Dialog>)
}


export default AddStudent