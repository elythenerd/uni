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
import session from 'express-session'
import cookieParser from 'cookie-parser'
import http from 'http'
const app = express()
const server: http.Server = http.createServer(app)
dotenv.config()

app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: '123',
    cookie: { maxAge: 60 * 60 * 60 * 24, secure: false},
    saveUninitialized: false,
    resave: false,
    rolling: true,
    
    // cookie: { secure: true }, // Comment this line if testing locally without HTTPS

}))
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

app.use('/api/users', userRouter)
app.use('/api/courses', cousreRouter)
app.use('/api/subjects', subjectRouter)
app.use('/api/students', studentsRouter)
app.use('/api/ts', teachersSubjectsRouter)
app.use('/api/cp', cousreParticipantRouter)



const port = process.env.PORT || 7000
const mongoUrl = process.env.MONGO_URL as string
server.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
mongoose.connect(mongoUrl).then(() => {
    console.log('connected to database')
}).catch((err) => {
    console.log(err)
})