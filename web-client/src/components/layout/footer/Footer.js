import styles from "./Footer.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Row className={styles.footer}>
      <Col className={styles.footer__col}>
        <Navbar.Brand
          as={Link}
          to="/home"
          className={`${styles.footer__item} ${styles["footer__item--brand"]}`}
        >
          Digital Wallet
        </Navbar.Brand>
        <p className={styles["footer__item--p"]}>
          All your money transactions in a single place
        </p>
      </Col>
      <Col className={styles.footer__col}>
        <p className={styles["footer__item--head"]}>Explore</p>
        <Link className={styles.footer__item} to="/home">
          Home
        </Link>
        <Link className={styles.footer__item} to="/home">
          About
        </Link>
        <Link className={styles.footer__item} to="/account">
          App
        </Link>
      </Col>
      <Col className={styles.footer__col}>
        <p className={styles["footer__item--head"]}>Contact</p>{" "}
        <p className={styles["footer__item--p"]}>
          esteban321duran.business@gmail.com
        </p>
        <p className={styles["footer__item--p"]}>https://github.com/slendixx</p>
      </Col>
      <Col className={styles.footer__col}>
        <p className={styles["footer__item--head"]}>Legal</p>{" "}
        <Link className={styles.footer__item} to="/home">
          Terms
        </Link>
        <Link className={styles.footer__item} to="/home">
          Privacy
        </Link>
      </Col>
      <p className={styles.footer__copyright}>
        © 2022 Digital Wallet. All Rights Reserved.
      </p>
    </Row>
  );
};

export default Footer;
