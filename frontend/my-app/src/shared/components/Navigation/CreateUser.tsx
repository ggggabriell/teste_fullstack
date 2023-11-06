import React from "react";
import { NavLink } from "react-router-dom";

import "./CreateUser.css";

const CreateUser = () => {
  return (
    <NavLink to="api/user/new">
      <button>
        <p>Create Users</p>
      </button>
    </NavLink>
  );
};

export default CreateUser;
