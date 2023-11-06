import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

import { useHttpClient } from "../../shared/hooks/http-hook";
import "./UserInfo.css";

const UserUpdate = (props: any) => {
  const { sendRequest } = useHttpClient();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    createdAt: "",
    updatedAt: "",
  });
  const userId = useParams().userId;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(userId);
        const response = await sendRequest(
          `http://localhost:5000/api/user/${userId}`
        );
        setUser(response.user);
      } catch (err: any) {}
    };
    fetchUser();
  }, [sendRequest, userId]);

  const userSubmitHandler = async (event: any) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/user/${userId}`, {
        method: "PATCH",
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

  const userDeleteHandler = async () => {
    try {
      await fetch(`http://localhost:5000/api/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      navigate("/");
    } catch (err: any) {}
  };

  if (!user) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <Card className="createUser">
      {user && <h2>{user.name}</h2>}
      <hr />
      {user && (
        <form onSubmit={userSubmitHandler}>
          <h4>User name</h4>
          <input id="name" type="text" defaultValue={user.name} />
          <h4>Email</h4>
          <input id="email" type="email" defaultValue={user.email} />
          <h4>Phone</h4>
          <input id="phone" type="number" defaultValue={user.phone} />
          <h3>
            {user.createdAt !== undefined ? "Criado em: " : "Error"}{" "}
            {new Date(user.createdAt).toLocaleString("default")}
          </h3>
          <h3>
            {user.updatedAt !== undefined ? "Editado em: " : "Error"}{" "}
            {new Date(user.updatedAt).toLocaleString("default")}
          </h3>
          <Button type="submit">Editar</Button>
          <Button onClick={userDeleteHandler}>Excluir</Button>
        </form>
      )}
    </Card>
  );
};

export default UserUpdate;
