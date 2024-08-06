import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import { OpenSubjectInterface, Subject } from "../../types/Subject";
import OpenContext from "../../context/SubjectContext/openContext/openContext";
import { addSubject, setSubjects } from "../../store/Subject";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";


const AddSubject = ({ setOpenSubject, openSubject }: { setOpenSubject: React.Dispatch<React.SetStateAction<boolean>>, openSubject: boolean }) => {
    const [Subject, setSubject] = useState<string>('')
    const [SubjectId, setSubjectId] = useState<string>()
    // const { openSubject, setOpenSubject }: OpenSubjectInterface = useContext(OpenContext)

    const dispatch = useDispatch()

    const fetchSubjects = async () => {
        try {
            const res = axios.get('http://localhost:8000/api/subjects/get')
            const subjects: Subject[] = (await res).data
            // console.log(subjects)
            dispatch(setSubjects(subjects))
            return subjects
        } catch (e) {
            console.log('users not fetched', e)
        }
    }


    async function createSubject(newSubject: Subject) {
        try {
            const res = await axios.post('http://localhost:8000/api/subjects/create', newSubject)
            console.log('post created')
        } catch (e) {
            console.log('posting user failed:', e)
        }


    }
    const checkAddSubject = () => {
        if (Subject) {
            console.log(Subject)
            const newSubject: Subject = { Name: Subject, Id: uuidv4(), Active: true }
            createSubject(newSubject)
            setOpenSubject(false)
            // fetchSubjects()
            // dispatch(addSubject(newSubject))
            // console.log(dispatch(setSubjects({name: Subject})))
        }
    }
    return (

        <Dialog open={openSubject} onClose={() => setOpenSubject(false)} fullWidth>
            <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>הוסף מקצוע</DialogTitle>
            <DialogContent>
                <TextField fullWidth variant="standard" required label='שם' onChange={(e: ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => checkAddSubject()}>הוסף</Button>

            </DialogActions>
        </Dialog>)
}
export default AddSubject

