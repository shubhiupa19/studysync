import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

function Navbar({create}) {
    return (
        <nav className={styles.navbar}>
            
            
                <Link to="/" className = {styles.navLogo}>Logo</Link>
                
                <ul className = {styles.navLinks}>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/">Account Settings</Link>
                </li>
                <li>
                    <Link to="/login">Logout</Link>
                </li>
                
                {create &&
                <li>
                    <Link to="/create">Create Form</Link>

                </li>
                
                }
            </ul>
        </nav>
    );
}

export default Navbar;