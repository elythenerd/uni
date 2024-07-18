import { Router } from "express";
import { createUsers, getUsers } from "../services/Users";

const userRouter = Router()

userRouter.post('/create',createUsers)
userRouter.get('/get',getUsers)


export default userRouter