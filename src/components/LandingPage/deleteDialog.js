import React, { useRef } from 'react';
import { Box, Button, useTheme, useMediaQuery, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from '@mui/material';
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

const DeleteDialog = (props) => {
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
                    <Box> Delete Alert </Box>
                    <Box sx={{visibility: props.isLoading ? "hidden" : "visible"}}>
                        <Close onClick={() => props.closeDialog()} sx={{ color:"#010101", cursor: "pointer" }} />
                    </Box>
                </Box>
            </DialogTitle>
            {
                <>
                    <DialogContent>
                        <Box>
                            Are you sure, you want to delete.
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ marginRight:'8px' ,fontSize: '14px', fontWeight: '400' }}>
                        
                        <Button sx={{
                            width:'156px',
                            backgroundColor: '#2D2F5A', color: '#FFFFFF',
                                fontSize: '14px', fontWeight: '600', borderRadius:'8px',
                        }} onClick={() => props.closeDialog()}>
                            Cancel
                        </Button>
                        <Button className="loginButton" sx={{width:'156px', backgroundColor: '#2D2F5A', color: '#FFFFFF',
                            fontSize: '14px', fontWeight: '600', borderRadius:'8px',
                        }}
                        onClick={() => props.handleSubmit(props.DeleteIndex)}
                        > Yes </Button>

                    </DialogActions>       
                </>
            }            
        </Dialog>
    )
}
export default DeleteDialog;