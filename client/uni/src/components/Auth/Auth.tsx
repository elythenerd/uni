import axios from "axios"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { User } from "../../types/User"
import { useDispatch } from "react-redux"
import { setLoggedUser } from "../../store/LoggedUser"
import { Box } from "@mui/material"
const Auth = () => {
    const dispatch = useDispatch()
    const navigator = useNavigate()
    useEffect(() => {
        checkAuth()
    }, [])
    const checkAuth = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/users/auth', { withCredentials: true })
            // console.log(res)
            const user: User = res.data
            // console.log(user)
            dispatch(setLoggedUser(user))
            navigator('/')
        } catch (e) {
            navigator('/LogIn')
            console.log(e)
        }
    }
    return (
        <Box id='auth'></Box>
    )




}

export default Auth