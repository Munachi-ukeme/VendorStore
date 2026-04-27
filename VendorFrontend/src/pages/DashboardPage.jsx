import { useAuth } from "../context/AuthContext";
import styles from "./DashboardPage.module.css";

function Dashboard() {
    const {seller} = useAuth();

    return(
        <div className={styles.container}>
            <div className={styles.welcome}>
                <h1 className={styles.title}>Welcome back, {seller.businessName}</h1>
                <p className={styles.subtitle}>Here is a summary of your store</p>
            </div>

            

        </div>
    );

}