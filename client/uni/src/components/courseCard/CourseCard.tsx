import React from "react";
import { Box, Card, CardContent, Chip, IconButton, Typography } from "@mui/material";
import { CourseInterface } from "../../types/Course";
import { useDispatch, useSelector } from "react-redux";
import { usersState } from "../../types/User";
import { subjectState } from "../../types/Subject";
import { MdDone } from "react-icons/md";
import { removeCourse } from "../../store/courses";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "axios";

const CourseCard = ({ course }: { course: CourseInterface }) => {
    const Users = useSelector((state: usersState) => state.users.value.users)
    const Subjects = useSelector((state: subjectState) => state.subject.value.Subjects)

    const teacher = Users.find(user => user.Id === course.TeacherId)
    const subject = Subjects.find(subject => subject.Id === course.SubjectId)
     console.log(Users)
    const dispatch = useDispatch()
    function patchCourse(id: string) {
        try {
            const res = axios.patch(`http://localhost:8000/api/courses/delete/${id}`)
            console.log(`deleted course: ${res}`)
        }catch (e){
            console.log( 'course not deleted',e)
        }
         
    }
    function deleteCourse(id: string) {
        patchCourse(id)
        dispatch(removeCourse(id))
    }
    return (

        <Card sx={{ width: 700 }}>
            <CardContent sx={{ textAlign: 'center' }}>

                <Typography variant="h5" sx={{ color: 'black' }}>{course.Name}</Typography>
                <Typography color="text.secondary">{teacher?.Name}</Typography>
                <Chip label={subject?.Name}></Chip>
                <Typography color={course.Status ? "green" : "red"}>{course.Status ? "פעיל" : 'סגור'}</Typography>
                {course.Status &&<IconButton onClick={() => deleteCourse(course.Id)}>
                    <TiDeleteOutline ></TiDeleteOutline>
                </IconButton>}

            </CardContent>
        </Card>


    )
}
export default CourseCard