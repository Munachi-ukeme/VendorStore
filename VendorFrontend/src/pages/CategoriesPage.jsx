import CategoryManager from "../sellerComponent/CategoryManager";
import styles from "./CategoriesPage.module.css";

function CategoriesPage (){
    return(
        <div className={styles.container}>
            <CategoryManager/>
        </div>
    );
}

export default CategoriesPage;