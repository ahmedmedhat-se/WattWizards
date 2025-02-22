import CircuitBreaker from "./Package/Calcs/CircuitBreaker";
import DataSetProgram from './Package/Calcs/DataSetProgram';
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
import { useRef, useState } from "react";

function Programs() {
    const programsList = [
        <CircuitBreaker />,
        <DataSetProgram />,
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
    const programsRef = useRef(null);

    const totalPages = Math.ceil(programsList.length / programsPerPage);
    const startIndex = (currentPage - 1) * programsPerPage;
    const currentPrograms = programsList.slice(startIndex, startIndex + programsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        
        programsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    let handleSubmit = (e)=>{
      e.preventDefault()
      const selectedValue = document.getElementById('selectDownloadFile').value;
      let url = 'http://localhost:8086/download/';
      if (selectedValue === 'Circuit-Breaker-Size') {
        url += 'CircuitBreakerSampleFile';
      } else if (selectedValue === 'Power-Factor-Correction') {
        url += 'PowerFactorCorrectionSampleFile';
      } else if (selectedValue === 'Electrical-Consumption') {
        url += 'ElectricConsumptionSampleFile';
      } else if (selectedValue === 'Horse-Power-2-Ampere') {
        url += 'HorseToAmpereSampleFile';
      } else if (selectedValue === 'Ampere-2-Watt') {
        url += 'AmpereToWattSampleFile';
      } else if (selectedValue === 'Watt-2-Ampere') {
        url += 'WattToAmpereSampleFile';
      } else if (selectedValue === 'VoltAmpere-2-Watt') {
        url += 'VoltAmpereToWattSampleFile';
      } else {
        return;
      }

      try {
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
          if (xhr.status === 200) {
            const blob = new Blob([xhr.response], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = document.getElementById("selectDownloadFile").value;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
          }
        };
        
        xhr.onerror = function() {
        console.log("Error:", xhr.responseText);
        };
        
        xhr.open('GET', url, true);
        xhr.withCredentials = true;        
        xhr.responseType = "blob"
        xhr.send();
      } catch (error) {
        console.log('Authentication error:', error);
      }
    }

    return (
        <section className="cards-lg-containers" id="Programs" ref={programsRef}>
            <header className="section-header">
                <div className="header-text">
                    <h1>Our Programs</h1>
                    <p className="text-dark fw-bold">
                        These programs that we designed,
                        you can now view our scientific and research documents
                        under each program to obtain knowledge of these programs,
                        and you can download your specified calculation files according to your statement!.
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

            {/* Programs Contents */}
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
                                    <form onSubmit={handleSubmit}>
                                        <select id="selectDownloadFile" className="form-select">
                                            <option value="Circuit-Breaker-Size">Circuit Breaker Size (Program)</option>
                                            <option value="Power-Factor-Correction">Power-Factor-Correction (Program)</option>
                                            <option value="Electrical-Consumption">Electrical-Consumption (Program)</option>
                                            <option value="Horse-Power-2-Ampere">Horse-Power TO Ampere (Program)</option>
                                            <option value="Ampere-2-Watt">Ampere TO Watt (Program)</option>
                                            <option value="Watt-2-Ampere">Watt TO Ampere (Program)</option>
                                            <option value="VoltAmpere-2-Watt">Volt Ampere TO Watt (Program)</option>
                                        </select>
                                        <div className="modal-footer">
                                            <input type="submit" value="Download" className="btn btn-success" />
                                            <input type="reset" data-bs-dismiss="modal" value="Close" className="btn btn-danger" />
                                        </div>
                                    </form>
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
