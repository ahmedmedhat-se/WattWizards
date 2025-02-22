import React, { useState, useRef } from 'react';
import logo from '../assets/logo.png';

function CircuitBreaker() {
    // Circuit-Breaker-Size (Program) Starts
    const [numMachine, setNumMachine] = useState('');
    const [watt, setWatt] = useState('');
    const [unitWatt, setUnitWatt] = useState('watt');
    const [voltage, setVoltage] = useState('');
    const [pf, setPf] = useState('');
    const [phaserChecked, setPhaserChecked] = useState(false);
    const [currentResult, setCurrentResult] = useState('');
    const [cbSize, setCbSize] = useState('');
    const [cableThickness, setCableThickness] = useState('');
    const [voltageDropPercentage, setVoltageDropPercentage] = useState('');
    const [checkMessage, setCheckMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        let allwat = 0;
        watt.split("+").forEach((currentWatt) => {
            if (unitWatt.toLowerCase() === "kw") {
                currentWatt = parseFloat(currentWatt) * 1000;
            } else if (unitWatt.toLowerCase() === "hp") {
                currentWatt = parseFloat(currentWatt) * 746;
            }
            allwat += parseFloat(currentWatt);
        });

        let allload = 0;
        numMachine.split("+").forEach((currentLoad) => {
            allload += parseFloat(currentLoad);
        });

        let allpf = 0;
        pf.split("+").forEach((currentPf) => {
            allpf += parseFloat(currentPf);
        });

        let result;
        if (phaserChecked) {
            result = (+allwat / (voltage * allpf * 1.73)) * allload;
        } else {
            result = (+allwat / (voltage * allpf)) * allload;
        }

        const CB = result * 1.25;

        if (!isNaN(result) && isFinite(result)) {
            setCurrentResult(`The current is ${result.toFixed(2)} A`);
        }

        const BreakerData = {
            6: `6A`, 10: `10A`, 16: `16A`, 20: `20A`, 25: `25A`, 32: `32A`,
            40: `40A`, 50: `50A`, 63: `63A`, 80: `80A`, 100: `100A`, 125: `125A`,
            160: `160A`, 200: `200A`, 250: `250A`, 400: `400A`, 630: `630A`,
            800: `800A`, 1000: `1000A`, 1250: `1250A`, 1600: `1600A`, 2000: `2000A`,
            2500: `2500A`, 3200: `3200A`, 4000: `4000A`, 5000: `5000A`, 6000: `6000A`,
            6300: `6300A`,
        };

        let CBB = parseInt(CB.toFixed());
        while (!BreakerData[CBB.toFixed()] && CBB <= 6300) {
            CBB += 1;
        }

        if (BreakerData[CBB] && CBB.toFixed(2) <= 6300) {
            setCbSize(`The available circuit-breaker to use is ${BreakerData[CBB]} قاطع التيار المناسب هو`);
        } else {
            setCbSize(`The Circuit-Breaker is out of range, you can ask a technician or ask our SparkTalk`);
        }

        const CableData = {
            6: `1`, 10: `1.5`, 16: `2.5`, 20: `4`, 32: `6`, 40: `10`, 60: `16`,
            80: `25`, 100: `35`, 125: `50`, 160: `60`, 200: `95`, 250: `150`, 300: `185`,
        };

        let CBC = CBB;
        while (CBC <= 300 && !CableData[CBC]) {
            CBC += 1;
        }

        if (CableData[CBC] && CBC <= 300) {
            setCableThickness(`The Cable thickness to use is ${CableData[CBC]}mm² - سُمك الكابل المناسب هو`);
        } else {
            setCableThickness(`The Cable current is out of range, you can ask a technician or you can ask our SparkTalk`);
        }

        function lossVoltCalc(cableArea) {
            let Sarea = cableArea;
            let lossV;
            if (Sarea <= 1.5) {
                lossV = 20.345;
            } else if (Sarea <= 2.5) {
                lossV = 12.397;
            } else if (Sarea <= 4) {
                lossV = 7.74;
            } else if (Sarea <= 6) {
                lossV = 5.199;
            } else if (Sarea <= 10) {
                lossV = 3.101;
            } else if (Sarea <= 16) {
                lossV = 1.275;
            } else if (Sarea <= 25) {
                lossV = 0.957;
            } else if (Sarea <= 50) {
                lossV = 0.526;
            } else if (Sarea <= 95) {
                lossV = 0.334;
            } else {
                lossV = "unknown";
            }
            let VDresult = (Sarea * result * lossV) / 1000;
            let percentage = phaserChecked ? (VDresult / 380) * 100 : (VDresult / 220) * 100;
            if (percentage.toFixed() < 5) {
                setVoltageDropPercentage(`The voltage drop percentage ${percentage.toFixed(2)} نسبه هبوط الجهد هي`);
                setCheckMessage("Use the current circuit breaker and the cable thickness you have - استخدم قاطع التيار وسمك الكابل المتوفر أمامك");
            } else {
                let num = 1;
                for (const indexer in CableData) {
                    if (num === 0) {
                        lossVoltCalc(CableData[indexer]);
                        setCheckMessage(`The Cable thickness to use is ${CableData[indexer]}mm² - سُمك الكابل المناسب هو`);
                    } else {
                        if (Sarea === CableData[indexer]) {
                            num -= 1;
                        }
                    }
                }
            }
        }
        lossVoltCalc(parseFloat(CableData[CBC]));
    };
    // Circuit-Breaker-Size (Program) Ends

    return (
        <>
            <div className="cards-lg-containers-card">
                <img
                    src="https://images.thdstatic.com/productImages/57bdcbb9-bed9-4c5c-a471-d118cfeee9b4/svn/renogy-solar-power-accessories-sundccb160mc2p-us-64_600.jpg" />
                <div className="category">
                    <div className="subject">
                        <h3>Software/Electricity</h3>
                    </div>
                    <img src={logo} />
                </div>
                <h2 className="course-title">Circuit-Breaker Size (Program)</h2>
                <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#CBModal">View</button>
                <button className="btn btn-success" type="button" data-bs-toggle="modal"
                    data-bs-target="#CBModalProj">Program</button>
            </div>
            <div className="modal fade" id="CBModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Circuit-Breaker (Program)</h5>
                            <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h2 className="HeaderStyleH2">Circuit Breaker - قاطع التيار</h2><br />
                            <p>
                                The circuit breaker or circuit breaker (collectively, electrical breakers)<br />
                                is an electrical safety switch that works automatically to protect electrical
                                circuits<br />
                                (such as electric motors, household connections, long-range power lines, etc.)<br />
                                from damage resulting from the passage of a very high electrical current. Unlike the
                                fuse,<br />
                                which must be replaced after it has worked once.<br /><br />

                                - The breaker can be reset either manually or automatically to restore<br />
                                normal functions and ensure continued operation of the circuit.<br />
                                High electrical current may pass through an electrical circuit<br />
                                either as a result of a fault in the circuit or as a result of an additional external
                                factor
                                such as lightning.<br /><br />

                                <br /><br /> .قاطع التيار أو قاطع الدائرة (وجمعها القواطع الكهربائية)
                                <br /> هو مفتاح أمان كهربائي يعمل تلقائيٌا لحماية الدوائر الكهربائية
                                <br /><br />(من محركات كهربائية ووصلات منزلية وخطوط القدرة طويلة المدى وغيرها) من الضرر
                                الناتج عن مرور تيار
                                كهربائي عال جداً
                                <br /><br />.وعلى عكس المصهر الذي يجب استبداله بعد أن يعمل لمرة واحدة
                                <br /><br />.فإن القاطع يمكن إعادة ضبطه إما يدويًا أو تلقائيًا لاستعادة الوظائف الطبيعية
                                وضمان استمرار تشغيل
                                الدائرة
                                <br />.قد يمر التيار الكهربائي العالي في الدائرة الكهربائية إما نتيجة عطل في الدائرة أو
                                نتيجة عامل خارجي
                                إضافي مثل البرق
                            </p><br /><br />
                            <hr /><br />
                            <h2 className="HeaderStyleH2">How to know the available circuit breker ?
                            </h2><br />
                            <p id="CBSizeProg">
                                First: Calculate the value of the electrical load current Load current<br />
                                (1 phase) = load power in watts ÷ (voltage x power factor) Load current<br />
                                (3 phase) = load power in watts ÷ (1.73 x voltage x power factor).<br /><br />

                                Second: Choose the appropriate electrical circuit breaker Capacity of the appropriate
                                breaker =<br />
                                electrical load current x 1.25.<br /><br />

                                Third: Choose the appropriate cable cross-sectional area Suitable cable capacity =
                                breaker current x
                                1.2<br /><br />

                                <br /> اًولا: حساب قيمة التيار الحمل الكهربائي
                                <br />.تيار الحمل (1فاز)= قدرة الحمل بالواط÷ (الجهد × معامل القدرة)
                                <br /><br />.تيار الحمل (3 فاز)= قدرة الحمل بالواط÷ (1.73 × الجهد × معامل القدرة)

                                <br />ثانياً: اختيار القاطع الكهربائي المناسب
                                <br /><br /> 1.25 * سعة القاطع المناسب= تيار الحمل الكهربائى

                                <br />ثالثاً: اختيار مساحة مقطع الكابل المناسب
                                <br /><br /> 1.2 * سعة الكابل المناسب= تيار القاطع
                            </p>
                            <a href="https://drive.google.com/drive/folders/1mp6H1NPinYgFm1RCAa1NNhMQuP8g7LUR"
                                target="_blank">Scientific Papers <i className="fas fa-link"></i></a>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="CBModalProj" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Circuit-Breaker Size (Program)</h5>
                            <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row d-flex justify-content-center align-items-center">
                                    <div className="col-10 p-2 mt-2">
                                        <form action="#" autoComplete="on" onSubmit={handleSubmit}>
                                            <span>
                                                <label htmlFor="machine" className="form-label">Appliances - الأجهزه :</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter the number of the appliances - ادخل عدد الأجهزه"
                                                    id="machine"
                                                    className="form-control"
                                                    value={numMachine}
                                                    onChange={(e) => setNumMachine(e.target.value)}
                                                /><br />

                                                <label htmlFor="watt" className="form-label">Power - القدره</label>
                                                <div className="input-group mb-3">
                                                    <input
                                                        type="text"
                                                        placeholder="Power - القدره"
                                                        id="watt"
                                                        className="form-control"
                                                        value={watt}
                                                        onChange={(e) => setWatt(e.target.value)}
                                                    />
                                                    <div className="input-group-append">
                                                        <select
                                                            name="watt"
                                                            className="form-control"
                                                            id="unitwatt"
                                                            value={unitWatt}
                                                            onChange={(e) => setUnitWatt(e.target.value)}
                                                        >
                                                            <option value="watt">Watt - وات</option>
                                                            <option value="kw">Kilo Watt - كيلو وات</option>
                                                            <option value="hp">Horse Power - حصان</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="d-flex" style={{ fontSize: "18px" }}>
                                                    <input
                                                        type="checkbox"
                                                        className="form-check form-check-inline"
                                                        id="phaser"
                                                        checked={phaserChecked}
                                                        onChange={(e) => setPhaserChecked(e.target.checked)}
                                                    />
                                                    <label htmlFor="phaser" className="text-dark">3 phases - ثلاثه فاز</label>
                                                </div><br />

                                                <label htmlFor="voltage" className="form-label">Voltage - الفولت :</label>
                                                <input
                                                    type="text"
                                                    placeholder="Volat - الفولت"
                                                    id="voltage"
                                                    className="form-control"
                                                    value={voltage}
                                                    onChange={(e) => setVoltage(e.target.value)}
                                                /><br />

                                                <label htmlFor="pf" className="form-label">Power Factor - عامل القدره :</label>
                                                <input
                                                    type="text"
                                                    placeholder="P.F. - معامل القدرة"
                                                    id="pf"
                                                    className="form-control"
                                                    value={pf}
                                                    onChange={(e) => setPf(e.target.value)}
                                                /><br />

                                                <div className="div">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-success"
                                                        style={{ width: "100%", fontSize: "large" }}
                                                    >
                                                        Calculate - احسب
                                                    </button>
                                                </div><br />

                                                <label htmlFor="current" className="form-label">Current - التيار</label>
                                                <input
                                                    type="text"
                                                    id="current"
                                                    className="form-control"
                                                    placeholder="Current - التيار :"
                                                    value={currentResult}
                                                    readOnly
                                                /><br />

                                                <label htmlFor="cb" className="form-label">CB Size - حجم قاطع التيار</label>
                                                <input
                                                    type="text"
                                                    id="cb"
                                                    className="form-control"
                                                    placeholder="CB Size - حجم قاطع التيار"
                                                    value={cbSize}
                                                    readOnly
                                                /><br />

                                                <label htmlFor="ct" className="form-label">Cable Thickness - مساحه الكابل</label>
                                                <input
                                                    type="text"
                                                    id="ct"
                                                    className="form-control"
                                                    placeholder="Cable Thickness - مساحه الكابل"
                                                    value={cableThickness}
                                                    readOnly
                                                /><br />

                                                <label htmlFor="v" className="form-label">Voltage Drop Percentage - نسبه هبوط الجهد</label>
                                                <input
                                                    type="text"
                                                    id="v"
                                                    className="form-control"
                                                    placeholder="V.D Percentage - نسبه هبوط الجهد"
                                                    value={voltageDropPercentage}
                                                    readOnly
                                                /><br />

                                                <label htmlFor="ch" className="form-label">Check</label>
                                                <input
                                                    type="text"
                                                    id="ch"
                                                    className="form-control"
                                                    placeholder="Check"
                                                    value={checkMessage}
                                                    readOnly
                                                /><br />
                                            </span>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CircuitBreaker;