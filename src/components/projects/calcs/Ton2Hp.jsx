import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from '../assets/Ampere_to_Watt_Conversion_Program.jpg';
import logo from '../assets/logo.png';

const TonToHpConverter = () => {
    // Ton 2 Hp (Program) Starts
    const [tonValue, setTonValue] = useState('');
    const [hpValue, setHpValue] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        if (!tonValue || isNaN(tonValue)) {
            alert('Please enter a valid number');
            return;
        }
        setHpValue((parseFloat(tonValue) * 4.7162).toFixed(4));
    };

    const conversionTable = Array.from({ length: 30 }, (_, i) => {
        const ton = i + 1;
        return {
            ton,
            hp: (ton * 4.7162).toFixed(4),
        };
    });
    // Ton 2 Hp (Program) Ends

    return (
        <>
            <div className="cards-lg-containers-card">
                <img src={image}/>
                <div className="category">
                    <div className="subject">
                        <h3>Software/Electricity</h3>
                    </div>
                    <img src={logo} />
                </div>
                <h2 className="course-title">Ton TO Horse-power (Program)</h2>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#Ton2Hp">View</button>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#Ton2HpProgram">Program</button>
            </div>
            <div className="modal fade" id="Ton2Hp" tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Ton TO Horse-power</h5>
                            <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h2 className='HeaderStyleH2'>A ton of cooling, how many horsepower?</h2> <br />
                            Converting between units is common in engineering, and one of the most important is converting units  <br />
                            from “refrigeration tons” to “horsepower”.  <br />
                            To make this work easier, we offer you a simple and effective program to easily  <br />
                            convert values ​​between refrigeration tons and horsepower.<br /> <br />
                            {/* Conversion Table */}
                            <div className="table-container mt-4">
                                <h5 className='text-center HeaderStyleH2'>Ton to horsepower conversion table</h5>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Ton</th>
                                            <th>HP</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {conversionTable.map((row) => (
                                            <tr key={row.ton}>
                                                <td>{row.ton}</td>
                                                <td>{row.hp}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <a href="https://drive.google.com/drive/folders/1mp6H1NPinYgFm1RCAa1NNhMQuP8g7LUR"
                                target="_blank">Scientific Papers
                                <FontAwesomeIcon icon={faLink} />
                            </a>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="Ton2HpProgram" tabIndex="-1" role="dialog" aria-labelledby="TonToHPModalTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="TonToHPModalTitle">Ton to Horsepower Converter</h5>
                            <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row d-flex justify-content-center align-items-center">
                                    <div className="col-10 p-2 mt-2">
                                        <form action="#" autoComplete="on">
                                            <div className="form-group">
                                                <label htmlFor="tonInput" className="form-label">Enter Ton Value:</label>
                                                <input
                                                    type="number"
                                                    placeholder="Enter ton value"
                                                    id="tonInput"
                                                    required
                                                    className="form-control"
                                                    value={tonValue}
                                                    onChange={(e) => setTonValue(e.target.value)}
                                                />
                                            </div>
                                            <br />
                                            <button
                                                id="convertTonToHP"
                                                onClick={handleCalculate}
                                                className="btn btn-dark w-100"
                                                style={{ fontSize: "large" }}
                                            >
                                                Convert
                                            </button>
                                            <br /><br />
                                            {hpValue !== null && (
                                                <div className="result mt-3">
                                                    <label htmlFor="hpResult" className="form-label">Equivalent Horsepower:</label>
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        id="hpResult"
                                                        value={`${hpValue} HP`}
                                                        className="form-control"
                                                        placeholder="Equivalent Horsepower"
                                                    />
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TonToHpConverter;
