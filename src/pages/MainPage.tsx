import Card from "../components/Card";
import ListGroup from "../components/ListGroup";
import Input from "../components/Input";
import Alert, { typesOfAlert } from "../components/Alert";
// import DelayComponent from "./components/DelayComponent";

import profile_pic from "../assets/cat.jpeg";
import { useEffect, useState } from "react";

const ALERT_FADE_TIMEOUT = 2000;

interface MainPageProps {
  onSignOut: () => void;
}

interface inputAlert {
  alertVisible: boolean;
  alertType: typesOfAlert;
  alertContent: string;
}

const MainPage = ({ onSignOut }: MainPageProps) => {
  const [todos, setNewTodos] = useState<string[]>([
    "milk",
    "beef",
    "rice",
    "pork",
  ]);

  const [todoAlert, setTodoAlertVisibility] = useState<inputAlert>({
    alertVisible: false,
    alertType: typesOfAlert.info,
    alertContent: "",
  });

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
      // setAlertDuplicatedItemVisibility(true);
      handleAlert(typesOfAlert.warning, "This item has already existed");
    } else {
      // setAlertSuccessItemVisibility(true);
      handleAlert(typesOfAlert.success, "Successfully added new item");

      setNewTodos([...todos, item]);

      console.log("Added " + item + " to to-do list");
      // console.log(todos);
    }

    setTimeout(() => {
      // setAlertSuccessItemVisibility(false);
      setTodoAlertVisibility({
        alertVisible: false,
        alertType: typesOfAlert.info,
        alertContent: "",
      });
    }, ALERT_FADE_TIMEOUT);
  };
  const handleAlert = (alertType: typesOfAlert, alertContent: string) => {
    setTodoAlertVisibility({
      alertVisible: true,
      alertType: alertType,
      alertContent: alertContent,
    });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8 p-2">
            <Input
              placeholderText="New to-do Item"
              onSubmitInput={handleAddItemToTodoList}
              onAlert={handleAlert}
            ></Input>
            {todoAlert.alertVisible && (
              <Alert
                alertType={todoAlert.alertType}
                onClose={() =>
                  setTodoAlertVisibility({
                    alertVisible: false,
                    alertType: typesOfAlert.info,
                    alertContent: "",
                  })
                }
              >
                {todoAlert.alertContent}
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
                  <input
                    type="button"
                    className="btn btn-link"
                    value="Sign out"
                    onClick={() => {
                      onSignOut();
                    }}
                  />
                </>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
