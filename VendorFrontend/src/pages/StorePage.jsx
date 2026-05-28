import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStore } from "../api/api";
import Navbar from "../buyerComponent/Navbar";
import HeroSection from "../buyerComponent/HeroSection";
import CategoryTabs from "../buyerComponent/CategoryTabs";
import ProductGrid from "../buyerComponent/ProductGrid";
import Footer from "../buyerComponent/Footer";
import styles from "./StorePage.module.css";

function StorePage() {
    const { slug} = useParams();

    const [store, setStore] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // fetch store data when page loads
    useEffect(() => {
        const loadStore = async () =>{
            const data = await getStore(slug);

            if (data.error) {
                setError(data.error);
                setLoading(false);
                return;
            }

            // backend return { store, products, categories}
            setStore(data.store);
            setProducts(data.products);
            setCategories(data.categories);
            setFilteredProducts(data.products)
            setLoading(false);
        };
        loadStore();
    }, [slug]);

    // filter products when buyer selects a category tab
    const handleSelectCategory = (categoryId) => {
        if (categoryId === "all") {
            setFilteredProducts(products);
            return;
        }

        const filtered = products.filter((product) => {
                // handle both populated object and plain string
                const productCategoryId = typeof product.categoryId === "object" ? product.categoryId._id : product.categoryId;
                return productCategoryId === categoryId;
            });
        setFilteredProducts(filtered);
    };

    // loading state
    if (loading) {
        return(
            <div className={styles.loadingContainer}>
                <p className={styles.loadingText}>Loading store...</p>
            </div>
        );
    }

    // error state - store not found or inactive
    if (error) {
        return(
            <div className={styles.errorContainer}>
                <p className={styles.errorTitle}>Store not found</p>
                <p className={styles.errorText}>This store does not exist or is currently unavailable.</p>
            </div>
        );
    }

       return (
        <div className={styles.container}>
            {/* navbar - sticky at top */}
            <Navbar store={store} />

            {/* hero banner - pro and premium only */}
            <HeroSection store={store} />

             {/*category tabs - horizontal scroll  */}
             <CategoryTabs categories={categories} onSelectCategory={handleSelectCategory} />

             {/* product grid */}
             <ProductGrid products={filteredProducts} slug={slug} />

             {/* footer */}
             <Footer store={store} />
        </div>
       );
}

export default StorePage;