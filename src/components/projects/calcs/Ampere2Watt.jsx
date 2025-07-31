import { useState, useRef } from 'react';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import image from '../assets/Ampere_to_Watt_Conversion_Program.jpg';
import logo from '../assets/logo.png';

function Ampere2Watt() {
  const [wattResult, setWattResult] = useState('');
  const [kwattResult, setKWattResult] = useState('');

  const ampRef = useRef(null);
  const typeRef = useRef(null);
  const voltRef = useRef(null);
  const pfRef = useRef(null);

  const calculate = (e) => {
    e.preventDefault();

    const amp = parseFloat(ampRef.current.value);
    const type = typeRef.current.value;
    const volt = parseFloat(voltRef.current.value);
    const pf = parseFloat(pfRef.current.value) || 1;

    let watts = 0;

    if (type === 'DCAmpereToWatt') {
      watts = amp * volt;
    } else if (type === 'AC1AmpereToWatt') {
      watts = amp * volt * pf;
    } else if (type === 'AC3AmpereToWatt') {
      watts = amp * volt * pf * 1.732;
    }

    setWattResult(watts.toFixed(2));
    setKWattResult((watts / 1000).toFixed(2));
  };

  return (
    <>
      <div className="cards-lg-containers-card">
        <img src={image} alt="Ampere to Watt" />
        <div className="category">
          <div className="subject">
            <h3>Software/Electricity</h3>
          </div>
          <img src={logo} alt="Logo" />
        </div>
        <h2 className="course-title">Ampere TO Watt (Program)</h2>
        <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#A2W">View</button>
        <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#A2WProgram">Program</button>
      </div>

      {/* View Modal */}
      <div className="modal fade" id="A2W" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Ampere TO Watt</h5>
              <button className="btn btn-dark close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h2 className="HeaderStyleH2">Overview</h2>
              <p>
                Amperes and watts are units used to measure electricity. You can convert between them using voltage and power factor.
                This tool provides a calculator and explanation for converting between them.
              </p>
              <hr />
              <h2 className="HeaderStyleH2">Formulas</h2>
              <p><strong>DC:</strong> Watts = Volts × Amperes</p>
              <p><strong>Single-Phase AC:</strong> Watts = Amperes × Volts × Power Factor</p>
              <p><strong>Three-Phase AC:</strong> Watts = Amperes × 1.732 × Volts × Power Factor</p>
              <hr />
              <a href="https://drive.google.com/drive/folders/1mp6H1NPinYgFm1RCAa1NNhMQuP8g7LUR" target="_blank" rel="noreferrer">
                Scientific Papers <FontAwesomeIcon icon={faLink} />
              </a>
            </div>
            <div className="modal-footer">
              <button className="btn btn-dark" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Modal */}
      <div className="modal fade" id="A2WProgram" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Ampere TO Watt</h5>
              <button className="btn btn-dark close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form autoComplete="on">
                <label className="form-label">Type of Current</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    placeholder="Amperes"
                    ref={ampRef}
                    className="form-control"
                    required
                  />
                  <select className="form-control" ref={typeRef}>
                    <option value="DCAmpereToWatt">DC (Direct Current)</option>
                    <option value="AC1AmpereToWatt">AC (Single Phase)</option>
                    <option value="AC3AmpereToWatt">AC (Three Phase)</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Voltage (V)"
                  ref={voltRef}
                  className="form-control mb-3"
                  required
                />
                <input
                  type="text"
                  placeholder="Power Factor (AC only)"
                  ref={pfRef}
                  className="form-control mb-3"
                />

                <button
                  type="button"
                  className="btn btn-dark w-100 mb-3"
                  onClick={calculate}
                >
                  Calculate
                </button>

                <label className="form-label">Watts (W)</label>
                <input
                  type="number"
                  readOnly
                  value={wattResult}
                  className="form-control mb-3"
                  placeholder="Watts"
                />

                <label className="form-label">Kilowatts (kW)</label>
                <input
                  type="number"
                  readOnly
                  value={kwattResult}
                  className="form-control"
                  placeholder="Kilowatts"
                />
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-dark" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ampere2Watt;