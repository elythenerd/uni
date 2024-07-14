import React, { useState } from "react";
import { Box, Button, Dialog, DialogTitle } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import AddCourse from "../../components/AddCourse/AddCourse";
import AddSubject from "../../components/AddSubject/AddSubject";
import { useSelector } from "react-redux";
import { subjectState } from "../../types/Subject";
import SubjectsList from "../../components/subjectsList/subjectsList";
import AddTeacher from "../../components/addTeacher/addTeacher";
import { coursesState } from "../../types/Course";
import SubjectCard from "../../components/subjectCard/SubjectCard";
import CourseCard from "../../components/courseCard/CourseCard";
const BossPage = () => {
    const [openCourse, setOpenCourse] = useState<boolean>(false)
    const [openSubject, setOpenSubject] = useState<boolean>(false)
    const [openTeacher, setOpenTeacher] = useState<boolean>(false)
    const courses = useSelector((state: coursesState) => state.courses.value.courses)

    return (
        <Box sx={{ display: 'flex', width: '100vw', height: '100vh', flexDirection: 'column' }}>
            <Box sx={{ width: '100vw' }}>
                <Navbar></Navbar>
            </Box>
            <Box>
                <Button onClick={() => setOpenSubject(true)}>הוסף מקצוע חדש</Button>
                <Button onClick={() => setOpenCourse(true)}> הוסף קורס חדש</Button>
                
                <Box>
                <Dialog open={openCourse} onClose={() => setOpenCourse(false)}>
                        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>הוסף קורס</DialogTitle>
                        <AddCourse setOpenCourse={setOpenCourse}></AddCourse>
                    </Dialog>

                    <Dialog open={openSubject} onClose={() => setOpenSubject(false)}>
                        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>הוסף מקצוע</DialogTitle>
                        <AddSubject setOpenSubject={setOpenSubject}></AddSubject>
                    </Dialog>
               

                </Box>
                <Box>

                </Box>
            </Box>
            <SubjectsList></SubjectsList>
            {
                courses.map((cousre)=>{
                    return <CourseCard course={cousre}></CourseCard>
                })
            }
        </Box>
    )
}
export default BossPage