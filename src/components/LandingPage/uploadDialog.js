import React, { useRef } from 'react';
import { Box, Button, useTheme, useMediaQuery, Dialog, DialogActions, DialogContent, DialogTitle, Paper, CircularProgress } from '@mui/material';
import Draggable from 'react-draggable';
import { Close } from '@mui/icons-material';


const PaperComponent = (props) => {
    const nodeRef = useRef(null);

    return (
        <Draggable
            nodeRef={nodeRef}
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper ref={nodeRef} {...props} /> 
        </Draggable>
    );
}

const UploadDialog = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    };
    const [Dimensions, setDimensions] = React.useState(getWindowDimensions());
    const [image, setImage] = React.useState(null);
    const imageCaptureRef = useRef(null);
    const imageInputRef = useRef(null);
    const [showCircularProgress, setShowCircularProgress] = React.useState(false);
    const [showSuccessMsg, setShowSuccessMsg] = React.useState(false);

    return(
        <Dialog
            fullWidth={true}
            fullScreen={fullScreen}
            open={props.showDialog}
            disableEscapeKeyDown            
            onClose={() => props.closeDialog()}
            PaperComponent={Dimensions.width >= 600 ? PaperComponent : null}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle>
                <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <Box> Upload Alert </Box>
                    <Box sx={{visibility: props.isLoading ? "hidden" : "visible"}}>
                        <Close onClick={() => props.closeDialog()} sx={{ color:"#010101", cursor: "pointer" }} />
                    </Box>
                </Box>
            </DialogTitle>
            {
                <>
                    <DialogContent sx={{flexDirection:"row", width:'inherit'}}>
                        {
                            showCircularProgress ? 
                                <CircularProgress/>
                            :
                                null
                        }
                        {
                            showSuccessMsg ?
                                <Box>Image has successfully uploaded</Box>
                            :
                                null
                        }
                        
                    </DialogContent>  
                    <DialogActions sx={{fontSize: '14px', fontWeight: '400', justifyContent: 'center !important'}}>
                       <Box sx={{ display: showSuccessMsg ? 'none' : 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <input
                                type="file"
                                accept="image/*"
                                ref={imageInputRef}
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    setShowCircularProgress(true)
                                    const file = e.target.files[0];
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setImage(reader.result);
                                        setShowCircularProgress(false);
                                        setShowSuccessMsg(true);
                                        props.handleUpload(reader.result, e.target.files[0].name);
                                        setTimeout(() => {
                                            props.closeDialog();
                                        },2000)
                                    };
                                    if (file) {
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            <Button sx={{backgroundColor: '#2D2F5A', color: '#FFFFFF',
                                    fontSize: '14px', fontWeight: '600', borderRadius:'8px'}} onClick={() => imageInputRef.current.click()}>
                                upload Image
                            </Button>

                            <input
                                type="file"
                                accept="image/*"
                                capture="environment"
                                style={{ display: 'none' }}
                                ref={imageCaptureRef}
                                onChange={(e) => {
                                    setShowCircularProgress(true);
                                    const file = e.target.files[0];
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setImage(reader.result);
                                        setShowCircularProgress(false);
                                        setShowSuccessMsg(true);
                                        props.handleUpload(reader.result);
                                        setTimeout(() => {
                                            props.closeDialog();
                                        },2000)
                                    };
                                    if (file) {
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                             <Button sx={{backgroundColor: '#2D2F5A', color: '#FFFFFF',
                                    fontSize: '14px', fontWeight: '600', borderRadius:'8px'}} onClick={() => imageCaptureRef.current.click()}>
                                Capture Image
                            </Button>
                        </Box>
                    </DialogActions>    
                </>
            }            
        </Dialog>
    )
}
export default UploadDialog;