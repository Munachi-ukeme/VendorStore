import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Sidebar.module.css";

function Sidebar(){
    const { seller, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout =() =>{
        logout();
        navigate("/login");
    };

return(
    <div className={styles.sidebar}>
        {/* brand name at the top */}
        <div className={styles.brand}>
            <h1 className={styles.brandName}>MoonStore</h1>
            <p className={styles.businessName}>{seller?.businessName}</p>
        </div>

        {/* Navigation links */}
        <nav className={styles.nav}>

            <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }> Dashboard </NavLink>

            <NavLink
            to="/dashboard/products"
            className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }> Products </NavLink>


            <NavLink
            to="/dashboard/categories"
            className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }> Categories </NavLink>


            <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }> Settings </NavLink>


        </nav>

        {/* logout button at the bottom */}
        <div className={styles.bottom}>
            <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
            </button>
        </div>

    </div>
);
}

export default Sidebar;