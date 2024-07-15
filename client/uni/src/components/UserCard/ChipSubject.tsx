import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { FaTrash } from "react-icons/fa6";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { TeachersSubjects, teachersSubjectsState } from "../../types/TeachersSubjects";
import { removeTeachersSubjects } from "../../store/TeachersSubjects";

const ChipSubject = ({ label, teacherid, subjectid }: { label: string | undefined, teacherid: string, subjectid: string }) => {
    const TeachersSubjects = useSelector((state: teachersSubjectsState) => state.teachersSubjects.value.teachersSubjects.filter((TeachersSubject: TeachersSubjects) => TeachersSubject.Active))
    const dispatch = useDispatch()
    function deletechip(subjectid: string, teacherid: string) {
        // console.log(teacherid, 'hi')

        const chipToRemove = TeachersSubjects.find((teachersubject)=> teachersubject.SubjectId==subjectid && teachersubject.TeacherId==teacherid)
        // console.log(chipToRemove)
        dispatch(removeTeachersSubjects(chipToRemove))
    }
    return (<Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Typography>{label}</Typography>
        <FaTrash onClick={() => deletechip(subjectid,teacherid)}></FaTrash>

    </Box>

    )
}

export default ChipSubject