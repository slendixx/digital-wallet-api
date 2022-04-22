import styles from "./ChangePasswordForm.module.css";
import useChangePasswordForm from "../../../services/hooks/useChangePasswordForm";
import Form from "react-bootstrap/Form";
import Button1 from "../../../components/controls/button1/Button1";
import Subtitle from "../../../components/layout/subtitle/Subtitle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

const Login = () => {
  const changePasswordForm = useChangePasswordForm();
  let alert = "";

  if (changePasswordForm.unauthorized)
    alert = (
      <Alert variant="danger">
        This password recovery token is invalid or has expired.
      </Alert>
    );
  if (changePasswordForm.validationError)
    alert = (
      <Alert variant="warning">
        {changePasswordForm.validationErrorMessage}
      </Alert>
    );

  return (
    <>
      <Row>
        <Col className={styles.form__col}>
          <Subtitle>Change Password</Subtitle>
        </Col>
      </Row>

      <Row>
        <Col className={styles.form__col}>{alert}</Col>
      </Row>
      <Row>
        <Col className={styles.form__col}>
          <Form
            className={styles.form}
            onSubmit={changePasswordForm.handleSubmit}
          >
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={changePasswordForm.password}
                onChange={changePasswordForm.handlePasswordChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={changePasswordForm.confirmPassword}
                onChange={changePasswordForm.handleConfirmPasswordChange}
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
