import React, { useState, useEffect } from "react";
function LocalUserList() {
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
useEffect(() => {
fetch("/users.json")
.then((response) => {
if (!response.ok) {
throw new Error("Failed to fetch local users");
}
return response.json();
})
.then((data) => {
setUsers(data);
setLoading(false);
})
.catch((err) => {
setError(err.message);
setLoading(false);
});
}, []);
if (loading) return <p>Loading local users...</p>;
if (error) return <p>Error: {error}</p>;
return (
<div className="container">
<h2>Local Users</h2>
{users.map((user) => (
<div key={user.id} className="card">
<h4>{user.name}</h4>
<p>Email: {user.email}</p>
<p>Phone: {user.phone}</p>
</div>
))}
</div>
);
}