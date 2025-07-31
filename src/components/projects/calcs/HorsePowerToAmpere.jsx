import { useState, useRef } from 'react';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from '../assets/horsepower_to_ampere_conversion_program.jpg';
import logo from '../assets/logo.png';

function HorsePower2Ampere() {
    // Horse-Power-TO-Ampere (Program) Starts
    const [currentAmpere, setCurrentAmpere] = useState('');

    const horsepowerRef = useRef(null);
    const efficiencyHPCalcRef = useRef(null);
    const powerSelectHPRef = useRef(null);
    const pfHPNeededInputRef = useRef(null);
    const voltHpNeededInputRef = useRef(null);

    const handleHP2AClick = (e) => {
        e.preventDefault();

        let horsepower = parseFloat(horsepowerRef.current.value);
        let efficiencyHPCalc = parseFloat(efficiencyHPCalcRef.current.value) / 100;
        let valuesForHp = powerSelectHPRef.current.value;
        let pfHPNeededInput = parseFloat(pfHPNeededInputRef.current.value);
        let voltHpNeededInput = parseFloat(voltHpNeededInputRef.current.value);

        let power2Hp = 0;
        if (valuesForHp === "DC") {
            power2Hp = (horsepower * 746) / (efficiencyHPCalc * voltHpNeededInput);
        } else if (valuesForHp === "AC1") {
            power2Hp = (horsepower * 746) / (efficiencyHPCalc * voltHpNeededInput * pfHPNeededInput);
        } else if (valuesForHp === "AC3") {
            power2Hp = (horsepower * 746) / (efficiencyHPCalc * voltHpNeededInput * 1.732);
        }
        setCurrentAmpere(power2Hp.toFixed(2));
    };
    // Horse-Power-TO-Ampere (Program) Ends
    
    return (
        <>
            <div className="cards-lg-containers-card">
                <img
                    src={image} />
                <div className="category">
                    <div className="subject">
                        <h3>Software/Electricity</h3>
                    </div>
                    <img src={logo} />
                </div>
                <h2 className="course-title">Horse-Power TO Ampere (Program)</h2>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal"
                    data-bs-target="#HP2A">View</button>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal"
                    data-bs-target="#HP2AProgram">Program</button>
            </div>
            <div className="modal fade" id="HP2A" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Horse-Power TO Ampere</h5>
                            <button type="button" className="btn btn-dark close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h2 className='HeaderStyleH2'>Horse Power To Ampere</h2><br />
                            <p>
                                Convert hp to amps: (direct current)
                                In direct current circuits
                                I(A) = [HP × 746] / [Volts × Efficiency %] <br />

                                Convert hp to amps:
                                In alternating current (AC single phase).
                                I (A) = [ HP × 746 ] / [ V × Efficiency % × P.F. ] <br />

                                Convert hp to A: in alternating current (AC 3 phase).
                                I (A) = [ HP × 746 ] / [ 1.73 × VL-L × Efficiency % × P.F. ] <br /><br />
                            </p>
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
            <div className="modal fade" id="HP2AProgram" tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Horse-Power TO Ampere</h5>
                            <button type="button" className="btn btn-dark close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row d-flex justify-content-center align-items-center">
                                    <div className="col-10 p-2 mt-2">
                                        <form action="#" autoComplete="on">
                                            <span>
                                                <label htmlFor="horsepower" className="form-label">Type Of Voltage - نوع
                                                    الجهد</label>
                                                <div className="input-group mb-3">
                                                    <input type="text" placeholder="(حصان) القدرة" id="horsepower"
                                                        required className="form-control" ref={horsepowerRef} />
                                                    <select style={{ fontWeight: "bold" }} className="form-control"
                                                        name="hpowerSelection" id="hpowerSelection" ref={powerSelectHPRef}>
                                                        <option value="DC">DC (Direct Current) - تيار مستمر</option>
                                                        <option value="AC1">AC (Single Phase) - تيار متردد (واحد فاز)
                                                        </option>
                                                        <option value="AC3">AC (3 Phase) - تيار متردد (ثلاثه فاز)
                                                        </option>
                                                    </select>
                                                </div>
                                                <input type="text" placeholder="The Volt - الجهد بالفولت"
                                                    id="voltHpNeededInput" ref={voltHpNeededInputRef} className="form-control" required /><br />

                                                <input type="text"
                                                    placeholder="The efficiency (hp) % - (حصان) الكفائه" id="eff%"
                                                    className="form-control" ref={efficiencyHPCalcRef} required /><br />

                                                <input type="text"
                                                    placeholder="P.F. (AC ONLY) - (التيار المتردد فقط) معامل القدره"
                                                    id="pfHPNeededInput" ref={pfHPNeededInputRef} className="form-control" /><br />

                                                <div className="div">
                                                    <button type="button" className="btn btn-dark" id="HP2ABtn" onClick={handleHP2AClick}
                                                        style={{ fontSize: "large", width: "100%" }}>Calculate - احسب</button>
                                                </div><br />

                                                <label htmlFor="CurrentAmpere" className="form-label">Ampere (A) -
                                                    الأمبير</label>
                                                <input type="text" readOnly id="CurrentAmpere" className="form-control"
                                                    placeholder="The Ampere - الأمبير" value={currentAmpere} /><br />
                                            </span>
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
    )
}

export default HorsePower2Ampere;