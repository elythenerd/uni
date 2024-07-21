import { Box, Button, Dialog, Stack, Typography } from '@mui/material';
import react from 'react';
import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import StudentsTable from '../../components/StudentsTable/StudentsTable';
import { useSelector } from 'react-redux';
import { cpInterface, cpState } from '../../types/CourseParticicpants';
import axios from 'axios';

const Course = () => {
    const [OpenAddTest, setOpenAddTest] = useState<boolean>(false)
    const courseParticipants = useSelector((state: cpState) => state.courseParticipants.value.courseParticipants)

    async function postCourseParticipants(body:cpInterface[]) {
        try {
            console.log(body)
            const req = await axios.post('http://localhost:8000/api/cp/createMany',body)
            console.log('post created \n',req)
        }catch(e){
            console.log(e,'error')
        }
    }

    const checkAddTest = () => {
        if (courseParticipants.filter((cp) => parseInt(cp.Grade) >= 0 && parseInt(cp.Grade) <= 100).length === courseParticipants.length) {
            postCourseParticipants(courseParticipants)
        } else {
            console.log('not good')
        }
    }
    return (
        <Stack sx={{ width: '100vw', height: '100vh', alignItems: 'center' }}>
            <Navbar></Navbar>
            <Button sx={{ width: '10%', height: '5%' }} onClick={() => setOpenAddTest(true)}>הוסף מבחן</Button>
            <Dialog open={OpenAddTest} onClose={() => setOpenAddTest(false)} maxWidth='lg' >
                <Stack >
                    <StudentsTable></StudentsTable>
                    <Button sx={{ padding: '5px' }} onClick={() => checkAddTest()}>שמור מבחן</Button>
                </Stack>
            </Dialog>
        </Stack>
    )
}

export default Course