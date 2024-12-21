import React, { useState, useRef } from 'react';

import CircuitBreaker from "./Package/Calcs/CircuitBreaker";
import PowerFactorCorrection from "./Package/Calcs/PowerFactorCorrection";
import ElectricalConsumption from "./Package/Calcs/ElectricalConsumption";
import HorsePower2Ampere from "./Package/Calcs/HorsePowerToAmpere";
import VoltAmpere2Watt from "./Package/Calcs/VoltAmpere2Watt";
import Watt2Ampere from "./Package/Calcs/Watt2Ampere";
import Ampere2Watt from "./Package/Calcs/Ampere2Watt";
import HP2KWConverter from './Package/Calcs/HP2kW';
import Coulomb from "./Package/Calcs/CoulombLaw";
import Ohm from "./Package/Calcs/OhmLaw";
import Kirchhoff from "./Package/Calcs/KirchhoffLaw";
import Volta from "./Package/Calcs/VoltaLaw";
import Ampere from "./Package/Calcs/AmpereLaw";
import TonToHpConverter from './Package/Calcs/Ton2Hp';

function Programs() {
    const programsList = [
        <CircuitBreaker />,
        <PowerFactorCorrection />,
        <ElectricalConsumption />,
        <HorsePower2Ampere />,
        <HP2KWConverter />,
        <TonToHpConverter />,
        <VoltAmpere2Watt />,
        <Watt2Ampere />,
        <Ampere2Watt />,
        <Coulomb />,
        <Ohm />,
        <Kirchhoff />,
        <Volta />,
        <Ampere />,
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const programsPerPage = 6;

    // Create a ref for the Programs section
    const programsRef = useRef(null);

    // Calculate pagination
    const totalPages = Math.ceil(programsList.length / programsPerPage);
    const startIndex = (currentPage - 1) * programsPerPage;
    const currentPrograms = programsList.slice(startIndex, startIndex + programsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        
        // Scroll to the top of the Programs section smoothly
        programsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section className="cards-lg-containers" id="Programs" ref={programsRef}>
            <header className="section-header">
                <div className="header-text">
                    <h1>Our Programs</h1>
                    <p className="text-dark fw-bold">
                        These programs that we designed,
                        you can now view our scientific and research documents
                        under each program to obtain knowledge of these programs,
                        and you can download your specified calculation files according to your statement!..
                    </p>
                </div>
                <button
                    className="cards-lg-containers-btn btn"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#downloadModal"
                >
                    Download .xlsx sheets
                </button>
            </header>

            {/* Programms Contents */}
            <div className="cards-lg-containers-contents">
                {currentPrograms}
            </div>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`pagination-btn btn mb-2 mt-2 w-100 ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Download Sheets Modal */}
            <div id="feedback-form-wrapper">
                <div id="feedback-form-modal">
                    <div className="modal fade" id="downloadModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Download Form</h5>
                                    <button
                                        type="button"
                                        className="btn btn-danger close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    >
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
                                    <input type="submit" value="Download" className="btn btn-success" />
                                    <input type="submit" data-bs-dismiss="modal" value="Close" className="btn btn-danger" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Programs;
