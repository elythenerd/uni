import { Router } from "express";
import { checkAuth, checkUserAuth, createUsers, deleteUser, getTeacherOptions, getUsers, logOut } from "../services/Users";

const userRouter = Router()

userRouter.post('/create',createUsers)
userRouter.get('/get',getUsers)
userRouter.post('/auth/login',checkUserAuth)
userRouter.get('/auth',checkAuth)
userRouter.get('/get/year/:year',getTeacherOptions)
userRouter.patch('/delete/:id',deleteUser)
userRouter.get('/logOut',logOut)

export default userRouter