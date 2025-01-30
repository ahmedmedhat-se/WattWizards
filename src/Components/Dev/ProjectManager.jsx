import React, { useState, useEffect } from "react";
import "./styles/createProject.css";

function ProjectManager() {
    const [projects, setProjects] = useState([]);
    const [repoName, setRepoName] = useState("");
    const [repoAbout, setRepoAbout] = useState("");
    const [repoFile, setRepoFile] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);

    // Load projects from local storage
    useEffect(() => {
        const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        setProjects(savedProjects);
    }, []);

    // Save projects to local storage
    useEffect(() => {
        localStorage.setItem("projects", JSON.stringify(projects));
    }, [projects]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (repoName.trim() === "") return;

        const newProject = { name: repoName, about: repoAbout, file: repoFile ? repoFile.name : "" };
        
        if (editingIndex !== null) {
            const updatedProjects = [...projects];
            updatedProjects[editingIndex] = newProject;
            setProjects(updatedProjects);
            setEditingIndex(null);
        } else {
            setProjects([...projects, newProject]);
        }

        setRepoName("");
        setRepoAbout("");
        setRepoFile(null);
    };

    const handleDelete = (index) => {
        const updatedProjects = projects.filter((_, i) => i !== index);
        setProjects(updatedProjects);
    };

    const handleEdit = (index) => {
        setRepoName(projects[index].name);
        setRepoAbout(projects[index].about);
        setRepoFile(null);
        setEditingIndex(index);
    };

    return (
        <div id="projectManager" className="container">
            <h2>Project Manager</h2>

            {/* Project Form */}
            <form onSubmit={handleSubmit} className="mb-4">
                <label htmlFor="repoName" className="form-label text-light">
                    Project Name
                </label>
                <input
                    className="form-control mb-3"
                    type="text"
                    id="repoName"
                    name="repoName"
                    placeholder="Enter Your Project Name"
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    required
                />
                
                <label htmlFor="repoAbout" className="form-label text-light">
                    About
                </label>
                <input
                    className="form-control mb-3"
                    type="text"
                    id="repoAbout"
                    name="repoAbout"
                    placeholder="Enter Project Description"
                    value={repoAbout}
                    onChange={(e) => setRepoAbout(e.target.value)}
                />
                
                <label htmlFor="repoFile" className="form-label text-light">
                    Upload Project File
                </label>
                <input
                    className="form-control"
                    type="file"
                    id="repoFile"
                    name="repoFile"
                    onChange={(e) => setRepoFile(e.target.files[0])}
                />
                
                <button type="submit" className="btn btn-success w-100 d-block mt-5">
                    {editingIndex !== null ? "Update Project" : "Create Project"}
                </button>
            </form>

            {/* Project List */}
            <h3 className="text-light">Your Projects</h3>
            <ul className="list-group">
                {projects.map((project, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{project.name}</strong>
                            <p className="mb-0">{project.about}</p>
                            {project.file && <p className="mb-0"><em>File:</em> {project.file}</p>}
                        </div>
                        <div>
                            <button className="btn btn-warning me-2" onClick={() => handleEdit(index)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProjectManager;