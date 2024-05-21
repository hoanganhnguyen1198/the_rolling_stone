import { ReactNode } from "react";

interface AlertProps {
  alertType: "success" | "danger" | "warning" | "info";
  children: ReactNode;
  onClose: () => void;
}

const Alert = ({ alertType, children, onClose }: AlertProps) => {
  let className = "alert alert-" + alertType + " alert-dismissible fade show";
  return (
    <div className={className} role="alert">
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default Alert;
