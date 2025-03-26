import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/register.css";

const Register = () => {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [profile_image, setProfileImage] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const sendData = async (event) => {
        event.preventDefault();
        setError("");


        if (password !== password_confirmation) {
            setError("Passwords do not match.");
            return;
        }


        if (!first_name || !last_name || !email || !password || !password_confirmation) {
            setError("All fields are required.");
            return;
        }


        const data = new FormData();
        data.append("first_name", first_name);
        data.append("last_name", last_name);
        data.append("email", email);
        data.append("password", password);
        data.append("password_confirmation", password_confirmation);

        if (profile_image) {
            data.append("profile_image", profile_image);
        }


        fetch("https://vica.website/api/register", {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: data,
        })
            .then(res => res.json())
            .then(res => {
                if (res && res.data && res.data.token) {
                    localStorage.setItem("token", "Bearer " + res.data.token);
                    navigate("/dashboard");
                } else {

                    setError("Registration successful, but no token received.");
                    navigate("/");
                }
            })
            .catch(err => {
                console.error("Error during registration:", err);
                setError("Registration failed. Please try again.");
            });
    };

    return (
        <>
            <div className="auth-container-rg">
                <div className="auth-box-rg">
                    <h2>Sign Up</h2>
                    <p>Create an account to continue</p>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={sendData}>
                        <div className="name-fields">
                            <div className="name-field">
                                <label htmlFor="first_name">First Name</label>
                                <input
                                    type="text"
                                    id="firstname"
                                    placeholder="First Name"
                                    value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="name-field">
                                <label htmlFor="last_name">Last Name</label>
                                <input
                                    type="text"
                                    id="last_name"
                                    placeholder="Last Name"
                                    value={last_name}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>


                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="name-fields">
                            <div className="name-field">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="name-field">
                                <label htmlFor="password_confirmation">Confirm Password</label>
                                <input
                                    type="password"
                                    id="password_confirmation"
                                    placeholder="********"
                                    value={password_confirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="profile-upload">
                            <label htmlFor="profile_image" className="profile-image-label">profile image</label>
                            <input
                                type="file"
                                id="profile_image"
                                className="profile-image-input"
                                onChange={(e) => setProfileImage(e.target.files[0])}
                            />
                            <div className="profile-image-icon">
                                <img
                                    src="public/assets/img/Upload icon.png"
                                    alt="Upload Icon"
                                    className="upload-icon"
                                />
                            </div>
                        </div>

                        <div>
                            <input type="submit" value="Sign Up" />
                        </div>

                        <p className="comment-sign-in">
                            Already have an account? <Link to="/">Sign In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
