import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LoginPage.module.css'

function isValidEmail (email) {

    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)

}

function LoginPage() {
    const navigate = useNavigate();
    function goToDashboard() {
        navigate('/dashboard');
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');

    function handleFormSubmit (e) {
        e.preventDefault();
        if (!isValidEmail(email)) {
            setEmailError('Please enter a valid email');
        } 
        else {
            setEmailError('');
            console.log('Email:', email, 'Password:', password);

            if (email && password) {
                navigate('/dashboard');
        }

        //submit user data to backend
    }
}
    return (
        <div className={styles.container}>
        <h1>Welcome Back!</h1>
        <form onSubmit={handleFormSubmit}>

            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => {
                    if (!isValidEmail(email)) {
                        setEmailError('Invalid email format');
                    } else {
                        setEmailError('');
                    }
                }}
            />
            {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>

        </form>
        
        <p>Don't have an account? <a href="/register">Register</a></p>

        </div>
    )
}



export default LoginPage;