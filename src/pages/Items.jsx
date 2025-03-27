import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import "../styles/Items.css";
import "../styles/Sidebar.css";
import "../styles/Header.css";
import "../styles/popup.css";

const Items = () => {
    const navigate = useNavigate();


    const [products, setProducts] = useState([
        { id: 1, name: "Apple Watch Series 4", price: "$690.00", image: import.meta.env.BASE_URL + "/assets/img/Image-product.png" },
        { id: 2, name: "Apple Watch Series 4", price: "$690.00", image: import.meta.env.BASE_URL + "/assets/img/Image-product.png" },
        { id: 3, name: "Apple Watch Series 4", price: "$690.00", image: import.meta.env.BASE_URL + "/assets/img/Image-product.png" },
        { id: 4, name: "Apple Watch Series 4", price: "$690.00", image: import.meta.env.BASE_URL + "/assets/img/Image-product.png" },
        { id: 5, name: "Apple Watch Series 4", price: "$690.00", image: import.meta.env.BASE_URL + "/assets/img/Image-product.png" },
        { id: 6, name: "Apple Watch Series 4", price: "$690.00", image: import.meta.env.BASE_URL + "/assets/img/Image-product.png" },
        { id: 7, name: "Apple Watch Series 4", price: "$690.00", image: import.meta.env.BASE_URL + "/assets/img/Image-product.png" },
        { id: 8, name: "Apple Watch Series 4", price: "$690.00", image: import.meta.env.BASE_URL + "/assets/img/Image-product.png" },
    ]);




    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);


    const handleDeleteClick = (id) => {
        setSelectedProduct(id);
        setShowDeletePopup(true);
    };


    const confirmDelete = () => {
        setProducts(products.filter((product) => product.id !== selectedProduct));
        setShowDeletePopup(false);
    };


    const handleEditClick = (id) => {
        setSelectedProduct(id);
        setShowEditPopup(true);
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="main-content">
                {/* Header */}
                <Header />

                {/* Products Section */}
                <div className="products-container">
                    <div className="products-header">
                        <h2>Manage Products</h2>
                        <button className="add-product-button" onClick={() => navigate("/item/create")}>
                            <img src={import.meta.env.BASE_URL + "/assets/img/plus.svg"} alt="plus-icon" /> Add Product
                        </button>
                    </div>

                    {/* Product Table */}
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <img src={product.image} alt={product.name} className="product-image" />
                                    </td>
                                    <td>
                                        <div className="action-icons">
                                            <button className="edit-btn" onClick={() => handleEditClick(product.id)}>
                                                <img src={import.meta.env.BASE_URL + "/assets/img/pencil-write.svg"} alt="edit-icon" />
                                            </button>
                                            <div className="divider"></div>
                                            <button className="delete-btn" onClick={() => handleDeleteClick(product.id)}>
                                                <img src={import.meta.env.BASE_URL + "/assets/img/bin.svg"} alt="delete-icon" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Confirmation Popup */}
            {showDeletePopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <p>Are You Sure You Want To Delete The Product?</p>
                        <div className="popup-buttons">
                            <button className="btn btn-danger" onClick={confirmDelete}>Yes</button>
                            <button className="btn btn-primary" onClick={() => setShowDeletePopup(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Confirmation Popup */}
            {showEditPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <p>Are You Sure You Want To Edit This Product?</p>
                        <div className="popup-buttons">
                            <button className="btn btn-danger" onClick={() => navigate(`/item/edit/${selectedProduct}`)}>Yes</button>
                            <button className="btn btn-primary" onClick={() => setShowEditPopup(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Items;
