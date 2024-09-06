import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [commentText, setCommentText] = useState("");
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);

  const navigate = useNavigate();

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      setPosts([...posts, { text: newPost, comments: [] }]);
      setNewPost("");
    }
  };

  const handleCommentSubmit = (e, index) => {
    e.preventDefault();
    if (commentText.trim() && selectedPostIndex !== null) {
      const updatedPosts = [...posts];
      updatedPosts[selectedPostIndex].comments.push(commentText);
      setPosts(updatedPosts);
      setCommentText("");
      setSelectedPostIndex(null);
    }
  };

  return (
    <div className="container" id='community'>
      <h2>Community Forum</h2>
      
      <form onSubmit={handlePostSubmit} className="mb-4">
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="3"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write a new post..."
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Post</button>
      </form>

      {posts.map((post, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <p>{post.text}</p>
            <button
              className="btn btn-link" style={{textDecoration : "none", marginBottom : "10px"}}
              onClick={() => setSelectedPostIndex(index)}
            >
              Comment
            </button>
            {selectedPostIndex === index && (
              <form onSubmit={(e) => handleCommentSubmit(e, index)}>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="2"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-secondary">Add Comment</button>
              </form>
            )}
            {post.comments.length > 0 && (
              <div className="mt-3">
                <h5>Comments:</h5>
                <ul className="list-unstyled">
                  {post.comments.map((comment, i) => (
                    <li key={i} className="border-bottom pb-2">{comment}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Community;
