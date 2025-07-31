import "bootstrap/dist/css/bootstrap.min.css";
import image from '../assets/circuit_breaker_dataset.jpg';
import logo from '../assets/logo.png';

function DataSetProgram() {
  // Circuit-Breaker Data Set
  const tableData = [
    { size: "1.5", conduit: { current: 15, breaker: 10 }, multiCore: { current: 18, breaker: 10 }, singleCore: { current: 24, breaker: 20 } },
    { size: "2.5", conduit: { current: 20, breaker: 16 }, multiCore: { current: 26, breaker: 20 }, singleCore: { current: 32, breaker: 25 } },
    { size: "4", conduit: { current: 25, breaker: 20 }, multiCore: { current: 34, breaker: 25 }, singleCore: { current: 42, breaker: 35 } },
    { size: "6", conduit: { current: 33, breaker: 25 }, multiCore: { current: 44, breaker: 35 }, singleCore: { current: 54, breaker: 50 } },
    { size: "10", conduit: { current: 45, breaker: 35 }, multiCore: { current: 61, breaker: 50 }, singleCore: { current: 73, breaker: 63 } },
    { size: "16", conduit: { current: 61, breaker: 50 }, multiCore: { current: 82, breaker: 63 }, singleCore: { current: 98, breaker: 80 } },
    { size: "25", conduit: { current: 83, breaker: 63 }, multiCore: { current: 108, breaker: 80 }, singleCore: { current: 129, breaker: 100 } },
    { size: "35", conduit: { current: 103, breaker: 80 }, multiCore: { current: 135, breaker: 100 }, singleCore: { current: 158, breaker: 125 } },
    { size: "50", conduit: { current: 132, breaker: 100 }, multiCore: { current: 168, breaker: 125 }, singleCore: { current: 198, breaker: 160 } },
    { size: "70", conduit: { current: 165, breaker: 125 }, multiCore: { current: 207, breaker: 160 }, singleCore: { current: 245, breaker: 200 } },
    { size: "95", conduit: { current: 197, breaker: 160 }, multiCore: { current: 250, breaker: 200 }, singleCore: { current: 292, breaker: 250 } },
    { size: "120", conduit: { current: 235, breaker: 200 }, multiCore: { current: 292, breaker: 250 }, singleCore: { current: 344, breaker: 315 } },
  ];

  // Copper Cable Loads Table Data
  const copperCableData = [
    { size: 1.5, A1: 13.5, A2: 13, B1: 15.5, B2: 15, C: 17.5, D1: 18, D2: 19 },
    { size: 2.5, A1: 18, A2: 17.5, B1: 21, B2: 20, C: 24, D1: 24, D2: 24 },
    { size: 4, A1: 24, A2: 23, B1: 28, B2: 27, C: 32, D1: 30, D2: 33 },
    { size: 6, A1: 31, A2: 29, B1: 36, B2: 34, C: 41, D1: 38, D2: 41 },
    { size: 10, A1: 42, A2: 39, B1: 50, B2: 46, C: 57, D1: 50, D2: 54 },
    { size: 16, A1: 56, A2: 52, B1: 68, B2: 62, C: 76, D1: 64, D2: 70 },
    { size: 25, A1: 73, A2: 68, B1: 89, B2: 80, C: 96, D1: 82, D2: 92 },
    { size: 35, A1: 89, A2: 83, B1: 110, B2: 99, C: 119, D1: 98, D2: 110 },
    { size: 50, A1: 108, A2: 99, B1: 134, B2: 118, C: 144, D1: 116, D2: 130 },
    { size: 70, A1: 136, A2: 125, B1: 171, B2: 149, C: 184, D1: 143, D2: 162 },
    { size: 95, A1: 164, A2: 150, B1: 207, B2: 179, C: 223, D1: 169, D2: 193 },
    { size: 120, A1: 188, A2: 172, B1: 239, B2: 206, C: 259, D1: 192, D2: 220 },
  ];

  // Aluminum Cable Loads Table Data
  const aluminumCableData = [
    { size: 2.5, A1: 14, A2: 13.5, B1: 16.5, B2: 15.5, C: 18.5, D1: 18.5, D2: '-' },
    { size: 4, A1: 18.5, A2: 17.5, B1: 22, B2: 21, C: 25, D1: 24, D2: '-' },
    { size: 6, A1: 24, A2: 23, B1: 28, B2: 27, C: 32, D1: 30, D2: '-' },
    { size: 10, A1: 32, A2: 31, B1: 39, B2: 36, C: 44, D1: 39, D2: '-' },
    { size: 16, A1: 43, A2: 41, B1: 53, B2: 48, C: 59, D1: 50, D2: 53 },
    { size: 25, A1: 57, A2: 53, B1: 70, B2: 62, C: 73, D1: 64, D2: 69 },
    { size: 35, A1: 70, A2: 65, B1: 86, B2: 77, C: 90, D1: 77, D2: 83 },
    { size: 50, A1: 84, A2: 78, B1: 104, B2: 92, C: 110, D1: 91, D2: 99 },
    { size: 70, A1: 107, A2: 98, B1: 133, B2: 116, C: 140, D1: 112, D2: 122 },
    { size: 95, A1: 129, A2: 118, B1: 161, B2: 139, C: 170, D1: 132, D2: 148 },
    { size: 120, A1: 149, A2: 135, B1: 186, B2: 160, C: 197, D1: 150, D2: 169 },
  ];

  return (
    <>
      <div className="cards-lg-containers-card">
        <img src={image} alt="Circuit Breaker Data Set" />
        <div className="category">
          <div className="subject">
            <h3>Software/Electricity</h3>
          </div>
          <img src={logo} alt="Logo" />
        </div>
        <h2 className="course-title">Circuit-Breaker/Cable (Data Sets)</h2>
        <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#BreakerData">Breaker Data</button>
        <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#CableData">Cable Data</button>
      </div>

      {/* Circuit-Breaker Data Modal */}
      <div className="modal fade" id="BreakerData" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Circuit-Breaker (Data Sets)</h5>
              <button type="button" className="btn btn-dark close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="col-12 p-2 mt-2">
                    <h3 className="HeaderStyleH2">Household load breakers table</h3>
                    <p className="text-center">The following table shows the cable cross-section, the amount of current it can withstand, and the breaker value suitable for household installations and wiring circuits.</p>
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover text-center">
                        <thead className="thead-dark">
                          <tr>
                            <th rowSpan="2">Cross-sectional area of copper wire mm<sup>2</sup></th>
                            <th colSpan="2">One or more cables lying in pipes</th>
                            <th colSpan="2">Multi-core cables</th>
                            <th colSpan="2">Single core cables lying in the air</th>
                          </tr>
                          <tr>
                            <th>Cable current (A)</th>
                            <th>The value of the cutter (A)</th>
                            <th>Cable current (A)</th>
                            <th>The value of the cutter (A)</th>
                            <th>Cable current (A)</th>
                            <th>The value of the cutter (A)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((row, index) => (
                            <tr key={index}>
                              <td>{row.size}</td>
                              <td>{row.conduit.current}</td>
                              <td>{row.conduit.breaker}</td>
                              <td>{row.multiCore.current}</td>
                              <td>{row.multiCore.breaker}</td>
                              <td>{row.singleCore.current}</td>
                              <td>{row.singleCore.breaker}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* Cable Data Modal */}
      <div className="modal fade" id="CableData" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Cable (Data Sets)</h5>
              <button type="button" className="btn btn-dark close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="col-12 p-2 mt-2">
                    <h2 className="HeaderStyleH2">Cable Loads Table</h2>

                    {/* Copper Cables Table */}
                    <div className="mb-5">
                      <h2 className="HeaderStyleH2">Copper Cable Loads Table</h2>
                      <div className="table-responsive">
                        <table className="table table-bordered table-hover text-center">
                          <thead className="thead-dark">
                            <tr>
                              <th rowSpan="2">Wire cross-sectional area (mm2)</th>
                              <th colSpan="7">Cable extension method</th>
                            </tr>
                            <tr>
                              <th>A1</th>
                              <th>A2</th>
                              <th>B1</th>
                              <th>B2</th>
                              <th>C</th>
                              <th>D1</th>
                              <th>D2</th>
                            </tr>
                          </thead>
                          <tbody>
                            {copperCableData.map((row, index) => (
                              <tr key={index}>
                                <td>{row.size}</td>
                                <td>{row.A1}</td>
                                <td>{row.A2}</td>
                                <td>{row.B1}</td>
                                <td>{row.B2}</td>
                                <td>{row.C}</td>
                                <td>{row.D1}</td>
                                <td>{row.D2}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Aluminum Cables Table */}
                    <div className="mb-5">
                      <h2 className="HeaderStyleH2">Aluminum Cable Loads Table</h2>
                      <div className="table-responsive">
                        <table className="table table-bordered table-hover text-center">
                          <thead className="thead-dark">
                            <tr>
                              <th rowSpan="2">Wire cross-sectional area (mm2)</th>
                              <th colSpan="7">Cable extension method</th>
                            </tr>
                            <tr>
                              <th>A1</th>
                              <th>A2</th>
                              <th>B1</th>
                              <th>B2</th>
                              <th>C</th>
                              <th>D1</th>
                              <th>D2</th>
                            </tr>
                          </thead>
                          <tbody>
                            {aluminumCableData.map((row, index) => (
                              <tr key={index}>
                                <td>{row.size}</td>
                                <td>{row.A1}</td>
                                <td>{row.A2}</td>
                                <td>{row.B1}</td>
                                <td>{row.B2}</td>
                                <td>{row.C}</td>
                                <td>{row.D1}</td>
                                <td>{row.D2}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DataSetProgram;
