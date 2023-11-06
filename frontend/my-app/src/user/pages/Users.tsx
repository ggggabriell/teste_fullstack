import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Button from "../../shared/components/FormElements/Button";
const Users = () => {
  const { sendRequest } = useHttpClient();

  const [loadedUsers, setLoadedUsers] = useState();
  const [trigger, setTrigger] = useState(false);
  const [newest, setIsNewest] = useState(false);
  const [oldest, setIsOldest] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/user`,
          "GET",
          undefined,
          {
            newest: newest,
            oldest: oldest,
          }
        );
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };

    fetchUsers();
  }, [sendRequest, trigger]);

  return (
    <React.Fragment>
      <Button
        onClick={() => {
          setIsNewest(!newest);
          setIsOldest(false);
          setTrigger(!trigger);
        }}
      >
        Newest
      </Button>
      <Button
        onClick={() => {
          setIsOldest(!oldest);
          setIsNewest(false);
          setTrigger(!trigger);
        }}
      >
        Oldest
      </Button>
      {loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
