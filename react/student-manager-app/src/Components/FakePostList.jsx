import React, { useState, useEffect } from "react";
import axios from "axios";

function FakePostList() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState("all");

  const fetchPosts = () => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/posts")
      .then((response) => {
        setPosts(response.data.posts);
        setFilteredPosts(response.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch posts");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedUser(value);

    if (value === "all") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter((post) => post.userId === Number(value))
      );
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h2>Fake API Posts</h2>

      {/* FIXED BUTTON */}
      <button onClick={fetchPosts} className="btn">
        Refresh
      </button>

      <select onChange={handleFilterChange} value={selectedUser}>
        <option value="all">All Users</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>

      {filteredPosts.map((post) => (
        <div key={post.id} className="card">
          <h4>{post.title}</h4>
          <p>{post.body}</p>
          <small>User ID: {post.userId}</small>
        </div>
      ))}
    </div>
  );
}

export default FakePostList;