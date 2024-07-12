import { Box } from "@mui/material";
import React, { useState,useContext } from "react";
import { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import { OpenSubjectInterface } from "../../types/Subject";
import OpenContext from "../../context/SubjectContext/openContext/openContext";

const AddSubject = () => {
    const [Subject,setSubject] = useState<string>()
    const [SubjectId,setSubjectId] = useState<string>()
    const { openSubject, setOpenSubject }: OpenSubjectInterface = useContext(OpenContext)

    return (
        <Box>
            <TextField required label='שם' onChange={(e: ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)} />

        </Box>)
}
export default AddSubject