import React, { useState, useRef, useEffect } from "react";
import "./styles/project-manager.css";

function EditProject() {
    const [editProject, setEditProject] = useState({ name: "", files: null });
    const [fileList, setFileList] = useState([
        "index.html",
        "style.css",
        "script.js",
        "README.md"
    ]);

    useEffect(()=>{
        setFileList(fileList);
    }, []);
    
    const fileInputRef = useRef(null);

    const handleEditChange = (e) => {
        setEditProject({ ...editProject, name: e.target.value });
    };

    const handleFileChange = (e) => {
        setEditProject({ ...editProject, files: e.target.files });
    };

    const handleDeleteFile = (fileName) => {
        setFileList(fileList.filter(file => file !== fileName));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        console.log("Project Updated:", editProject);
    };

    return (
        <div id="projectManager" className="container">
            <h2>Edit Project</h2>
            <form onSubmit={handleEditSubmit} className="mb-4">
                <label htmlFor="projectName" className="form-label text-light">Project Name</label>
                <input
                    className="form-control mb-3"
                    type="text"
                    id="projectName"
                    name="projectName"
                    value={editProject.name}
                    onChange={handleEditChange}
                    required
                />
                
                <label htmlFor="projectFiles" className="form-label text-light">Upload Project Files</label>
                <input
                    className="form-control"
                    type="file"
                    id="projectFiles"
                    name="projectFiles"
                    multiple
                    webkitdirectory
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                
                <h5 className="text-light mt-3">Files in Project</h5>
                <ul className="list-group mb-3">
                    {fileList.map((file, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {file}
                            <button className="btn btn-danger bg-danger btn-sm" onClick={() => handleDeleteFile(file)}>Delete</button>
                        </li>
                    ))}
                </ul>
                
                <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
            </form>
        </div>
    );
}

export default EditProject;