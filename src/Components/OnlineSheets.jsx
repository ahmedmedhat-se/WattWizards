import React, { useState, useEffect } from 'react';

const OnlineSheets = () => {
    const [rows, setRows] = useState([
        { Power: '', 'Unit of Power': '', 'Power Factor': '', Voltage: '' },
    ]);
    const [formType, setFormType] = useState('Circuit Breaker');

    const headers = {
        'Circuit Breaker': ['Power', 'Unit of Power', 'Power Factor', 'Voltage'],
        'Power Factor Correction': ['Power', 'Unit of Power', 'Old Power Factor', 'New Power Factor', 'VRMS', 'Frequency'],
        'Electrical Consumption': ['Power', 'Unit of Power', 'Appliances', 'Hours', 'Days', 'Voltage', 'Power Factor'],
    };

    const handleFormTypeChange = (e) => {
        setFormType(e.target.value);
        setRows([{}]);
    };

    const addRow = () => {
        setRows([
            ...rows,
            { Power: '', 'Unit of Power': '', 'Power Factor': '', Voltage: '' }
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
        console.log(rows);
        alert('Data submitted! Check the console for the output.');
    };

    const saveData = () => {
        localStorage.setItem('formData', JSON.stringify(rows));
        alert('Data saved to localStorage!');
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
        <div className="container" id="workspace">
            <h1 className="text-center mb-4 text-light">Online-Dynamic Form Data</h1>

            <div className="d-flex justify-content-center mb-4">
                <select className="form-select w-100 w-md-50" onChange={handleFormTypeChange} value={formType}>
                    <option value="Circuit Breaker">Circuit Breaker</option>
                    <option value="Power Factor Correction">Power Factor Correction</option>
                    <option value="Electrical Consumption">Electrical Consumption</option>
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

            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-primary" onClick={submitData}>
                    <i className="fas fa-angle-right"></i> Submit
                </button>
            </div>
        </div>
    );
};

export default OnlineSheets;