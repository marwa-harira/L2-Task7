import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddProduct.css";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const sendData = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("image", image);


        axios.post("https://vica.website/api/items", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })

            .then((res) => {
                console.log(res.data);
                navigate("/dashboard");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <Header />
                <div className="create-container">
                    <h2 className="title">Add Product</h2>
                    <form onSubmit={sendData} className="create-form">
                        <div className="layout">
                            <div className="left-side">
                                <div className="form-group">
                                    <label htmlFor="name">Product Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        placeholder="Product Name"
                                        onChange={(e) => setName(e.target.value)}
                                    />

                                </div>


                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type="number"
                                        id="price"
                                        value={price}
                                        placeholder="Price"
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <button type="submit" className="save-btn">Save</button>
                            </div>
                            <div className="image-container">
                                <input
                                    type="file"
                                    id="profile_image"
                                    className="profile-image-input"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />

                                <div className="centered-img">
                                    <img
                                        src="/assets/img/Upload icon.png"
                                        alt="Upload Icon"
                                        className="upload-icon"
                                    />
                                </div>
                            </div>
                        </div>




                    </form>

                </div>
            </div>
        </div>
    );
};



export default AddProduct; 