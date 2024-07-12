import { Dispatch,SetStateAction } from "react"
export interface Subject {
    Name:string,
    id: string
}

export interface OpenSubjectInterface{
    openSubject: boolean,
    setOpenSubject: Dispatch<SetStateAction<boolean>>
}