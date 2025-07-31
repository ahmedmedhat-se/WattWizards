import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/workspace.css";

const OnlineWorkspace = () => {
    const [rows, setRows] = useState([
        { "Machines number": "", 'Power': "", 'Power unit': "", 'Power factor': "", 'Voltage': "", "Phases": "" },
    ]);
    const [formType, setFormType] = useState('CircuitBreaker');

    const headers = {
        'CircuitBreaker': ["Machines number", 'Power', 'Power unit', 'Power factor', 'Voltage', "Phases"],
        'PowerFactorCorrection': ['Power', 'Power unit', 'oldPF', 'newPF', 'Voltage', 'frequency', "Phases"],
        'ElectricConsumption': ['Machines number', 'Power', 'Power unit', 'WorkingHours', 'WorkingDays', 'Voltage', 'Power factor', "Phases"],
    };

    const handleFormTypeChange = (e) => {
        setFormType(e.target.value);
        setRows([{}]);
    };

    const addRow = () => {
        setRows([
            ...rows,
            { "Machines number": "", 'Power': "", 'Power unit': "", 'Power factor': "", 'Voltage': "", "Phases": "" },
        ]);
    };

    const removeRow = () => {
        if (rows.length > 1) {
            setRows(rows.slice(0, rows.length - 1));
        }
    };

    const handleInputChange = (e, rowIndex, column) => {
        const updatedRows = [...rows];
        updatedRows[rowIndex][column] = e.target.value;
        setRows(updatedRows);
    };

    const submitData = () => {
        try {
            let xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log(xhr.response);

                    const blob = new Blob([xhr.response], {
                        type: xhr.getAllResponseHeaders("Content-Type")
                    });

                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    let fileName = document.getElementById("fileType").value == "pdf" ? "pdf" : "xlsx"
                    link.download = `result_${formType}.${fileName}`;

                    document.body.appendChild(link);
                    link.click();

                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(link.href);
                }
            };

            xhr.onerror = function () {
                console.log("Error:", xhr.responseText);
            };

            xhr.open('POST', 'http://localhost:8086/CalculateOnlineSheet', true);
            xhr.withCredentials = true;
            xhr.responseType = "blob"
            let y = new FormData()
            y.append("data", JSON.stringify(rows))
            y.append("type", formType)
            y.append("file-type", document.getElementById("fileType").value)
            xhr.send(y);
        } catch (error) {
            console.log('Authentication error:', error);
        }
    };

    const saveData = () => {
        localStorage.setItem('formData', JSON.stringify(rows));
    };

    const loadData = () => {
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            const confirmLoad = window.confirm('Do you want to load the previously saved data?');
            if (confirmLoad) {
                setRows(JSON.parse(savedData));
            }
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="workspace">
            <h1 className="text-center mb-4 text-light">WattWizards Online Workspace</h1>

            <div className="d-flex justify-content-center mb-4">
                <select className="form-select w-100 w-md-50" onChange={handleFormTypeChange} value={formType}>
                    <option value="CircuitBreaker">Circuit Breaker</option>
                    <option value="PowerFactorCorrection">Power Factor Correction</option>
                    <option value="ElectricConsumption">Electrical Consumption</option>
                </select>
            </div>

            <div className="d-flex justify-content-center mb-4">
                <button className="btn btn-primary mx-2" onClick={addRow}>
                    <i className="fas fa-plus-circle"></i> Add Row
                </button>
                <button className="btn btn-danger mx-2" onClick={removeRow}>
                    <i className="fas fa-minus-circle"></i> Remove Row
                </button>
                <button className="btn btn-warning mx-2" onClick={saveData}>
                    <i className="fas fa-save"></i> Save Data
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover shadow-sm">
                    <thead className="table-primary">
                        <tr>
                            {headers[formType].map((header, index) => (
                                <th key={index} className="text-center">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {headers[formType].map((header, index) => (
                                    <td key={index}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={row[header] || ''}
                                            onChange={(e) => handleInputChange(e, rowIndex, header)}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* File Type Selection */}
            <div className="mb-3 d-flex justify-content-center p-2">
                <label htmlFor="fileType" className="form-label text-light me-2">File</label>
                <select
                    id="fileType"
                    className="btn btn-primary"
                    name='file-type'
                >
                    <option value="pdf">.pdf</option>
                    <option value="excel">.xlsx</option>
                </select>
            </div>

            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-primary" onClick={submitData}>
                    Submit
                </button>
                <Link className='btn btn-primary' to="/wattwizards/workspace/archive">Archive</Link>
            </div>
        </div>
    );
};

export default OnlineWorkspace;