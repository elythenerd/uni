import { Router } from "express";
import { checkAuth, checkUserAuth, createUsers, getTeacherOptions, getUsers } from "../services/Users";

const userRouter = Router()

userRouter.post('/create',createUsers)
userRouter.get('/get',getUsers)
userRouter.post('/auth/login',checkUserAuth)
userRouter.get('/auth',checkAuth)
userRouter.get('/get/year/:year',getTeacherOptions)

export default userRouter