import { useState } from "react";
import styles from "./ChangePassword.module.css";
import { changeSellerPassword } from "../api/api";

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [success, setSuccess] = useState(null);

    const handleChangePassword = async () =>{
        setError(null);
        setSuccess(null);

        // basic validation
        if(!currentPassword){
            setError("Please enter your current password.")
            return;
        }

        if(!newPassword){
            setError("Please enter a new password.");
            return;
        }

        if(newPassword.length < 8){
            setError("New password must be at least 8 characters.");
            return;
        }

        if(newPassword !==confirmPassword){
            setError("New passwords do not match.");
            return;
        }

        if(currentPassword === newPassword){
            setError("New password must be different from current password");
            return;
        }

        setLoading(true);
        
         const data = await changeSellerPassword(currentPassword, newPassword);
            setLoading(false);

        if (data.error || data.message === "Current password is incorrect") {
        setError(data.message || data.error);
        return;
    }

            setSuccess("Password changed successfully.");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
    };

    return(
        <div className={styles.container}>
            <h3 className={styles.title}>Change Password</h3>

            {/* success message */}
            {success && <p className={styles.success}>{success}</p>}

            {/* error message */}
            {error && <p className={styles.error}>{error}</p>}

             {/* current password */}
            <div className={styles.field}>
                <label className={styles.label}>Current Password</label>
                <input
                    type="password"
                    className={styles.input}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter your current password"
                />
            </div>

            {/* new password */}
            <div className={styles.field}>
                <label className={styles.label}>New Password</label>
                <input
                    type="password"
                    className={styles.input}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                />
            </div>

            {/* confirm new password */}
            <div className={styles.field}>
                <label className={styles.label}>Confirm New Password</label>
                <input
                    type="password"
                    className={styles.input}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                />
            </div>

            <button
                className={styles.button}
                onClick={handleChangePassword}
                disabled={loading}
            >
                {loading ? "Changing..." : "Change Password"}
            </button>

        </div>

    );
}

export default ChangePassword;