import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Users from "./user/pages/Users";
import UserInfo from "./user/pages/UserInfo";
import CreateUser from "./user/pages/CreateUser";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route>
            <Route path="/" element={<Users />} />
            <Route path="/api/user/:userId" element={<UserInfo />} />
            <Route path="/api/user/new" element={<CreateUser />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
