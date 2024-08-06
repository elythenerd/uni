import { jsx } from '@emotion/react'
import { Box } from '@mui/material'
import react from 'react'
import Navbar from '../../components/Navbar/Navbar'
import React from 'react'

const Page = ({Component}:{Component:React.ElementType})=>{
return (
    <Box sx={{width:'100vw',height:'100vh'}}>
        <Navbar></Navbar>
        <Component></Component>
    </Box>
)
}
export default Page