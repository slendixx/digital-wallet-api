import styles from "./ForgotPasswordForm.module.css";
import useForgotPasswordForm from "../../../services/hooks/useForgotPasswordForm.js";
import Form from "react-bootstrap/Form";
import Button1 from "../../../components/controls/button1/Button1";
import Subtitle from "../../../components/layout/subtitle/Subtitle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

const ForgotPasswordForm = () => {
  const resetPasswordForm = useForgotPasswordForm();
  let alert = "";

  if (resetPasswordForm.unauthorized)
    alert = <Alert variant="danger">Invalid Email</Alert>;
  if (resetPasswordForm.validationError)
    alert = (
      <Alert variant="warning">
        {resetPasswordForm.validationErrorMessage}
      </Alert>
    );
  if (resetPasswordForm.success)
    alert = (
      <Alert variant="success">
        Done. Please check your email to continue with the password recovery
        process
      </Alert>
    );

  return (
    <>
      <Row>
        <Col className={styles.form__col}>
          <Subtitle>Reset Password</Subtitle>
        </Col>
      </Row>

      <Row>
        <Col className={styles.form__col}>{alert}</Col>
      </Row>
      <Row>
        <Col className={styles.form__col}>
          <Form
            className={styles.form}
            onSubmit={resetPasswordForm.handleSubmit}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={resetPasswordForm.email}
                onChange={resetPasswordForm.handleEmailChange}
              />
              <Form.Text className="text-muted">
                We'll send you the instructions for resetting your password to
                your email account
              </Form.Text>
            </Form.Group>

            <Button1 type="submit">Submit</Button1>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default ForgotPasswordForm;
