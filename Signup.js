import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError(true);
            return;
        }

        try {
            const response = await fetch('http://localhost:9000/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to register');
            }

            const result = await response.json();
            console.log(result);
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", result.token);
            navigate('/');
        } catch (error) {
            console.error('Error registering:', error);
            // Handle error state or display error message to user
        }
    };

    return (
        <>
            <h1>Register</h1>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <input type="text" className="inputBox" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                    {error && !name && <span className="invalid">Name is required</span>}

                    <input type="email" className="inputBox" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {error && !email && <span className="invalid">Email is required</span>}

                    <input type="password" className="inputBox" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && !password && <span className="invalid">Password is required</span>}

                    <button type="submit" className="button">Signup</button>
                </form>
            </div>
        </>
    );
};

export default Signup;
