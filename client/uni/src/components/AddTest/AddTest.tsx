import react from 'react'
import methods from '../../utils/methods'
import { useSelector } from 'react-redux'
import { cpInterface, cpState, cpStateStudents } from '../../types/CourseParticicpants'
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import StudentsTable from '../StudentsTable/StudentsTable'
import { StudentsInterface } from '../../types/Students'
import { DialogActions } from '@mui/material'

const AddTest = ({ OpenAddTest, setOpenAddTest }: { OpenAddTest: boolean,setOpenAddTest: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const courseParticipants = useSelector((state: cpStateStudents) => state.courseParticipants.value.courseParticipants)
    const grades = useSelector((state: cpState) => state.grades.value.courseParticipants)

    async function postCourseParticipants(body: cpInterface[]) {
        try {
            // body.forEach((cp)=> cp.Active=true)
            console.log(body)
            const req = await methods.post('http://localhost:8000/api/cp/createMany', body)
            console.log('post created \n', req)
        } catch (e) {
            console.log(e, 'error')
        }
    }
    const checkAddTest = () => {
        console.log(grades)
        if (grades.filter((cp) => parseInt(cp.Grade as string) >= 0 && parseInt(cp.Grade as string) <= 100).length === grades.length && grades.length===courseParticipants.length) {
            postCourseParticipants(grades)
            console.log(grades)
            setOpenAddTest(false)
        } else {
            console.log('not good')
        }
    }
    return (
        <Dialog sx={{ 'alignItems': 'center' }} fullWidth maxWidth='lg' open={OpenAddTest} onClose={() => setOpenAddTest(false)}  >
            <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>הזן ציונים</DialogTitle>
            <DialogContent sx={{ display: "flex", justifyContent: "center", flexDirection: 'column', alignItems: 'center' }}>
                <StudentsTable students={courseParticipants as StudentsInterface[]} course={true} addGrade={true} ></StudentsTable>
                <DialogActions>
                    <Button sx={{ padding: '5px' }} onClick={() => checkAddTest()}>שמור מבחן</Button>

                </DialogActions>

            </DialogContent>
        </Dialog>
    )
}
export default AddTest