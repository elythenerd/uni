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
import AddStudent from "../../components/AddStudent/AddStudent";
import StudentsTable from "../../components/StudentsTable/StudentsTable";
const BossPage = () => {
    const [openCourse, setOpenCourse] = useState<boolean>(false)
    const [openSubject, setOpenSubject] = useState<boolean>(false)
    // const [openTeacher, setOpenTeacher] = useState<boolean>(false)
    const [openStudent, setopenStudent] = useState<boolean>(false)

    const courses = useSelector((state: coursesState) => state.courses.value.courses)

    return (
        <Box sx={{ display: 'flex', width: '100vw', height: '100vh', flexDirection: 'column' }}>
            <Box sx={{ width: '100vw' }}>
                <Navbar></Navbar>
            </Box>
            <Box>
                <Button onClick={() => setOpenSubject(true)}>הוסף מקצוע חדש</Button>
                <Button onClick={() => setOpenCourse(true)}> הוסף קורס חדש</Button>
                <Button onClick={() => setopenStudent(true)}> הוסף תלמיד חדש</Button>

                <Box>
                <Dialog open={openCourse} onClose={() => setOpenCourse(false)}>
                        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>הוסף קורס</DialogTitle>
                        <AddCourse setOpenCourse={setOpenCourse}></AddCourse>
                    </Dialog>

                    <Dialog open={openSubject} onClose={() => setOpenSubject(false)}>
                        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>הוסף מקצוע</DialogTitle>
                        <AddSubject setOpenSubject={setOpenSubject}></AddSubject>
                    </Dialog>

                    <Dialog open={openStudent} onClose={() => setopenStudent(false)}>
                        <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>הוסף תלמיד</DialogTitle>
                        <AddStudent setopenStudent={setopenStudent}></AddStudent>
                    </Dialog>
               

                </Box>
                <Box>
                    <StudentsTable></StudentsTable>
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