import React, { useState, useRef } from 'react';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from '../assets/Ampere_to_Watt_Conversion_Program.jpg';
import logo from '../assets/logo.png';

function Ampere2Watt() {
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
                <h2 className="course-title">Ampere TO Watt (Program)</h2>
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#A2W">View</button>
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#A2WProgram">Program</button>
            </div>
            <div className="modal fade" id="A2W" tabIndex="-1" role="dialog"
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
                            <h2 className='HeaderStyleH2'>Brief Notes</h2>
                            <p>
                                Amperes and watts are different units of measurement used to describe electricity. <br />
                                You can convert watts to amperes or amperes to watts using electrical power formulas, <br />
                                which involve voltage and power factor. <br />
                                In this article, you will find a calculator that you can use directly to convert between watts and amperes or vice versa, <br />
                                and you will also find an explanation of the conversion process using electrical formulas. <br /><br /><hr />
                            </p>
                            <h2 className='HeaderStyleH2Arabic'>مقتطفات هامة</h2>
                            <p style={{ textAlign: 'right' }}>
                                الأمبير والواط هي وحدات مختلفة للقياس تستخدم لوصف الكهرباء
                                <br /> يمكن تحويل الواط إلى أمبير أو تحويل الأمبير إلى واط باستخدام قوانين القدرة الكهربائية مع استخدام الجهد ومعامل القدرة
                                <br />  في هذا المقال ستجد حاسبة يمكنك استخدامها مباشرةً للتحويل من واط إلى أمبير أو العكس
                                <br />  وأيضًا تم شرح طريقة التحويل باستخدام القوانين الكهربائية
                                <br /><hr />
                            </p>
                            <h2 className='HeaderStyleH2'>What is an Ampere?</h2>
                            <p>
                                The ampere (English: Ampere) is a unit of electric current,
                                representing the amount of charge passing through a conductor. <br />
                            </p>
                            <h2 className='HeaderStyleH2'>What is a Watt?</h2>
                            <p>
                                The watt (English: Watt) is a unit of electrical power. <br />
                            </p>
                            <h2 className='HeaderStyleH2'>Converting Amperes to Watts in Direct Current</h2>
                            <p>
                                In the case of direct current (DC), the conversion is straightforward as follows: <br />
                                Watts = Volts * Amperes  <br />
                            </p>
                            <h2 className='HeaderStyleH2'>Converting Amperes to Watts in Alternating Current</h2>
                            <p>
                                In the case of alternating current (AC),
                                the process is more complex due to the power factor and the need to account for phase values or line values.  <br />
                            </p>
                            <h2 className='HeaderStyleH2'>Single-Phase AC</h2>
                            <p>
                                The power in watts (W) is calculated as the product of the current in amperes (A), the power factor (PF), and the voltage (V): <br />

                                Watts = Amperes * (Volts * Power Factor) <br />
                                W = A * (V * PF)  <br />
                            </p>
                            <h2 className='HeaderStyleH2'>Three-Phase AC</h2>
                            <p>
                                The power in watts (W) is calculated as the product of the current in amperes (A), the power factor (PF),
                                and the line-to-line voltage (V\(_L - L\)), <br />
                                multiplied by the square root of 3 (1.732): <br />

                                Watts = Amperes * 1.732 Power Factor * (Line - to - Line Voltage) <br />
                                W = A * 1.732 * PF * V_(L - L) <br /><br /><hr />
                            </p>
                            <h2 className='HeaderStyleH2Arabic'> ما هو الواط؟ - ما هو الأمبير؟ </h2>
                            <p style={{ textAlign: 'right' }}>
                                <br /> الأمبير هو وحدة قياس التيار الكهربائي، ويعبر عن كمية الشحنات التي تمر عبر موصل
                                <br /> الواط هو وحدة قياس القدرة الكهربائية
                                <br />
                            </p>
                            <h2 className='HeaderStyleH2Arabic'> تحويل الأمبير إلى واط في التيار المستمر </h2>
                            <p style={{ textAlign: 'right' }}>
                                في حالة التيار المستمر، تكون عملية التحويل بسيطة كما يلي

                                <br /> الواط = الفولت × الأمبير
                                <br />
                                الواط = الفولت × الأمبير
                            </p>
                            <h2 className='HeaderStyleH2Arabic'>تحويل الأمبير إلى واط في التيار المتردد</h2>
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
            <div className="modal fade" id="A2WProgram" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
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
                                        <form action="#" autoComplete="on">
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
                                                <input type="number" readOnly id="WattAfterAmpereConversion" value={wattResult}
                                                    className="form-control" placeholder="Watts - وات" /><br />

                                                <label htmlFor="kWattAfterAmpereConversion" className="form-label">Kilowatts (kW)
                                                    -
                                                    وات</label>
                                                <input type="number" readOnly id="kWattAfterAmpereConversion" value={kwattResult}
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
        </>
    )
}

export default Ampere2Watt;