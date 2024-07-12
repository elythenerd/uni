import React,{createContext} from "react";
import { OpenSubjectInterface } from "../../../types/Subject";
// import { User } from "../types/User";
// import { UserContextType } from "../types/User";
const defaultValue: OpenSubjectInterface = {
    openSubject: false,
    setOpenSubject: () => {}
};
const OpenContext = createContext<OpenSubjectInterface>(defaultValue);

export default OpenContext