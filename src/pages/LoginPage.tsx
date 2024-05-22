import LoginForm from "../components/LoginForm";
import Alert, { typesOfAlert } from "../components/Alert";
import { useState } from "react";
import "../Macro";

const EMAIL: string = "nguyenhoanganha1@gmail.com";
const PASSWORD: string = "12345678";

interface LoginAlert {
  alertVisible: boolean;
  alertType: typesOfAlert;
  alertContent: string;
}

const LoginPage = () => {
  const [loginAlert, setLoginAlertVisibility] = useState<LoginAlert>({
    alertVisible: false,
    alertType: typesOfAlert.info,
    alertContent: "",
  });

  const handleSignIn = (email: string, password: string) => {
    if (email === EMAIL && password === PASSWORD) {
      console.log("Login successfully");
    } else {
      console.log("Wrong email or password");
      handleAlert(typesOfAlert.danger, "Wrong email or password");
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
    </>
  );
};

export default LoginPage;
