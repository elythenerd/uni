import React, { useState } from "react";
import UserContext from "./usersContext";
import { User } from "../types/User";
const UserContextProvider = ({children}: { children: React.ReactNode })=>{
    const [Users,setUsers] = useState<User[]>([])
    return (
        <UserContext.Provider value ={{Users,setUsers}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider