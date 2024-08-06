import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import { JobType, userState } from "../../types/User";
import methods from "../../utils/methods";
// import fs from
const Navbar = () => {
    const loggedUser = useSelector((state: userState) => state.user.value.user)
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)
    const location = useLocation()
    const navigator = useNavigate()
    const LogOut = async () => {
        try {
            const res = await methods.get('http://localhost:8000/api/users/logOut')
            console.log(res.status)
            navigator('/LogIn')
        } catch (e) {
            console.log(e)
        }
    }
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (

        <AppBar position="static" sx={{ padding: '5px', backgroundColor: 'rgb(80, 139, 241)' }}>
            <div className="navbar-container">
                <Box sx={{ display: 'flex', gap: '0.5px', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton aria-controls={open ? 'avatar-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        id="avatar-logo"
                        onClick={handleClick}>
                        <Avatar sx={{ height: '1.5rem', width: '1.5rem' }} src={`../../../public/images/${loggedUser?.Id}.png`} ></Avatar>

                    </IconButton>
                    <Menu id="avatar-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="avatar-logo">
                        <MenuItem onClick={() => LogOut()}>התנתק</MenuItem>
                    </Menu>
                    <Typography>שלום {loggedUser?.Name}, </Typography>

                    <Typography>{loggedUser?.Job === JobType.Boss ? JobType.BossLabel : JobType.TeacherLabel}</Typography>
                </Box>
                <div className="navbar-pages-container">
                    <MenuItem onClick={() => navigator('/')}>
                        <Typography textAlign="center">בית</Typography>

                    </MenuItem>

                    {loggedUser?.Job === JobType.Boss && <MenuItem onClick={() => navigator('/Boss')}>
                        <Typography textAlign="center">מנהלים</Typography>
                    </MenuItem>}
                    {loggedUser?.Job === JobType.Teacher && <MenuItem onClick={() => navigator('/Teacher')}>
                        <Typography textAlign="center">מורים</Typography>
                    </MenuItem>}
                </div>

                <Typography textAlign="center">אוניברסטיל</Typography>
            </div>
        </AppBar>
    );




}
export default Navbar