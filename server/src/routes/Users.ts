import { Router } from "express";
import { checkAuth, checkUserAuth, createUsers, getUsers } from "../services/Users";

const userRouter = Router()

userRouter.post('/create',createUsers)
userRouter.get('/get',getUsers)
userRouter.post('/auth/login',checkUserAuth)
userRouter.get('/auth',checkAuth)

export default userRouter