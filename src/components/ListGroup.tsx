interface ListGroupProps {
  itemList: string[];

  onDeleteItem: (item: string) => void;
}

const ListGroup = ({ itemList, onDeleteItem }: ListGroupProps) => {
  return (
    <>
      {itemList.length === 0 && <p>No item yet</p>}
      <ul className="list-group">
        {itemList.map((item, index) => (
          <li className="list-group-item" key={index}>
            <input
              className="form-check-input me-1"
              type="checkbox"
              value=""
              onChange={() => console.log(item, index)}
            />
            <label className="form-check-label">{item}</label>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => onDeleteItem(item)}
            ></button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListGroup;
