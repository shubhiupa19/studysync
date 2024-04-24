import React from "react";
import styles from "./studySessionCard.module.css";

function StudySessionCard() {
    return (
        <div className={styles.container}>
            <img src = "https://www.pngkey.com/png/full/114-1149878_study-group-study-group-icon.png" alt="study group icon" style = {{width : "100px", height : "100px"}} />
            <div className = {styles.sessionInfo}>
                <h3>Shubhi's Linear Algebra Study Group</h3>
                <div className = {styles.sessionDetails}>
                    <h4>Time: 7:00pm</h4>
                    <h4>Location: Bobst Library</h4>
                </div>
            </div>
           
        </div>

    )


};


export default StudySessionCard;