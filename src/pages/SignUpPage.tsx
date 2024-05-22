import { useState } from "react";
import Alert, { typesOfAlert } from "../components/Alert";
import SignUpForm from "../components/SignUpForm";

const EMAIL: string = "nguyenhoanganha1@gmail.com";

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

  const handleSignUp = (email: string, password: string) => {
    if (email === EMAIL) {
      handleAlert(typesOfAlert.danger, "This account already exists");
    } else {
      // ToDo
      handleAlert(typesOfAlert.success, "Account created successfully");
      onFinishSignUp();
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
