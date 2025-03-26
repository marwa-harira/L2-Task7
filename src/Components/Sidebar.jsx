import { useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
    const navigate = useNavigate();
    const logout = () => {

        fetch("https://vica.website/api/logout", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "AUTHORIZATION": localStorage.getItem("token")
            }
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                localStorage.removeItem("token")
                navigate("/")
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <h2 className="logo">Dash<span>Stack</span></h2>
                <ul>
                    <li>
                        <img src="/assets/img/Dashboard.svg" alt="Dashboard-icon" />
                        Dashboard
                    </li>


                    <li className="active">
                        <img src="/assets/img/Products.svg" alt="Products-icon" />
                        Products
                    </li>


                </ul>
                <ul>
                    <li>
                        <img src="../../public/assets/img/logout.svg" alt="logout-icon" />
                        <a onClick={logout}>logout</a>
                    </li>
                </ul>
            </div>
        </div>

    );
};

export default Sidebar;

