import { useState, useRef } from 'react';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../assets/logo.png';

const PowerFactorCorrection = () => {
    const [results, setResults] = useState({
        active: '', apparent: '', reactive: '', microFarad: ''
    });

    const refs = {
        power: useRef(null),
        efficiency: useRef(null),
        powerType: useRef(null),
        pfOld: useRef(null),
        pfNew: useRef(null),
        vrms: useRef(null),
        freq: useRef(null)
    };

    const handleCalculate = (e) => {
        e.preventDefault();

        const power = parseFloat(refs.power.current.value);
        const eff = parseFloat(refs.efficiency.current.value) / 100 || 1;
        const type = refs.powerType.current.value;
        const pfOld = parseFloat(refs.pfOld.current.value);
        const pfNew = parseFloat(refs.pfNew.current.value);
        const vrms = parseFloat(refs.vrms.current.value);
        const freq = parseFloat(refs.freq.current.value);
        const vrmsSq = vrms ** 2;

        if (!power || !pfOld || !pfNew || !vrms || !freq) return;

        let current = 0;
        switch (type) {
            case 'amp':
                current = power;
                break;
            case 'kw':
                current = (power * 1000) / (vrms * pfOld);
                break;
            case 'kw3':
                current = (power * 1000) / (vrms * pfOld * 1.732);
                break;
            case 'hp':
                current = (power * 746) / (vrms * eff * pfOld);
                break;
            case 'hp3':
                current = (power * 746) / (vrms * eff * pfOld * 1.732);
                break;
        }

        const active = (vrms * current * pfOld) / 1000;
        const apparent = (vrms * current) / 1000;
        const reactive = Math.sqrt(apparent ** 2 - active ** 2);

        const phiOld = Math.acos(pfOld);
        const phiNew = Math.acos(pfNew);
        const qCap = active * (Math.tan(phiOld) - Math.tan(phiNew));
        const microFarad = (qCap * 1e9) / (2 * Math.PI * freq * vrmsSq);

        setResults({
            active: active.toFixed(2),
            apparent: apparent.toFixed(2),
            reactive: reactive.toFixed(2),
            microFarad: microFarad.toFixed(2)
        });
    };

    return (
        <>
            <div className="cards-lg-containers-card">
                <img src="https://img.directindustry.com/images_di/photo-g/222679-15601372.webp" alt="PFC" />
                <div className="category">
                    <div className="subject">
                        <h3>Software/Electricity</h3>
                    </div>
                    <img src={logo} alt="Logo" />
                </div>
                <h2 className="course-title">Power-Factor-Correction (Program)</h2>
                <button data-bs-toggle="modal" data-bs-target="#PFCView" className="btn btn-dark">View</button>
                <button data-bs-toggle="modal" data-bs-target="#PFCProgram" className="btn btn-dark">Program</button>
            </div>

            {/* Info Modal */}
            <div className="modal fade" id="PFCView" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Power-Factor-Correction</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h2 className="HeaderStyleH2">Power Factor Correction - تحسين معامل القدرة</h2>
                            <p>
                                Power factor correction (PFC) improves power factor and power quality, reduces energy waste, and enhances system stability. It’s achieved by placing capacitors to offset reactive power, typically near inductive loads like motors.
                            </p>
                            <h2 className="HeaderStyleH2">Phase (1) VS Phase (3)</h2>
                            <p>
                                1-phase uses Phase (P/L) and Neutral (N).<br />
                                3-phase uses R/L1, S/L2, T/L3, and N.<br />
                                3-phase systems are common in industrial settings for powering heavy loads.
                            </p>
                            <a href="https://drive.google.com/drive/folders/1mp6H1NPinYgFm1RCAa1NNhMQuP8g7LUR" target="_blank" rel="noreferrer">
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
            <div className="modal fade" id="PFCProgram" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Power-Factor-Correction (Program)</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Power Needed</label>
                                    <div className="input-group">
                                        <input ref={refs.power} type="number" className="form-control" placeholder="Enter power" />
                                        <select ref={refs.powerType} className="form-select fw-bold">
                                            <option value="amp">Ampere</option>
                                            <option value="kw">KW (1-Phase)</option>
                                            <option value="kw3">KW (3-Phase)</option>
                                            <option value="hp">HP (1-Phase)</option>
                                            <option value="hp3">HP (3-Phase)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Efficiency (HP %)</label>
                                    <input ref={refs.efficiency} type="number" className="form-control" placeholder="e.g. 90" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Old / New Power Factor</label>
                                    <div className="input-group">
                                        <input ref={refs.pfOld} type="number" step="any" className="form-control" placeholder="Old" />
                                        <input ref={refs.pfNew} type="number" step="any" className="form-control" placeholder="New" />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">VRMS / Frequency</label>
                                    <div className="input-group">
                                        <input ref={refs.vrms} type="number" className="form-control" placeholder="VRMS" />
                                        <input ref={refs.freq} type="number" className="form-control" placeholder="Hz" />
                                    </div>
                                </div>

                                <button onClick={handleCalculate} className="btn btn-dark w-100 mb-3">Calculate</button>

                                <div className="mb-2"><label>Active Power (kW)</label><input readOnly value={results.active} className="form-control" /></div>
                                <div className="mb-2"><label>Apparent Power (kVA)</label><input readOnly value={results.apparent} className="form-control" /></div>
                                <div className="mb-2"><label>Reactive Power (kVAR)</label><input readOnly value={results.reactive} className="form-control" /></div>
                                <div className="mb-2"><label>Capacitance (µF)</label><input readOnly value={results.microFarad} className="form-control" /></div>
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
};

export default PowerFactorCorrection;