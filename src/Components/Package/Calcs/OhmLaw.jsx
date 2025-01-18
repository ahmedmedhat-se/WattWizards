import React, { useState, useRef } from 'react';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Ohm() {
    // Ohm's Law (Program) Starts
    const [voltaResult, setVoltaResult] = useState('');

    const currentRef = useRef(null);
    const resistanceRef = useRef(null);
    const voltageRef = useRef(null);
    const [calcType, setCalcType] = useState('Voltage');

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

    return (
        <>
            <div className="cards-lg-containers-card">
                <img src="https://www.thoughtco.com/thmb/yanPjyDodf3W1LHWrL1gzfma1qk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/713px-Gerog_Ohm-58e5d5dc5f9b58ef7e244457.jpg" />
                <div className="category">
                    <div className="subject">
                        <h3>Software/Physics</h3>
                    </div>
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} />
                </div>
                <h2 className="course-title">Ohm's Law</h2>
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#Ohm">View</button>
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#ohm-program">Program</button>
            </div>
            <div className="modal fade" id="Ohm" tabIndex="-1" role="dialog"
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
                            <h2 className='HeaderStyleH2'>What is Ohm's Law?</h2>
                            Ohm’s Law states that the current flowing through a resistor is directly proportional to the voltage applied across the resistor and inversely proportional to the value of the resistance,
                            provided that the temperature remains constant. <br />
                            Ohm’s Law describes the relationship between the current through a resistor, the voltage applied to it, and the resistance value. <br />

                            Thanks to Ohm's Law, you can calculate any one of these three quantities if the other two are known. <br />
                            For example, if you know the voltage and current, you can determine the resistance. <br />
                            Ohm observed in his experiments that as the voltage across the resistor increases, <br />
                            the current through the resistor increases proportionally. <br />
                            Conversely, if the voltage decreases, the current decreases as well. <br /><br />

                            <h2 className='HeaderStyleH2'>Ohm’s Law Equation</h2>
                            Ohm’s primary discovery was that the electric current in a circuit is directly proportional to the circuit’s voltage. <br />
                            He expressed this discovery with a simple equation that describes the relationship between voltage, current, and resistance as follows: <br />
                            Voltage = Current × Resistance (E = IR) <br />
                            Here, Voltage (E) equals Current (I) multiplied by Resistance (R). <br /><br />
                            Using algebraic manipulations, this equation can be rearranged into two other forms to find the values of current and resistance: <br />
                            Resistance = Voltage / Current (R = E / I) <br />
                            Current = Voltage / Resistance (I = E / R) <br />
                            To understand Ohm's Law thoroughly, one must review the relationship between voltage, current, and resistance. <br /><br /><hr />

                            <h2 className='HeaderStyleH2Arabic'>ما هو قانون أوم؟</h2>
                            <p style={{ textAlign: 'right' }}>
                                ينص قانون أوم على أن التيار الكهربائي المار في مقاومة يتناسب طرديًا مع الجهد المطبق على المقاومة، ويتناسب عكسيًا مع قيمة المقاومة، وذلك عند درجة حرارة ثابتة. يوضح قانون أوم العلاقة بين التيار الذي يمر عبر مقاومة ما، والجهد المطبق عليها، وقيمة تلك المقاومة
                                <br />
                                <br /> بفضل قانون أوم، يمكنك حساب قيمة أي من الكميات الثلاث إذا كانت القيمتان الأخريان متاحتين. على سبيل المثال، إذا كنت تعرف قيمة الجهد والتيار، يمكنك حساب قيمة المقاومة. وقد لاحظ أوم في تجاربه أن زيادة فرق الجهد بين طرفي المقاومة تؤدي إلى زيادة التيار المار في المقاومة بنفس النسبة. وبالمثل، إذا نقص الجهد، ينقص التيار أيضًا
                                <br /><br />
                            </p>
                            <h2 className='HeaderStyleH2Arabic'>معادلة قانون أوم</h2>
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
        </>
    )
}

export default Ohm;