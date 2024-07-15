import { Box, Button } from "@mui/material";
import React, { useState,useContext } from "react";
import { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import { OpenSubjectInterface, Subject } from "../../types/Subject";
import OpenContext from "../../context/SubjectContext/openContext/openContext";
import { setSubjects } from "../../store/Subject";
import { useDispatch, UseDispatch,useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';


const AddSubject = ({setOpenSubject}:{ setOpenSubject: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [Subject,setSubject] = useState<string>('')
    const [SubjectId,setSubjectId] = useState<string>()
    // const { openSubject, setOpenSubject }: OpenSubjectInterface = useContext(OpenContext)
    const dispatch = useDispatch()
    const checkAddSubject = ()=>{
        if (Subject){
            console.log(Subject)
            setOpenSubject(false)
            const newSubject:Subject = {Name:Subject,ID:uuidv4(),Active:true}
            dispatch(setSubjects(newSubject))
            // console.log(dispatch(setSubjects({name: Subject})))
        }
    }
    return (
        <Box sx={{display:'flex',flexDirection:'column'}}>
            <TextField required label='שם' onChange={(e: ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)} />
            <Button onClick={()=> checkAddSubject()}>הוסף</Button>
        </Box>)
}
export default AddSubject