import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getProducts, getCategories} from "../api/api";
import styles from "./DashboardPage.module.css";

function DashboardPage() {
    const {seller} = useAuth();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    // fetch products and categories when page loads
    useEffect(() =>{
        const loadData = async ()=>{
            const [productsData, categoriesData] = await Promise.all([
                getProducts(),
                getCategories(),
            ]);

            if (productsData.error){
                setError(productsData.error);
                setLoading(false);
                return;
            }

            setProducts(productsData);

            if(!categoriesData.error){
                setCategories(categoriesData);
            }

            setLoading(false);
        };
        loadData();
    }, []);

    // figure out plan product limit
    let productLimit;

    if(seller?.plan === "basic"){
        productLimit = 25;
    } else if (seller?.plan === "pro"){
        productLimit = 60;
    } else if (seller?.plan === "premium"){
        productLimit = null; //unlimited
    } else{
        productLimit = 25;
    }

    // copy store link to clipboard
    const handleCopyLink = () =>{
        const storeLink = `moonstore.com/${seller?.slug}`;
        navigator.clipboard.writeText(storeLink)
        setCopied(true);

        //reset copied message after 2 seconds
        setTimeout(() =>{
            setCopied(false);
        }, 2000);
    };

    return(
        <div className={styles.container}>

            {/* welcome message */}
            <div className={styles.welcome}>
                <h1 className={styles.welcomeTitle}>Welcome back, {seller?.businessName}</h1>
                <p className={styles.welcomeSubtitle}>Here is a summary of your store</p>
            </div>

                     {/* error message  */}
                     {error && <p className={styles.error}>{error}</p>}

                     {/* loading state */}
                     {loading ? (
                        <p className={styles.loading}>Loading your store data...</p>
                     ) : null}

                     {/* stats cards */}
                     {loading ? null : (
                        <div className={styles.cards}>

                            {/* total products */}
                            <div className={styles.card}>
                                <p className={styles.cardLabel}>Products</p>
                                <p className={styles.cardValue}>
                                    {products.length}
                                    {productLimit !== null ? ` / ${productLimit}` : " / Unlimited"}
                                </p>

                                <p className={styles.cardHint}>
                                    {productLimit !== null
                                    ? `${productLimit - products.length} slots remaining` 
                                    : "No product limit on your plan"
                                    }
                                </p>
                            </div>

                            {/* total categories */}
                            <div className={styles.card}>
                                <p className={styles.cardLabel}>Categories</p>
                                <p className={styles.cardValue}>{categories.length}</p>
                                <p className={styles.cardHint}>Total categories in your store</p>
                            </div>

                            {/* store status */}
                            <div className={styles.card}>
                                <p className={styles.cardLabel}>Store Status</p>

                                <p className={
                                    seller?.isActive ? styles.statusActive : styles.statusInactive
                                }>                                
                                    {seller?.isActive ? "Active" : "Inactive"}
                                </p>

                                <p className={styles.cardHint}>
                                    {seller?.isActive
                                    ? "Your store is live and visible to buyers"
                                    : "Your store is currently hidden from buyers"
                                    }
                                </p>
                            </div>

                            {/* plan */}
                            <div className={styles.card}>
                                <p className={styles.cardLabel}>Your Plan</p>
                                <p className={styles.cardValue}>{seller?.plan}</p>

                                <p className={styles.cardHint}>
                                    {seller?.plan === "basic" ? "Upgrade to pro for more features" : null}
                                    {seller?.plan === "pro" ? "Upgrade to premium for unlimited features" : null}
                                    {seller?.plan === "premium" ? "You are on the best plan" : null}
                                </p>
                            </div>
                        </div>
                     )}

                     {/* store link */}
                     {loading ? null :(
                        <div className={styles.storeLinkSection}>
                            <p className={styles.storeLinkLabel}>Your Store Link</p>
                            <div className={styles.storeLinkRow}>
                                <p className={styles.storeLink}>
                                    moonstore.com/{seller?.slug}
                                </p>

                                <button
                                className={styles.copyButton}
                                onClick={handleCopyLink}
                                >
                                    {copied ? "Copied" : "Copy Link"}
                                </button>
                            </div>
                            <p className={styles.storeLinkHint}>
                                Paste this link on your social media bios or share it with your customers. <br/>
                                Note: Your store link is permanent. It won't change if you change your store name.
                            </p>
                        </div>
                     )}

                     {/* basic analytics - pro and premium only */}
                     {seller?.plan === "pro" || seller?.plan === "premium" ? (
                        <div className={styles.comingSoonCard}>
                            <p className={styles.comingSoonLabel}>Basic Analytics</p>
                            <p className={styles.comingSoonTitle}>Coming Soon</p>
                            <p className={styles.comingSoonText}>
                                Track how many buyers visit your store, which products get the most clicks, and how many orders you receive.
                            </p>
                        </div>
                     ) : null}

                     {/* advanced sales insight - premium only */}
                     {seller?.plan === "premium" ? (
                        <div className={styles.comingSoonCard}>
                            <p className={styles.comingSoonLabel}>Advanced Sales Insights</p>
                            <p className={styles.comingSoonTitle}>Coming Soon</p>
                            <p className={styles.comingSoonText}>
                                Get specific advice based on your store performance.
                                Know what is selling, when your buyers are most active, and exactly what to do to increase your orders.
                            </p>
                        </div>
                     ) : null}
        </div>
    );

}

export default DashboardPage;