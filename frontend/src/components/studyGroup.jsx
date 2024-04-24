import React from "react";
import styles from "./studyGroup.module.css";

function StudyGroup() {
    const groupMembers = ["John", "Jane", "Alice", "Bob"];
    return (
        <div className={styles.container}>
            <img src="https://www.pngkey.com/png/full/114-1149878_study-group-study-group-icon.png" alt="study group icon" style={{ width: "100px", height: "100px"}}/>
            <h3>Study Group</h3>
            <h4>Group Members</h4>
            {groupMembers.join(' ')}
        </div>
    );


};

export default StudyGroup;