import React from "react";
import { Subject } from "../../types/Subject";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { subjectState } from "../../types/Subject";
import { removeSubject } from "../../store/Subject";
import { FaTrash } from "react-icons/fa6";
import axios from "axios";
const SubjectCard = ({ subject }: { subject: Subject }) => {
    const Subjects = useSelector((state: subjectState) => state.subject.value.Subjects)
    const dispatch = useDispatch()
    function patchSubject(id: string) {
        try {
            const res = axios.patch(`http://localhost:8000/api/subjects/delete/${id}`)
            console.log(`deleted subject: ${res}`)
        } catch (e) {
            console.log('course not deleted', e)
        }

    }

    function deleteSubject(id: string) {
        // console.log(1)
        patchSubject(id)
        // dispatch(removeSubject(id))
    }
    return (
        <Card sx={{ width: 200, borderRadius: 5 }}>
            <CardContent sx={{ textAlign: 'center' }}>

                <Typography variant="h5" sx={{ color: 'black' }}>{subject?.Name}</Typography>
                <IconButton onClick={() => deleteSubject(subject.Id)} >
                    <FaTrash  ></FaTrash>
                </IconButton>

            </CardContent>
        </Card>

    )
}
export default SubjectCard