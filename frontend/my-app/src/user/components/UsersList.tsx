import React from "react";

import "./UsersList.css";
import UserItem from "./UserItem";

const UsersList = (props: any) => {
  console.log(props);
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No users found.</h2>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((user: any) => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          email={user.email}
          phone={user.phone}
          created_at={user.createdAt}
          updated_at={user.updatedAt}
        />
      ))}
    </ul>
  );
};

export default UsersList;
