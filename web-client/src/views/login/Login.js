import styles from "./Login.module.css";
import useLoginForm from "../../services/hooks/useLoginForm";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Button1 from "../../components/controls/button1/Button1";
import Subtitle from "../../components/layout/subtitle/Subtitle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

const Login = () => {
  const loginForm = useLoginForm();
  let alert = "";
  if (loginForm.accountCreated)
    alert = (
      <Alert variant="success">
        Your account was successfully created. Please log in to get started
      </Alert>
    );
  if (loginForm.passwordChanged)
    alert = (
      <Alert variant="success">Your password was successfully changed</Alert>
    );
  if (loginForm.unauthorized)
    alert = <Alert variant="danger">Invalid Email or Password</Alert>;
  if (loginForm.validationError)
    alert = <Alert variant="warning">{loginForm.validationErrorMessage}</Alert>;

  return (
    <>
      <Row>
        <Col className={styles.form__col}>
          <Subtitle>Log in</Subtitle>
        </Col>
      </Row>

      <Row>
        <Col className={styles.form__col}>{alert}</Col>
      </Row>
      <Row>
        <Col className={styles.form__col}>
          <Form className={styles.form} onSubmit={loginForm.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={loginForm.email}
                onChange={loginForm.handleEmailChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={loginForm.handlePasswordChange}
              />
            </Form.Group>

            <Button1 type="submit">Submit</Button1>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className={styles.form__col}>
          <Link className={styles.link} to="/forgot-password">
            Forgot your password?
          </Link>
        </Col>
      </Row>
      <Row>
        <Col className={styles.form__col}>
          Dont have an account?
          <Link className={styles["link--inline"]} to="/signup">
            Create new account
          </Link>
        </Col>
      </Row>
    </>
  );
};
export default Login;
