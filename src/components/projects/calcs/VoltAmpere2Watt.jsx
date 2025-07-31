import { useState, useRef } from 'react';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from '../assets/Volt-Ampere_to_Watt_Conversion_Program.jpg';
import logo from '../assets/logo.png';

function VoltAmpere2Watt() {
    // Volt Ampere (VA) TO Watts (Program) Starts
    const [wattsAfterVA, setWattsAfterVA] = useState('');
    const [kilowattsAfterVA, setKilowattsAfterVA] = useState('');

    const vatowattsRef = useRef(null);
    const pfLoadNeededTOWRef = useRef(null);

    const handleVOLTAMPERETOWATTSClick = (e) => {
        e.preventDefault();

        let VATOWATTS = parseFloat(vatowattsRef.current.value);
        let pfLoadNeededTOW = parseFloat(pfLoadNeededTOWRef.current.value);

        let WATTAFTERVOLTAMPERE = VATOWATTS * pfLoadNeededTOW;
        WATTAFTERVOLTAMPERE = WATTAFTERVOLTAMPERE.toFixed(2);

        let KILOWATTAFTERVOLTAMPERE = WATTAFTERVOLTAMPERE * 1000;
        KILOWATTAFTERVOLTAMPERE = KILOWATTAFTERVOLTAMPERE.toFixed(2);

        setWattsAfterVA(`${KILOWATTAFTERVOLTAMPERE} Watt - وات`);
        setKilowattsAfterVA(`${WATTAFTERVOLTAMPERE} Kilowatts - كيلووات`);
    };
    // Volt Ampere (VA) TO Watts (Program) Ends

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
                <h2 className="course-title">Volt-Ampere TO Watt (Program)</h2>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#VA2W">View</button>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#VA2WProgram">Program</button>
            </div>
            <div className="modal fade" id="VA2W" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Volt-Ampere TO Watt</h5>
                            <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h2 className='HeaderStyleH2'>Volt Ampere TO Watts</h2><br />
                            <p>
                                To convert volt-amperes (VA) to watts (W) and vice versa, <br />
                                we need a simple equation to find the power of the device in any unit. <br /><br />

                                Volt-amperes (VA) represent the apparent power of an electrical load, <br />
                                <br />
                                and you may not need it htmlFor some electrical devices whose loads do not contain coils,
                                <br />
                                such as electric motors htmlFor example. <br />
                                The main reason htmlFor using VA is that devices may contain copper windings, <br />
                                which may cause the voltage wave to deviate from the current wave and some phase
                                differences to appear.
                                <br /><br />
                            </p><br />
                            <div className="alert alert-warning">
                                <p style={{ fontWeight: "bold", fontSize: "18px", color: "#000" }}>We use the unit volt-ampere
                                    (VA) some AC
                                    devices and not DC.</p>
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
            <div className="modal fade" id="VA2WProgram" tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Volt-Ampere TO Watt</h5>
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
                                                <label htmlFor="VATOWATTS" className="form-label">Volt Ampere - فولت
                                                    أمبير</label>
                                                <input type="text" placeholder="القدره" id="VATOWATTS" ref={vatowattsRef} required
                                                    className="form-control" />
                                                <br />

                                                <label htmlFor="pfLoadNeededTOW" className="form-label">Power Factor - فولت
                                                    /
                                                    معامل القدره</label>
                                                <input type="text" placeholder="معامل القدره" id="pfLoadNeededTOW" ref={pfLoadNeededTOWRef}
                                                    className="form-control" /><br />

                                                <div className="div">
                                                    <button id="VOLTAMPERETOWATTS" onClick={handleVOLTAMPERETOWATTSClick} className="btn btn-dark"
                                                        style={{ fontSize: "large", width: "100%" }}>Calculate - احسب</button>
                                                </div><br />

                                                <label htmlFor="WATTAFTERVA" className="form-label">Load In Watts
                                                    (W)</label>
                                                <input readOnly type="text" id="WATTAFTERVA" value={wattsAfterVA} className="form-control"
                                                    placeholder="(W - وات) الحمل بالوات" /><br />
                                                <label htmlFor="KILOWATTAFTERVA" className="form-label">Load In Kilowatts
                                                    (kW)</label>
                                                <input readOnly type="text" id="KILOWATTAFTERVA"
                                                    className="form-control" value={kilowattsAfterVA}
                                                    placeholder="(kW - كيلووات) الحمل بالكيلووات" /><br />
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

export default VoltAmpere2Watt;