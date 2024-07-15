import { Button, MenuItem, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Subject, subjectState } from "../../types/Subject";
import { TeachersSubjects, teachersSubjectsState } from "../../types/TeachersSubjects";
import { setTeachersSubjects } from "../../store/TeachersSubjects";

const AddSubjectTeacher = ({ teacherid,setOpenTeacherSubject }: { teacherid: string,setOpenTeacherSubject: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const TeachersSubjects = useSelector((state: teachersSubjectsState) => state.teachersSubjects.value.teachersSubjects.filter((TeachersSubject: TeachersSubjects) =>TeachersSubject.Active && TeachersSubject.TeacherId==teacherid )).map((ts)=>ts.SubjectId) 
    console.log(TeachersSubjects)
    const Subjects = useSelector((state: subjectState) => state.subject.value.Subjects.filter((subject: Subject) => subject.Active && !TeachersSubjects.includes(subject.ID) ))

    const [SubjectId, setSubjectId] = useState<string>('')
    const dispatch = useDispatch()
    const checkAddTeachersSubject = () => {
        if (SubjectId) {
            const newTeacherSubject: TeachersSubjects = {
                TeacherId: teacherid,
                SubjectId: SubjectId,
                Active: true
            }
            dispatch(setTeachersSubjects(newTeacherSubject))
            setOpenTeacherSubject(false)
        }
    }
    return (<Stack>
        <TextField select label='מקצוע' sx={{ direction: 'rtl' }}>
            {
                Subjects.map((option) => {
                    return <MenuItem key={option.ID} value={option.ID} onClick={(e: React.MouseEvent<HTMLLIElement>) => setSubjectId(option.ID)}>{option.Name} </MenuItem>
                })

            }
        </TextField>
        <Button onClick={() => checkAddTeachersSubject()}>הוסף</Button>
    </Stack>
    )
}

export default AddSubjectTeacher