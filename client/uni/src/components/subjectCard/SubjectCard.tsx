import React from "react";
import { Subject } from "../../types/Subject";
import { Box, Typography } from "@mui/material";
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { subjectState } from "../../types/Subject";
import { removeSubject } from "../../store/Subject";
const SubjectCard = ({subject}:{subject:Subject})=>{
    const Subjects = useSelector((state: subjectState) => state.subject.value.Subjects)
    const dispatch = useDispatch()
    function deleteSubject(id:string){
        console.log(1)
        dispatch(removeSubject(id))
    }
    return (
        <Box  sx={{backgroundColor:"rgb(80, 139, 241)",borderRadius:'5px',height:'5rem',width:'5rem',alignItems:'center',alignContent:'center',display:'flex',flexDirection:'column',wordWrap:'break-word'}}>
            <FaTrashCan onClick={()=>deleteSubject(subject.ID)}></FaTrashCan>
            <Typography  sx={{color:'white'}}>{subject.Name}</Typography>
        </Box>
    )
}
export default SubjectCard