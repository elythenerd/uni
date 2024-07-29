import React, { useEffect } from "react";
import { useDispatch, useSelector, UseSelector } from "react-redux";
import { Subject, subjectState } from "../../types/Subject";
import SubjectCard from "../subjectCard/SubjectCard";
import { Box, Grid } from "@mui/material";
import { setSubjects } from "../../store/Subject";
import axios from "axios";
const SubjectsList = () => {

    const dispatch  = useDispatch()
    useEffect(()=>{
        fetchSubjects()
    },[])
    const fetchSubjects = async ()=>{
        try{
        const res = axios.get('http://localhost:8000/api/subjects/get')
        const subjects : Subject[] = (await res).data
        // console.log(subjects)
        dispatch(setSubjects(subjects))
        return subjects
        }catch(e){
            console.log('users not fetched',e)
        }
    }
    const Subjects = useSelector((state: subjectState) => state.subject.value.Subjects)
    // console.log(Subjects.filter((subject)=>subject.Active),1)
    return (
        
            <Grid container   >
                {
                    Subjects.filter((subject)=>subject.Active).map((subject) => {
                        return (
                            <Grid item xs={2} sx={{padding:'10px'}} >
                                <SubjectCard key={subject.Id} subject={subject}></SubjectCard>
                            </Grid>)
                    })
                }
            </Grid>


    )
}
export default SubjectsList