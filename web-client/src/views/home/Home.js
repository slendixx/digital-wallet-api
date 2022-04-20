import styles from "./Home.module.css";
import HomeNavbar from "../../components/layout/navbar/HomeNavbar";
import Banner from "./banner/Banner";
import MoneyComposition from "../../components/svg/moneyComposition/MoneyComposition";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../../components/layout/footer/Footer";

const Home = () => {
  return (
    <>
      <HomeNavbar />
      <Banner />
      <main className={styles.content}>
        <h3>fast, simple & secure</h3>
        <Row className="justify-content-center">
          <Col className="d-flex justify-content-center align-items-center">
            <p>
              Digital wallet allows you to keep track of all your money
              transactions in a single place
            </p>
          </Col>
          <Col
            className="d-flex 
          justify-content-center"
          >
            <MoneyComposition />
          </Col>
        </Row>
      </main>
      <Footer />
    </>
  );
};
export default Home;
