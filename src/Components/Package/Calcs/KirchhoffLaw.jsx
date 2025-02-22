import React, { useState, useRef } from 'react';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../assets/logo.png';

function Kirchhoff() {
    // Kirchhoff's Law (Program) Starts
    const [kResult, setKResult] = useState('');
    const [lawType, setLawType] = useState('KCL');
    const currentRefs = useRef([]);
    const voltageRefs = useRef([]);

    const handleKirchhoffCalculateClick = (e) => {
        e.preventDefault();

        if (lawType === 'KCL') {
            const currents = currentRefs.current.map(ref => parseFloat(ref.value) || 0);
            const currentSum = currents.reduce((acc, curr) => acc + curr, 0);

            setKResult(`Sum of currents (ΣI): ${currentSum.toFixed(2)} A`);
        } else if (lawType === 'KVL') {
            const voltages = voltageRefs.current.map(ref => parseFloat(ref.value) || 0);
            const voltageSum = voltages.reduce((acc, v) => acc + v, 0);

            setKResult(`Sum of voltages (ΣV): ${voltageSum.toFixed(2)} V`);
        }
    };
    // Kirchhoff's Law (Program) Ends

    return (
        <>
            <div className="cards-lg-containers-card">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Gustav_Robert_Kirchhoff.jpg" />
                <div className="category">
                    <div className="subject">
                        <h3>Software/Physics</h3>
                    </div>
                    <img src={logo} />
                </div>
                <h2 className="course-title">Kirchhoff's Law</h2>
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#Kirchhoff">View</button>
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#kirchhoff-program">Program</button>
            </div>
            <div className="modal fade" id="Kirchhoff" tabIndex="-1" role="dialog"
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
                            <h2 className='HeaderStyleH2A'>Kirchhoff's Laws</h2>
                            <p>
                                Kirchhoff's laws, formulated by Gustav Kirchhoff for the first time in 1845, consist of two fundamental principles in electrical circuits: one concerning current and the other concerning voltage. <br />
                                These laws are essential in the study of electrical circuits and are applicable not only to direct current (DC) circuits but also to alternating current (AC) circuits and digital circuits. <br />
                                These laws are widely applicable and extremely useful for solving circuit problems that might otherwise be challenging. They are fundamental principles that will remain relevant and will not be replaced or obsolete. <br /><br />
                            </p>
                            <h2 className='HeaderStyleH2A'>Kirchhoff's First Law of Current</h2>
                            <p>
                                Kirchhoff's First Law of Current, also known as Kirchhoff’s Current Law (KCL), states that the algebraic sum of currents entering a node (junction point) in a circuit is equal to the algebraic sum of currents leaving the node.
                                This can be expressed mathematically as: <br />
                                ∑Ii = ∑Io <br />
                                where ∑ denotes the algebraic sum, Ii represents the currents entering the node, and Io represents the currents leaving the node. <br /><br />
                            </p>
                            <h2 className='HeaderStyleH2A'>Kirchhoff's Second Law of Voltage</h2>
                            <p>
                                Kirchhoff's Second Law of Voltage, or Kirchhoff’s Voltage Law (KVL), asserts that the algebraic sum of all voltages around any closed loop in a circuit is equal to zero. <br />
                                Another way to state this law is that the sum of the voltage drops around a closed loop is equal to the sum of the voltage sources within the loop. <br />
                                Applying this law involves selecting a closed loop path in the circuit, starting at a particular point, traversing the path, and returning to the original point. <br />
                                The law can be stated mathematically as:
                                ∑V = 0 <br />
                                where ∑V denotes the sum of all voltages around the closed loop. <br />
                                These laws provide crucial frameworks for analyzing and solving complex electrical circuits. <br /><br /><hr />
                            </p>

                            <h2 className='HeaderStyleH2Arabic'>قوانين كيرشوف</h2>
                            <p style={{ textAlign: 'right' }}>
                                تتألف قوانين كيرشوف من معادلتين أساسيّتين في الدوائر الكهربائية، وقد نشرها غوستاف كيرشوف لأول مرة في عام ١٨٤٥، إحداهما تتعلق بالتيار والأخرى تتعلق بالجهد. تُعَدّ هذه القوانين من المبادئ الأساسية في دراسة الدوائر الكهربائية ولها تطبيقات واسعة في دوائر التيار المستمر والتيار المتردد والدوائر الرقمية

                                <br /> تُعَدّ هذه القوانين ذات تطبيقات واسعة وفوائد كبيرة في حل المشكلات الكهربائية التي قد تكون معقدة أحيانًا. وهذه القوانين تُعَدّ من المبادئ الأساسية التي ستظل ذات صلة ولن يتم استبدالها أو الاستغناء عنها
                                <br /><br />
                            </p>
                            <h2 className='HeaderStyleH2Arabic'>قانون كيرشوف الأول للتيار</h2>
                            <p style={{ textAlign: 'right' }}>
                                ينص قانون كيرشوف الأول للتيار، والذي يُعرف أيضًا بقانون كيرشوف للتيار، على أن المجموع الجبري للتيارات الداخلة إلى عقدة (نقطة التقاء) في الدائرة الكهربائية يساوي المجموع الجبري للتيارات الخارجة من نفس العقدة. يمكن التعبير عن هذا القانون رياضيًّا كما يلي:

                                ∑تيارات داخلة = ∑تيارات خارجة

                                <br />حيث إنّ ∑ تدل على المجموع الجبري، و"تيارات داخلة" تشير إلى التيارات الداخلة إلى العقدة، و"تيارات خارجة" تشير إلى التيارات الخارجة من العقدة.
                                <br /><br />
                            </p>
                            <h2 className='HeaderStyleH2Arabic'>قانون كيرشوف الثاني للجهد</h2>
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
        </>
    )
}

export default Kirchhoff;