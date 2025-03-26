import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import "../styles/EditProduct.css";

function EditProduct() {
    const [name, setName] = useState("Apple Watch Series 4");
    const [price, setPrice] = useState('$690.00');
    const [image, setImage] = useState('');
    const [defaultData, setDefaultData] = useState({});
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        axios.get(`https://vica.website/api/items/${params.id}`, {
            headers: {
                Accept: "application/json",
                Authorization: localStorage.getItem("token"),
            },
        })

            .then((res) => {
                setName(res.data.name);
                setPrice(res.data.price);
                setDefaultData(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const sendData = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        if (image) {
            formData.append("image", image);
        }
        formData.append("_method", "PUT");

        axios.post(`https://vica.website/api/items/${params.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: localStorage.getItem("token"),
            },
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
                <div className="edit-container">
                    <h2 className="title">Edit Product</h2>
                    <form onSubmit={sendData} className="edit-form">
                        <div className="layout">
                            <div className="left-side">
                                <div className="form-group">
                                    <label htmlFor="name">Product Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}


                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type="text"
                                        id="price"
                                        value={price}
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
                                        src="/assets/img/Image-product.png"
                                        alt="Upload Icon"
                                        className="upload-icon"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
}

export default EditProduct;

