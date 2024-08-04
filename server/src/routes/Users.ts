import { Router } from "express";
import { checkAuth, checkUserAuth, createUsers, deleteUser, getTeacherOptions, getUsers, logOut, postMulter } from "../services/Users";
import { upload } from "../utils/Multer";

const userRouter = Router()

userRouter.post('/create',createUsers)
userRouter.get('/get',getUsers)
userRouter.post('/auth/login',checkUserAuth)
userRouter.get('/auth',checkAuth)
userRouter.get('/get/year/:year',getTeacherOptions)
userRouter.patch('/delete/:id',deleteUser)
userRouter.get('/logOut',logOut)
userRouter.post('/upload/:id',upload.single('file'),postMulter)

export default userRouter