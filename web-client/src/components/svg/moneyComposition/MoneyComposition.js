import styles from "./MoneyComposition.module.css";
import Cash from "../icons/cash/Cash";
import Wallet from "../icons/wallet/Wallet";

const MoneyComposition = () => {
  return (
    <div className={styles.composition__container}>
      <Cash width={"5rem"} className={styles["composition__icon--1"]} />
      <Cash width={"4rem"} className={styles["composition__icon--2"]} />
      <Cash width={"3rem"} className={styles["composition__icon--3"]} />
      <Wallet width={"7rem"} className={styles["composition__icon--wallet"]} />
    </div>
  );
};

export default MoneyComposition;
