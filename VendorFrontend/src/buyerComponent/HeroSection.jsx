import styles from "./HeroSection.module.css";

function HeroSection ({store}) {

    // if  no banner image uploaded yet
    if(!store?.bannerImage) {
        return null;        
    }

    return(
        <div className={styles.hero}>
            <img
            src={store.bannerImage}
            alt={store?.businessName}
            className={styles.bannerImage}
            />
        </div>
    );
}

export default HeroSection;