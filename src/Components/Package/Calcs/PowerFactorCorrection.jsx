import React, { useState, useRef } from 'react';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../assets/logo.png';

function PowerFactorCorrection() {
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

    return (
        <>
            <div className="cards-lg-containers-card">
                <img src="https://img.directindustry.com/images_di/photo-g/222679-15601372.webp" />
                <div className="category">
                    <div className="subject">
                        <h3>Software/Electricity</h3>
                    </div>
                    <img src={logo} />
                </div>
                <h2 className="course-title">Power-Factor-Correction (Program)</h2>
                <button data-bs-toggle="modal" data-bs-target="#PFCView" className="btn btn-success">View</button>
                <button data-bs-toggle="modal" data-bs-target="#PFCProgram" className="btn btn-success">Program</button>
            </div>
            <div className="modal fade" id="PFCView" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Power-Factor-Correction</h5>
                            <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h2 className="HeaderStyleH2">Power Factor Correction - تحسين معامل القدره
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
                            <h2 className="HeaderStyleH2">Phase (1) VS Phase (3)</h2><br />
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
            <div className="modal fade" id="PFCProgram" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
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
                                        <form action="#" autoComplete="on">
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
                                                    <button id="PFCaclc" onClick={handlePFCaclcClick} className="btn btn-success w-100"
                                                        style={{ fontSize: "large" }}>
                                                        Calculate - احسب</button>
                                                </div><br />

                                                <label htmlFor="active" className="form-label">Active Power (kw) - القدره
                                                    الفعاله</label>
                                                <input type="number" readOnly id="active" value={resultsPF.active} className="form-control"
                                                    placeholder="Active Power (kw) - القدره الفعاله :" /><br />

                                                <label htmlFor="apparent" className="form-label">Apparent Power (kVA) - القدره
                                                    الظاهره</label>
                                                <input type="number" readOnly id="apparent" value={resultsPF.apparent} className="form-control"
                                                    placeholder="Apparent Power (kVA) - القدره الظاهره :" /><br />

                                                <label htmlFor="reactive" className="form-label">Reactive Power (kVAR) - القدره الغير
                                                    فعاله</label>
                                                <input type="number" readOnly id="reactive" value={resultsPF.reactive} className="form-control"
                                                    placeholder="Reactive Power (kVAR) - القدره الغير فعاله :" /><br />

                                                <label htmlFor="microFarad" className="form-label">The capacitance of the
                                                    capacitor is in microfarads µF
                                                    - سعة المكثف بوحدة الميكروفاراد</label>
                                                <input type="number" readOnly id="microFarad" value={resultsPF.microFarad} className="form-control"
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
        </>
    )
}

export default PowerFactorCorrection;