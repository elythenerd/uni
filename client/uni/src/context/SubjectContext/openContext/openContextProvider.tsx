import React, { useState } from "react";
// import UserContext from "./usersContext";
// import { User } from "../types/User";
import OpenContext from "./openContext";
const OpenContextProvider = ({children}: { children: React.ReactNode })=>{
    const [openSubject,setOpenSubject] = useState<boolean>(false)
    return (
        <OpenContext.Provider value ={{openSubject,setOpenSubject}}>
            {children}
        </OpenContext.Provider>
    )
}

export default OpenContextProvider