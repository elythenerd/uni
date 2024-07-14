import { Dispatch,SetStateAction } from "react"
export interface Subject {
    Name:string,
    ID: string
}

export interface OpenSubjectInterface{
    openSubject: boolean,
    setOpenSubject: Dispatch<SetStateAction<boolean>>
}

export interface subjectState {
    subject : subjectValue
}

export interface subjectValue{
    value: {Subjects:Subject[]}
}