import { useState, useEffect, useRef } from "react";
import "./styles/project-manager.css";
import { Link } from 'react-router-dom';

function ProjectManager() {
    const [projects, setProjects] = useState([]);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const checkToken = async () => {
            try {
                let xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        let projects = JSON.parse(xhr.response)
                        console.log(projects);
                        setProjects(projects)
                    }
                };

                xhr.onerror = function () {
                    console.log("Error:", xhr.responseText);
                };

                xhr.open('GET', 'http://localhost:8086/project', true);
                xhr.withCredentials = true;

                xhr.send();
            } catch (error) {
                console.log('Authentication error:', error);
            }
        };
        if (document.cookie.includes('token=')) {
            checkToken();
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (document.getElementById("repoName").value.trim() === "") return;

        try {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status === 200) {
                    let projectsAPI = JSON.parse(xhr.response)
                    console.log(projectsAPI);
                    setProjects([...projects, projectsAPI])
                }
            };

            xhr.onerror = function () {
                console.log("Error:", xhr.responseText);
            };

            xhr.open('POST', 'http://localhost:8086/project', true);
            xhr.withCredentials = true;
            let y = new FormData(document.forms[0])
            xhr.send(y);
        } catch (error) {
            console.log('Authentication error:', error);
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleDelete = (index, id) => {
        const updatedProjects = projects.filter((_, i) => i !== index);
        setProjects(updatedProjects);
        try {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log("done");
                }
            };

            xhr.onerror = function () {
                console.log("Error:", xhr.responseText);
            };

            xhr.open('POST', `http://localhost:8086/delete/project/${id}`, true);
            xhr.withCredentials = true;
            xhr.send();
        } catch (error) {
            console.log('Authentication error:', error);
        }
    };

    const handleCopy = async (link) => {
        console.log(link);
        await navigator.clipboard.writeText(link)
    };

    return (
        <div className="container-fluid project-manager">
            <h2>WattWizards Project Manager</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <label htmlFor="repoName" className="form-label text-light">
                    Project Name
                </label>
                <input
                    className="form-control mb-3"
                    type="text"
                    id="repoName"
                    name="projectName"
                    placeholder="Enter Your Project Name"
                    required
                />

                <label htmlFor="repoFiles" className="form-label text-light">
                    Upload Project Files
                </label>
                <input
                    className="form-control"
                    type="file"
                    id="repoFiles"
                    name="projectFiles"
                    multiple
                    webkitdirectory
                    ref={fileInputRef}
                />

                <button type="submit" className="btn btn-success text-light w-100 d-block mt-3">
                    Create Project
                </button>
            </form>

            {/* Project List */}
            <h3 className="text-light">Your Projects</h3>
            <ul className="list-group">
                {projects.map((project, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            {console.log(project)}
                            <strong>{project.name}</strong>
                            {/* <p className="mb-0">{project.about}</p> */}
                        </div>
                        <div>
                            <Link to="/edit-project" className="btn btn-warning">Edit</Link>
                            <input type="button" className="btn btn-danger text-light" value="Delete" onClick={() => handleDelete(index, project.id)} />
                            <input type="button" className="btn btn-info text-light ms-3" value="copy link" onClick={() => handleCopy(project.projectLink)} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProjectManager;