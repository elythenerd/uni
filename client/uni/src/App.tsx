import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar/Navbar';
import SignUpPage from './pages/SignUp/SignUp';
import LogInPage from './pages/LogIn/LogIn';
import { Home } from './pages/Home/Home';
import UserContextProvider from './context/UsersContextProvider';
import Teacher from './pages/teacher/Teacher';
import BossPage from './pages/boss/Boss';
import { Provider, useSelector } from 'react-redux';
import OpenContextProvider from './context/SubjectContext/openContext/openContextProvider';
import { store } from './store/Store';
import Course from './pages/course/Course';
import { Box, ThemeProvider } from '@mui/material';
import { cacheRtl, theme } from './theme/theme';
import { CacheProvider } from '@emotion/react';
import axios from 'axios';
import { User, userState } from './types/User';
import Auth from './components/Auth/Auth';
import AllRoutes from './components/routes/Routes';
import Sockets from './Sockets';
// import { ThemeProvider } from '@emotion/react';
function App() {

  
  return (
    <>
      <ThemeProvider theme={theme}>
        <CacheProvider value={cacheRtl} >

          <Provider store={store} >
            <Sockets/>
            <UserContextProvider>
              <OpenContextProvider>

                <Router>
               
                 
                  <Auth/>
                   <AllRoutes></AllRoutes>
                 
                </Router>
              </OpenContextProvider>

            </UserContextProvider>
          </Provider>
        </CacheProvider>
      </ThemeProvider>
    </>
  )
}

export default App


