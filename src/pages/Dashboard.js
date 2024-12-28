import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  // Dummy data for activity graph
  const activityData = [
    { name: "Mon", Posts: 5, Likes: 12 },
    { name: "Tue", Posts: 8, Likes: 20 },
    { name: "Wed", Posts: 6, Likes: 15 },
    { name: "Thu", Posts: 10, Likes: 30 },
    { name: "Fri", Posts: 4, Likes: 18 },
    { name: "Sat", Posts: 7, Likes: 25 },
    { name: "Sun", Posts: 12, Likes: 40 },
  ];

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://pwd-b-3.onrender.com/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Handle new post submission
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://pwd-b-3.onrender.com/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, content: newPost }),
      });
      const data = await response.json();
      if (data.success) {
        setPosts([data.post, ...posts]); // Add the new post to the feed
        setNewPost("");
        setAuthor("");
        setMessage("Post added successfully!");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white py-6 shadow-md">
        <h1 className="text-3xl font-bold text-center">Social Media Dashboard</h1>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* User Profile Section */}
        <section className="mb-8 flex items-center space-x-4 bg-white shadow-md p-6 rounded-lg">
          <img
            src="https://wallpapers.com/images/featured/dark-avengers-27iqznzroib1dxqg.jpg"
            alt="Profile"
            className="rounded-full w-24 h-24"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-700">Welcome, User!</h2>
            <p className="text-gray-500">This is your social media hub.</p>
            <p className="text-blue-500 font-semibold">
              Total Posts: {posts.length}
            </p>
          </div>
        </section>

        {/* Insights Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Weekly Activity Insights
          </h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Posts" stroke="#8884d8" />
                <Line type="monotone" dataKey="Likes" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Create a New Post */}
        <section className="mb-8">
          <form
            onSubmit={handlePostSubmit}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Create a New Post
            </h2>
            <input
              type="text"
              placeholder="Your Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="What's on your mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded hover:shadow-lg hover:opacity-90 transition"
            >
              Post
            </button>
          </form>
          {message && (
            <p className="text-center mt-4 text-green-600 font-medium">
              {message}
            </p>
          )}
        </section>

        {/* Posts Feed */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Recent Posts</h2>
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <strong className="text-xl text-blue-600">
                      {post.author}
                    </strong>
                    <small className="text-gray-500 italic">{post.time}</small>
                  </div>
                  <p className="text-gray-700 text-lg">{post.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No posts to display.</p>
            )}
          </div>
        </section>

        {/* Media Gallery */}
        <section>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Media Gallery</h2>
          <div className="grid grid-cols-3 gap-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjd53yABBo0jEx5FXr2DkLo0dXrVXllwdyug&s"
              alt="Media"
              className="rounded-lg shadow-md"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS56zme7c_Bw97z_yJf8k_N-FvVI7BPObTJ2g&s"
              alt="Media"
              className="rounded-lg shadow-md"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT20iOtz0uGGgaJ8VXXRYXpYULPmqfr20zpLg&s"
              alt="Media"
              className="rounded-lg shadow-md"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
