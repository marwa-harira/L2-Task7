import "../styles/Header.css";
import { useLocation } from "react-router-dom";
const Header = () => {
    const location = useLocation();


    const getTitle = () => {
        if (location.pathname === "/dashboard") {
            return "Products";
        } else if (location.pathname === "/item/create") {
            return "Products / Add";
        } else if (location.pathname.includes("/item/edit")) {
            return "Products / Edit";
        }
    };


    return (

        <div className="main-content">
            <div className="header">
                <h2 className="header-title">{getTitle()}</h2>
                <div className="header-right">
                    <img src="../../public/assets/img/profile.png" alt="Admin" className="profile-pic" />
                    <div className="admin-info">
                        <h4>Moni Roy</h4>
                        <p>Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
