import React from "react";
import { Box, Button, Card, CardContent, Chip, IconButton, Stack, Typography } from "@mui/material";
import { CourseInterface } from "../../types/Course";
import { useDispatch, useSelector } from "react-redux";
import { usersState } from "../../types/User";
import { subjectState } from "../../types/Subject";
import { MdDone } from "react-icons/md";
import { removeCourse } from "../../store/courses";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }: { course: CourseInterface }) => {
    // const Users = useSelector((state: usersState) => state.users.value.users)
    // const Subjects = useSelector((state: subjectState) => state.subject.value.Subjects)
    const Navigator = useNavigate()
    // const teacher = Users.find(user => user.Id === course.TeacherId)
    // const subject = Subjects.find(subject => subject.Id === course.SubjectId)
    console.log(course)
    const dispatch = useDispatch()
    function patchCourse(id: string) {
        try {
            const res = axios.patch(`http://localhost:8000/api/courses/delete/${id}`)
            console.log(`deleted course: ${res}`)
        } catch (e) {
            console.log('course not deleted', e)
        }

    }
    function deleteCourse(id: string) {
        patchCourse(id)
        dispatch(removeCourse(id))
    }
    function toCourse(id:string,year:string|undefined){
        Navigator('/Course',{state:{CourseId:id,year:year}})
    }
    return (

        <Card sx={{ width: 700 }}>
            <CardContent sx={{ textAlign: 'center' }}>
                <Stack sx={{alignItems:'center'}}>
                    <Typography variant="h5" sx={{ color: 'black' }}>{course.Name}</Typography>
                    <Typography color="text.secondary">{course.TeacherName}</Typography>
                    <Chip sx={{width:'40%'}} label={course.SubjectName}></Chip>
                    <Typography color={course.Status ? "green" : "red"}>{course.Status ? "פעיל" : 'סגור'}</Typography>
                    {course.Status && <IconButton onClick={() => deleteCourse(course.Id)}>
                        <TiDeleteOutline ></TiDeleteOutline>
                    </IconButton>}
                    <Typography color="text.secondary">{course.enrollementYear}</Typography>
                    <Button onClick={()=>toCourse(course.Id,course?.enrollementYear)}>לפרטי קורס</Button>
                </Stack>
            </CardContent>
        </Card>


    )
}
export default CourseCard