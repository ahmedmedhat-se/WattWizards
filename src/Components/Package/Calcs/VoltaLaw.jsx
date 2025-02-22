import React, { useState, useRef } from 'react';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../assets/logo.png';

function Volta() {
    // Volta's Law (Program) Starts
    const [newResult, setNewResult] = useState('');
    const [newCalcType, setNewCalcType] = useState('Voltage');
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

    return (
        <>
            <div className="cards-lg-containers-card">
                <img src="https://media.sciencephoto.com/c0/07/49/64/c0074964-800px-wm.jpg" />
                <div className="category">
                    <div className="subject">
                        <h3>Software/Physics</h3>
                    </div>
                    <img src={logo} />
                </div>
                <h2 className="course-title">Alessandro Volta's Law</h2>
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#Volta">View</button>
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#volta-program">Program</button>
            </div>
            <div className="modal fade" id="Volta" tabIndex="-1" role="dialog"
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
                            <h2 className='HeaderStyleH2A'>Alessandro Volta's Law</h2>
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
                            <h2 className='HeaderStyleH2AArabic'>قانون أليساندرو فولتا</h2>
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
        </>
    )
}

export default Volta;