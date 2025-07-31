import { useState, useRef } from 'react';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../assets/logo.png';
import image from "../assets/images/Volta.jpg";

function Volta() {
  const [result, setResult] = useState('');
  const [calcType, setCalcType] = useState('Voltage');

  const workRef = useRef(null);
  const chargeRef = useRef(null);
  const voltageRef = useRef(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const W = parseFloat(workRef.current?.value);
    const Q = parseFloat(chargeRef.current?.value);
    const V = parseFloat(voltageRef.current?.value);

    let value;

    switch (calcType) {
      case 'Voltage':
        if (!isNaN(W) && !isNaN(Q) && Q !== 0) {
          value = W / Q;
          setResult(`Voltage: ${value.toFixed(2)} volts`);
        } else {
          setResult('Enter valid work and charge values.');
        }
        break;
      case 'Work':
        if (!isNaN(V) && !isNaN(Q)) {
          value = V * Q;
          setResult(`Work Done: ${value.toFixed(2)} joules`);
        } else {
          setResult('Enter valid voltage and charge values.');
        }
        break;
      case 'Charge':
        if (!isNaN(W) && !isNaN(V) && V !== 0) {
          value = W / V;
          setResult(`Charge: ${value.toFixed(2)} coulombs`);
        } else {
          setResult('Enter valid work and voltage values.');
        }
        break;
      default:
        setResult('Invalid calculation type.');
    }
  };

  return (
    <>
      <div className="cards-lg-containers-card">
        <img src={image} alt="Volta" />
        <div className="category">
          <div className="subject">
            <h3>Software/Physics</h3>
          </div>
          <img src={logo} alt="Logo" />
        </div>
        <h2 className="course-title">Alessandro Volta's Law</h2>
        <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#Volta">View</button>
        <button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#volta-program">Program</button>
      </div>

      {/* View Modal */}
      <div className="modal fade" id="Volta" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Alessandro Volta's Law</h5>
              <button className="btn close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h2 className="HeaderStyleH2A">Overview</h2>
              <p>
                Volta's Law relates to the electric potential difference (voltage) between two points.
                It states that the voltage is the work done per unit charge to move a charge between two points in an electric field.
              </p>
              <p><strong>Formula:</strong> V = W / Q</p>
              <ul>
                <li>V = Electric Potential Difference (volts)</li>
                <li>W = Work Done (joules)</li>
                <li>Q = Electric Charge (coulombs)</li>
              </ul>
              <hr />
              <a
                href="https://drive.google.com/drive/folders/1mp6H1NPinYgFm1RCAa1NNhMQuP8g7LUR"
                target="_blank"
                rel="noreferrer"
              >
                Scientific Papers <FontAwesomeIcon icon={faLink} />
              </a>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* Program Modal */}
      <div className="modal fade" id="volta-program" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Alessandro Volta's Law</h5>
              <button className="btn close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="calcType">Calculate</label>
                  <select
                    id="calcType"
                    value={calcType}
                    onChange={(e) => setCalcType(e.target.value)}
                    className="form-control"
                  >
                    <option value="Voltage">Voltage (V = W / Q)</option>
                    <option value="Work">Work (W = V * Q)</option>
                    <option value="Charge">Charge (Q = W / V)</option>
                  </select>
                </div>

                {calcType === 'Voltage' && (
                  <>
                    <div className="form-group">
                      <label>Work Done (W in joules)</label>
                      <input type="number" ref={workRef} className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label>Charge (Q in coulombs)</label>
                      <input type="number" ref={chargeRef} className="form-control" required />
                    </div>
                  </>
                )}

                {calcType === 'Work' && (
                  <>
                    <div className="form-group">
                      <label>Voltage (V in volts)</label>
                      <input type="number" ref={voltageRef} className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label>Charge (Q in coulombs)</label>
                      <input type="number" ref={chargeRef} className="form-control" required />
                    </div>
                  </>
                )}

                {calcType === 'Charge' && (
                  <>
                    <div className="form-group">
                      <label>Voltage (V in volts)</label>
                      <input type="number" ref={voltageRef} className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label>Work Done (W in joules)</label>
                      <input type="number" ref={workRef} className="form-control" required />
                    </div>
                  </>
                )}

                <button
                  type="button"
                  className="btn btn-dark w-100 my-3"
                  onClick={handleCalculate}
                >
                  Calculate
                </button>

                <div className="form-group">
                  <label>Result</label>
                  <input type="text" value={result} readOnly className="form-control" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Volta;