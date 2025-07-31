import { useState, useRef } from 'react';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../assets/logo.png';
import image from "../assets/images/Gustav_Robert_Kirchhoff.jpg";

function Kirchhoff() {
    const [kResult, setKResult] = useState('');
    const [lawType, setLawType] = useState('KCL');
    const currentRefs = useRef([]);
    const voltageRefs = useRef([]);

    const handleCalculate = (e) => {
        e.preventDefault();
        const refs = lawType === 'KCL' ? currentRefs.current : voltageRefs.current;
        const values = refs.map(ref => parseFloat(ref?.value) || 0);
        const sum = values.reduce((acc, val) => acc + val, 0);
        setKResult(`${lawType === 'KCL' ? 'Sum of currents (ΣI)' : 'Sum of voltages (ΣV)'}: ${sum.toFixed(2)} ${lawType === 'KCL' ? 'A' : 'V'}`);
    };

    return (
        <>
            <div className="cards-lg-containers-card">
                <img src={image} alt="Gustav Robert Kirchhoff" />
                <div className="category">
                    <div className="subject">
                        <h3>Software/Physics</h3>
                    </div>
                    <img src={logo} alt="Logo" />
                </div>
                <h2 className="course-title">Kirchhoff's Law</h2>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#Kirchhoff">View</button>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#kirchhoff-program">Program</button>
            </div>

            {/* Theory Modal */}
            <div className="modal fade" id="Kirchhoff" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Kirchhoff's Law</h5>
                            <button type="button" className="btn btn-dark close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h2 className="HeaderStyleH2A">Overview</h2>
                            <p>
                                Kirchhoff’s laws, introduced in 1845, are fundamental for circuit analysis. Applicable to both DC and AC systems, they simplify solving complex electrical networks.
                            </p>
                            <h2 className="HeaderStyleH2A">Kirchhoff's Current Law (KCL)</h2>
                            <p>
                                States that the total current entering a node equals the total current leaving it: ∑I<sub>in</sub> = ∑I<sub>out</sub>.
                            </p>
                            <h2 className="HeaderStyleH2A">Kirchhoff's Voltage Law (KVL)</h2>
                            <p>
                                The sum of voltages around any closed loop in a circuit is zero: ∑V = 0.
                            </p>
                            <hr />
                            <a href="https://drive.google.com/drive/folders/1mp6H1NPinYgFm1RCAa1NNhMQuP8g7LUR" target="_blank" rel="noopener noreferrer">
                                Scientific Papers <FontAwesomeIcon icon={faLink} />
                            </a>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Program Modal */}
            <div className="modal fade" id="kirchhoff-program" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Kirchhoff's Law Calculator</h5>
                            <button type="button" className="btn btn-dark close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="lawType">Select Law</label>
                                    <select id="lawType" value={lawType} onChange={(e) => setLawType(e.target.value)} className="form-control">
                                        <option value="KCL">Current Law (KCL)</option>
                                        <option value="KVL">Voltage Law (KVL)</option>
                                    </select>
                                </div>

                                {(lawType === 'KCL' ? [0, 1, 2] : [0, 1, 2]).map(i => (
                                    <div className="form-group" key={i}>
                                        <label htmlFor={`${lawType.toLowerCase()}${i + 1}`}>
                                            {lawType === 'KCL' ? `Current ${i + 1} (A)` : `Voltage ${i + 1} (V)`}
                                        </label>
                                        <input
                                            type="number"
                                            id={`${lawType.toLowerCase()}${i + 1}`}
                                            ref={el => (lawType === 'KCL' ? currentRefs.current[i] = el : voltageRefs.current[i] = el)}
                                            className="form-control"
                                        />
                                    </div>
                                ))}

                                <button type="button" className="btn btn-dark mt-3 w-100" onClick={handleCalculate}>
                                    Calculate
                                </button>

                                <div className="form-group mt-3">
                                    <label htmlFor="kResult">Result</label>
                                    <input type="text" id="kResult" value={kResult} readOnly className="form-control" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Kirchhoff;