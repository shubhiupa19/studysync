import React from "react";
import { useNavigate } from 'react-router-dom'
import styles from "./LandingPage.module.css";
function LandingPage() {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/login');
  }
  return (
    <div className={styles.landingPage}>
      <h1>Welcome to StudySync</h1>
      <p>
        StudySync is a platform that allows you to coordinate study groups and 
        sessions with other students through the creation and sharing of forms 
        and responses. 
      </p>
      <button onClick={goToLogin}> Let's get started {">"}{">"}</button>
    </div>
  );
}

export default LandingPage;