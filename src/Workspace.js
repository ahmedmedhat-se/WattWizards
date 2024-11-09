import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Workspace = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [fileInput, setFileInput] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editFileName, setEditFileName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

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
            originalName: file.name,
            category: selectedOption
          });
          setFiles(newFiles);
        };
        fileReader.readAsText(file);
      });
      setFileInput(null);
      setSelectedOption("");
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

  const handleContentChange = (e, index) => {
    const updatedFiles = [...files];
    updatedFiles[index].content = e.target.value;
    setFiles(updatedFiles);
  };

  return (
    <div id='workspace' className="container">
      <h2>Workspace</h2>

      <form onSubmit={handleFileUpload} className="mb-4">
        <div className="mb-3">
          <label htmlFor="fileCategory" className="form-label text-light">Select Your Operation</label>
          <select
            id="fileCategory"
            className="form-select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="Circuit-Breaker-Size">Circuit Breaker Size (Program)</option>
            <option value="Power-Factor-Correction">Power-Factor-Correction (Program)</option>
            <option value="Electrical-Consumption">Electrical-Consumption (Program)</option>
            <option value="Horse-Power-2-Ampere">Horse-Power TO Ampere (Program)</option>
          </select>
        </div>

        {/* File Input */}
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
                <p>Category: {file.category || "Not specified"}</p>
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
    </div>
  );
};

export default Workspace;
