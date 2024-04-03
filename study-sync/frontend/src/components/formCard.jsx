import React from "react";
import { useNavigate } from 'react-router-dom'
import styles from "./formCard.module.css";

function FormCard({form}) {
   
    console.log(form);
   
    const navigate = useNavigate();

    function goToForm() {
        navigate('/form');
    }
    //generates a link to share with other people to fill out the form
    function share() {
        console.log("share");
    }
    function viewResponses() {
        navigate('/responses');
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

        </div>
    );


};


export default FormCard;
