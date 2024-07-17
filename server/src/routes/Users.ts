import { Router } from "express";
import { createUsers, getUsers } from "../services/Users";

const userRouter = Router()

userRouter.post('/api/users/create',createUsers)
userRouter.get('/api/users/get',getUsers)


export default userRouter