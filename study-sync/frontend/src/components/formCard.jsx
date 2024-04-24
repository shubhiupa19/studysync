import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import styles from "./formCard.module.css";

function FormCard({form}) {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    function goToForm() {
        navigate(`/edit/${form._id}`);
    }
    //generates a link to share with other people to fill out the form
    function share() {
        const shareContent = form.published
        ? `Your form is published! Share this link: ${window.location.origin}/form/${form._id}`
        : "This form hasn't been published yet.";
        openModal(shareContent);
        
    }
    function viewResponses() {
        navigate(`/responses/${form._id}`);
    }


    return (
    <div className={styles.container}>
            <img src="https://via.placeholder.com/150" alt="Form" />
            <Typography sx={{ fontWeight: 'bold', marginTop: '20px'}}>Title: {form.title}</Typography>
            <Typography sx={{marginTop: '20px', marginBottom: '20px'}}>Description: {form.description}</Typography>
            <div className = {styles.allButtons}>
                
                <div className={styles.buttonContainer}>
                    <button onClick={share}>Share</button>

                    <button onClick={goToForm}>Edit</button>
                </div>

                <button onClick={viewResponses}>View Responses</button>

            </div>
            <Dialog open={isModalOpen} onClose={closeModal}>
                <DialogTitle>Share Form</DialogTitle>
                <DialogContent>
                    <p>{modalContent}</p>
                </DialogContent>
                <DialogActions>
                    <Button sx= {{ width: '75px'}}onClick={closeModal}>Close</Button>
                </DialogActions>

                </Dialog>

        </div>
    );


};


export default FormCard;
