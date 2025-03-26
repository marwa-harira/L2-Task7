import { Link, useNavigate } from "react-router-dom"
import "../styles/login.css";
import { useState } from "react";


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [error, setError] = useState('');

    const handleLogin = (event) => {
        event.preventDefault()
        setError("");

        const data = {
            email,
            password

        }
        fetch("https://vica.website/api/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem("token", "Bearer " + data.token);
                    navigate("/dashboard");
                } else {
                    setError("Email or password is incorrect");
                }
            })
            .catch(err => console.log(err));

    }

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Sign In</h2>
                <p>Please enter your email and password to continue</p>
                {error && <p className="error">{error}</p>}

                <form onSubmit={handleLogin}>
                    <div className="label-container">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                            id="email"
                            placeholder="Email"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="label-container">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            id="password"
                            placeholder="********"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit">Sign In</button>
                    </div>
                    <p className="comment-sign-up">
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login