import { JobType,GenderType } from "../../types/User";

export interface JobOption {
    label: string;
    value: JobType;
}
export const jobOptions: JobOption[] = [
    { label: JobType.TeacherLabel, value: JobType.Teacher },
    { label: JobType.BossLabel, value: JobType.Boss }
];
export interface GenderOption {
    label: string;
    value: GenderType;
}
export const genderOptions: GenderOption[] = [
    { label: GenderType.MaleLabel, value: GenderType.Male },
    { label: GenderType.FemaleLabel, value: GenderType.Female },
    { label: GenderType.OtherLabel, value: GenderType.Other }
];