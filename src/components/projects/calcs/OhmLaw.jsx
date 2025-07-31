import { useState, useRef } from 'react';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../assets/logo.png';
import image from "../assets/images/Gerog_Ohm.jpg";

function Ohm() {
    // Ohm's Law (Program) Starts
    const [voltaResult, setVoltaResult] = useState('');

    const currentRef = useRef(null);
    const resistanceRef = useRef(null);
    const voltageRef = useRef(null);
    const [calcType, setCalcType] = useState('Voltage');

    const handleVoltaCalculateClick = (e) => {
        e.preventDefault();

        let V = parseFloat(voltageRef.current?.value);
        let I = parseFloat(currentRef.current?.value);
        let R = parseFloat(resistanceRef.current?.value);

        let calculatedValue;
        if (calcType === 'Voltage') {
            if (!I || !R) return alert('Please provide both Current and Resistance');
            calculatedValue = I * R;
        } else if (calcType === 'Current') {
            if (!V || !R) return alert('Please provide both Voltage and Resistance');
            calculatedValue = V / R;
        } else if (calcType === 'Resistance') {
            if (!V || !I) return alert('Please provide both Voltage and Current');
            calculatedValue = V / I;
        }

        setVoltaResult(calculatedValue.toFixed(2));
    };
    // Ohm's Law (Program) Ends

    return (
        <>
            <div className="cards-lg-containers-card">
                <img src={image} />
                <div className="category">
                    <div className="subject">
                        <h3>Software/Physics</h3>
                    </div>
                    <img src={logo} />
                </div>
                <h2 className="course-title">Ohm's Law</h2>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#Ohm">View</button>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#ohm-program">Program</button>
            </div>
            <div className="modal fade" id="Ohm" tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Ohm's Law</h5>
                            <button type="button" className="btn btn-dark close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h2 className='HeaderStyleH2'>What is Ohm's Law?</h2>
                            Ohm’s Law states that the current flowing through a resistor is directly proportional to the voltage applied across the resistor and inversely proportional to the value of the resistance,
                            provided that the temperature remains constant. <br />
                            Ohm’s Law describes the relationship between the current through a resistor, the voltage applied to it, and the resistance value. <br />

                            Thanks to Ohm's Law, you can calculate any one of these three quantities if the other two are known. <br />
                            For example, if you know the voltage and current, you can determine the resistance. <br />
                            Ohm observed in his experiments that as the voltage across the resistor increases, <br />
                            the current through the resistor increases proportionally. <br />
                            Conversely, if the voltage decreases, the current decreases as well. <br /><br />

                            <h2 className='HeaderStyleH2'>Ohm’s Law Equation</h2>
                            Ohm’s primary discovery was that the electric current in a circuit is directly proportional to the circuit’s voltage. <br />
                            He expressed this discovery with a simple equation that describes the relationship between voltage, current, and resistance as follows: <br />
                            Voltage = Current × Resistance (E = IR) <br />
                            Here, Voltage (E) equals Current (I) multiplied by Resistance (R). <br /><br />
                            Using algebraic manipulations, this equation can be rearranged into two other forms to find the values of current and resistance: <br />
                            Resistance = Voltage / Current (R = E / I) <br />
                            Current = Voltage / Resistance (I = E / R) <br />
                            To understand Ohm's Law thoroughly, one must review the relationship between voltage, current, and resistance. <br /><br /><hr />
                            <a href="https://drive.google.com/drive/folders/1mp6H1NPinYgFm1RCAa1NNhMQuP8g7LUR"
                                target="_blank">Scientific Papers
                                <FontAwesomeIcon icon={faLink} />
                            </a>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="ohm-program" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Ohm's Law</h5>
                            <button type="button" className="btn btn-dark close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="calcType">Calculate</label>
                                    <select id="calcType" value={calcType} onChange={(e) => setCalcType(e.target.value)} className="form-control">
                                        <option value="Voltage">Voltage (V = I * R)</option>
                                        <option value="Current">Current (I = V / R)</option>
                                        <option value="Resistance">Resistance (R = V / I)</option>
                                    </select>
                                </div>
                                {calcType === 'Voltage' && (
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="current">Current (I in Amperes)</label>
                                            <input type="number" id="current" ref={currentRef} className="form-control" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="resistance">Resistance (R in Ohms)</label>
                                            <input type="number" id="resistance" ref={resistanceRef} className="form-control" required />
                                        </div>

                                    </>
                                )}
                                {calcType === 'Current' && (
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="voltage">Voltage (V in Volts)</label>
                                            <input type="number" id="voltage" ref={voltageRef} className="form-control" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="resistance">Resistance (R in Ohms)</label>
                                            <input type="number" id="resistance" ref={resistanceRef} className="form-control" required />
                                        </div>
                                    </>
                                )}
                                {calcType === 'Resistance' && (
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="voltage">Voltage (V in Volts)</label>
                                            <input type="number" id="voltage" ref={voltageRef} className="form-control" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="current">Current (I in Amperes)</label>
                                            <input type="number" id="current" ref={currentRef} className="form-control" required />
                                        </div>
                                    </>
                                )}
                                <button type="button" className="btn btn-dark mb-2 mt-2 w-100 d-block" onClick={handleVoltaCalculateClick}>
                                    Calculate
                                </button>
                                <div className="form-group">
                                    <label htmlFor="voltaResult">Result</label>
                                    <input type="number" id="voltaResult" value={voltaResult} readOnly className="form-control" />
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
    )
}

export default Ohm;