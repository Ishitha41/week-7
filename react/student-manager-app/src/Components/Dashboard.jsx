import React from "react";
import { Link } from "react-router-dom";
function Dashboard() {
return (
<div className="container">
<h1>News Portal Dashboard</h1>
<div className="nav-buttons">
<Link to="/local-users" className="btn">Local Users</Link>
<Link to="/users-api" className="btn">Users API</Link>
<Link to="/fake-posts" className="btn">Fake API Posts</Link>
</div>
</div>
);
}
export default Dashboard;