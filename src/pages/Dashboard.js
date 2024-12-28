import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  // Handle new post submission
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, content: newPost }),
      });
      const data = await response.json();
      if (data.success) {
        setPosts([data.post, ...posts]); // Add the new post to the feed
        setNewPost('');
        setAuthor('');
        setMessage('Post added successfully!');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-2xl font-bold">Social Media Dashboard</h1>
      </header>

      <main className="container mx-auto p-4">
        <section className="mb-6">
          <form onSubmit={handlePostSubmit} className="bg-white shadow-md rounded p-4">
            <h2 className="text-lg font-semibold mb-4">Create a New Post</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <textarea
              placeholder="What's on your mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
              required
            ></textarea>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Post
            </button>
          </form>
          {message && <p className="text-green-500 mt-2">{message}</p>}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Feed</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white shadow-md rounded p-4">
                <strong className="text-lg">{post.author}</strong>
                <p className="text-gray-700">{post.content}</p>
                <small className="text-gray-500">{post.time}</small>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
