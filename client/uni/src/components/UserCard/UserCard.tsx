import React, { useContext, useEffect, useState } from "react";
import './UserCard.css'
import UserContext from "../../context/usersContext";
import { Avatar, Box, Button, Card, CardContent, Chip, Dialog, IconButton, Stack, Typography } from "@mui/material";
import { JobType, User } from "../../types/User";
import { FaBirthdayCake } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import AddSubjectTeacher from "../AddSubjectTeacher/AddSubjectTeacher";
import { useDispatch, useSelector } from "react-redux";
import { Subject, subjectState } from "../../types/Subject";
import { TeachersSubjects, teachersSubjectsState } from "../../types/TeachersSubjects";
import ChipSubject from "./ChipSubject";
import { setTeachersSubjects } from "../../store/TeachersSubjects";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import methods from "../../utils/methods";
import { AiOutlineUserDelete } from "react-icons/ai";
import { removeUser } from "../../store/Users";

export const UserCard = ({ user, set }: { user: User, set: boolean }) => {
    const navigator = useNavigate()
    const [teacherMode, setTeacherMode] = useState<boolean>(set)
    const [OpenTeacherSubject, setOpenTeacherSubject] = useState<boolean>(false)
    const dispatch = useDispatch()
    useEffect(() => {
        fetchTeachersSubjects()
    }, [])
    const fetchTeachersSubjects = async () => {
        try {
            const res = methods.get('http://localhost:8000/api/ts/get')
            const TeachersSubjects: TeachersSubjects[] = (await res).data
            //  console.log(TeachersSubjects)
            dispatch(setTeachersSubjects(TeachersSubjects))
            return TeachersSubjects
        } catch (e) {
            console.log('users not fetched', e)
        }
    }
    const toTeacherPage = () => {

        navigator('/Teacher', { state: { id: user.Id } })
    }
    const TeachersSubjects = useSelector((state: teachersSubjectsState) => state.teachersSubjects.value.teachersSubjects.filter((TeachersSubject: TeachersSubjects) => TeachersSubject.Active && TeachersSubject.TeacherId == user.Id))
    const Subjects = useSelector((state: subjectState) => state.subject.value.Subjects)


    function getInitials(name: string) {
        const initials = name.match(/\b\p{L}/gu) || [];
        return initials.join('');
    }
    const checkBirthday = (date: string) => {
        const birthDate = new Date(date)
        const today = new Date()
        const todaysYear = today.getFullYear()
        const birthDateMonth = birthDate.getMonth()
        const birthDateDay = birthDate.getDate()
        let dateToCheckString = `${todaysYear}-${birthDateMonth+1}-${birthDateDay}`
        let pastDate = new Date();
        let dateToCheck = new Date(dateToCheckString)
        pastDate.setDate(pastDate.getDate() - 7);
        // console.log(dateToCheckString)
        return (dateToCheck >= pastDate && dateToCheck<=today)
    }
    function getSubject(id: string) {
        const subjectObj: Subject | undefined = Subjects.find((subject) => subject.Id == id)
        return subjectObj?.Name
    }
    const deleteUser = async (id:string)=>{
        try{
            await methods.patch(`http://localhost:8000/api/users/delete/${id}`)
            dispatch(removeUser(id))
            console.log('patch not created')
        }catch(e){
            console.log(e)
        }
        
    }
    return (
        // <div className="userCardContainer">
        //     <div className="avatar-name-container">
        //         {checkBirthday(user.DateOfBirth) && <FaBirthdayCake></FaBirthdayCake>}
        //         <Avatar alt="Remy Sharp" src={user.ProfilePicture}>{getInitials(user.Name)}</Avatar>
        //         <label className="cardName">{user.Name}</label>
        //         <label className="cardJob">{user.Job == JobType.Boss ? JobType.BossLabel : JobType.TeacherLabel}</label>

        //     </div>



        // </div>

        <Card sx={{ width: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                {checkBirthday(user.BirthDate) && !teacherMode && <FaBirthdayCake className="birthday"></FaBirthdayCake>}
                <Avatar alt="Remy Sharp" src={user?.ProfilePicture}>{getInitials(user.Name)}</Avatar>
                <Typography color="text.secondary">{user.Name}</Typography>
                <Chip label={user.Job == JobType.Boss ? JobType.BossLabel : JobType.TeacherLabel}></Chip>
                {teacherMode &&
                    <Box sx={{ direction: 'rtl' }}>
                        <Box sx={{ display: 'flex', width: '90%' }}>
                            {TeachersSubjects.map((teachersubject) => {
                                return <Chip label={<ChipSubject id={teachersubject.Id} teacherid={teachersubject.TeacherId} subjectid={teachersubject.SubjectId} label={getSubject(teachersubject.SubjectId)}></ChipSubject>}></Chip>
                            })}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                            <IconButton>
                                <CiCirclePlus onClick={() => setOpenTeacherSubject(true)}></CiCirclePlus>

                            </IconButton>
                            <Button onClick={() => toTeacherPage()}>קורסים</Button>
                            <IconButton>
                                <AiOutlineUserDelete onClick={()=>deleteUser(user.Id)}></AiOutlineUserDelete>
                            </IconButton>
                        </Box>
                        <Dialog open={OpenTeacherSubject} onClose={() => setOpenTeacherSubject(false)}>
                            <AddSubjectTeacher setOpenTeacherSubject={setOpenTeacherSubject} teacherid={user.Id}></AddSubjectTeacher>
                        </Dialog>
                    </Box>}
            </CardContent>
        </Card>


    )
}