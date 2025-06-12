import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { SnackbarProvider } from 'notistack';
import Slide from '@mui/material/Slide';
import Login from './components/Login/Login';
import LandingPage from './components/LandingPage/LandingPage'; 

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function App() {

  const loginPaths = ['/admin', '/login'];
  const landingPagePath = ['/', '/home', '/landing-page'];

  useEffect(()=>{
    window.location.hash = "/#nets/";
  },[])

  return (
    <SnackbarProvider autoHideDuration={2000} maxSnack={3} TransitionComponent={TransitionUp} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} >
      <Routes>
        {loginPaths.map((path) => (
          <Route key={path} path={path} element={<Login/>} />
        ))}
        {landingPagePath.map((path) => (
          <Route key={path} path={path} element={<LandingPage/>} />
        ))}
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
