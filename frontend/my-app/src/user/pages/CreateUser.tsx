import React from "react";
import Card from "../../shared/components/UIElements/Card";
import { useNavigate } from "react-router-dom";

import "./CreateUser.css";
import Button from "../../shared/components/FormElements/Button";
const CreateUser = () => {
  const navigate = useNavigate();

  const userSubmitHandler = async (event: any) => {
    event.preventDefault();
    try {
      fetch("http://localhost:5000/api/user/new", {
        method: "POST",
        body: JSON.stringify({
          name: `${event.target.name.value}`,
          email: `${event.target.email.value}`,
          phone: `${event.target.phone.value}`,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      navigate("/");
    } catch (err: any) {}
  };

  return (
    <React.Fragment>
      <Card className="createUser">
        <h2>Create a User</h2>
        <hr />
        <form onSubmit={userSubmitHandler} className="create-user">
          <h4>User name</h4>
          <input id="name" type="text" />
          <h4>Email</h4>
          <input id="email" type="email" />
          <h4>Phone</h4>
          <input id="phone" type="number" />
          <Button type="submit">Create</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default CreateUser;
