import React from 'react'

export function NewCustomerTemplate({ name, username, password }) {
    const styles = {
        backgroundColor: 'gray',
        padding: '50px',
        margin: '20px 100px'
    };

    return (
        <div style={styles}>
            <h1>Hi {name}...!</h1>
            <p>You can join to our system using following credentials.</p>
            <ul>
                <li>Username : {username}</li>
                <li>Password : {password}</li>
            </ul>
        </div>
    )
}
