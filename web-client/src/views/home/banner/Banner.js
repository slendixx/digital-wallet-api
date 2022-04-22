import styles from "./Banner.module.css";
import { useNavigate } from "react-router-dom";
import Img1 from "../../../assets/img1.jpg";
import Button1 from "../../../components/controls/button1/Button1";

const Banner = () => {
  const navigate = useNavigate();
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
      <Button1
        className={styles.button1}
        onClick={() => {
          navigate("/login");
        }}
      >
        Get Started!
      </Button1>
    </div>
  );
};
export default Banner;
