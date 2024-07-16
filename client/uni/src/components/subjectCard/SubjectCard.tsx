import React from "react";
import { Subject } from "../../types/Subject";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { subjectState } from "../../types/Subject";
import { removeSubject } from "../../store/Subject";
import { FaTrash } from "react-icons/fa6";
const SubjectCard = ({ subject }: { subject: Subject }) => {
    const Subjects = useSelector((state: subjectState) => state.subject.value.Subjects)
    const dispatch = useDispatch()
    function deleteSubject(id: string) {
        console.log(1)
        dispatch(removeSubject(id))
    }
    return (
        <Card sx={{ width: 200,borderRadius:5 }}>
            <CardContent sx={{ textAlign: 'center' }}>

                <Typography variant="h5" sx={{ color: 'black' }}>{subject?.Name}</Typography>
                <IconButton sx={{width:1,height:1}}>
                    <FaTrash  onClick={() => deleteSubject(subject.ID)}></FaTrash>
                </IconButton>

            </CardContent>
        </Card>

    )
}
export default SubjectCard