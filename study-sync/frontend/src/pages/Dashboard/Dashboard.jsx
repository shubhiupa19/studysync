import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import FormCard from "../../components/formCard";
import StudyGroup from "../../components/studyGroup";
import StudySessionCard from "../../components/studySessionCard";
import Navbar from "../../components/navbar";
import styles from "./Dashboard.module.css";

function Dashboard() {
    const navigate = useNavigate();
    const [formIndex, setFormIndex] = React.useState(0);
    const [studyGroupIndex, setStudyGroupIndex] = React.useState(0);
    const forms = [];
    const studyGroups = [];

    const goToNextForm = () => {
        setFormIndex ((prevIndex) => (prevIndex + 1) % forms.length);
    };

    const goToPrevForm = () => {
        setFormIndex((prevIndex) => {
            if (prevIndex === 0) 
            {
                return forms.length - 1;
            }
            return prevIndex - 1;
          });
    };

    const goToNextStudyGroup = () => {

        setStudyGroupIndex ((prevIndex) => (prevIndex + 1) % studyGroups.length);

    };

    const goToPrevStudyGroup = () => {
        setStudyGroupIndex((prevIndex) => {
            if (prevIndex === 0) 
            {
                return studyGroups.length - 1;
            }
            return prevIndex - 1;
          });
    };

    return (
        <>
        <Navbar create ={true} />
        <div className={styles.container}>
           
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard. Here you can create and share forms, view study groups, and more.</p>
            <div className={styles.sectionsContainer}>
                <div className={styles.formsSection}>
                
                    <div className = {styles.formNav}>
                    <button onClick={goToPrevForm}>&lt;</button>
                    <h2>My Forms</h2>
                    <button onClick={goToNextForm}>&gt;</button>
                    </div>
                    
                    
                   <FormCard form={forms[formIndex]} />
                   
                </div>
                <div className={styles.studyGroupsSection}>
                    <div className = {styles.studyGroupNav}>
                    <button onClick={goToPrevStudyGroup}>&lt;</button>
                    <h2>My Study Groups</h2>
                    <button onClick={goToNextStudyGroup}>&gt;</button>
                    </div>
                    <StudyGroup studyGroup = {studyGroups[studyGroupIndex]} />
                   
                 
                   
                </div>
                <div className={styles.upcomingSessionsSection}>
                    <h2>Upcoming Study Sessions</h2>
                    <StudySessionCard />
                    
                    
                </div>
            </div>
        </div>
        </>
    );
}

export default Dashboard;
