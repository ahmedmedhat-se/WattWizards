import { useState } from 'react';
import logo from '../assets/logo.png';

const CircuitBreaker = () => {
    const [form, setForm] = useState({
        machines: '', watt: '', unit: 'watt', voltage: '', pf: '', is3Phase: false
    });

    const [results, setResults] = useState({
        current: '', breaker: '', cable: '', voltageDrop: '', message: ''
    });

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }));
    };

    const parseMulti = (input, unit) => {
        return input.split("+").reduce((acc, val) => {
            let n = parseFloat(val);
            if (unit === "kw") n *= 1000;
            else if (unit === "hp") n *= 746;
            return acc + (isNaN(n) ? 0 : n);
        }, 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { machines, watt, unit, voltage, pf, is3Phase } = form;
        const totalWatt = parseMulti(watt, unit);
        const totalMachines = parseMulti(machines);
        const totalPf = parseMulti(pf);
        const volt = parseFloat(voltage);

        if (!totalWatt || !totalMachines || !totalPf || !volt) return;

        const denom = is3Phase ? volt * totalPf * 1.73 : volt * totalPf;
        const current = (totalWatt / denom) * totalMachines;
        const breakerAmp = current * 1.25;

        const BreakerData = {
            6: `6A`, 10: `10A`, 16: `16A`, 20: `20A`, 25: `25A`, 32: `32A`, 40: `40A`, 50: `50A`, 63: `63A`, 80: `80A`,
            100: `100A`, 125: `125A`, 160: `160A`, 200: `200A`, 250: `250A`, 400: `400A`, 630: `630A`, 800: `800A`,
            1000: `1000A`, 1250: `1250A`, 1600: `1600A`, 2000: `2000A`, 2500: `2500A`, 3200: `3200A`, 4000: `4000A`,
            5000: `5000A`, 6000: `6000A`, 6300: `6300A`
        };

        let breakerKey = Math.ceil(breakerAmp);
        while (!BreakerData[breakerKey] && breakerKey <= 6300) breakerKey++;

        const breakerSize = BreakerData[breakerKey] || "Out of range";
        const CableData = {
            6: `1`, 10: `1.5`, 16: `2.5`, 20: `4`, 32: `6`, 40: `10`, 60: `16`, 80: `25`, 100: `35`, 125: `50`,
            160: `60`, 200: `95`, 250: `150`, 300: `185`
        };

        let cableKey = breakerKey;
        while (!CableData[cableKey] && cableKey <= 300) cableKey++;

        const cableSize = CableData[cableKey] || "Out of range";

        const resistanceTable = [
            { max: 1.5, value: 20.345 },
            { max: 2.5, value: 12.397 },
            { max: 4, value: 7.74 },
            { max: 6, value: 5.199 },
            { max: 10, value: 3.101 },
            { max: 16, value: 1.275 },
            { max: 25, value: 0.957 },
            { max: 50, value: 0.526 },
            { max: 95, value: 0.334 },
        ];

        const S = parseFloat(cableSize);
        const r = resistanceTable.find(r => S <= r.max)?.value || "unknown";
        const lossV = (S * current * r) / 1000;
        const dropPercent = is3Phase ? (lossV / 380) * 100 : (lossV / 220) * 100;

        setResults({
            current: `${current.toFixed(2)} A`,
            breaker: breakerSize === "Out of range" ? "Consult technician" : `Use ${breakerSize}`,
            cable: cableSize === "Out of range" ? "Consult technician" : `${cableSize} mm²`,
            voltageDrop: dropPercent ? `${dropPercent.toFixed(2)}%` : '',
            message: dropPercent < 5
                ? "Use the current circuit breaker and cable"
                : "Voltage drop too high, increase cable size"
        });
    };

    return (
        <>
            <div className="cards-lg-containers-card">
                <img src="https://images.thdstatic.com/productImages/57bdcbb9-bed9-4c5c-a471-d118cfeee9b4/svn/renogy-solar-power-accessories-sundccb160mc2p-us-64_600.jpg" alt="circuit breaker" />
                <div className="category">
                    <div className="subject">
                        <h3>Software/Electricity</h3>
                    </div>
                    <img src={logo} alt="Logo" />
                </div>
                <h2 className="course-title">Circuit-Breaker Size (Program)</h2>
                <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#CBModal">View</button>
                <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#CBModalProj">Program</button>
            </div>

            {/* Info Modal */}
            <div className="modal fade" id="CBModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Circuit-Breaker (Program)</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <h2 className="HeaderStyleH2">Circuit Breaker</h2>
                            <p>
                                Circuit breakers automatically protect electrical circuits from overload or fault currents.
                                Unlike fuses, they can be reset manually or automatically. Used widely in homes, factories, and power systems.
                            </p>
                            <h2 className="HeaderStyleH2">How to Calculate?</h2>
                            <p>
                                1. Load Current = Power / (Voltage × PF) <br />
                                2. Circuit Breaker = Load Current × 1.25 <br />
                                3. Cable Size ≈ Breaker × 1.2
                            </p>
                            <a href="https://drive.google.com/drive/folders/1mp6H1NPinYgFm1RCAa1NNhMQuP8g7LUR" target="_blank" rel="noreferrer">
                                Scientific Papers
                            </a>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Calculator Modal */}
            <div className="modal fade" id="CBModalProj" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Circuit-Breaker Size Calculator</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                {[
                                    { label: "Appliances", id: "machines", type: "text" },
                                    { label: "Power", id: "watt", type: "text" },
                                    { label: "Voltage", id: "voltage", type: "text" },
                                    { label: "Power Factor", id: "pf", type: "text" }
                                ].map(({ label, id, type }) => (
                                    <div key={id} className="mb-3">
                                        <label htmlFor={id} className="form-label">{label}</label>
                                        <input
                                            type={type}
                                            id={id}
                                            value={form[id]}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder={label}
                                        />
                                    </div>
                                ))}

                                <div className="mb-3">
                                    <label className="form-label">Unit</label>
                                    <select id="unit" value={form.unit} onChange={handleChange} className="form-select">
                                        <option value="watt">Watt</option>
                                        <option value="kw">Kilo Watt</option>
                                        <option value="hp">Horse Power</option>
                                    </select>
                                </div>

                                <div className="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        id="is3Phase"
                                        className="form-check-input"
                                        checked={form.is3Phase}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="is3Phase" className="form-check-label">3 Phase</label>
                                </div>

                                <button type="submit" className="btn btn-dark w-100 mb-3">Calculate</button>

                                {[
                                    { id: "current", label: "Current", value: results.current },
                                    { id: "breaker", label: "Circuit Breaker", value: results.breaker },
                                    { id: "cable", label: "Cable Size", value: results.cable },
                                    { id: "voltageDrop", label: "Voltage Drop %", value: results.voltageDrop },
                                    { id: "message", label: "Check", value: results.message, isTextarea: true }
                                ].map(({ id, label, value, isTextarea }) => (
                                    <div key={id} className="mb-3">
                                        <label htmlFor={id} className="form-label">{label}</label>
                                        {isTextarea ? (
                                            <textarea id={id} className="form-control" readOnly rows={2} value={value} />
                                        ) : (
                                            <input id={id} className="form-control" readOnly value={value} />
                                        )}
                                    </div>
                                ))}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CircuitBreaker;