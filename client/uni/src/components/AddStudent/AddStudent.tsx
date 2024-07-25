import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { StudentsInterface } from "../../types/Students";
import { useDispatch } from "react-redux";
import { addStudent, setStudents } from "../../store/students";
import axios from "axios";
import { checkID } from "../../utils/checkId";
const AddStudent = ({ setopenStudent }: { setopenStudent: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [name, setName] = useState<string>('')
    const [Id, setId] = useState<string>('')
    const [birthDate, setbirthDate] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [yearError,setYearError] = useState<boolean>()
    const [nameError,setNameError] = useState<boolean>()

    const dispatch = useDispatch()
    const [error, setError] = useState<boolean>(false)
    async function createStudent(newStudent: StudentsInterface){
        try{
            const res = await axios.post('http://localhost:8000/api/students/create',newStudent)
            console.log('post created')
        }catch (e){
            console.log('posting user failed:',e)
        }
        
        
    }

    function checkAddStudent() {
        
        if (name && birthDate && Id && !error) {
            const newStudent: StudentsInterface = {
                Id,
                Name: name,
                BirthYear: birthDate,
                Status:true
            }
            dispatch(addStudent(newStudent))
            createStudent(newStudent)
           
        } else {
            console.log(birthDate)
        }
    }
    const checkEnrollmentYear = (year:string)=>{
        if ((parseInt(year) && year.length===4 && parseInt(year) > 1999)||(year.length===0) ){
            setYearError(false)
            setbirthDate(year)
        }else{
            setYearError(true)
        }
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column',padding:'5%',justifyContent:'space-between',height:'100%' }}>
            <TextField required error={nameError} label='שם' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
            <TextField error={error} label={error ? errorMessage : 'ת.ז'} required  onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkID(e.target.value,setId,setError,setErrorMessage)} />
            <TextField error={yearError}  required label={yearError?'נא להזין שנתון עם ארבע ספרות':'שנתון'}  onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkEnrollmentYear(e.target.value)} />
            <Button onClick={() => checkAddStudent()} >הוסף</Button>
        </Box>)
}


export default AddStudent