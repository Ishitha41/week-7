import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LocalUserList from "./components/LocalUserList";
import UserList from "./components/UserList";
import FakePostList from "./components/FakePostList";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/local-users" element={<LocalUserList />} />
        <Route path="/users-api" element={<UserList />} />
        <Route path="/fake-posts" element={<FakePostList />} />
      </Routes>
    </Router>
  );
}

export default App;