import styles from "./Banner.module.css";
import Img1 from "../../../assets/img1.jpg";

const Banner = () => {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.banner__header}`}>
        Digital <span className={styles["banner__header--second"]}>Wallet</span>
      </h1>
      <img
        src={Img1}
        className={`${styles.banner__image}`}
        alt="smiling standing man watching his cell phone"
      ></img>
    </div>
  );
};
export default Banner;