import React from "react";
import './Navbar.css'
import { useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const location = useLocation()
   const navigator = useNavigate()
    return (

        <AppBar position="static" sx={{padding:'5px', backgroundColor:'rgb(80, 139, 241)'}}>
            <div className="navbar-container">
                <Typography textAlign="center">אוניברסטיל</Typography>
                <div className="navbar-pages-container">
                    <MenuItem onClick={()=>navigator('/')}> 
                        <Typography textAlign="center">בית</Typography>
                        
                    </MenuItem>
                   
                    <MenuItem onClick={()=>navigator('/Boss')}>
                        <Typography textAlign="center">מנהלים</Typography>
                    </MenuItem>
                </div>
                <Avatar sx={{height:'1.5rem',width:'1.5rem'}}></Avatar>
            </div>
        </AppBar>
    );




}
export default Navbar