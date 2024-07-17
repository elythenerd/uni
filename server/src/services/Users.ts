import Users from "../../models/Users";
import { Response,Request } from "express";
import { userInterface } from "../../types/users";
export async function createUsers(req: Request, res: Response) {
    try {
        const user : userInterface = req.body
        // console.log(Object.keys().)
        await Users.create(user)
        res.json().status(200)
    }catch (e){
        res.send(e).status(400)
    }
}




export async function getUsers(req: Request, res: Response) {
    try {
        console.log(Users)
       
        const users:userInterface[] = await Users.get()
        res.send(users).status(200)
    }catch (e){
        res.send(e).status(400)
    }
}