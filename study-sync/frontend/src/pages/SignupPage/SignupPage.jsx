import React from 'react'
import styles from './SignupPage.module.css'

function SignupPage() {
    return (
        <div className={styles.container}>
            <h1>Let's get started!</h1>
            <form>
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignupPage;