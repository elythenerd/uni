import React from "react";
import { useSelector, UseSelector } from "react-redux";
import { subjectState } from "../../types/Subject";
import SubjectCard from "../subjectCard/SubjectCard";
const SubjectsList = ()=>{
    const Subjects = useSelector((state: subjectState) => state.subject.value.Subjects)

    return (
        Subjects.map((subject)=>{
            return <SubjectCard key={subject.ID} subject={subject}></SubjectCard>
        })
    )
}
export default SubjectsList