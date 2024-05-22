import { useState, FormEvent } from "react";
import { typesOfAlert } from "./Alert";

interface SignUpFormProps {
  onSignUp: (email: string, password: string) => void;
  onAlert: (alertType: typesOfAlert, alertContent: string) => void;
}

const SignUpForm = ({ onSignUp, onAlert }: SignUpFormProps) => {
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [confirmPasswordInputValue, setConfirmPasswordInputValue] =
    useState("");

  // Handle input change
  const handleEmailInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmailInputValue(event.target.value);
  };
  const handlePasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordInputValue(event.target.value);
  };
  const handleConfirmPasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPasswordInputValue(event.target.value);
  };

  // Handle button click
  const handleSignUpButton = (event: FormEvent) => {
    event.preventDefault();
    if (emailInputValue.trim() && passwordInputValue.trim()) {
      if (confirmPasswordInputValue.trim()) {
        if (confirmPasswordInputValue === passwordInputValue) {
          console.log(`Email: ${emailInputValue}`);
          console.log(`Password: ${passwordInputValue}`);

          onSignUp(emailInputValue, passwordInputValue);

          setPasswordInputValue("");
          setConfirmPasswordInputValue("");
        } else {
          onAlert(
            typesOfAlert.danger,
            "Your password confirmation does not match"
          );
        }
      } else {
        onAlert(typesOfAlert.danger, "Confirm your password");
      }
    } else {
      onAlert(typesOfAlert.danger, "Email or Password cannot be empty");
    }
  };

  return (
    <>
      <form onSubmit={handleSignUpButton}>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="inputEmail3"
              placeholder="Your Email address"
              value={emailInputValue}
              onChange={handleEmailInputChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword3"
              placeholder="Your password"
              value={passwordInputValue}
              onChange={handlePasswordInputChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" />
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPasswordConfirmation"
              placeholder="Confirm your password"
              value={confirmPasswordInputValue}
              onChange={handleConfirmPasswordInputChange}
            />
          </div>
        </div>
        <div className="container text-center">
          <button type="submit" className="btn btn-secondary">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
