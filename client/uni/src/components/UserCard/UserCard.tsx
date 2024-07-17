import React, { useContext, useState } from "react";
import './UserCard.css'
import UserContext from "../../context/usersContext";
import { Avatar, Box, Card, CardContent, Chip, Dialog, IconButton, Stack, Typography } from "@mui/material";
import { JobType, User } from "../../types/User";
import { FaBirthdayCake } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import AddSubjectTeacher from "../AddSubjectTeacher/AddSubjectTeacher";
import { useSelector } from "react-redux";
import { Subject, subjectState } from "../../types/Subject";
import { TeachersSubjects, teachersSubjectsState } from "../../types/TeachersSubjects";
import ChipSubject from "./ChipSubject";

export const UserCard = ({ user, set }: { user: User, set: boolean }) => {
    // console.log(Users)
    const TeachersSubjects = useSelector((state: teachersSubjectsState) => state.teachersSubjects.value.teachersSubjects.filter((TeachersSubject: TeachersSubjects) => TeachersSubject.Active))
    const Subjects = useSelector((state: subjectState) => state.subject.value.Subjects)

    const [teacherMode, setTeacherMode] = useState<boolean>(set)
    const [OpenTeacherSubject, setOpenTeacherSubject] = useState<boolean>(false)

    function getInitials(name: string) {
        const initials = name.match(/\b\p{L}/gu) || [];
        return initials.join('');
    }
    const checkBirthday = (date: string) => {
        let pastDate = new Date();
        let dateToCheck: Date = new Date(date)
        pastDate.setDate(pastDate.getDate() - 7);

        return dateToCheck >= pastDate
    }
    function getSubject(id: string) {
        const subjectObj: Subject | undefined = Subjects.find((subject) => subject.ID == id)
        return subjectObj?.Name
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
        <Box>
            <Card sx={{ width: 200 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    {checkBirthday(user.DateOfBirth) && !teacherMode && <FaBirthdayCake></FaBirthdayCake>}
                    <Avatar alt="Remy Sharp" src={user?.ProfilePicture}>{getInitials(user.Name)}</Avatar>
                    <Typography color="text.secondary">{user.Name}</Typography>
                    <Chip label={user.Job == JobType.Boss ? JobType.BossLabel : JobType.TeacherLabel}></Chip>
                    {teacherMode &&
                        <Box sx={{ direction: 'rtl' }}>
                            {TeachersSubjects.map((teachersubject) => {
                                return <Chip label={<ChipSubject id={teachersubject.Id} teacherid={teachersubject.TeacherId} subjectid={teachersubject.SubjectId} label={getSubject(teachersubject.SubjectId)}></ChipSubject>}></Chip>
                            })}
                            <IconButton>
                                <CiCirclePlus onClick={() => setOpenTeacherSubject(true)}></CiCirclePlus>
                            </IconButton>
                            <Dialog open={OpenTeacherSubject} onClose={() => setOpenTeacherSubject(false)}>
                                <AddSubjectTeacher setOpenTeacherSubject={setOpenTeacherSubject} teacherid={user.Id}></AddSubjectTeacher>
                            </Dialog>
                        </Box>}
                </CardContent>
            </Card>

        </Box>
    )
}