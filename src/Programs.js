import 'bootstrap/dist/js/bootstrap.bundle.min';
import { faLink } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState, useRef } from 'react';

function Programs() {
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

    // Power-Fcator-Correction (Program) Starts
    const [resultsPF, setResultsPF] = useState({
        active: '',
        apparent: '',
        reactive: '',
        microFarad: '',
    });

    const powerRef = useRef(null);
    const efficiencyRef = useRef(null);
    const powerSelectionRef = useRef(null);
    const pfOldRef = useRef(null);
    const pfNewRef = useRef(null);
    const VRMSRef = useRef(null);
    const frequencyRef = useRef(null);

    const handlePFCaclcClick = (e) => {
        e.preventDefault();

        let power = parseFloat(powerRef.current.value);
        let efficiency = parseFloat(efficiencyRef.current.value) / 100;
        let values = powerSelectionRef.current.value;
        let pfOld = parseFloat(pfOldRef.current.value);
        let pfNew = parseFloat(pfNewRef.current.value);
        let VRMS = parseFloat(VRMSRef.current.value);
        let frequency = parseFloat(frequencyRef.current.value);
        let VrmsSquared = Math.pow(VRMS, 2);

        let power2 = 0;
        if (values === "amp") {
            power2 = power;
        } else if (values === "kw") {
            power2 = (power * 1000) / (VRMS * pfOld);
        } else if (values === "kw3") {
            power2 = (power * 1000) / (VRMS * pfOld * 1.732);
        } else if (values === "hp") {
            power2 = (power * 746) / (VRMS * efficiency * pfOld);
        } else if (values === "hp3") {
            power2 = (power * 746) / (VRMS * efficiency * pfOld * 1.732);
        }

        let activePower = VRMS * power2 * pfOld / 1000;
        let apparentPower = VRMS * power2 / 1000;
        let reactivePower = Math.floor(Math.sqrt(Math.pow(apparentPower, 2) - Math.pow(activePower, 2)));

        let phiOld = Math.acos(pfOld);
        let tanOld = Math.tan(phiOld);

        let phiNew = Math.acos(pfNew);
        let tanNew = Math.tan(phiNew);

        let tanMinus = tanOld - tanNew;
        let phiCapicatorReactive = activePower * tanMinus;
        let microC = (phiCapicatorReactive * Math.pow(10, 9)) / (2 * Math.PI * frequency * VrmsSquared);

        setResultsPF({
            active: activePower.toFixed(2),
            apparent: apparentPower.toFixed(2),
            reactive: reactivePower,
            microFarad: microC.toFixed(2),
        });
    };

    // Power-Fcator-Correction (Program) Ends

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

    // Ampere TO Watt (Program) Starts
    const [wattResult, setWattResult] = useState('');
    const [kwattResult, setKWattResult] = useState('');

    const AmpereToWattInpRef = useRef(null);
    const powerSelectTypesForA2WRef = useRef(null);
    const voltNeededInputA2WRef = useRef(null);
    const pfNeededInputA2WRef = useRef(null);

    const handleAmpereToWattCalcOutputClick = (e) => {
        e.preventDefault();

        let AmpereToWattInp = parseFloat(AmpereToWattInpRef.current.value);
        let powerSelectTypesForA2W = powerSelectTypesForA2WRef.current.value;
        let voltNeededInputA2W = parseFloat(voltNeededInputA2WRef.current.value);
        let pfNeededInputA2W = parseFloat(pfNeededInputA2WRef.current.value);

        let Ampere2WattPowerVar = 0;
        if (powerSelectTypesForA2W === "DCAmpereToWatt") {
            Ampere2WattPowerVar = AmpereToWattInp * voltNeededInputA2W;
        } else if (powerSelectTypesForA2W === "AC1AmpereToWatt") {
            Ampere2WattPowerVar = AmpereToWattInp * (voltNeededInputA2W * pfNeededInputA2W);
        } else if (powerSelectTypesForA2W === "AC3AmpereToWatt") {
            Ampere2WattPowerVar = AmpereToWattInp * (1.732 * pfNeededInputA2W * voltNeededInputA2W);
        }

        let Ampere2KWattPowerVar = Ampere2WattPowerVar / 1000;

        setWattResult(Ampere2WattPowerVar.toFixed(2));
        setKWattResult(Ampere2KWattPowerVar.toFixed(2));
    };
    // Ampere TO Watt (Program) Ends


    // CoulombsLaw (Program) Starts
    const [forceResult, setForceResult] = useState('');
    const [areChargesEqual, setAreChargesEqual] = useState(false);

    const charge1Ref = useRef(null);
    const charge2Ref = useRef(null);
    const distanceRef = useRef(null);

    const handleCalculateClick = (e) => {
        e.preventDefault();

        const q1 = parseFloat(charge1Ref.current.value);
        const q2 = areChargesEqual ? q1 : parseFloat(charge2Ref.current.value); // If equal, use q1 for q2
        const r = parseFloat(distanceRef.current.value);

        const k = 8.9875 * (10 ** 9); // Coulomb's constant
        const force = k * ((Math.abs(q1 * q2)) / (r * r));

        setForceResult(force.toFixed(2));
    };
    // CoulombsLaw (Program) Ends

    // Ohm's Law (Program) Starts
    const [voltaResult, setVoltaResult] = useState('');

    const currentRef = useRef(null);
    const resistanceRef = useRef(null);
    const voltageRef = useRef(null);
    const [calcType, setCalcType] = useState('Voltage'); // Options: Voltage, Current, Resistance

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

    // Volta's Law (Program) Starts
    const [newResult, setNewResult] = useState('');
    const [newCalcType, setNewCalcType] = useState('Voltage'); // Default to Voltage
    const workRef = useRef(null);
    const chargeRef = useRef(null);
    const newVoltageRef = useRef(null);

    const handleVoltlaAllCalculateClick = (e) => {
        e.preventDefault();

        const W = workRef.current ? parseFloat(workRef.current.value) : null;
        const Q = chargeRef.current ? parseFloat(chargeRef.current.value) : null;
        const V = newVoltageRef.current ? parseFloat(newVoltageRef.current.value) : null;

        let newCalculatedValue;

        if (newCalcType === 'Voltage') {
            if (W !== null && Q !== null && !isNaN(W) && !isNaN(Q) && Q !== 0) {
                newCalculatedValue = W / Q;
                setNewResult(`Electric Potential Difference: ${newCalculatedValue.toFixed(2)} volts`);
            } else {
                setNewResult('Please provide valid work and charge values.');
            }
        } else if (newCalcType === 'Work') {
            if (V !== null && Q !== null && !isNaN(V) && !isNaN(Q)) {
                newCalculatedValue = V * Q;
                setNewResult(`Work Done: ${newCalculatedValue.toFixed(2)} joules`);
            } else {
                setNewResult('Please provide valid voltage and charge values.');
            }
        } else if (newCalcType === 'Charge') {
            if (V !== null && W !== null && !isNaN(V) && !isNaN(W) && V !== 0) {
                newCalculatedValue = W / V;
                setNewResult(`Electric Charge: ${newCalculatedValue.toFixed(2)} coulombs`);
            } else {
                setNewResult('Please provide valid voltage and work done values.');
            }
        }
    };
    // Volta's Law (Program) Ends

    // Kirchhoff's Law (Program) Starts
    const [kResult, setKResult] = useState('');
    const [lawType, setLawType] = useState('KCL'); // Options: KCL, KVL
    const currentRefs = useRef([]);
    const voltageRefs = useRef([]);

    // Function to handle Kirchhoff's Law calculation
    const handleKirchhoffCalculateClick = (e) => {
        e.preventDefault();

        if (lawType === 'KCL') {
            // Kirchhoff's Current Law (KCL)
            const currents = currentRefs.current.map(ref => parseFloat(ref.value) || 0);
            const currentSum = currents.reduce((acc, curr) => acc + curr, 0);

            setKResult(`Sum of currents (ΣI): ${currentSum.toFixed(2)} A`);
        } else if (lawType === 'KVL') {
            // Kirchhoff's Voltage Law (KVL)
            const voltages = voltageRefs.current.map(ref => parseFloat(ref.value) || 0);
            const voltageSum = voltages.reduce((acc, v) => acc + v, 0);

            setKResult(`Sum of voltages (ΣV): ${voltageSum.toFixed(2)} V`);
        }
    };
    // Kirchhoff's Law (Program) Ends

    const HeaderStyle = {
        color: "black",
        fontWeight: "bold",
        fontSize: "18px"
    }

    const HeaderStyleH2 = {
        color: " #7170d7",
        fontWeight: "bold",
    }

    const HeaderStyleH2Arabic = {
        color: " #7170d7",
        fontWeight: "bold",
        textAlign: "right"
    }

    return (
        // Programms Section Starts
        <section className="cards-lg-containers" id="Programs">
            <header className="section-header">
                <div className="header-text">
                    <h1>Our Programs</h1>
                    <p style={HeaderStyle}>
                        These programs that we designed,
                        you can now view our scientific and research documents
                        under each program to obtain knowledge of these programs,
                        and you can download the phone application to try these programs.
                    </p>
                </div>
            </header>
            {/* <!-- Programms Contents Starts -->
            <!-- CB/Cable Program Content Starts --> */}
            <div className="cards-lg-containers-contents">
                <div className="cards-lg-containers-card">
                    <img
                        src="https://images.thdstatic.com/productImages/57bdcbb9-bed9-4c5c-a471-d118cfeee9b4/svn/renogy-solar-power-accessories-sundccb160mc2p-us-64_600.jpg" />
                    <div className="category">
                        <div className="subject">
                            <h3>Software/Electricity</h3>
                        </div>
                        <img
                            src="https://images.credly.com/images/d30e23c4-60cb-4a5d-b826-b0cd4a9cb0bc/profile_img.jpg" />
                    </div>
                    <h2 className="course-title">Circuit-Breaker (Program)</h2>
                    <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#CBModal">View</button>
                    <button className="btn btn-success" type="button" data-bs-toggle="modal"
                        data-bs-target="#CBModalProj">Program</button>
                </div>
                {/* <!-- Programms Content Starts -->
                <!-- CB/Cable Program Modal --> */}
                <div className="modal fade" id="CBModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
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
                                <h2 style={HeaderStyleH2}>Circuit Breaker - قاطع التيار</h2><br />
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
                                    such as lightning.<br /><br />

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
                                <h2 style={HeaderStyleH2}>How to know the available circuit breker ?
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
                                    <br /><br /> 1.2 * سعة الكابل المناسب= تيار القاطع
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
                <div className="modal fade" id="CBModalProj" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
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
                                                    <a href="#" target="_blank">Need Any Help?</a>
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
                {/* <!-- CB/Cable Program Content Ends --> */}
                {/* <!-- PFC Program --> */}
                <div className="cards-lg-containers-card">
                    <img src="https://img.directindustry.com/images_di/photo-g/222679-15601372.webp" />
                    <div className="category">
                        <div className="subject">
                            <h3>Software/Electricity</h3>
                        </div>
                        <img
                            src="https://images.credly.com/images/d30e23c4-60cb-4a5d-b826-b0cd4a9cb0bc/profile_img.jpg" />
                    </div>
                    <h2 class="course-title">Power-Factor-Correction (Program)</h2>
                    <button data-bs-toggle="modal" data-bs-target="#PFCView" className="btn btn-success">View</button>
                    <button data-bs-toggle="modal" data-bs-target="#PFCProgram" className="btn btn-success">Program</button>
                </div>
                {/* <!-- PFC Program Content Starts --> */}
                <div className="modal fade" id="PFCView" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Power-Factor-Correction</h5>
                                <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h2 style={HeaderStyleH2}>Power Factor Correction - تحسين معامل القدره
                                </h2><br />
                                <p>
                                    Power factor correction (PFC) aims to improve power factor, and therefore power quality.
                                    <br />
                                    It reduces the load on the electrical distribution system, increases energy efficiency
                                    <br />
                                    and reduces electricity costs. It also decreases the likelihood of instability and
                                    failure of equipment.
                                    <br /><br />

                                    Power factor correction is obtained via the connection of capacitors which produce
                                    reactive energy in
                                    <br />
                                    opposition to the energy absorbed by loads such as motors, locally close to the load.
                                    This improves the
                                    <br />
                                    power factor from the point where the reactive power source is connected, preventing the
                                    unnecessary
                                    <br />
                                    circulation of current in the network. <br />

                                    ,يهدف تصحيح معامل القدرةإلى تحسين معامل القدرة
                                    .وبالتالي جودة الطاقة

                                    <br /> فهو يقلل من الحمل على نظام
                                    التوزيع الكهربائي،
                                    ويزيد من كفاءة الطاقة ويقلل من تكاليف الكهرباء<br />
                                    كما أنه يقلل من احتمالية عدم الاستقرار وفشل المعدات<br /><br />

                                    يتم الحصول على تصحيح معامل القدرة عن طريق توصيل المكثفات التي تنتج طاقة تفاعلية في
                                    مواجهة الطاقة التي
                                    <br />
                                    تمتصها الأحمال مثل المحركات، القريبة محليًا من الحمل. يؤدي ذلك إلى تحسين عامل الطاقة من
                                    النقطة التي يتم
                                    <br />
                                    فيها توصيل مصدر الطاقة التفاعلية، مما يمنع التداول غير الضروري للتيار في الشبكة <br />
                                </p><br />
                                <h2 style={HeaderStyleH2}>Phase (1) VS Phase (3)</h2><br />
                                <p>
                                    1 phase electricity contains only two lines: The hot line or phase (in English: Phase)
                                    is symbolized by
                                    the symbol (P or L).<br />
                                    The cold or neutral line (in English: Neutral), symbolized by the symbol (N).<br />
                                    The two lines are used to form a closed circuit path in order to operate electrical
                                    appliance loads,<br />
                                    such as: home refrigerators and air conditioners.<br />
                                    The Pase line is usually distinguished by red or brown, while the neutral line is
                                    black.<br />
                                    The color scheme may differ from one country to another.<br /><br />

                                    3 phase electricity contains four lines as follows:<br />
                                    The first phase line is symbolized by (R) or (L1).<br />
                                    The second phase line is symbolized by (S) or (L2).<br />
                                    The third phase line is symbolized by (T) or (L3).<br />
                                    Neutral line, symbolized by the symbol (N).<br />
                                    3-phase electricity is used to operate medium and large engines, and to operate large
                                    air conditioners
                                    and central air conditioning.<br /><br />

                                    <br />:يحتوي كهرباء 1 فاز على خطين فقط وهما
                                    <br />.الخط الحار أو الفاز (بالإنجليزية: Phase) ويرمز له بالرمز (P أو L)
                                    <br />الخط البارد أو النيوترال
                                    <br />(بالإنجليزية: Neutral) ويرمز له بالرمز (N)
                                    <br />حيث يستخدم الخطين لتشكيل مسار دائرة مغلقة من أجل تشغيل أحمال الأجهزة الكهربائية
                                    <br />.,مثل: الثلاجة المنزلية وأجهزة التكييف، ويميز خط الفاز في العادة باللون الأحمر أو
                                    البني بينما اللون
                                    الاسود لخط النيوترال
                                    <br /><br />وقد يختلف نظام الألوان من دولة لدولة أخرى

                                    <br />:حتوي كهرباء 3 فاز على أربعة خطوط كالتالي
                                    <br />خط الفاز الأول ويرمز له بالرمز
                                    (R) أو (L1).<br /><br />
                                    <br />خط الفاز الثاني ويرمز له بالرمز
                                    (S) أو (L2).<br /><br />
                                    <br />خط الفاز الثالث ويرمز له بالرمز
                                    (T) أو (L3).<br /><br />
                                    <br />خط النيوترال ويرمز له بالرمز
                                    (N).<br /><br />
                                    <br />.يستخدم كهرباء 3 فاز في تشغيل المحركات المتوسطة والكبيرة، وفي تشغيل أجهزة التكييف
                                    الكبيرة والتكييف
                                    المركزي
                                </p>
                                <a href="https://drive.google.com/drive/folders/1mp6H1NPinYgFm1RCAa1NNhMQuP8g7LUR"
                                    target="_blank">Scientific Papers
                                    <i>
                                        <FontAwesomeIcon icon={faLink} />
                                    </i>
                                </a>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="PFCProgram" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Power-Factor-Correction (Program)</h5>
                                <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <div className="row d-flex justify-content-center align-items-center">
                                        <div className="col-10 p-2 mt-2">
                                            <form action="#" autocomplete="on">
                                                <span>
                                                    <label htmlFor="power" className="form-label">Power - القدره</label>
                                                    <div className="input-group mb-3">
                                                        <input type="text" placeholder="القدره" id="power" ref={powerRef} required
                                                            className="form-control" />
                                                        <div className="input-group-append">
                                                            <select style={{ fontWeight: "bold" }} className="form-control"
                                                                name="powerSelection" id="powerSelection" ref={powerSelectionRef}>
                                                                <option value="amp">Ampere - أمبير</option>
                                                                <option value="kw">KW (Single Phase) - كيلووات 1 فاز
                                                                </option>
                                                                <option value="kw3">KW (3 Phase) - كيلووات 3 فاز</option>
                                                                <option value="hp">Hp (Single Phase) - (واحد فاز) حصان
                                                                </option>
                                                                <option value="hp3">Hp (3 Phase) - (ثلاثه فاز) حصان</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <input type="text"
                                                        placeholder="The efficiency (hp) % - (حصان) الكفائه" id="eff" ref={efficiencyRef}
                                                        className="form-control" /><br />

                                                    <label htmlFor="pfOld" className="form-label">Old/New Power Factor - معامل
                                                        القدره القديم/الجديد</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"
                                                                style={{ fontWeight: "bold" }}>Old/New P.F.</span>
                                                        </div>
                                                        <input type="text" placeholder="Old - القديم" id="pfOld" ref={pfOldRef} required
                                                            className="form-control" />
                                                        <input type="text" placeholder="New - الجديد" id="pfNew" ref={pfNewRef}
                                                            className="form-control" required />
                                                    </div><br />

                                                    <label htmlFor="Vrms" className="form-label">VRMS/Frequency - ادخل الجهد
                                                        والتردد</label>
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"
                                                                style={{ fontWeight: "bold" }}>VRMS/Freq</span>
                                                        </div>
                                                        <input type="text" placeholder="VRMS - الجهد" id="Vrms" ref={VRMSRef}
                                                            className="form-control" required />
                                                        <input type="text" placeholder="Freq - التردد" id="freq" ref={frequencyRef}
                                                            className="form-control" required />
                                                    </div><br />

                                                    <div className="div">
                                                        <button id="PFCaclc" onClick={handlePFCaclcClick} className="btn btn-success"
                                                            style={{ width: "100%", fontSize: "large" }}>
                                                            Calculate - احسب</button>
                                                    </div><br />

                                                    <label htmlFor="active" className="form-label">Active Power - القدره
                                                        الفعاله</label>
                                                    <input type="number" readonly id="active" value={resultsPF.active} className="form-control"
                                                        placeholder="Active Power - القدره الفعاله :" /><br />

                                                    <label htmlFor="apparent" className="form-label">Apparent Power - القدره
                                                        الظاهره</label>
                                                    <input type="number" readonly id="apparent" value={resultsPF.apparent} className="form-control"
                                                        placeholder="Apparent Power - القدره الظاهره :" /><br />

                                                    <label htmlFor="reactive" className="form-label">Reactive Power - القدره الغير
                                                        فعاله</label>
                                                    <input type="number" readonly id="reactive" value={resultsPF.reactive} className="form-control"
                                                        placeholder="Reactive Power - القدره الغير فعاله :" /><br />

                                                    <label htmlFor="microFarad" className="form-label">The capacitance of the
                                                        capacitor is in microfarads µF
                                                        - سعة المكثف بوحدة الميكروفاراد</label>
                                                    <input type="number" readonly id="microFarad" value={resultsPF.microFarad} className="form-control"
                                                        placeholder="The capacitance of the capacitor is in microfarads µF - سعة المكثف بوحدة الميكروفاراد μF :" /><br />
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
                {/* <!-- PFC Program Content Ends --> */}
                {/* <!-- ECC Program Starts --> */}
                <div className="cards-lg-containers-card">
                    <img src="https://www.shutterstock.com/image-photo/old-electricity-meter-displaying-consumption-600nw-2202564469.jpg" />
                    <div className="category">
                        <div className="subject">
                            <h3>Software/Electricity</h3>
                        </div>
                        <img
                            src="https://images.credly.com/images/d30e23c4-60cb-4a5d-b826-b0cd4a9cb0bc/profile_img.jpg" />
                    </div>
                    <h2 className="course-title">Electrical-Consumption (Program)</h2>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#ECCView" className="btn btn-success">View</button>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#ECCProg" className="btn btn-success">Program</button>
                </div>
                {/* <!-- ECC Program Content Starts --> */}
                <div className="modal fade" id="ECCView" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Electrical-Consumption</h5>
                                <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h2 style={HeaderStyleH2}>Electricity Consumption</h2><br />
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
                <div className="modal fade" id="ECCProg" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
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
                                            <form action="#" autocomplete="on">
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
                                                        <input readonly type="text" id="CurrentLoadDefinedKW"
                                                            className="form-control"
                                                            placeholder="Kilowatts - كيلووات" value={results.currentLoadKW} /><br />
                                                        <input readonly type="text" id="CurrentLoadDefinedW" value={results.currentLoadW}
                                                            className="form-control" placeholder="Watts - وات" /><br />
                                                    </div><br />

                                                    <label htmlFor="kWHour" className="form-label">Load in kWh - (ساعه) الحمل
                                                        بالكيلووات</label>
                                                    <input readonly type="text" id="kWHour" value={results.kWh} className="form-control"
                                                        placeholder="Load in kWh - (ساعه) الحمل بالكيلووات" /><br />

                                                    <label htmlFor="avgConsumption" className="form-label">Average consumption
                                                        per
                                                        month - (كيلووات
                                                        ساعة/شهر) متوسط
                                                        الاستهلاك شهريا</label>
                                                    <input readonly type="text" id="avgConsumption" value={results.avgConsumption} className="form-control"
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
                {/* <!-- ECC Program Content Ends --> */}
                {/* <!-- HP2A Program Starts --> */}
                <div className="cards-lg-containers-card">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Imperial_Horsepower.svg/1200px-Imperial_Horsepower.svg.png" />
                    <div className="category">
                        <div className="subject">
                            <h3>Software/Electricity</h3>
                        </div>
                        <img
                            src="https://images.credly.com/images/d30e23c4-60cb-4a5d-b826-b0cd4a9cb0bc/profile_img.jpg" />
                    </div>
                    <h2 className="course-title">Horse-Power TO Ampere (Program)</h2>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal"
                        data-bs-target="#HP2A">View</button>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal"
                        data-bs-target="#HP2AProgram">Program</button>
                </div>
                <div className="modal fade" id="HP2A" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Horse-Power TO Ampere</h5>
                                <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h2 style={HeaderStyleH2}>Horse Power To Ampere</h2><br />
                                <p>
                                    Convert hp to amps: (direct current)
                                    In direct current circuits
                                    I(A) = [HP × 746] / [Volts × Efficiency %] <br />

                                    Convert hp to amps:
                                    In alternating current (AC single phase).
                                    I (A) = [ HP × 746 ] / [ V × Efficiency % × P.F. ] <br />

                                    Convert hp to A: in alternating current (AC 3 phase).
                                    I (A) = [ HP × 746 ] / [ 1.73 × VL-L × Efficiency % × P.F. ] <br /><br />

                                    تحويل حصان إلى أمبير: (التيار مستمر)
                                    في دوائر التيار المستمر
                                    <br /> I(A) = [الحصان × 746] / [الفولت × الكفاءة٪] <br />

                                    تحويل حصان إلى أمبير
                                    في التيار المتردد (واحد فاز)
                                    <br /> I (A) = [ HP × 746 ] / [ V × الكفاءة % × P.F. ] <br />

                                    تحويل حصان إلى أمبير في التيار المتردد
                                    (ثلاثه فاز تيار متردد)
                                    <br /> I (A) = [ HP × 746 ] / [ 1.73 × VL-L × الكفاءة % × P.F. ] <br />
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
                <div className="modal fade" id="HP2AProgram" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Horse-Power TO Ampere</h5>
                                <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <div className="row d-flex justify-content-center align-items-center">
                                        <div className="col-10 p-2 mt-2">
                                            <form action="#" autocomplete="on">
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
                                                        <button type="button" className="btn btn-success" id="HP2ABtn" onClick={handleHP2AClick}
                                                            style={{ fontSize: "large", width: "100%" }}>Calculate - احسب</button>
                                                    </div><br />

                                                    <label htmlFor="CurrentAmpere" className="form-label">Ampere (A) -
                                                        الأمبير</label>
                                                    <input type="text" readonly id="CurrentAmpere" className="form-control"
                                                        placeholder="The Ampere - الأمبير" value={currentAmpere} /><br />
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
                {/* <!-- HP2A Program Content Ends --> */}
                {/* <!-- VA2W Program Starts --> */}
                <div className="cards-lg-containers-card">
                    <img src="https://musicproductionglossary.com/wp-content/uploads/2023/10/volt-amperes.jpg" />
                    <div className="category">
                        <div className="subject">
                            <h3>Software/Electricity</h3>
                        </div>
                        <img src="https://images.credly.com/images/d30e23c4-60cb-4a5d-b826-b0cd4a9cb0bc/profile_img.jpg" />
                    </div>
                    <h2 className="course-title">Volt-Ampere TO Watt (Program)</h2>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#VA2W">View</button>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#VA2WProgram">Program</button>
                </div>
                <div className="modal fade" id="VA2W" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
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
                                <h2 style={HeaderStyleH2}>Volt Ampere TO Watts</h2><br />
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

                                    <br /> لتحويل فولت أمبير إلى واط والعكس
                                    <br /><br /> نحتاج إلى معادلة بسيطة لإيجاد قوة الجهاز في أي وحدة

                                    <br /> تمثل الفولت أمبير القدرة الظاهرية للحمل الكهربائي
                                    وقد لا تحتاج إليها لبعض الأجهزة الكهربائية التي لا
                                    <br /> تحتوي أحمالها على ملفات،
                                    <br /> مثل المحركات الكهربائية على سبيل المثال

                                    <br /> السبب الرئيسي لاستخدام وحده الفولت أمبير هو أن الأجهزة قد تحتوي على ملفات نحاسية
                                    مما قد يتسبب في انحراف
                                    <br /><br /> موجة الجهد عن موجة التيار وظهور بعض اختلافات الطور
                                </p><br />
                                <div className="alert alert-warning">
                                    <p style={{ fontWeight: "bold", fontSize: "18px", color: "#000" }}>We use the unit volt-ampere
                                        (VA) some AC
                                        devices and not DC.</p>
                                    <p style={{ fontWeight: "bold", fontSize: "18px", color: "#000" }}>
                                        نحن نستخدم وحدة فولت أمبير لبعض أجهزة التيار المتردد وليس للتيار المستمر
                                    </p>
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
                <div className="modal fade" id="VA2WProgram" tabindex="-1" role="dialog"
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
                                            <form action="#" autocomplete="on">
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
                                                        <button id="VOLTAMPERETOWATTS" onClick={handleVOLTAMPERETOWATTSClick} className="btn btn-success"
                                                            style={{ fontSize: "large", width: "100%" }}>Calculate - احسب</button>
                                                    </div><br />

                                                    <label htmlFor="WATTAFTERVA" className="form-label">Load In Watts
                                                        (W)</label>
                                                    <input readonly type="text" id="WATTAFTERVA" value={wattsAfterVA} className="form-control"
                                                        placeholder="(W - وات) الحمل بالوات" /><br />
                                                    <label htmlFor="KILOWATTAFTERVA" className="form-label">Load In Kilowatts
                                                        (kW)</label>
                                                    <input readonly type="text" id="KILOWATTAFTERVA"
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
                {/* <!-- VA2W Program Content Ends --> */}
                {/* <!-- W2A Program --> */}
                <div className="cards-lg-containers-card">
                    <img src="https://blog.ecoflow.com/us/wp-content/uploads/2023/08/image5.png" />
                    <div className="category">
                        <div className="subject">
                            <h3>Software/Electricity</h3>
                        </div>
                        <img src="https://images.credly.com/images/d30e23c4-60cb-4a5d-b826-b0cd4a9cb0bc/profile_img.jpg" />
                    </div>
                    <h2 className="course-title">Watt TO Ampere (Program)</h2>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#W2A">View</button>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#W2AProgram">Program</button>
                </div>
                <div className="modal fade" id="W2A" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle"
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
                                <h2 style={HeaderStyleH2}>Watt To Amperes</h2><br />
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
                                <h2 style={HeaderStyleH2Arabic}>الواط الي أمبير</h2>
                                <p style={{ textAlign: 'right' }}>
                                    الواط هو وحدة القدرة والأمبير هو وحدة التيار الكهربائي
                                    <br /> يمكن تحويل الواط إلى أمبير والعكس مباشرة
                                    <br /><br /> من خلال معرفة قيمة الجهد ومعامل القدرة

                                    <br /> تحويل الواط إلى أمبير في دوائر التيار المستمر
                                    <br /> يمكن تحويل الواط إلى أمبير في دوائر التيار المستمر
                                    <br /><br /> التيار = الطاقة ÷ الجهد

                                    <br /> تحويل واط إلى أمبير في التيار المتردد أحادي الطور
                                    <br /><br /> الأمبير = القدرة بالواط ÷ (الجهد × عامل القدرة)

                                    <br /> تحويل الواط إلى أمبير في التيار المتردد (ثلاثي الطور) مع مرحلة جهد الخط
                                    <br /> التيار = الطاقة ، مقسومة
                                    <br /> على جذر 3 × PF × الجهد بالفولت (V):
                                    <br /><br /> الأمبير = الواط ÷ (3√ × معامل القدره × جهد الخط)
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
                <div className="modal fade" id="W2AProgram" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
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
                                            <form action="#" autocomplete="on">
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
                                                        <button type="button" className="btn btn-success"
                                                            id="WattToAmpereCalcOutput" onClick={handleWattToAmpereCalcOutputClick}
                                                            style={{ fontSize: "large", width: "100%" }}>Calculate - احسب</button>
                                                    </div><br />

                                                    <label htmlFor="AmpereAfterWattConversion" className="form-label">Ampere (A)
                                                        -
                                                        الأمبير</label>
                                                    <input type="number" readonly id="AmpereAfterWattConversion" value={ampereResult}
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
                {/* <!-- W2A Program Ends --> */}
                {/* <!-- Ampere TO Watt/Killowatts Program Starts --> */}
                <div className="cards-lg-containers-card">
                    <img src="https://www.inchcalculator.com/wp-content/uploads/2020/02/amps-to-watts.png" />
                    <div className="category">
                        <div className="subject">
                            <h3>Software/Electricity</h3>
                        </div>
                        <img src="https://images.credly.com/images/d30e23c4-60cb-4a5d-b826-b0cd4a9cb0bc/profile_img.jpg" />
                    </div>
                    <h2 className="course-title">Ampere TO Watt (Program)</h2>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#A2W">View</button>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#A2WProgram">Program</button>
                </div>
                <div className="modal fade" id="A2W" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Ampere TO Watt</h5>
                                <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h2 style={HeaderStyleH2}>Brief Notes</h2>
                                <p>
                                    Amperes and watts are different units of measurement used to describe electricity. <br />
                                    You can convert watts to amperes or amperes to watts using electrical power formulas, <br />
                                    which involve voltage and power factor. <br />
                                    In this article, you will find a calculator that you can use directly to convert between watts and amperes or vice versa, <br />
                                    and you will also find an explanation of the conversion process using electrical formulas. <br /><br /><hr />
                                </p>
                                <h2 style={HeaderStyleH2Arabic}>مقتطفات هامة</h2>
                                <p style={{ textAlign: 'right' }}>
                                    الأمبير والواط هي وحدات مختلفة للقياس تستخدم لوصف الكهرباء
                                    <br /> يمكن تحويل الواط إلى أمبير أو تحويل الأمبير إلى واط باستخدام قوانين القدرة الكهربائية مع استخدام الجهد ومعامل القدرة
                                    <br />  في هذا المقال ستجد حاسبة يمكنك استخدامها مباشرةً للتحويل من واط إلى أمبير أو العكس
                                    <br />  وأيضًا تم شرح طريقة التحويل باستخدام القوانين الكهربائية
                                    <br /><hr />
                                </p>
                                <h2 style={HeaderStyleH2}>What is an Ampere?</h2>
                                <p>
                                    The ampere (English: Ampere) is a unit of electric current,
                                    representing the amount of charge passing through a conductor. <br />
                                </p>
                                <h2 style={HeaderStyleH2}>What is a Watt?</h2>
                                <p>
                                    The watt (English: Watt) is a unit of electrical power. <br />
                                </p>
                                <h2 style={HeaderStyleH2}>Converting Amperes to Watts in Direct Current</h2>
                                <p>
                                    In the case of direct current (DC), the conversion is straightforward as follows: <br />
                                    Watts = Volts * Amperes  <br />
                                </p>
                                <h2 style={HeaderStyleH2}>Converting Amperes to Watts in Alternating Current</h2>
                                <p>
                                    In the case of alternating current (AC),
                                    the process is more complex due to the power factor and the need to account for phase values or line values.  <br />
                                </p>
                                <h2 style={HeaderStyleH2}>Single-Phase AC</h2>
                                <p>
                                    The power in watts (W) is calculated as the product of the current in amperes (A), the power factor (PF), and the voltage (V): <br />

                                    Watts = Amperes * (Volts * Power Factor) <br />
                                    W = A * (V * PF)  <br />
                                </p>
                                <h2 style={HeaderStyleH2}>Three-Phase AC</h2>
                                <p>
                                    The power in watts (W) is calculated as the product of the current in amperes (A), the power factor (PF),
                                    and the line-to-line voltage (V\(_L - L\)), <br />
                                    multiplied by the square root of 3 (1.732): <br />

                                    Watts = Amperes * 1.732 Power Factor * (Line - to - Line Voltage) <br />
                                    W = A * 1.732 * PF * V_(L - L) <br /><br /><hr />
                                </p>
                                <h2 style={HeaderStyleH2Arabic}> ما هو الواط؟ - ما هو الأمبير؟ </h2>
                                <p style={{ textAlign: 'right' }}>
                                    <br /> الأمبير هو وحدة قياس التيار الكهربائي، ويعبر عن كمية الشحنات التي تمر عبر موصل
                                    <br /> الواط هو وحدة قياس القدرة الكهربائية
                                    <br />
                                </p>
                                <h2 style={HeaderStyleH2Arabic}> تحويل الأمبير إلى واط في التيار المستمر </h2>
                                <p style={{ textAlign: 'right' }}>
                                    في حالة التيار المستمر، تكون عملية التحويل بسيطة كما يلي

                                    <br /> الواط = الفولت × الأمبير
                                    <br />
                                    الواط = الفولت × الأمبير
                                </p>
                                <h2 style={HeaderStyleH2Arabic}>تحويل الأمبير إلى واط في التيار المتردد</h2>
                                <p style={{ textAlign: 'right' }}>
                                    <br /> في حالة التيار المتردد، تكون عملية التحويل أكثر تعقيدًا بسبب وجود معامل القدرة والحاجة إلى التعامل مع القيم الطورية أو القيم بين الخطوط
                                    <br /><br />
                                    <br /> تيار متردد طور واحد

                                    <br /> القوة بالواط تساوي التيار بالأمبير مضروبًا في معامل القدرة مضروبًا في الجهد

                                    الواط = الأمبير × الفولت × معامل القدرة
                                    <br /><br />
                                    تيار متردد ثلاثي الطور

                                    <br /> القوة بالواط تساوي التيار بالأمبير مضروبًا في ١.٧٣٢ (جذر الثلاثة) مضروبًا في معامل القدرة مضروبًا في جهد الخط إلى الخط

                                    <br /> الواط = الأمبير × ١.٧٣٢ × معامل القدرة × جهد الخط إلى الخط
                                    <br /><hr />
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
                <div className="modal fade" id="A2WProgram" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Ampere TO Watt</h5>
                                <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <div className="row d-flex justify-content-center align-items-center">
                                        <div className="col-10 p-2 mt-2">
                                            <form action="#" autocomplete="on">
                                                <span>
                                                    <label htmlFor="AmpereToWattInp" className="form-label">Type Of Current -
                                                        نوع
                                                        التيار</label>
                                                    <div className="input-group mb-3">
                                                        <input type="text" placeholder="القدره بالأمبير" id="AmpereToWattInp" ref={AmpereToWattInpRef}
                                                            required className="form-control" />
                                                        <select style={{ fontWeight: "bold" }} className="form-control"
                                                            name="AmpereToWattPowerSelection"
                                                            id="AmpereToWattPowerSelection" ref={powerSelectTypesForA2WRef}>
                                                            <option value="DCAmpereToWatt">DC (Direct Current) - تيار مستمر
                                                            </option>
                                                            <option value="AC1AmpereToWatt">AC (Single Phase) - تيار متردد
                                                                (واحد فاز)</option>
                                                            <option value="AC3AmpereToWatt">AC (3 Phase) - تيار متردد (ثلاثه
                                                                فاز)</option>
                                                        </select>
                                                    </div>
                                                    <input type="text" placeholder="The Volt - الجهد بالفولت"
                                                        id="VoltNeededInputForA2W" ref={voltNeededInputA2WRef} className="form-control" required /><br />

                                                    <input type="text"
                                                        placeholder="P.F. (AC ONLY) - (التيار المتردد فقط) معامل القدره"
                                                        id="pfNeededInputForA2W" ref={pfNeededInputA2WRef} className="form-control" /><br />

                                                    <div className="div">
                                                        <button type="button" className="btn btn-success"
                                                            id="AmpereToWattCalcOutput" onClick={handleAmpereToWattCalcOutputClick}
                                                            style={{ fontSize: "large", width: "100%" }}>Calculate - احسب</button>
                                                    </div><br />

                                                    <label htmlFor="WattAfterAmpereConversion" className="form-label">Watt (W)
                                                        -
                                                        وات</label>
                                                    <input type="number" readonly id="WattAfterAmpereConversion" value={wattResult}
                                                        className="form-control" placeholder="Watts - وات" /><br />

                                                    <label htmlFor="kWattAfterAmpereConversion" className="form-label">Kilowatts (kW)
                                                        -
                                                        وات</label>
                                                    <input type="number" readonly id="kWattAfterAmpereConversion" value={kwattResult}
                                                        className="form-control" placeholder="Kilowatts - كيلووات" /><br />
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
                {/* <!-- Ampere TO Watt/Killowatts Ends --> */}
                {/* <!-- Coulomb's Law Program Starts --> */}
                <div className="cards-lg-containers-card">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Charles_de_Coulomb.png/800px-Charles_de_Coulomb.png" />
                    <div className="category">
                        <div className="subject">
                            <h3>Software/Physics</h3>
                        </div>
                        <img src="https://images.credly.com/images/d30e23c4-60cb-4a5d-b826-b0cd4a9cb0bc/profile_img.jpg" />
                    </div>
                    <h2 className="course-title">Coulomb's Law</h2>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#Coulomb">View</button>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#coulomb-program">Program</button>
                </div>
                <div className="modal fade" id="Coulomb" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Coulomb's Law</h5>
                                <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h2 style={HeaderStyleH2}>Coulomb's Law</h2>
                                <p>
                                    Coulomb's Law, a fundamental principle in electrostatics, describes the force between two point charges. <br />
                                    Formally, it can be stated as follows: <br />

                                    Coulomb's Law: The magnitude of the electrostatic force (F) between two point charges (q_1) and (q_2) is directly proportional to the product of the magnitudes of the charges
                                    and inversely proportional to the square of the distance (r) between them.
                                    This force acts along the line joining the two charges.
                                    Mathematically, Coulomb's Law is expressed as:
                                    F = k_e frac(| q_1 q_2|)(r ^ 2)

                                    where:

                                    - (F) is the magnitude of the electrostatic force between the charges, <br />
                                    - (q_1) and (q_2) are the magnitudes of the charges, <br />
                                    - (r) is the distance between the centers of the two charges, <br />
                                    - (k_e) is Coulomb's constant, which is approximately equal to (8.9875 * 10^9, (N) \cdot (m)^2 / (C)^2). <br /><br />

                                    The direction of the force is along the line connecting the two charges. If the charges are of like sign (both positive or both negative), <br />
                                    the force is repulsive; if the charges are of opposite sign, the force is attractive. <br />
                                </p>
                                <h2 style={HeaderStyleH2Arabic}>قانون كولوم</h2>
                                <p style={{ textAlign: "right" }}>
                                    قانون كولوم
                                    <br /> قانون كولوم، الذي يعد مبدأً أساسيًا في الكهرباء الساكنة، يصف القوة بين نقطتين مشحونتين
                                    <br /> بشكل رسمي، يمكن التعبير عنه على النحو التالي
                                    <br /> قانون كولوم: قيمة قوة الكهروستاتيكية (F) بين نقطتين مشحونتين (q₁) و (q₂) تتناسب مباشرة مع حاصل ضرب قيم المشاحنات وتتناسب عكسيًا مع مربع المسافة (r) بينهما. تعمل هذه القوة على طول الخط الواصل بين النقطتين
                                    <br /> رياضيًا، يُعبر عن قانون كولوم كالتالي
                                    <br /> F = (k_e * |q₁ * q₂|) / (r ^ 2)
                                    <br />
                                    <br /> حيث
                                    <br /> - (F) هي قيمة القوة الكهروستاتيكية بين المشاحنات،
                                    <br /> - (q₁) و (q₂) هي قيم المشاحنات،
                                    <br /> - (r) هو المسافة بين مراكز المشاحنات الاثنين،
                                    <br /> - (kₑ) هو الثابت الكولومي
                                    <br /> اتجاه القوة هو على طول الخط الواصل بين المشاحنات الاثنين
                                    <br /> إذا كانت المشاحنات من نفس النوع (إيجابية أو سالبة)
                                    <br /> فإن القوة تكون منتعشة؛ إذا كانت المشاحنات من نوع مختلف، فإن القوة تكون جاذبة
                                    <br /><hr />
                                </p>
                                <p style={{ textAlign: "right" }}>

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
                <div className="modal fade" id="coulomb-program" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Coulomb's Law</h5>
                                <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="charge1">Charge 1 (q1 in Coulombs)</label>
                                        <input type="number" id="charge1" ref={charge1Ref} className="form-control" required />
                                    </div>
                                    {!areChargesEqual && (
                                        <div className="form-group">
                                            <label htmlFor="charge2">Charge 2 (q2 in Coulombs)</label>
                                            <input type="number" id="charge2" ref={charge2Ref} className="form-control" required />
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <label htmlFor="distance">Distance (r in meters)</label>
                                        <input type="number" id="distance" ref={distanceRef} className="form-control" required />
                                    </div>
                                    <div className="form-group form-check mt-2">
                                        <input type="checkbox" id="equalCharges" className="form-check-input" checked={areChargesEqual} onChange={() => setAreChargesEqual(!areChargesEqual)} />
                                        <label htmlFor="equalCharges" className="form-check-label">Are Charges Equal?</label>
                                    </div>
                                    <button type="button" className="btn btn-success mb-2 mt-2 w-100 d-block" onClick={handleCalculateClick}>Calculate</button>
                                    <div className="form-group">
                                        <label htmlFor="force">Force (N)</label>
                                        <input type="number" id="force" value={forceResult} readOnly className="form-control" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Coulomb's Law Program Ends --> */}
                {/* <!-- Ohm's Law Program Starts --> */}
                <div className="cards-lg-containers-card">
                    <img src="https://www.thoughtco.com/thmb/yanPjyDodf3W1LHWrL1gzfma1qk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/713px-Gerog_Ohm-58e5d5dc5f9b58ef7e244457.jpg" />
                    <div className="category">
                        <div className="subject">
                            <h3>Software/Physics</h3>
                        </div>
                        <img src="https://images.credly.com/images/d30e23c4-60cb-4a5d-b826-b0cd4a9cb0bc/profile_img.jpg" />
                    </div>
                    <h2 className="course-title">Ohm's Law</h2>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#Ohm">View</button>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#ohm-program">Program</button>
                </div>
                <div className="modal fade" id="Ohm" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Ohm's Law</h5>
                                <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h2 style={HeaderStyleH2}>What is Ohm's Law?</h2>
                                Ohm’s Law states that the current flowing through a resistor is directly proportional to the voltage applied across the resistor and inversely proportional to the value of the resistance,
                                provided that the temperature remains constant. <br />
                                Ohm’s Law describes the relationship between the current through a resistor, the voltage applied to it, and the resistance value. <br />

                                Thanks to Ohm's Law, you can calculate any one of these three quantities if the other two are known. <br />
                                For example, if you know the voltage and current, you can determine the resistance. <br />
                                Ohm observed in his experiments that as the voltage across the resistor increases, <br />
                                the current through the resistor increases proportionally. <br />
                                Conversely, if the voltage decreases, the current decreases as well. <br /><br />

                                <h2 style={HeaderStyleH2}>Ohm’s Law Equation</h2>
                                Ohm’s primary discovery was that the electric current in a circuit is directly proportional to the circuit’s voltage. <br />
                                He expressed this discovery with a simple equation that describes the relationship between voltage, current, and resistance as follows: <br />
                                Voltage = Current × Resistance (E = IR) <br />
                                Here, Voltage (E) equals Current (I) multiplied by Resistance (R). <br /><br />
                                Using algebraic manipulations, this equation can be rearranged into two other forms to find the values of current and resistance: <br />
                                Resistance = Voltage / Current (R = E / I) <br />
                                Current = Voltage / Resistance (I = E / R) <br />
                                To understand Ohm's Law thoroughly, one must review the relationship between voltage, current, and resistance. <br /><br /><hr />

                                <h2 style={HeaderStyleH2Arabic}>ما هو قانون أوم؟</h2>
                                <p style={{ textAlign: 'right' }}>
                                    ينص قانون أوم على أن التيار الكهربائي المار في مقاومة يتناسب طرديًا مع الجهد المطبق على المقاومة، ويتناسب عكسيًا مع قيمة المقاومة، وذلك عند درجة حرارة ثابتة. يوضح قانون أوم العلاقة بين التيار الذي يمر عبر مقاومة ما، والجهد المطبق عليها، وقيمة تلك المقاومة
                                    <br />
                                    <br /> بفضل قانون أوم، يمكنك حساب قيمة أي من الكميات الثلاث إذا كانت القيمتان الأخريان متاحتين. على سبيل المثال، إذا كنت تعرف قيمة الجهد والتيار، يمكنك حساب قيمة المقاومة. وقد لاحظ أوم في تجاربه أن زيادة فرق الجهد بين طرفي المقاومة تؤدي إلى زيادة التيار المار في المقاومة بنفس النسبة. وبالمثل، إذا نقص الجهد، ينقص التيار أيضًا
                                    <br /><br />
                                </p>
                                <h2 style={HeaderStyleH2Arabic}>معادلة قانون أوم</h2>
                                <p style={{ textAlign: 'right' }}>
                                    الاكتشاف الرئيسي لأوم كان أن كمية التيار الكهربائي المار في الدائرة تتناسب طرديًا مع جهد الدائرة. وقد عبّر أوم عن هذا الاكتشاف بمعادلة بسيطة تصف العلاقة بين الجهد والتيار والمقاومة على النحو التالي
                                    <br /> الجهد = التيار × المقاومة
                                    <br />
                                    <br /> وباستخدام العمليات الجبرية، يمكننا إعادة صياغة هذه المعادلة في شكلين آخرين لإيجاد قيم التيار والمقاومة كالتالي
                                    <br />
                                    <br /> المقاومة = الجهد / التيار
                                    <br /> التيار = الجهد / المقاومة
                                    <br /> لفهم قانون أوم بشكل جيد، من الضروري مراجعة العلاقة بين الجهد والتيار والمقاومة
                                    <br /><br /><hr />
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
                <div className="modal fade" id="ohm-program" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Ohm's Law</h5>
                                <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
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
                                    <button type="button" className="btn btn-success mb-2 mt-2 w-100 d-block" onClick={handleVoltaCalculateClick}>
                                        Calculate
                                    </button>
                                    <div className="form-group">
                                        <label htmlFor="voltaResult">Result</label>
                                        <input type="number" id="voltaResult" value={voltaResult} readOnly className="form-control" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Ohm's Law Ends --> */}
                {/* <!-- Kirchhoff's Law Program Starts --> */}
                <div className="cards-lg-containers-card">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Gustav_Robert_Kirchhoff.jpg" />
                    <div className="category">
                        <div className="subject">
                            <h3>Software/Physics</h3>
                        </div>
                        <img src="https://images.credly.com/images/d30e23c4-60cb-4a5d-b826-b0cd4a9cb0bc/profile_img.jpg" />
                    </div>
                    <h2 className="course-title">Kirchhoff's Law</h2>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#Kirchhoff">View</button>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#kirchhoff-program">Program</button>
                </div>
                <div className="modal fade" id="Kirchhoff" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Kirchhoff's Law</h5>
                                <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h2 style={HeaderStyleH2}>Kirchhoff's Laws</h2>
                                <p>
                                    Kirchhoff's laws, formulated by Gustav Kirchhoff for the first time in 1845, consist of two fundamental principles in electrical circuits: one concerning current and the other concerning voltage. <br />
                                    These laws are essential in the study of electrical circuits and are applicable not only to direct current (DC) circuits but also to alternating current (AC) circuits and digital circuits. <br />
                                    These laws are widely applicable and extremely useful for solving circuit problems that might otherwise be challenging. They are fundamental principles that will remain relevant and will not be replaced or obsolete. <br /><br />
                                </p>
                                <h2 style={HeaderStyleH2}>Kirchhoff's First Law of Current</h2>
                                <p>
                                    Kirchhoff's First Law of Current, also known as Kirchhoff’s Current Law (KCL), states that the algebraic sum of currents entering a node (junction point) in a circuit is equal to the algebraic sum of currents leaving the node.
                                    This can be expressed mathematically as: <br />
                                    ∑Ii = ∑Io <br />
                                    where ∑ denotes the algebraic sum, Ii represents the currents entering the node, and Io represents the currents leaving the node. <br /><br />
                                </p>
                                <h2 style={HeaderStyleH2}>Kirchhoff's Second Law of Voltage</h2>
                                <p>
                                    Kirchhoff's Second Law of Voltage, or Kirchhoff’s Voltage Law (KVL), asserts that the algebraic sum of all voltages around any closed loop in a circuit is equal to zero. <br />
                                    Another way to state this law is that the sum of the voltage drops around a closed loop is equal to the sum of the voltage sources within the loop. <br />
                                    Applying this law involves selecting a closed loop path in the circuit, starting at a particular point, traversing the path, and returning to the original point. <br />
                                    The law can be stated mathematically as:
                                    ∑V = 0 <br />
                                    where ∑V denotes the sum of all voltages around the closed loop. <br />
                                    These laws provide crucial frameworks for analyzing and solving complex electrical circuits. <br /><br /><hr />
                                </p>

                                <h2 style={HeaderStyleH2Arabic}>قوانين كيرشوف</h2>
                                <p style={{ textAlign: 'right' }}>
                                    تتألف قوانين كيرشوف من معادلتين أساسيّتين في الدوائر الكهربائية، وقد نشرها غوستاف كيرشوف لأول مرة في عام ١٨٤٥، إحداهما تتعلق بالتيار والأخرى تتعلق بالجهد. تُعَدّ هذه القوانين من المبادئ الأساسية في دراسة الدوائر الكهربائية ولها تطبيقات واسعة في دوائر التيار المستمر والتيار المتردد والدوائر الرقمية

                                    <br /> تُعَدّ هذه القوانين ذات تطبيقات واسعة وفوائد كبيرة في حل المشكلات الكهربائية التي قد تكون معقدة أحيانًا. وهذه القوانين تُعَدّ من المبادئ الأساسية التي ستظل ذات صلة ولن يتم استبدالها أو الاستغناء عنها
                                    <br /><br />
                                </p>
                                <h2 style={HeaderStyleH2Arabic}>قانون كيرشوف الأول للتيار</h2>
                                <p style={{ textAlign: 'right' }}>
                                    ينص قانون كيرشوف الأول للتيار، والذي يُعرف أيضًا بقانون كيرشوف للتيار، على أن المجموع الجبري للتيارات الداخلة إلى عقدة (نقطة التقاء) في الدائرة الكهربائية يساوي المجموع الجبري للتيارات الخارجة من نفس العقدة. يمكن التعبير عن هذا القانون رياضيًّا كما يلي:

                                    ∑تيارات داخلة = ∑تيارات خارجة

                                    <br />حيث إنّ ∑ تدل على المجموع الجبري، و"تيارات داخلة" تشير إلى التيارات الداخلة إلى العقدة، و"تيارات خارجة" تشير إلى التيارات الخارجة من العقدة.
                                    <br /><br />
                                </p>
                                <h2 style={HeaderStyleH2Arabic}>قانون كيرشوف الثاني للجهد</h2>
                                <p style={{ textAlign: 'right' }}>
                                    ينص قانون كيرشوف الثاني للجهد، والذي يُعرف أيضًا بقانون كيرشوف للجهد، على أن المجموع الجبري لجميع الجهود في مسار مغلق يساوي صفر. يمكن صياغة هذا القانون بطريقة أخرى على النحو التالي: إنّ مجموع الجهود المفقودة في المسار المغلق يساوي جهد المصدر في نفس المسار
                                    <br />
                                    يتطلب تطبيق هذا القانون تحديد مسار مغلق للقيام بالتحليل عليه، مما يتيح لك البدء من نقطة معينة في الدائرة، والتحرك على طول المسار المغلق، والعودة إلى نقطة البداية الأصلية. يمكن التعبير عن هذا القانون رياضيًّا كما يلي:
                                    <br />
                                    ∑جهود = 0
                                    <br />
                                    حيث إنّ ∑ تعني المجموع الجبري لجميع الجهود في المسار المغلق.
                                    <br />
                                    تُعَدّ هذه القوانين إطارًا أساسيًّا لتحليل وحل الدوائر الكهربائية المعقدة.
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
                <div className="modal fade" id="kirchhoff-program" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Kirchhoff's Law</h5>
                                <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="lawType">Select Law</label>
                                        <select id="lawType" value={lawType} onChange={(e) => setLawType(e.target.value)} className="form-control">
                                            <option value="KCL">Kirchhoff's Current Law (KCL)</option>
                                            <option value="KVL">Kirchhoff's Voltage Law (KVL)</option>
                                        </select>
                                    </div>

                                    {lawType === 'KCL' && (
                                        <>
                                            <div className="form-group">
                                                <label htmlFor="current1">Enter Current 1 (in Amperes)</label>
                                                <input type="number" id="current1" ref={el => currentRefs.current[0] = el} className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="current2">Enter Current 2 (in Amperes)</label>
                                                <input type="number" id="current2" ref={el => currentRefs.current[1] = el} className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="current3">Enter Current 3 (in Amperes)</label>
                                                <input type="number" id="current3" ref={el => currentRefs.current[2] = el} className="form-control" />
                                            </div>
                                        </>
                                    )}

                                    {lawType === 'KVL' && (
                                        <>
                                            <div className="form-group">
                                                <label htmlFor="voltage1">Enter Voltage 1 (in Volts)</label>
                                                <input type="number" id="voltage1" ref={el => voltageRefs.current[0] = el} className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="voltage2">Enter Voltage 2 (in Volts)</label>
                                                <input type="number" id="voltage2" ref={el => voltageRefs.current[1] = el} className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="voltage3">Enter Voltage 3 (in Volts)</label>
                                                <input type="number" id="voltage3" ref={el => voltageRefs.current[2] = el} className="form-control" />
                                            </div>
                                        </>
                                    )}

                                    <button type="button" className="btn btn-success mb-2 mt-3 w-100 d-block" onClick={handleKirchhoffCalculateClick}>
                                        Calculate
                                    </button>

                                    <div className="form-group">
                                        <label htmlFor="kResult">Result</label>
                                        <input type="text" id="kResult" value={kResult} readOnly className="form-control" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Kirchhoff's Law Ends --> */}
                {/* <!-- Alessandro Volta's Law Program Starts --> */}
                <div className="cards-lg-containers-card">
                    <img src="https://media.sciencephoto.com/c0/07/49/64/c0074964-800px-wm.jpg" />
                    <div className="category">
                        <div className="subject">
                            <h3>Software/Physics</h3>
                        </div>
                        <img src="https://images.credly.com/images/d30e23c4-60cb-4a5d-b826-b0cd4a9cb0bc/profile_img.jpg" />
                    </div>
                    <h2 className="course-title">Alessandro Volta's Law</h2>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#Volta">View</button>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#volta-program">Program</button>
                </div>
                <div className="modal fade" id="Volta" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Alessandro Volta's Law</h5>
                                <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h2 style={HeaderStyleH2}>Alessandro Volta's Law</h2>
                                <p>
                                    Volta's Law: Volta's Law, also known as the Law of Volta, pertains to the electric potential difference (voltage) between two points. <br />
                                    Formally, it can be stated as follows: <br />
                                    Volta's Law: The electric potential difference between two points in a static electric field is proportional to the work done in moving a charge between those two points. <br />
                                    Mathematically, Volta's Law is expressed as: <br />
                                    V = \frac(W)(Q) <br /><br />
                                    where: <br />
                                    - (V) is the electric potential difference (voltage) between the two points, <br />
                                    - (W) is the work done to move the charge, <br />
                                    - (Q) is the amount of electric charge. <br />
                                    In essence, Volta's Law indicates that the electric potential difference (voltage) is the work done per unit charge to move the charge between two points in an electric field. <br /><hr />
                                </p>
                                <h2 style={HeaderStyleH2Arabic}>قانون أليساندرو فولتا</h2>
                                <p style={{ textAlign: "right" }}>
                                    قانون أليساندرو فولتا
                                    <br /> قانون فولتا: يشير قانون فولتا، المعروف أيضًا باسم قانون فولتا، إلى فرق الجهد الكهربائي (الفولتية) بين نقطتين.
                                    <br /> بشكل رسمي، يمكن التعبير عنه على النحو التالي:
                                    <br /> قانون فولتا: فرق الجهد الكهربائي بين نقطتين في حقل كهربائي ثابت يتناسب طرديًا مع الشغل المبذول لنقل شحنة بين هاتين النقطتين.
                                    <br /> رياضيًا، يُعبر عن قانون فولتا كالتالي:
                                    <br /> V = (W)/(Q)
                                    <br />
                                    <br />  حيث
                                    <br /> - (V) هو فرق الجهد الكهربائي (الفولتية)
                                    <br />  بين النقطتين
                                    <br /> - (W) هو الشغل المبذول لنقل الشحنة
                                    <br /> - (Q) هو كمية الشحنة الكهربائية
                                    <br /> بعبارة أخرى، يشير قانون فولتا إلى أن فرق الجهد الكهربائي
                                    <br /> (الفولتية) هو الشغل المبذول لكل وحدة شحنة لنقل الشحنة بين نقطتين في حقل كهربائي
                                    <hr />
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
                <div className="modal fade" id="volta-program" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Alessandro Volta's Law</h5>
                                <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="newcalcType">Calculate</label>
                                        <select id="newcalcType" value={newCalcType} onChange={(e) => setNewCalcType(e.target.value)} className="form-control">
                                            <option value="Voltage">Voltage (V = W / Q)</option>
                                            <option value="Work">Work Done (W = V * Q)</option>
                                            <option value="Charge">Electric Charge (Q = W / V)</option>
                                        </select>
                                    </div>

                                    {newCalcType === 'Voltage' && (
                                        <>
                                            <div className="form-group">
                                                <label htmlFor="work">Work Done (W in joules)</label>
                                                <input
                                                    type="number"
                                                    id="work"
                                                    ref={workRef}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="charge">Electric Charge (Q in coulombs)</label>
                                                <input
                                                    type="number"
                                                    id="charge"
                                                    ref={chargeRef}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </>
                                    )}
                                    {newCalcType === 'Work' && (
                                        <>
                                            <div className="form-group">
                                                <label htmlFor="voltage">Voltage (V in volts)</label>
                                                <input
                                                    type="number"
                                                    id="voltage"
                                                    ref={newVoltageRef}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="charge">Electric Charge (Q in coulombs)</label>
                                                <input
                                                    type="number"
                                                    id="charge"
                                                    ref={chargeRef}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </>
                                    )}
                                    {newCalcType === 'Charge' && (
                                        <>
                                            <div className="form-group">
                                                <label htmlFor="voltage">Voltage (V in volts)</label>
                                                <input
                                                    type="number"
                                                    id="voltage"
                                                    ref={newVoltageRef}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="work">Work Done (W in joules)</label>
                                                <input
                                                    type="number"
                                                    id="work"
                                                    ref={workRef}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </>
                                    )}

                                    <button type="button" className="btn btn-success mb-2 mt-3 w-100 d-block" onClick={handleVoltlaAllCalculateClick}>
                                        Calculate
                                    </button>
                                    <div className="form-group">
                                        <label htmlFor="newresult">Result :</label>
                                        <input type="text" id="newresult" value={newResult} readOnly className="form-control" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Alessandro Volta's Law Program Ends --> */}
                {/* <!-- Andre-Marie Ampere's Law Program Starts --> */}
                <div className="cards-lg-containers-card">
                    <img src="https://media.sciencephoto.com/h4/01/01/99/h4010199-800px-wm.jpg" />
                    <div className="category">
                        <div className="subject">
                            <h3>Software/Physics</h3>
                        </div>
                        <img src="https://images.credly.com/images/d30e23c4-60cb-4a5d-b826-b0cd4a9cb0bc/profile_img.jpg" />
                    </div>
                    <h2 className="course-title">Andre-Marie Ampere's Law</h2>
                    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#AMA">View</button>
                </div>
                <div className="modal fade" id="AMA" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Andre-Marie Ampere's Law</h5>
                                <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h2 style={HeaderStyleH2}>Andre-Marie Ampere's Law</h2>
                                <p>
                                    The law that defines the unit of the ampere is based on the force between two parallel conductors carrying electric current. <br />
                                    This is articulated in the formal definition of the ampere, which is one of the seven base units in the International System of Units (SI). <br />
                                    It can be stated as follows: <br />
                                    The ampere is defined as the constant current which, if maintained in two straight parallel conductors of infinite length, of negligible circular cross-section, and placed one meter apart in vacuum, would produce a force equal to (2 * 10^(-7)) newton per meter of length between these conductors. <br />
                                    Formally, it can be expressed as: <br />
                                    "The ampere is that constant current which, if maintained in two straight parallel conductors of infinite length, of negligible circular cross-section, <br />
                                    and placed one meter apart in vacuum, would produce between these conductors a force equal to ((2 * 10^-7)) newton per meter of length." <br />
                                    This definition reflects Ampère's contributions to the understanding of the relationship between electric currents and the magnetic forces they produce. <br /><br /><hr />
                                </p>
                                <h2 style={HeaderStyleH2Arabic}>قانون أندريه ماري أمبير</h2>
                                <p style={{ textAlign: "right" }}>
                                    القانون الذي يحدد وحدة الأمبير يعتمد على القوة بين موصلين متوازيين يحملان تيار كهربائي <br />
                                    هذا موضح في التعريف الرسمي للأمبير، الذي يعد إحدى الوحدات الأساسية السبع في النظام الدولي للوحدات (SI) <br />
                                    يمكن التعبير عنه على النحو التالي <br />
                                    الأمبير يعرف بأنه التيار الثابت الذي، إذا تم الحفاظ عليه في موصلين مستقيمين متوازيين بطول غير نهائي، وبمقطع دائري مهمل، ووضع على بعد متر واحد في الفراغ، فإنه ينتج قوة تساوي (2 * 10^(-7)) نيوتن لكل متر من الطول بين هذين الموصلين <br />
                                    بشكل رسمي، يمكن التعبير عنه كالتالي <br />
                                    "الأمبير هو التيار الثابت الذي، إذا تم الحفاظ عليه في موصلين مستقيمين متوازيين بطول غير نهائي، وبمقطع دائري مهمل <br />
                                    ووضع على بعد متر واحد في الفراغ، فإنه ينتج بين هذين الموصلين قوة تساوي ((2 * 10^-7)) نيوتن لكل متر من الطول" <br />
                                    يعكس هذا التعريف مساهمات أمبير في فهم العلاقة بين التيارات الكهربائية والقوى المغناطيسية التي تنتجها <br /><hr />
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
                {/* <!-- Andre-Marie Ampere's Law Program Ends --> */}
            </div>
        </section >
    );
}

export default Programs

