import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import 'bootstrap/dist/css/bootstrap.min.css';

const Workspace = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [fileInput, setFileInput] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editFileName, setEditFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [invites, setInvites] = useState([]);

  // Handle file upload
  const handleFileUpload = (e) => {
    e.preventDefault();
    if (fileInput && fileInput.files.length > 0) {
      const newFiles = [...files];
      Array.from(fileInput.files).forEach(file => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          newFiles.push({
            name: file.name,
            content: fileReader.result,
            originalName: file.name
          });
          setFiles(newFiles);
        };
        fileReader.readAsText(file);
      });
      setFileInput(null); // Clear the file input after upload
    }
  };

  // Handle file rename
  const handleRename = (index) => {
    if (editFileName.trim()) {
      const updatedFiles = [...files];
      updatedFiles[index].name = editFileName;
      setFiles(updatedFiles);
      setEditIndex(null);
      setEditFileName("");
    }
  };

  // Handle file delete
  const handleDelete = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  // Handle content editing
  const handleContentChange = (e, index) => {
    const updatedFiles = [...files];
    updatedFiles[index].content = e.target.value;
    setFiles(updatedFiles);
  };

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  // Handle invite submission
  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (invites.length > 0) {
      console.log("Invites sent to:", invites);
      setInvites([]);
    }
  };

  return (
    <div id='workspace' className="container">
      <h2>Collaboration Workspace</h2>

      <form onSubmit={handleFileUpload} className="mb-4">
        <div className="mb-3">
          <input
            type="file"
            multiple
            ref={input => setFileInput(input)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Upload Files</button>
      </form>

      {files.length > 0 && (
        <div>
          {files.map((file, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <h5>{editIndex === index ? (
                  <input
                    type="text"
                    value={editFileName}
                    onChange={(e) => setEditFileName(e.target.value)}
                    placeholder={file.originalName}
                    className="form-control"
                  />
                ) : (
                  file.name
                )}</h5>
                <textarea
                  className="form-control"
                  rows="5"
                  value={file.content}
                  onChange={(e) => handleContentChange(e, index)}
                />
                <div className="mt-2">
                  {editIndex === index ? (
                    <button
                      className="btn btn-success"
                      onClick={() => handleRename(index)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        setEditIndex(index);
                        setEditFileName(file.name);
                      }}
                    >
                      Rename
                    </button>
                  )}
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleCommentSubmit} className="mb-4">
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Add Comment</button>
      </form>

      {comments.length > 0 && (
        <div id='comments'>
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {comments.map((comment, index) => (
              <li key={index} className="border-bottom pb-2">{comment}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleInviteSubmit} className="mb-4">
        <div className="mb-3">
          <input
            type="email"
            value={invites}
            onChange={(e) => setInvites(e.target.value.split(",").map(email => email.trim()))}
            placeholder="Enter emails to teammates and invite them"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Send Invites</button>
      </form>
    </div>
  );
};

export default Workspace;
