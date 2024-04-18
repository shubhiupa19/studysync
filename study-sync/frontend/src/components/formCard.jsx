import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

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
            <img src="https://via.placeholder.com/150" alt="Forme" />
            <h3>{form.title}</h3>
            <h4>{form.description}</h4>
            <div className = {styles.allButtons}>
                
                <div className={styles.buttonContainer}>
                    <button onClick={share}>Share</button>

                    <button onClick={goToForm}>Edit</button>
                </div>

                <button onClick={viewResponses}>View Responses</button>

            </div>
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={closeModal}>&times;</span>
                        <p>{modalContent}</p>
                        {!form.published && (
                            <button onClick={closeModal}>Close</button>
                        )}
                    </div>
                </div>
            )}

        </div>
    );


};


export default FormCard;
