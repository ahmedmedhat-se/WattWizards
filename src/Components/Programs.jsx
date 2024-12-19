import React from 'react';

import CircuitBreaker from "./Package/Calcs/CircuitBreaker";
import PowerFactorCorrection from "./Package/Calcs/PowerFactorCorrection";
import ElectricalConsumption from "./Package/Calcs/ElectricalConsumption";
import HorsePower2Ampere from "./Package/Calcs/HorsePowerToAmpere";
import VoltAmpere2Watt from "./Package/Calcs/VoltAmpere2Watt";
import Watt2Ampere from "./Package/Calcs/Watt2Ampere";
import Ampere2Watt from "./Package/Calcs/Ampere2Watt";
import Coulomb from "./Package/Calcs/CoulombLaw";
import Ohm from "./Package/Calcs/OhmLaw";
import Kirchhoff from "./Package/Calcs/KirchhoffLaw";
import Volta from "./Package/Calcs/VoltaLaw";
import Ampere from "./Package/Calcs/AmpereLaw";
import TonToHpConverter from './Package/Calcs/Ton2Hp';

function Programs() {
    return (
        // Programms Section Starts
        <section className="cards-lg-containers" id="Programs">
            <header className="section-header">
                <div className="header-text">
                    <h1>Our Programs</h1>
                    <p className='text-dark'>
                        These programs that we designed,
                        you can now view our scientific and research documents
                        under each program to obtain knowledge of these programs,
                        and you can download your specified calculation files according to your statement!.
                    </p>
                </div>
                <button className="cards-lg-containers-btn btn" type="button" data-bs-toggle="modal" data-bs-target="#downloadModal">
                        Download .xlsx sheets
                </button>
            </header>

            {/* Programms Contents Starts */}
            <div className="cards-lg-containers-contents">    
                <CircuitBreaker />
                <PowerFactorCorrection />
                <ElectricalConsumption />
                <HorsePower2Ampere />
                <VoltAmpere2Watt />
                <Watt2Ampere />
                <Ampere2Watt />
                <TonToHpConverter />
                <Coulomb />
                <Ohm />
                <Kirchhoff />
                <Volta />
                <Ampere />
            </div>

            {/* <!-- Download Sheets Area Starts --> */}
            <div id="feedback-form-wrapper">
                <div id="feedback-form-modal">
                    <div className="modal fade" id="downloadModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Download Form</h5>
                                    <button type="button" className="btn btn-danger close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <select id="selectDownloadFile" className="form-select">
                                            <option value="Circuit-Breaker-Size">Circuit Breaker Size (Program)</option>
                                            <option value="Power-Factor-Correction">Power-Factor-Correction (Program)</option>
                                            <option value="Electrical-Consumption">Electrical-Consumption (Program)</option>
                                            <option value="Horse-Power-2-Ampere">Horse-Power TO Ampere (Program)</option>
                                            <option value="Ampere-2-Watt">Ampere TO Watt (Program)</option>
                                            <option value="Watt-2-Ampere">Watt TO Ampere (Program)</option>
                                        </select>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <input type="submit" value="Download" className="btn btn-success"/>
                                    <input type="submit" data-bs-dismiss="modal" value="Close" className="btn btn-danger"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Download Sheets Area Ends --> */}
        </section >
    );
}

export default Programs