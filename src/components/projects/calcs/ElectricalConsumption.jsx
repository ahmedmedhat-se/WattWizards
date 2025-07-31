import { useState, useRef } from 'react';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../assets/logo.png';

function ElectricalConsumption() {
    const [results, setResults] = useState({
        kw: 0,
        w: 0,
        kWh: 0,
        monthly: 0,
    });

    const powerRef = useRef();
    const typeRef = useRef();
    const voltRef = useRef();
    const pfRef = useRef();
    const loadCountRef = useRef();
    const daysRef = useRef();
    const hoursRef = useRef();

    const calculate = (e) => {
        e.preventDefault();

        const power = parseFloat(powerRef.current.value) || 0;
        const type = typeRef.current.value;
        const volt = parseFloat(voltRef.current.value) || 0;
        const pf = parseFloat(pfRef.current.value) || 0;
        const loads = parseFloat(loadCountRef.current.value) || 0;
        const days = parseFloat(daysRef.current.value) || 0;
        const hours = parseFloat(hoursRef.current.value) || 0;

        let watts = 0;
        switch (type) {
            case 'wattsLoad':
                watts = power;
                break;
            case 'kilowattsLoad':
                watts = power * 1000;
                break;
            case 'ampereLoad':
                watts = power * volt * pf;
                break;
            case 'ampereLoad3':
                watts = power * volt * pf * 1.732;
                break;
            case 'horsePower1Phase':
                watts = power * 746;
                break;
            default:
                watts = 0;
        }

        const kWh = (watts * hours * loads) / 1000;
        const monthly = kWh * days;

        setResults({
            kw: watts / 1000,
            w: watts,
            kWh,
            monthly,
        });
    };

    return (
        <>
            <div className="cards-lg-containers-card">
                <img src="https://www.shutterstock.com/image-photo/old-electricity-meter-displaying-consumption-600nw-2202564469.jpg" />
                <div className="category">
                    <div className="subject">
                        <h3>Software/Electricity</h3>
                    </div>
                    <img src={logo} />
                </div>
                <h2 className="course-title">Electrical Consumption Calculator</h2>
                <button type="button" data-bs-toggle="modal" data-bs-target="#ECCView" className="btn btn-dark">View</button>
                <button type="button" data-bs-toggle="modal" data-bs-target="#ECCProg" className="btn btn-dark">Calculate</button>
            </div>

            {/* View Modal */}
            <div className="modal fade" id="ECCView" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Electricity Consumption Formula</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h2>Electricity Consumption</h2>
                            <p>
                                Energy consumed (kWh) = Power (W) × Hours ÷ 1000<br />
                                E(kWh) = P(W) × t(h) / 1000
                            </p>
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

            {/* Calculator Modal */}
            <div className="modal fade" id="ECCProg" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Electrical Consumption Calculator</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <form onSubmit={calculate} autoComplete="on">
                                    <label className="form-label">Power</label>
                                    <input type="text" ref={powerRef} className="form-control" placeholder="Enter power" required />
                                    <select ref={typeRef} className="form-control fw-bold mt-2">
                                        <option value="wattsLoad">Watts</option>
                                        <option value="kilowattsLoad">Kilowatts</option>
                                        <option value="ampereLoad">Amps (1 Phase)</option>
                                        <option value="ampereLoad3">Amps (3 Phase)</option>
                                        <option value="horsePower1Phase">Horsepower</option>
                                    </select>
                                    <label className="form-label mt-3">Voltage</label>
                                    <input type="text" ref={voltRef} className="form-control" placeholder="Enter voltage" />
                                    <label className="form-label mt-3">Power Factor</label>
                                    <input type="text" ref={pfRef} className="form-control" placeholder="Enter power factor" />
                                    <label className="form-label mt-3">Number of Loads</label>
                                    <input type="text" ref={loadCountRef} className="form-control" placeholder="Enter number of loads" />
                                    <label className="form-label mt-3">Hours per Day</label>
                                    <input type="text" ref={hoursRef} className="form-control" placeholder="Enter hours per day" />
                                    <label className="form-label mt-3">Days per Month</label>
                                    <input type="text" ref={daysRef} className="form-control" placeholder="Enter days per month" />
                                    <button type="submit" className="btn btn-dark w-100 mt-4">Calculate</button>
                                </form>

                                <div className="result-area mt-4">
                                    <p><strong>KW:</strong> {results.kw.toFixed(2)} kW</p>
                                    <p><strong>Watts:</strong> {results.w.toFixed(2)} W</p>
                                    <p><strong>Energy per Day:</strong> {results.kWh.toFixed(2)} kWh</p>
                                    <p><strong>Monthly Consumption:</strong> {results.monthly.toFixed(2)} kWh</p>
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
}
export default ElectricalConsumption;