import { useState, useRef } from 'react';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from '../assets/Watt_to_Ampere_Conversion_Program.jpg';
import logo from '../assets/logo.png';

function Watt2Ampere() {
    // Watt TO Ampere (Program) Starts
    const [ampereResult, setAmpereResult] = useState('');

    const wattToAmpereInpRef = useRef(null);
    const powerSelectTypesRef = useRef(null);
    const voltNeededInputRef = useRef(null);
    const pfNeededInputRef = useRef(null);

    const handleWattToAmpereCalcOutputClick = (e) => {
        e.preventDefault();

        let WattToAmpereInp = parseFloat(wattToAmpereInpRef.current.value);
        let powerSelectValues = powerSelectTypesRef.current.value;
        let VoltNeededInput = parseFloat(voltNeededInputRef.current.value);
        let pfNeededInput = parseFloat(pfNeededInputRef.current.value);

        let Watt2AmperePowerVar = 0;
        if (powerSelectValues === "DCWattToAmpere") {
            Watt2AmperePowerVar = WattToAmpereInp / VoltNeededInput;
        } else if (powerSelectValues === "AC1WattToAmpere") {
            Watt2AmperePowerVar = WattToAmpereInp / (VoltNeededInput * pfNeededInput);
        } else if (powerSelectValues === "AC3WattToAmpere") {
            Watt2AmperePowerVar = WattToAmpereInp / (1.732 * pfNeededInput * VoltNeededInput);
        }

        setAmpereResult(Watt2AmperePowerVar.toFixed(2));
    };
    // Watt TO Ampere (Program) Ends

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
                <h2 className="course-title">Watt TO Ampere (Program)</h2>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#W2A">View</button>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#W2AProgram">Program</button>
            </div>
            <div className="modal fade" id="W2A" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Watt TO Ampere</h5>
                            <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h2 className='HeaderStyleH2'>Watt To Amperes</h2><br />
                            <p>
                                The watt (W) is the unit of power and the ampere (A) is the unit of electric current.
                                <br />
                                Watts can be converted to amps and vice versa directly by knowing the voltage value and
                                power factor.
                                <br /><br />

                                Converting watts to amps in DC circuits: <br />
                                Watts can be converted to amps in DC circuits : <br />
                                Current (A) = Power (W) ÷ Voltage (V). <br /><br />

                                Convert watts to amps in single phase alternating current (AC) : <br />
                                Amps = Power in Watts ÷ (Voltage x Power Factor). <br /><br />

                                Convert watts to amps in AC (3-Phase) with line voltage phase : <br />
                                Current (A) = power (W) / The square root of 3 x PF x voltage in volts (V) : <br />
                                Amps = Watts ÷ (3√ × PF × Line Voltage). <br /><br />
                            </p><hr />
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
            <div className="modal fade" id="W2AProgram" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Watt TO Ampere</h5>
                            <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row d-flex justify-content-center align-items-center">
                                    <div className="col-10 p-2 mt-2">
                                        <form action="#" autoComplete="on">
                                            <span>
                                                <label htmlFor="WattToAmpereInp" className="form-label">Type Of Current -
                                                    نوع
                                                    التيار</label>
                                                <div className="input-group mb-3">
                                                    <input type="text" placeholder="القدره بالوات" id="WattToAmpereInp" ref={wattToAmpereInpRef}
                                                        required className="form-control" />
                                                    <select style={{ fontWeight: "bold" }} className="form-control"
                                                        name="WattToAmperePowerSelection"
                                                        id="WattToAmperePowerSelection" ref={powerSelectTypesRef}>
                                                        <option value="DCWattToAmpere">DC (Direct Current) - تيار مستمر
                                                        </option>
                                                        <option value="AC1WattToAmpere">AC (Single Phase) - تيار متردد
                                                            (واحد فاز)</option>
                                                        <option value="AC3WattToAmpere">AC (3 Phase) - تيار متردد (ثلاثه
                                                            فاز)</option>
                                                    </select>
                                                </div>
                                                <input type="text" placeholder="The Volt - الجهد بالفولت"
                                                    id="VoltNeededInput" ref={voltNeededInputRef} className="form-control" required /><br />

                                                <input type="text"
                                                    placeholder="P.F. (AC ONLY) - (التيار المتردد فقط) معامل القدره"
                                                    id="pfNeededInput" ref={pfNeededInputRef} className="form-control" /><br />

                                                <div className="div">
                                                    <button type="button" className="btn btn-dark"
                                                        id="WattToAmpereCalcOutput" onClick={handleWattToAmpereCalcOutputClick}
                                                        style={{ fontSize: "large", width: "100%" }}>Calculate - احسب</button>
                                                </div><br />

                                                <label htmlFor="AmpereAfterWattConversion" className="form-label">Ampere (A)
                                                    -
                                                    الأمبير</label>
                                                <input type="number" readOnly id="AmpereAfterWattConversion" value={ampereResult}
                                                    className="form-control" placeholder="The Ampere - الأمبير" /><br />
                                            </span>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Watt2Ampere;