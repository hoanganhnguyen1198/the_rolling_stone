import LoginForm from "../components/LoginForm";
import Alert, { typesOfAlert } from "../components/Alert";
import { useState } from "react";

import axios from "axios";

const EMAIL: string = "nguyenhoanganha1@gmail.com";
const PASSWORD: string = "12345678";

const LOGIN_URL: string = "todo";

interface LoginProps {
  onSuccessLogin: (token: boolean) => void;
  onSignUp: () => void;
}

interface LoginAlert {
  alertVisible: boolean;
  alertType: typesOfAlert;
  alertContent: string;
}

const LoginPage = ({ onSuccessLogin, onSignUp }: LoginProps) => {
  const [loginAlert, setLoginAlertVisibility] = useState<LoginAlert>({
    alertVisible: false,
    alertType: typesOfAlert.info,
    alertContent: "",
  });

  const handleSignIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: email, pwd: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        console.log("Login successfully");
        onSuccessLogin(true);
      } else if (response.status == 401) {
        console.log("Wrong email or password");
        handleAlert(typesOfAlert.danger, "Wrong email or password");
      } else {
        handleAlert(
          typesOfAlert.danger,
          "Something wrong happened but I got no idea"
        );
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const handleAlert = (alertType: typesOfAlert, alertContent: string) => {
    setLoginAlertVisibility({
      alertVisible: true,
      alertType: alertType,
      alertContent: alertContent,
    });
  };

  return (
    <>
      <h1>Login</h1>
      {loginAlert.alertVisible && (
        <Alert
          alertType={loginAlert.alertType}
          onClose={() =>
            setLoginAlertVisibility({
              alertVisible: false,
              alertType: typesOfAlert.info,
              alertContent: "",
            })
          }
        >
          {loginAlert.alertContent}
        </Alert>
      )}
      <LoginForm onSignIn={handleSignIn} onAlert={handleAlert}></LoginForm>
      <br />
      <div className="container text-center">
        <input
          className="btn btn-light"
          type="button"
          value="Sign up"
          onClick={() => onSignUp()}
        />
      </div>
    </>
  );
};

export default LoginPage;
