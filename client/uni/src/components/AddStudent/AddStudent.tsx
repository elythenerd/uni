import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { StudentsInterface } from "../../types/Students";
import { useDispatch } from "react-redux";
import { addStudent, setStudents } from "../../store/students";
import axios from "axios";
const AddStudent = ({ setopenStudent }: { setopenStudent: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [name, setName] = useState<string>('')
    const [Id, setId] = useState<string>('')
    const [birthDate, setbirthDate] = useState<string>('')
    const dispatch = useDispatch()

    async function createStudent(newStudent: StudentsInterface){
        try{
            const res = await axios.post('http://localhost:8000/api/students/create',newStudent)
            console.log('post created')
        }catch (e){
            console.log('posting user failed:',e)
        }
        
        
    }

    function checkAddStudent() {
        if (name && birthDate && Id) {
            const newStudent: StudentsInterface = {
                Id,
                Name: name,
                BirthYear: birthDate
            }
            dispatch(addStudent(newStudent))
            createStudent(newStudent)
            setopenStudent(false)
        } else {
            console.log(2)
        }
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField required label='שם' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
            <TextField required label='ת.ז' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value)} />
            <TextField required label='שנתון' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setbirthDate(e.target.value)} />
            <Button onClick={() => checkAddStudent()} >הוסף</Button>
        </Box>)
}


export default AddStudent