import { ReactNode } from "react";

interface CardProps {
  picture: string;
  alt?: string;
  description: ReactNode;
}

const Card = ({ picture, alt = "picture", description }: CardProps) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={picture} className="card-img-top" alt={alt} />
      <div className="card-body">
        <div className="card-text">{description}</div>
      </div>
    </div>
  );
};

export default Card;
