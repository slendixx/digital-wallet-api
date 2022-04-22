import styles from "./Signup.module.css";
import useSignupForm from "../../services/hooks/useSignupForm";
import Form from "react-bootstrap/Form";
import Button1 from "../../components/controls/button1/Button1";
import Subtitle from "../../components/layout/subtitle/Subtitle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

const Login = () => {
  const signupForm = useSignupForm();
  let alert = "";

  if (signupForm.unauthorized)
    alert = <Alert variant="danger">Invalid Email or Password</Alert>;
  if (signupForm.validationError)
    alert = (
      <Alert variant="warning">{signupForm.validationErrorMessage}</Alert>
    );

  return (
    <>
      <Row>
        <Col className={styles.form__col}>
          <Subtitle>Sign Up</Subtitle>
        </Col>
      </Row>

      <Row>
        <Col className={styles.form__col}>{alert}</Col>
      </Row>
      <Row>
        <Col className={styles.form__col}>
          <Form className={styles.form} onSubmit={signupForm.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                value={signupForm.firstName}
                onChange={signupForm.handleFirstNameChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                value={signupForm.lastName}
                onChange={signupForm.handleLastNameChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={signupForm.email}
                onChange={signupForm.handleEmailChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={signupForm.password}
                onChange={signupForm.handlePasswordChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={signupForm.confirmPassword}
                onChange={signupForm.handleConfirmPasswordChange}
              />
            </Form.Group>
            <Button1 type="submit">Submit</Button1>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default Login;
