import React from 'react';
import { Box, Divider } from '@mui/material';
import '../../StyleSheets/LandingPage.css';
import { LocalPhone, LocationPin, Email, WhatsApp, X, Instagram, Facebook, YouTube, LinkedIn, Add } from '@mui/icons-material';
import logo from './images/netslogo.jpg';
import balcny from './images/balcny.jpg';
import balcony from './images/balcony.jpg';
import carParking from './images/car_parking.jpg';
import childrenSafety from './images/children_saftey.jpg';
import construction from './images/construction.jpg';
import cricket from './images/cricet_nets.jpg';
import cricket1 from './images/cricket.jpg';
import ductArea from './images/Duct_area_saftey.jpg';
import grilledBalcony from './images/griled_balcny.jpg';
import industrial from './images/industrial.jpg';
import monkey from './images/monkey.jpg';
import prtSaftey from './images/pet_saftey.jpg';
import stair from './images/staircase.jpg';
import swimming from './images/swimming.jpg';
import Masonry from 'react-masonry-css';
import DeleteDialog from './deleteDialog.js';
import UploadDialog from './uploadDialog.js';

export default function LandingPage (){

    let images = [
        { "src": balcny, "name": "Balcony Safety" },
        { "src": balcony, "name": "Balcony Saftey" },
        { "src": carParking, "name": "Car Parking" },
        { "src": childrenSafety, "name": "Child Safety" },
        { "src": construction, "name": "Construction Zone" },
        { "src": cricket, "name": "Cricket Nets" },
        { "src": cricket1, "name": "Cricket Nets" },
        { "src": ductArea, "name": "Duct Area Saftey nets" },
        { "src": grilledBalcony, "name": "Grilled Balcony" },
        { "src": industrial, "name": "Industrial Area" },
        { "src": monkey, "name": "Monkey Saftey" },
        { "src": prtSaftey, "name": "Pet Safety" },
        { "src": stair, "name": "Staircase Safety" },
        { "src": swimming, "name": "Swimming Pool saftey" }
    ]

    const [showDeleteButton, setShowDeleteButton] = React.useState(sessionStorage.hasOwnProperty('userLoggedIn') ? sessionStorage.userLoggedIn : false);
    const [imagesList, setImagesList] = React.useState(images);
    const [deleteIndex, setDeleteIndex] = React.useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
    const [showUploadDialog, setShowUplodDialog] = React.useState(false);


    const breakpointColumnsObj = {
        default: 4, // large screens
        1100: 3,
        700: 2,
        500: 1,
    };


    let ourServices = [
        "Balcony Saftey Nets",
        "Children Saftey Nets",
        "Grill Balcony Saftey Nets",
        "Terrace Top Nets",
        "Industrial Saftey Nets",
        "Building Saftey Nets",
        "Constuction Saftey Nets",
        "Glass Saftey Nets",
        "Swimming Pool Saftey Nets",
        "Monkey Saftey Nets",
        "Car Parking Saftey Nets",
        "HDPE Saftey Nets",
        "Pigeon Nets",
        "Anti Bird Nets",
        "Cricket Practice Nets",
        "Sports Ball Stop Nets",
        "All Sports Nets"
    ];

    const handleUploadDialog = () => {
        setShowUplodDialog(true);
    }

    const handleColseUploadDialog = (image, name) => {
        setImagesList(prevList => [...prevList, { src: image, name: name, isbase64: true }]);
    }

    const handleDeleteDialog = (index) => {
        setDeleteIndex(index);
        setShowDeleteDialog(true);
    }

    const handleDelete = (index) => {
        let tempImages = imagesList;
        const filteredImages = tempImages.filter((image, i) => i !== index);
        setImagesList(filteredImages);
        sessionStorage.imagesList = filteredImages;
    }

    React.useEffect(() => {
        sessionStorage.imagesList = images;

        return() => {
            delete sessionStorage.imagesList;
        }
    })


    return(
        <>
            <Box className='parentBox'>
                <Box className='header'>
                    <Box sx={{padding:'5px 20px'}}>
                        <img src={logo} alt='' style={{width:'200px', height:'80px'}}/>
                    </Box>
                    <Box sx={{display:'flex', flexDirection:'row', fontFamily:'Poppins, sans-serif', fontSize:'20px', padding:'5px 20px'}}>
                        <LocalPhone sx={{fontSize:'24px'}}/>
                        <Box>
                            :9876543210
                        </Box>
                    </Box>
                </Box>
                <Box className='contentBox'>
                    <Box className='albumArea' sx={{position:'relative'}}>
                        {
                            showDeleteButton ?
                                <Add className="addImage" style={{ position: 'absolute', right: '8px', background: 'rgba(0,0,0,0.6)', color: '#fff',
                                    border: 'none', borderRadius: '50%', width: '50px', height: '50px', cursor: 'pointer', zIndex:'100'
                                }} onClick={() => handleUploadDialog()}
                                />
                            :
                                null
                        }
                        <Box sx={{display:'flex', flexDirection:'column', overflow:'scroll', scrollbarWidth:'none', height:'100%'}}> 
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className='my-masonry-grid'
                                columnClassName="my-masonry-grid_column"
                            >
                                {
                                    imagesList.map((image, i) => (
                                        <Box key={i} style={{ position: 'relative', marginBottom: '16px', textAlign: 'center' }}>
                                            <img src={image.src} alt={image.name} 
                                                style={{
                                                    width: '100%',
                                                    borderRadius: '10px',
                                                    display: 'block',
                                                    objectFit: 'cover'
                                                }}
                                                className="fade-in"              
                                            />
                                            {
                                                showDeleteButton ? 
                                                <button
                                                    onClick={() => handleDeleteDialog(i)}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '8px',
                                                        right: '8px',
                                                        background: 'rgba(0,0,0,0.6)',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: '50%',
                                                        width: '24px',
                                                        height: '24px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    ×
                                                </button>
                                            :
                                                null
                                            }
                                            <Box style={{ marginTop: '6px', fontSize: '14px', fontWeight: 500 }}>{image.name}</Box>
                                        </Box>
                                    ))
                                }
                            </Masonry>
                            <Box sx={{fontSize:'20px', fontFamily:'system-ui', marginBottom:'5px', fontWeight:'500', margin:'20px 0px 0px'}}>
                                More work updates? Follow us on:
                            </Box>
                            <Divider sx={{borderBottomWidth:'2px', marginBottom:'5px'}}/>
                            <Box sx={{display:'flex', flexDirection:'row', paddingTop:'16px', marginBottom:'20px'}}>
                                <YouTube sx={{marginRight:'15px'}}/>
                                <Facebook sx={{marginRight:'15px'}}/>
                                <Instagram sx={{marginRight:'15px'}}/>
                                <X sx={{marginRight:'15px'}}/>
                                <LinkedIn sx={{marginRight:'15px'}}/>
                            </Box>
                        </Box>
                    </Box>
                    <Box className='infoArea'>
                        <Box sx={{padding:'8px 16px 0px', display:'flex', flexDirection:'row', flexWrap:'wrap', alignItems:'center', justifyContent:'center'}}>
                            <img src={logo} alt='' style={{width:'100px', height:'60px'}}/>
                            <Box sx={{fontFamily:'system-ui', fontSize:'30px', padding:'20px', fontWeight:'600'}}>
                                Saftey Nets
                            </Box>
                        </Box>
                        <Box sx={{padding:'16px 16px 8px', display:'flex', flexDirection:'column'}}>
                            <Box sx={{display:'flex', flexDirection:'column'}}>
                                <Box sx={{fontSize:'20px', fontFamily:'system-ui', marginBottom:'5px', fontWeight:'500'}}>
                                    Our Services:
                                </Box>
                                <Divider sx={{borderBottomWidth:'2px', marginBottom:'5px'}}/>
                                <Box>
                                    <ul>
                                        {ourServices.map((service, i) => <li key={i} style={{ marginBottom: '5px' }}>{service}</li>)}
                                    </ul>
                                </Box>
                            </Box>
                            <Box sx={{marginTop:'20px'}}>
                                <Box sx={{fontSize:'20px', fontFamily:'system-ui', marginBottom:'5px', fontWeight:'500'}}>
                                    Contact Us:
                                </Box>
                                <Divider sx={{borderBottomWidth:'2px', marginBottom:'5px'}}/>
                                <Box sx={{display:'flex', flexDirection:'row', margin:'8px 0px', alignItems:'center'}}>
                                    <LocationPin sx={{marginRight:'15px'}}/>
                                    <Box sx={{fontFamily:'system-ui'}}>Hyderabad, Telangana</Box>
                                </Box>
                                <Box sx={{display:'flex', flexDirection:'row', margin:'8px 0px', alignItems:'center'}}>
                                    <Email sx={{marginRight:'15px'}}/>
                                    <Box sx={{fontFamily:'system-ui'}}>kpnsupport@nets.com</Box>
                                </Box>
                                <Box sx={{display:'flex', flexDirection:'row', margin:'8px 0px', alignItems:'center'}}>
                                    <LocalPhone sx={{marginRight:'15px'}}/>
                                    <Box sx={{fontFamily:'system-ui'}}>+91 9876543210</Box>
                                </Box>
                                <Box sx={{display:'flex', flexDirection:'row', paddingTop:'16px'}}>
                                    <WhatsApp sx={{marginRight:'15px'}}/>
                                    <Email sx={{marginRight:'15px'}}/>
                                    <LocalPhone sx={{marginRight:'15px'}}/>
                                </Box>
                            </Box>
                        </Box>                        
                    </Box>
                </Box>
                {
                    showDeleteDialog ?
                        <DeleteDialog
                            showDialog = {showDeleteDialog}
                            DeleteIndex = {deleteIndex}
                            closeDialog = {() => {
                                setShowDeleteDialog(false)
                            }}
                            handleSubmit = {(index) => { setShowDeleteDialog(false); handleDelete(index);}}
                        />
                    :
                        null
                }
                {
                    showUploadDialog ?
                        <UploadDialog
                            showDialog = {showUploadDialog}
                            closeDialog = {() => {
                                setShowUplodDialog(false)
                            }}
                            handleUpload = {(img, name) => handleColseUploadDialog(img, name)}
                        />
                    :
                        null
                }
            </Box>
        </>
    );

}