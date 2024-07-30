import { StudentsInterface } from "./Students"

export interface cpInterface {
    CourseId: string,
    StudentId: string,
    Grade?: string,


}
export interface cpState {
    grades: cpValue
}

export interface cpValue {
    value: { courseParticipants: cpInterface[] }
}
export interface cpStateStudents {
    courseParticipants: cpValueStudents
}

export interface cpValueStudents {
    value: { courseParticipants: StudentsInterface[] }
}

export interface PieGradesInterface {
    _id: string,
    count: number,
    color: string
}

export interface avgGradesInterface {
    _id: string,
    avgGrade: number
}