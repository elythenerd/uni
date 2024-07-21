import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { cpInterface, cpState } from "../../types/CourseParticicpants";
import { useDispatch, useSelector } from "react-redux";
import { addGrade, changegrade } from "../../store/CourseParticipants";

const AddGrade = ({ id, courseId}: { id: string, courseId: string }) => {
    const [grade, setGrade] = useState<string>('')
    const dispatch = useDispatch()
    
    // const [coursParticipants, setCourseParticicpants] = useState<cpInterface[]>([])

    const courseParticipants = useSelector((state: cpState) => state.courseParticipants.value.courseParticipants)
    const checkGrade = () => {
        const parsedGrade = parseInt(grade, 10)
        if (parsedGrade > 100 || parsedGrade < 0) {
            return true
        } else {

        }
    }
    const addParticipant = (id: string, courseId: string, grade: string) => {
        const participant: cpInterface = {
            CourseId: courseId,
            StudentId: id,
            Grade: grade
        }
        // // console.log(participant)

        // setCourseParticicpants((prevParticipants) => {

        //     const existingParticipant = prevParticipants.find((cp) => cp.StudentId == id);
        //     // console.log(existingParticipant)
        //     if (!existingParticipant) {
        //         return [...prevParticipants, participant]
        //     } else {
        //         // console.log(1)
        //         return prevParticipants.map((value) =>
        //             value.StudentId === id ? { ...value, Grade: grade } : value)
        //     }
        // })
        // console.log(courseParticipants)


        const existingParticipant = courseParticipants.find((cp) => cp.StudentId == id);
        if (!existingParticipant) {
            dispatch(addGrade(participant))
        } else {
            dispatch(changegrade(participant))
        }
        // console.log(courseParticipants)
    }
    return (
        <TextField sx={{ width: 100, direction: 'rtl', textAlign: 'center' }} error={checkGrade()} label={checkGrade() ? 'הזן ציון בין 0-100' : 'הזן ציון'} type="number" variant="standard" inputProps={{ min: 0, max: 100 }} value={grade} onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setGrade(event.target.value) }} onBlur={() => addParticipant(id, courseId, grade)}></TextField>)
}

export default AddGrade