import { useState, FormEvent } from "react";
import Alert from "./Alert";

interface InputProps {
  placeholderText: string;
  buttonName?: string;

  onSubmitInput: (input: string) => void;
}

const Input = ({
  placeholderText,
  buttonName = "Add",
  onSubmitInput,
}: InputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [alertEmptyInputVisible, setAlertEmptyInputVisibility] =
    useState(false);

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Handle button click
  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();
    if (inputValue.trim()) {
      console.log(`Submit Value: ${inputValue}`);
      onSubmitInput(inputValue);

      setInputValue("");
    } else {
      setAlertEmptyInputVisibility(true);
    }
  };

  return (
    <>
      <form className="row align-items-center" onSubmit={handleSubmitForm}>
        <div className="col-sm-10">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="inlineInput"
              placeholder={placeholderText}
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="col-sm">
          <button type="submit" className="btn btn-primary">
            {buttonName}
          </button>
        </div>
      </form>

      {/* Show Alert if an empty item is added */}
      {alertEmptyInputVisible && (
        <Alert
          alertType="danger"
          onClose={() => setAlertEmptyInputVisibility(false)}
        >
          Input should not be empty
        </Alert>
      )}
    </>
  );
};

export default Input;
