import { useState } from "react";
import Alert, { typesOfAlert } from "../components/Alert";
import SignUpForm from "../components/SignUpForm";
import axios from "axios";

const EMAIL: string = "nguyenhoanganha1@gmail.com";

const SIGNUP_URL: string = "todo";

interface SignUpProps {
  onFinishSignUp: () => void;
}

interface SignUpAlert {
  alertVisible: boolean;
  alertType: typesOfAlert;
  alertContent: string;
}

const SignUpPage = ({ onFinishSignUp }: SignUpProps) => {
  const [signUpAlert, setSignUpAlertVisibility] = useState<SignUpAlert>({
    alertVisible: false,
    alertType: typesOfAlert.info,
    alertContent: "",
  });
  const handleAlert = (alertType: typesOfAlert, alertContent: string) => {
    setSignUpAlertVisibility({
      alertVisible: true,
      alertType: alertType,
      alertContent: alertContent,
    });
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({ email: email, pwd: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        handleAlert(typesOfAlert.success, "Account created successfully");
        onFinishSignUp();
      } else if (response.status == 400) {
        handleAlert(typesOfAlert.danger, "This account already exists");
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

  return (
    <>
      <h1>Sign Up</h1>
      {signUpAlert.alertVisible && (
        <Alert
          alertType={signUpAlert.alertType}
          onClose={() =>
            setSignUpAlertVisibility({
              alertVisible: false,
              alertType: typesOfAlert.info,
              alertContent: "",
            })
          }
        >
          {signUpAlert.alertContent}
        </Alert>
      )}
      <SignUpForm onAlert={handleAlert} onSignUp={handleSignUp}></SignUpForm>
      <div className="container text-center">
        <input
          className="btn btn-link"
          type="button"
          value="Already has an account?"
          onClick={() => onFinishSignUp()}
        />
      </div>
    </>
  );
};

export default SignUpPage;
