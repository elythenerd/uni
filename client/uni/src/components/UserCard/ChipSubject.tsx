import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { FaTrash } from "react-icons/fa6";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { TeachersSubjects, teachersSubjectsState } from "../../types/TeachersSubjects";
import { removeTeachersSubjects } from "../../store/TeachersSubjects";
import axios from "axios";

const ChipSubject = ({ label, teacherid, subjectid, id }: { label: string | undefined, teacherid: string, subjectid: string, id: string }) => {
    const TeachersSubjects = useSelector((state: teachersSubjectsState) => state.teachersSubjects.value.teachersSubjects.filter((TeachersSubject: TeachersSubjects) => TeachersSubject.Active))
    const dispatch = useDispatch()
    function patchTeacherSubject(id: string|undefined) {
        try {
            const res = axios.patch(`http://localhost:8000/api/ts/delete/${id}`)
            console.log(`deleted ts: ${res}`)
        } catch (e) {
            console.log('course not deleted', e)
        }

    }
    function deletechip(subjectid: string, teacherid: string, id: string) {
        // console.log(teacherid, 'hi')

        const chipToRemove = TeachersSubjects.find((teachersubject) => teachersubject.Id == id)
        // console.log(chipToRemove)
        dispatch(removeTeachersSubjects(chipToRemove))
        patchTeacherSubject(chipToRemove?.Id)
    }
    return (<Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem',justifyContent:'flex-end'  }}>
        <IconButton sx={{fontSize:'1rem'}} onClick={() => deletechip(subjectid, teacherid, id)}>
            <FaTrash></FaTrash>
        </IconButton>
        <Typography>{label}</Typography>


    </Box>

    )
}

export default ChipSubject