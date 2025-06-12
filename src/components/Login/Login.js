import { React, useState, useEffect } from "react";
import { Box, Button, TextField, IconButton, InputAdornment} from "@mui/material";
import '../../StyleSheets/Login.css';
import welcomeImage from './LoginBackground.png';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Login (){

    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [isDisable, setIsDisable] = useState(true);
    const [isShow, setIsShow] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const navigate = useNavigate();

    const handleShowPassword = () => {
        if(isShow)
            setIsShow(false);
        else
            setIsShow(true);
    }

    const checkForLoginValidity = () => {
        if(window.userName !== undefined && window.userName !== null && window.password !== undefined && 
            window.password !== null && window.userName.trim() !== "" && window.password.trim() !== "")
            setIsDisable(false)
        else
            setIsDisable(true)
    }

    const handleLogIn = () => {
        if(window.userName === 'admin' && window.password === "admin")
        {
            sessionStorage.userLoggedIn = true;
            navigate("/home");
        }
        else{
            setShowErrorMsg(true);
            setTimeout(() =>{
                setShowErrorMsg(false)
            },2000)
        }
    }

    useEffect(() => {

        return ()=>{
            delete window.userName;
            delete window.password;
        }
    }, [])
 
    return(
        <>
            <Box className='logInBackground' sx={{height:'100%', width:'100%'}}>
                <Box className='logInComponent'>
                    <Box sx={{height:'50%', width:'100%'}}>
                        <img src={welcomeImage} alt="" style={{width:'100%', height:'100%', borderRadius:'16px 16px 0px 0px'}}/>
                    </Box>
                    <Box sx={{height:'50%', width:'100%', background:'#F5F5F5', borderRadius:'0px 0px 16px 16px'}}>
                        <Box sx={{padding:'25px 50px', height:'inherit', width:'auto', display:'flex', flexDirection:'column'}}>
                            <Box sx={{color:'black', fontSize:'22px', fontFamily:'system-ui', fontWeight:'500', marginBottom:'15px'}}>Log in</Box>
                            <Box sx={{display:'flex', flexDirection:'column', position:'relative'}}>
                                <TextField
                                    className="custom-textfield"
                                    variant="standard"
                                    label="UserName *"
                                    value={userName}
                                    onChange={(event) => {
                                        setUserName(event.target.value);
                                        window.userName = event.target.value;
                                        checkForLoginValidity();
                                    }}
                                />
                                <TextField
                                    className="custom-textfield"
                                    variant="standard"
                                    label="Password *"
                                    value={password}
                                    type= {isShow ? "text" : "password"}
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                        window.password = event.target.value;
                                        checkForLoginValidity();
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            <IconButton onClick={handleShowPassword} edge="end">
                                              {isShow ?  <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                          </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box 
                                sx={{height:'20px', width:'100%', display:'flex', 
                                justifyContent:'center', alignItems:'center', color:'black', 
                                fontSize:'14px', fontFamily:'system-ui', fontWeight:'500', marginTop:'10px'}}
                            >
                                Forgot Password ?
                            </Box>
                            <Box>
                                <Button onClick={() => handleLogIn()} disabled={isDisable} 
                                sx={{background: isDisable ? "#D9DFC6" : "#7c4585", width:'100%', 
                                height:'40px', margin:'25px 0px 15px', color:'white', fontSize:'17px', 
                                fontFamily:'system-ui', fontWeight:'500' }}
                            > 
                                    Log in
                                </Button>
                            </Box>
                            <Box sx={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                {
                                    showErrorMsg ? 
                                        <Box sx={{color:'red', fontSize:'13px', fontFamily:'system-ui', width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                            Either username or password is incorrect.
                                        </Box>
                                    :
                                        null
                                }
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}