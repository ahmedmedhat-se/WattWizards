import React, { useState, useRef } from 'react';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../assets/logo.png';

function ElectricalConsumption() {
    // Electric-Consumption (Program) Starts
    const [results, setResults] = useState({
        currentLoadKW: '',
        currentLoadW: '',
        kWh: '',
        avgConsumption: '',
    });

    const powerConsumptionRef = useRef(null);
    const electricConsumptionSelectionRef = useRef(null);
    const voltLoadCRef = useRef(null);
    const pfLoadRef = useRef(null);
    const numberOfloadsCRef = useRef(null);
    const workDaysCRef = useRef(null);
    const workHoursCRef = useRef(null);

    const handleElectricConsumptionCalcClick = (e) => {
        e.preventDefault();

        let powerConsumption = parseFloat(powerConsumptionRef.current.value);
        let newValues = electricConsumptionSelectionRef.current.value;
        let voltLoadC = parseFloat(voltLoadCRef.current.value);
        let pfLoad = parseFloat(pfLoadRef.current.value);
        let numberOfloadsC = parseFloat(numberOfloadsCRef.current.value);
        let workDaysC = parseFloat(workDaysCRef.current.value);
        let workHoursC = parseFloat(workHoursCRef.current.value);

        let powerConsum = 0;
        if (newValues === "wattsLoad") {
            powerConsum = powerConsumption;
        } else if (newValues === "kilowattsLoad") {
            powerConsum = powerConsumption * 1000;
        } else if (newValues === "ampereLoad") {
            powerConsum = powerConsumption * voltLoadC * pfLoad;
        } else if (newValues === "ampereLoad3") {
            powerConsum = powerConsumption * voltLoadC * pfLoad * 1.732;
        } else if (newValues === "horsePower1Phase") {
            powerConsum = powerConsumption * 746;
        }

        let kWh = ((powerConsum * workHoursC) / 1000) * numberOfloadsC;
        let avg = kWh * workDaysC;

        setResults({
            currentLoadKW: (powerConsum / 1000).toFixed(2) + " kW",
            currentLoadW: powerConsum.toFixed(2) + " W",
            kWh: kWh.toFixed(2) + " kWh - كيلووات ساعة",
            avgConsumption: avg.toFixed(2) + " kWh (Month) - كيلووات ساعة/شهر",
        });
    };
    // Electric-Consumption (Program) Ends

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
                <h2 className="course-title">Electrical-Consumption (Program)</h2>
                <button type="button" data-bs-toggle="modal" data-bs-target="#ECCView" className="btn btn-success">View</button>
                <button type="button" data-bs-toggle="modal" data-bs-target="#ECCProg" className="btn btn-success">Program</button>
            </div>
            <div className="modal fade" id="ECCView" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Electrical-Consumption</h5>
                            <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h2 className='HeaderStyleH2'>Electricity Consumption</h2><br />
                            <p>
                                Electricity consumption calculation formula: <br />

                                Energy consumed (kWh) = <br />
                                Power (in watts) x number of operating hours per day ÷ 1000 <br />

                                E(kilowatt-hour/day) = <br />
                                P(W) x Time (hour/day) / 1000(W/kW) <br /><br />

                                <br /> صيغة حساب استهلاك الكهرباء

                                <br /> الطاقة المستهلكة (كيلووات ساعة)
                                <br /> الطاقة (بالوات) × عدد ساعات التشغيل يوميًا ÷ 1000
                                <br /> = (كيلووات ساعه) الطاقه المسنهلكه
                                <br /> 1000 / غدد ساعات التشغبل في اليوم * (بالوات) قدره الجهاز
                            </p>
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
            <div className="modal fade" id="ECCProg" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Electrical-Consumption</h5>
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
                                                <label htmlFor="powerConsumption" className="form-label">Power - القدره</label>
                                                <input type="text" placeholder="القدره" id="powerConsumption" ref={powerConsumptionRef} required
                                                    className="form-control" />
                                                <div className="input-group-append">
                                                    <select style={{ fontWeight: "bold" }} className="form-control"
                                                        name="ElectricConsumptionSelection"
                                                        id="ElectricConsumptionSelection" ref={electricConsumptionSelectionRef}>
                                                        <option value="wattsLoad">Watt - الوات</option>
                                                        <option value="kilowattsLoad">KiloWatts - كيلووات</option>
                                                        <option value="ampereLoad">Ampere - أمبير</option>
                                                        <option value="ampereLoad3">Ampere (3 Phase) - (ثلاثه فاز) أمبير
                                                        </option>
                                                        <option value="horsePower1Phase">Hp - حصان</option>
                                                    </select>
                                                </div>
                                                <br />

                                                <label htmlFor="numberOfloadsC" className="form-label">Appliances -
                                                    الاحمال</label>
                                                <input type="text" placeholder="الاحمال" id="numberOfloadsC"
                                                    className="form-control" ref={numberOfloadsCRef} /><br />

                                                <label className="form-label">Work Hours / Days - ساعات العمل /
                                                    الايام</label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"
                                                            style={{ fontWeight: "bold" }}>Hours/Days</span>
                                                    </div>
                                                    <input type="text" placeholder="ساعات" id="workHoursC" ref={workDaysCRef} className="form-control" /><br />
                                                    <input type="text" placeholder="الايام" id="workDaysC" ref={workHoursCRef} className="form-control" /><br />
                                                </div><br />

                                                <label className="form-label">Volt / Power Factor - فولت / معامل
                                                    القدره</label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"
                                                            style={{ fontWeight: "bold" }}>Volt/P.F.</span>
                                                    </div>
                                                    <input type="text" placeholder="Volt - الفولت" id="voltLoadC" ref={voltLoadCRef}
                                                        className="form-control" /><br />
                                                    <input type="text" placeholder="معامل القدره" id="pfLoad" ref={pfLoadRef}
                                                        className="form-control" /><br />
                                                </div><br />

                                                <div className="div">
                                                    <button id="ElectricConsumptionCalc" onClick={handleElectricConsumptionCalcClick} className="btn btn-success"
                                                        style={{ width: "100%", fontSize: "large" }}>Calculate - احسب</button>
                                                </div><br />

                                                <label className="form-label">Current in kW/Watts - التيار
                                                    بالكيلووات/الوات</label>
                                                <div className="input-group">
                                                    <input readOnly type="text" id="CurrentLoadDefinedKW"
                                                        className="form-control"
                                                        placeholder="Kilowatts - كيلووات" value={results.currentLoadKW} /><br />
                                                    <input readOnly type="text" id="CurrentLoadDefinedW" value={results.currentLoadW}
                                                        className="form-control" placeholder="Watts - وات" /><br />
                                                </div><br />

                                                <label htmlFor="kWHour" className="form-label">Load in kWh - (ساعه) الحمل
                                                    بالكيلووات</label>
                                                <input readOnly type="text" id="kWHour" value={results.kWh} className="form-control"
                                                    placeholder="Load in kWh - (ساعه) الحمل بالكيلووات" /><br />

                                                <label htmlFor="avgConsumption" className="form-label">Average consumption
                                                    per
                                                    month - (كيلووات
                                                    ساعة/شهر) متوسط
                                                    الاستهلاك شهريا</label>
                                                <input readOnly type="text" id="avgConsumption" value={results.avgConsumption} className="form-control"
                                                    placeholder="Average consumption per month - متوسط ​​الاستهلاك شهريا" />
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

export default ElectricalConsumption;