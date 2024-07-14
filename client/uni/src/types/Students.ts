export interface StudentsInterface{
    Id : string,
    Name : string,
    BirthYear :string
}

export interface studentsState {
    students : studentsValue
}

export interface studentsValue{
    value: {students:StudentsInterface[]}
}