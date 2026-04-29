import Sidebar from "./Sidebar";
import styles from "./DashboardLayout.module.css";
import { useState } from "react";

function DashboardLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleOpen =()=>{
        setSidebarOpen(true);
    };

    const handleClose = ()=>{
        setSidebarOpen(false)
    };

    return(
        <div className={styles.layout}>
            <Sidebar isOpen={sidebarOpen} onClose={handleClose}/>
            <div className={styles.main}>
                {/* hamburger menu button-only show on mobile */}
                <button className={styles.menuButton} onClick={handleOpen}>
                     ☰
                    </button>
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;