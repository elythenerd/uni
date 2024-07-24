import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogTitle, Stack } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import AddCourse from "../../components/AddCourse/AddCourse";
import AddSubject from "../../components/AddSubject/AddSubject";
import { useDispatch, useSelector } from "react-redux";
import { subjectState } from "../../types/Subject";
import SubjectsList from "../../components/subjectsList/subjectsList";
import AddTeacher from "../../components/addTeacher/addTeacher";
import { CourseInterface, coursesState } from "../../types/Course";
import SubjectCard from "../../components/subjectCard/SubjectCard";
import CourseCard from "../../components/courseCard/CourseCard";
import AddStudent from "../../components/AddStudent/AddStudent";
import StudentsTable from "../../components/StudentsTable/StudentsTable";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabContext, TabPanel } from "@mui/lab";
import UserCardGrid from "../../components/UserCardGrid/UserCardGrid";
import CourseGrid from "../../components/CourseGrid/CourseGrid";
import axios from "axios";
import { setCourses } from "../../store/courses";
import { setStudents } from "../../store/students";
import { StudentsInterface, studentsState } from "../../types/Students";
import { setUsers } from "../../store/Users";
import { JobType, User, usersState } from "../../types/User";
const BossPage = () => {
    const [openCourse, setOpenCourse] = useState<boolean>(false)
    const [openSubject, setOpenSubject] = useState<boolean>(false)
    // const [openTeacher, setOpenTeacher] = useState<boolean>(false)
    const [openStudent, setopenStudent] = useState<boolean>(false)
    const [tabvalue, setTabValue] = useState<string>('0');

    const dispatch = useDispatch()
    useEffect(() => {
        fetchCourses()
        fetchStudents()
        fetchUsers()
    }, [])
    const fetchCourses = async () => {
        try {
            const res = axios.get('http://localhost:8000/api/courses/get/names')
            const courses: CourseInterface[] = (await res).data
            // console.log(users)
            dispatch(setCourses(courses))
            return courses
        } catch (e) {
            console.log('users not fetched', e)
        }
    }
    
    const fetchStudents = async () => {
        try {
            const res = axios.get('http://localhost:8000/api/students/get')
            const students: CourseInterface[] = (await res).data
            // console.log(users)
            dispatch(setStudents(students))
            return students
        } catch (e) {
            console.log('users not fetched', e)
        }
    }
    
    const fetchUsers = async () => {
        try {
            const res = axios.get('http://localhost:8000/api/users/get')
            const users: User[] = (await res).data
            // console.log(users)
            dispatch(setUsers(users))
            return users
        } catch (e) {
            console.log('users not fetched', e)
        }}
    const courses: CourseInterface[] = useSelector((state: coursesState) => state.courses.value.courses)
    const students: StudentsInterface[] = useSelector((state: studentsState) => state.students.value.students)
    const Users = useSelector((state: usersState) => state.users.value.users)

    return (
        <Box sx={{ display: 'flex', width: '100vw', height: '100vh', flexDirection: 'column' }}>
            <Box sx={{ width: '100vw' }}>
                <Navbar></Navbar>
            </Box>
            <Box>

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
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', height: '100%', width: '100vw' }}>
                    <TabContext value={tabvalue}>
                        <Box sx={{ justifyContent: 'center', display: 'flex', width: '100%' }}>
                            <Tabs
                                value={tabvalue}
                                onChange={(e: React.SyntheticEvent, newValue: string) => setTabValue(newValue)}>
                                <Tab value={'0'} label={'מקצועות'}></Tab>
                                <Tab value={'1'} label={'קורסים'}></Tab>
                                <Tab value={'2'} label={'תלמידים'}></Tab>
                                <Tab value={'3'} label={'מורים'}></Tab>
                            </Tabs>

                        </Box>
                        <Box sx={{ justifyContent: 'center', display: 'flex', width: '100%', alignItems: 'center' }}>
                            <TabPanel value="0" sx={{width:'100%',height:'100%'}}>
                                <Stack sx={{ gap: '2rem', display: 'flex', justifyContent: 'center' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button sx={{ width: '8rem' }} onClick={() => setOpenSubject(true)}>הוסף מקצוע חדש</Button>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <SubjectsList></SubjectsList>
                                    </Box>
                                </Stack>


                            </TabPanel >
                            <TabPanel value='1' sx={{width:'100%',height:'100%'}}>
                                <CourseGrid courses={courses}></CourseGrid>
                            </TabPanel>
                            <TabPanel value="2" sx={{width:'100%',height:'100%'}}>
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                                    <Button onClick={() => setopenStudent(true)}> הוסף תלמיד חדש</Button>
                                    <StudentsTable students={students.filter((student) => student.Status)}></StudentsTable>
                                </Box>
                            </TabPanel>
                            <TabPanel value="3" sx={{width:'100%',height:'100%'}}>
                                <Stack>
                                    <Button onClick={() => setOpenCourse(true)}> הוסף קורס חדש</Button>
                                    <UserCardGrid Users={Users.filter((user)=> user.Job === JobType.Teacher)} set={true}></UserCardGrid>
                                </Stack>




                            </TabPanel>


                        </Box>
                    </TabContext>
                </Box>
            </Box>


        </Box>
    )
}
export default BossPage