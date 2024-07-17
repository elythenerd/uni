import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRouter from './routes/Users'
import cousreRouter from './routes/Courses'
import subjectRouter from './routes/Subjects'
import studentsRouter from './routes/Students'
import teachersSubjectsRouter from './routes/TeacherSubjects'
import cousreParticipantRouter from './routes/CourseParticipants'
import cors from 'cors'
const app = express()
dotenv.config()
console.log(1)

app.use(express.json())
app.use(cors())
app.use('/',userRouter)
app.use('/',cousreRouter)
app.use('/',subjectRouter)
app.use('/',studentsRouter)
app.use('/',teachersSubjectsRouter)
app.use('/',cousreParticipantRouter)



const port = process.env.PORT||7000
const mongoUrl = process.env.MONGO_URL as string
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
mongoose.connect(mongoUrl).then(()=>{
    console.log('connected to database')
}).catch((err)=>{
    console.log(err)
})