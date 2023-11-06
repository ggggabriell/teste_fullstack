import React from "react";

import "./UserItem.css";
import Card from "../../shared/components/UIElements/Card";
import { Link } from "react-router-dom";

const UserItem = (props: any) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <div className="user-item__info">
          <h2>{props.name}</h2>
          <h3>Email: {props.email}</h3>
          <h3>Phone: {props.phone}</h3>
          <h3>Id: {props.id}</h3>
          <h3>
            {props.created_at !== undefined ? "Criado em: " : "Error"}{" "}
            {new Date(props.created_at).toLocaleString("default")}
          </h3>
        </div>
        <div className="user-edit">
          <Link to={`/api/user/${props.id}`} state={props}>
            Editar
          </Link>
        </div>
      </Card>
    </li>
  );
};

export default UserItem;
