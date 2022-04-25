import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/home/Home";
import Login from "./views/login/Login";
import ForgotPassword from "./views/passwordRecovery/forgotPasswordForm/ForgotPasswordForm";
import Signup from "./views/signup/Signup";
import ChangePassword from "./views/passwordRecovery/changePasswordForm/ChangePasswordForm";
import Account from "./views/account/Account";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/transactions" />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />

          <Route path="/*" element={<Navigate replace to="/home" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
