import React, { useState, useRef } from 'react';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Coulomb() {
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

    return(
        <>
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
                            <h2 className='HeaderStyleH2'>Coulomb's Law</h2>
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
                            <h2 className='HeaderStyleH2Arabic'>قانون كولوم</h2>
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
        </>
    )
}

export default Coulomb;