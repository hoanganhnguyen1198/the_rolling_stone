
interface CardProps {
  picture: string;
  alt?: string;
  description: string;
}

const Card = ({ picture, alt = "picture", description }: CardProps) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={picture} className="card-img-top" alt={alt} />
      <div className="card-body">
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};

export default Card;
