import React, { useState, useEffect, useRef } from "react";
import "./styles/createProject.css";

function ProjectManager() {
    const [projects, setProjects] = useState([]);
    const [repoName, setRepoName] = useState("");
    const [repoAbout, setRepoAbout] = useState("");
    const [repoFiles, setRepoFiles] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const fileInputRef = useRef(null); // Reference for file input

    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    useEffect(() => {
        const savedProjects = localStorage.getItem("projects");
        if (savedProjects) {
            try {
                setProjects(JSON.parse(savedProjects));
            } catch (error) {
                console.error("Error parsing projects from localStorage:", error);
                setProjects([]);
            }
        }
    }, []);

    useEffect(() => {
        if (projects.length > 0) {
            localStorage.setItem("projects", JSON.stringify(projects));
        }
    }, [projects]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (repoName.trim() === "") return;

        const fileData = await Promise.all(repoFiles.map(async (file) => ({
            name: file.name,
            data: await toBase64(file),
        })));

        const newProject = { name: repoName, about: repoAbout, files: fileData };

        if (editingIndex !== null) {
            const updatedProjects = [...projects];
            updatedProjects[editingIndex] = newProject;
            setProjects(updatedProjects);
            setEditingIndex(null);
        } else {
            setProjects([...projects, newProject]);
        }

        // Clear input fields
        setRepoName("");
        setRepoAbout("");
        setRepoFiles([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset file input
        }
    };

    const handleDelete = (index) => {
        const updatedProjects = projects.filter((_, i) => i !== index);
        setProjects(updatedProjects);
        localStorage.setItem("projects", JSON.stringify(updatedProjects)); // Update localStorage
    };
    

    const handleEdit = (index) => {
        setRepoName(projects[index].name);
        setRepoAbout(projects[index].about);
        setRepoFiles([]);
        setEditingIndex(index);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clear file input when editing
        }
    };

    return (
        <div id="projectManager" className="container">
            <h2>DevSync</h2>

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
                <textarea
                    className="form-control mb-3"
                    id="repoAbout"
                    name="repoAbout"
                    placeholder="Enter Project Description"
                    value={repoAbout}
                    onChange={(e) => setRepoAbout(e.target.value)}
                />

                <label htmlFor="repoFiles" className="form-label text-light">
                    Upload Project Files
                </label>
                <input
                    className="form-control"
                    type="file"
                    id="repoFiles"
                    name="repoFiles"
                    multiple
                    webkitdirectory
                    ref={fileInputRef} // Attach ref
                    onChange={(e) => setRepoFiles(Array.from(e.target.files))}
                />

                <button type="submit" className="btn btn-success text-light w-100 d-block mt-3">
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
                            {project.files.length > 0 && (
                                <ul className="mb-0">
                                    {project.files.map((file, i) => (
                                        <li key={i}>
                                            <em>File:</em> {file.name} -
                                            <a href={file.data} download={file.name} className="ms-2">Download</a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div>
                            <input type="button" className="btn btn-warning text-light me-2" value="Edit" onClick={() => handleEdit(index)} />
                            <input type="button" className="btn btn-danger text-light" value="Delete" onClick={() => handleDelete(index)} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProjectManager;