import React, { useState } from "react";
import { Box, Button, Dialog, DialogTitle } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import AddCourse from "../../components/AddCourse/AddCourse";
import AddSubject from "../../components/AddSubject/AddSubject";
const BossPage = ()=>{
    const [openCourse,setOpenCourse] = useState<boolean>(false)
    const [openSubject,setOpenSubject] = useState<boolean>(false)

   
    return (
        <Box sx={{ display: 'flex', width: '100vw', height: '100vh', flexDirection:'column'}}>
        <Box sx={{ width: '100vw' }}>
            <Navbar></Navbar>
        </Box>
        <Box>
            <Button onClick={()=>setOpenSubject(true)}>הוסף מקצוע חדש</Button>
            <Button onClick={()=>setOpenCourse(true)}> הוסף קורס חדש</Button>
            <Box>
                <Dialog open={openCourse} onClose={()=>setOpenCourse(false)}>
                    <DialogTitle sx={{display:"flex",justifyContent:"center"}}>הוסף קורס</DialogTitle>
                    <AddCourse></AddCourse>
                    <Button onClick={()=> setOpenCourse(false)}>הוסף</Button>
                </Dialog>
                
                <Dialog open={openSubject} onClose={()=>setOpenSubject(false)}>
                    <DialogTitle sx={{display:"flex",justifyContent:"center"}}>הוסף מקצוע</DialogTitle>
                   <AddSubject></AddSubject>
                    <Button onClick={()=> setOpenSubject(false)}>הוסף</Button>
                </Dialog>
                
            </Box>
            <Box>
                
            </Box>
        </Box>

    </Box>
    )
}
export default BossPage