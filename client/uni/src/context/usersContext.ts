import React,{createContext} from "react";
import { User } from "../types/User";
import { UserContextType } from "../types/User";

const  UserContext = createContext<UserContextType |undefined>(undefined)

export default UserContext