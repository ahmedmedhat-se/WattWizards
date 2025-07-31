import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/workspace.css";

const WorkspaceArchive = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [fileInput, setFileInput] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editFileName, setEditFileName] = useState("");

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem('files'));
    if (storedFiles) {
      setFiles(storedFiles);
    }
  }, []);

  useEffect(() => {
    if (files.length > 0) {
      localStorage.setItem('files', JSON.stringify(files));
    } else {
      localStorage.removeItem('files');
    }
  }, [files]);

  const handleFileUpload = (e) => {
    e.preventDefault()
      try {
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
          if(xhr.status == 200){
            navigate("/profile");
          }
          console.log(xhr.response);
        };
        
        xhr.onerror = function() {
        console.log("Error:", xhr.responseText);
        };
        
        xhr.open('POST', 'http://localhost:8086/CircuitVault', true);
        xhr.withCredentials = true;
        xhr.responseType = "blob"
        let y = new FormData(document.forms[0])
        xhr.send(y);
    } catch (error) {
        console.log('Authentication error:', error);
    }
  };

  const handleRename = (index) => {
    if (editFileName.trim()) {
      const updatedFiles = [...files];
      updatedFiles[index].name = editFileName;
      setFiles(updatedFiles);
      setEditIndex(null);
      setEditFileName("");
    }
  };

  const handleDelete = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const handlePin = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index].pinned = !updatedFiles[index].pinned;
    setFiles(updatedFiles);
  };

  const handleContentChange = (e, index) => {
    const updatedFiles = [...files];
    updatedFiles[index].content = e.target.value;
    setFiles(updatedFiles);
  };

  const pinned = files.filter(file => file.pinned);
  const nonPinned = files.filter(file => !file.pinned);

  return (
    <div className="workspace">
      <h2 className="mt-4">WattWizards Archive</h2>

      <form onSubmit={handleFileUpload} className="mb-4">
        <div className="mb-3">
          <input
            type="file"
            name="file"
            multiple
            ref={input => setFileInput(input)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Upload Files</button>
        <Link className='btn btn-primary me-2' to="/wattwizards/workspace/offline-sheets">Offline Workspace</Link>
        <Link className='btn btn-primary' to="/wattwizards/workspace/online-sheets">Online Workspace</Link>
      </form>

      {files.length > 0 && (
        <div className='mt-2 p-2'>
          {pinned.length > 0 && (
            <div className="pinned-files">
              <h4>Pinned Files</h4>
              {pinned.map((file, index) => (
                <div key={index} className="file-card pinned">
                  <div className="file-header">
                    <h5 className='text-light'>
                      {editIndex === index ? (
                        <input
                          type="text"
                          value={editFileName}
                          onChange={(e) => setEditFileName(e.target.value)}
                          placeholder={file.originalName}
                          className="form-control"
                        />
                      ) : (
                        file.name
                      )}
                    </h5>
                    <div className="file-actions">
                      <button onClick={() => handlePin(index)} className="btn btn-light btn-sm">Unpin</button>

                      {editIndex === index ? (
                        <button onClick={() => handleRename(index)} className="btn btn-success btn-sm">Save</button>
                      ) : (
                        <button onClick={() => {
                          setEditIndex(index);
                          setEditFileName(file.name);
                        }} className="btn btn-warning btn-sm">Rename</button>
                      )}

                      <button onClick={() => handleDelete(index)} className="btn btn-danger btn-sm">Delete</button>
                    </div>
                  </div>
                  <textarea
                    className="form-control"
                    rows="5"
                    value={file.content}
                    onChange={(e) => handleContentChange(e, index)}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="non-pinned-files mt-5">
            <h4>Other Files</h4>
            {nonPinned.map((file, index) => (
              <div key={index} className="file-card mt-2 p-2">
                <div className="file-header">
                  <h5 className='text-light'>
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={editFileName}
                        onChange={(e) => setEditFileName(e.target.value)}
                        placeholder={file.originalName}
                        className="form-control"
                      />
                    ) : (
                      file.name
                    )}
                  </h5>
                  <div className="file-actions">
                    <button onClick={() => handlePin(index)} className="btn btn-light btn-sm">Pin</button>

                    {editIndex === index ? (
                      <button onClick={() => handleRename(index)} className="btn btn-success btn-sm">Save</button>
                    ) : (
                      <button onClick={() => {
                        setEditIndex(index);
                        setEditFileName(file.name);
                      }} className="btn btn-warning btn-sm">Rename</button>
                    )}

                    <button onClick={() => handleDelete(index)} className="btn btn-danger btn-sm">Delete</button>
                  </div>
                </div>
                <textarea
                  className="form-control"
                  rows="5"
                  value={file.content}
                  onChange={(e) => handleContentChange(e, index)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceArchive;