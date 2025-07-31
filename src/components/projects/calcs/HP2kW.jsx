import { useState } from 'react';
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from '../assets/horsepower_to_kilowatt_conversion_program.jpg';
import logo from '../assets/logo.png';

const HP_TO_KW = 0.746;

const HP2KWConverter = () => {
    const [hpValue, setHpValue] = useState('');
    const [kwValue, setKwValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleHpInput = (event) => {
        setHpValue(event.target.value);
        setKwValue('');
    };

    const convertHpToKw = (hp) => {
        return (hp * HP_TO_KW).toFixed(3);
    };

    const calculateConversion = (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (hpValue && !isNaN(hpValue)) {
            const result = convertHpToKw(parseFloat(hpValue));
            setKwValue(result);
        } else {
            setErrorMessage('Please enter a valid number for HP');
        }
    };

    return (
        <>
            <div className="cards-lg-containers-card">
                <img src={image} alt="Conversion Program" />
                <div className="category">
                    <div className="subject">
                        <h3>Software/Physics</h3>
                    </div>
                    <img src={logo} />
                </div>
                <h2 className="course-title">Horse-power TO Kilowatts (program)</h2>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#HP2KW">View</button>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#HP2KWProg">Program</button>
            </div>
            <div className="modal fade" id="HP2KW" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title HeaderStyleH2" id="exampleModalLongTitle">Electrical-Consumption</h5>
                            <button type="button" className="btn btn-dark close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h2 className='HeaderStyleH2'>Conversion Table (HP to kW)</h2>
                            <table className="table table-striped table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Horsepower (HP)</th>
                                        <th>Kilowatts (kW)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((hp) => (
                                        <tr key={hp}>
                                            <td>{hp}</td>
                                            <td>{(hp * HP_TO_KW).toFixed(3)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <a href="https://drive.google.com/drive/folders/1mp6H1NPinYgFm1RCAa1NNhMQuP8g7LUR" target="_blank" rel="noopener noreferrer">
                                Scientific Papers <FontAwesomeIcon icon={faLink} />
                            </a>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="HP2KWProg" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title HeaderStyleH2" id="exampleModalLongTitle">Horse-power TO Kilowatts</h5>
                            <button type="button" className="btn btn-dark close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <h1>Horsepower (HP) to Kilowatt (kW) Converter</h1>
                                <form>
                                    <label className='form-label w-100'>
                                        Enter Power in Horsepower (HP):
                                        <input
                                            type="number" className='form-control mt-2 mb-2'
                                            value={hpValue}
                                            onChange={handleHpInput}
                                            placeholder="Enter HP"
                                            step="0.1"
                                        />
                                    </label>
                                    <button className='btn w-100 d-block mt-2' onClick={calculateConversion}>Convert</button>

                                    <label className='form-label w-100'>
                                        Power in Kilowatts (kW):
                                        <input
                                            type="text" className='form-control mt-2 mb-2'
                                            value={kwValue} readOnly placeholder="Power in KW"
                                        />
                                    </label>
                                </form>
                                {errorMessage && <p className="text-danger">{errorMessage}</p>}
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
};

export default HP2KWConverter;