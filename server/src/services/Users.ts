import Users from "../../models/Users";
import { Response,Request } from "express";
import { userCredentials, userInterface } from "../../types/users";
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



export async function checkUserAuth(req: Request, res: Response) {

    try {
        const User :userCredentials = req.body
        console.log(Users)
       
        const users:userInterface[] = await Users.get()
        // const Password = users.find((user)=> user.Password === User.Password)
        const selectedUser = users.find((user)=> user.Id === User.Id)
        
        if (!selectedUser || selectedUser.Password !==User.Password){
            return res.status(401).send('bad credentials')
        }
        else {
            // console.log(selectedUser)
            req.session.user = selectedUser
            console.log(req.session)
            return res.status(200).send(selectedUser)
        }
        
    }catch (e){
        res.send(e).status(400)
    }
}




export async function checkAuth(req: Request, res: Response) {

    try {
        if (!req.session.user){
            return res.status(401).send('need to login')
        }else{
            res.status(200).send(req.session.user)
        }
        // const User :userCredentials = req.body
        // console.log(Users)
       
        // const users:userInterface[] = await Users.get()
        // // const Password = users.find((user)=> user.Password === User.Password)
        // const selectedUser = users.find((user)=> user.Id === User.Id)
        
        // if (!selectedUser || selectedUser.Password !==User.Password){
        //     return res.status(401).send('bad credentials')
        // }
        
        
    }catch (e){
        res.send(e).status(400)
    }
}

