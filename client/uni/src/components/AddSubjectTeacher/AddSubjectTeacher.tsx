import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Subject, subjectState } from "../../types/Subject";
import { TeachersSubjects, teachersSubjectsState } from "../../types/TeachersSubjects";
import { addTeachersSubjects, setTeachersSubjects } from "../../store/TeachersSubjects";
import { v4 } from "uuid";
import axios from "axios";

const AddSubjectTeacher = ({ teacherid, setOpenTeacherSubject, OpenTeacherSubject }: { teacherid: string, setOpenTeacherSubject: React.Dispatch<React.SetStateAction<boolean>>, OpenTeacherSubject: boolean }) => {
    const [SubjectId, setSubjectId] = useState<string>('')
    const [subjects, setSubjects] = useState<Subject[]>([])

    const TeachersSubjects = useSelector((state: teachersSubjectsState) => state.teachersSubjects.value.teachersSubjects.filter((TeachersSubject: TeachersSubjects) => TeachersSubject.Active && TeachersSubject.TeacherId == teacherid)).map((ts) => ts.SubjectId)
    console.log(TeachersSubjects)
    const Subjects = useSelector((state: subjectState) => state.subject.value.Subjects.filter((subject: Subject) => subject.Active && !TeachersSubjects.includes(subject.Id)))


    const dispatch = useDispatch()
    async function getSubjectOptions(id: string) {
        const res = await axios.get(`http://localhost:8000/api/subjects/options/${id}`)
        console.log(res.data)
        setSubjects(res.data)
        return subjects
    }
    async function createTeacherSubject(newTeacherSubject: TeachersSubjects) {
        try {
            const res = await axios.post('http://localhost:8000/api/ts/create', newTeacherSubject)

            console.log('post created')
        } catch (e) {
            console.log('posting user failed:', e)
        }


    }
    const checkAddTeachersSubject = () => {
        if (SubjectId) {
            const newTeacherSubject: TeachersSubjects = {
                Id: v4(),
                TeacherId: teacherid,
                SubjectId: SubjectId,
                Active: true
            }
            createTeacherSubject(newTeacherSubject)
            // dispatch(addTeachersSubjects(newTeacherSubject))
            setOpenTeacherSubject(false)
        }
    }
    return (<Dialog fullWidth maxWidth='sm' open={OpenTeacherSubject} onClose={() => setOpenTeacherSubject(false)}>
        <DialogTitle>מקצועות להוספה</DialogTitle>
        <DialogContent  >
            <TextField fullWidth select label='מקצוע' variant="standard" onClick={() => getSubjectOptions(teacherid)}>
                {
                    Subjects.map((option) => {
                        return <MenuItem key={option.Id} value={option.Id} onClick={(e: React.MouseEvent<HTMLLIElement>) => setSubjectId(option.Id)}>{option.Name} </MenuItem>
                    })

                }
            </TextField>
        </DialogContent>
        <DialogActions sx={{ alignItems: 'center' }}>
            <Button onClick={() => checkAddTeachersSubject()}>הוסף</Button>
        </DialogActions>

        {/* <Button onClick={() => checkAddTeachersSubject()}>הוסף</Button> */}
    </Dialog>
    )
}

export default AddSubjectTeacher