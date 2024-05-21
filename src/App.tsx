import Card from "./components/Card";
import ListGroup from "./components/ListGroup";
import Input from "./components/Input";
import Alert from "./components/Alert";
import DelayComponent from "./components/DelayComponent";

import profile_pic from "./assets/cat.jpeg";
import { useEffect, useState } from "react";

const ALERT_FADE_TIMEOUT = 5000;

function App() {
  // let todos = ["milk", "beef", "rice", "pork"];
  const [todos, setNewTodos] = useState<string[]>([
    "milk",
    "beef",
    "rice",
    "pork",
  ]);

  const [alertDuplicatedItemVisible, setAlertDuplicatedItemVisibility] =
    useState(false);
  const [alertSuccessItemVisible, setAlertSuccessItemVisibility] =
    useState(false);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const handleDeleteItemFromTodoList = (item: string) => {
    const newTodos = todos.filter((t) => t !== item);
    setNewTodos(newTodos);

    console.log("Deleted " + item + " from to-do list");
    // console.log(todos);
  };
  const handleAddItemToTodoList = (item: string) => {
    if (todos.includes(item)) {
      setAlertDuplicatedItemVisibility(true);
    } else {
      setAlertSuccessItemVisibility(true);

      setTimeout(() => {
        setAlertSuccessItemVisibility(false);
      }, ALERT_FADE_TIMEOUT);

      setNewTodos([...todos, item]);

      console.log("Added " + item + " to to-do list");
      // console.log(todos);
    }
  };

  return (
    <>
      <div className="container-fluid text-center">
        <h1 className="display-5 font-monospace fw-bold p-3 mb-2 bg-primary-subtle text-primary-emphasis">
          To-Do List
        </h1>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8 p-2">
            <Input
              placeholderText="New to-do Item"
              onSubmitInput={handleAddItemToTodoList}
            ></Input>
            {alertDuplicatedItemVisible && (
              <Alert
                alertType="warning"
                onClose={() => setAlertDuplicatedItemVisibility(false)}
              >
                This item has already existed
              </Alert>
            )}
            {alertSuccessItemVisible && (
              <Alert
                alertType="success"
                onClose={() => setAlertSuccessItemVisibility(false)}
              >
                Successfully added new item
              </Alert>
            )}

            <ListGroup
              itemList={todos}
              onDeleteItem={handleDeleteItemFromTodoList}
            ></ListGroup>
          </div>
          <div className="col-4 p-2 text-center">
            <Card
              picture={profile_pic}
              description={
                <>
                  <h2>Hoang Anh Nguyen</h2>
                  <p>hehehehe</p>
                </>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
