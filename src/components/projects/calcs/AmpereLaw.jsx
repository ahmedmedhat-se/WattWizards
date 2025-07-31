import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../assets/logo.png';
import image from "../assets/images/Ampere.jpg";

function Ampere() {
    return (
        <>
            <div className="cards-lg-containers-card">
                <img src={image} />
                <div className="category">
                    <div className="subject">
                        <h3>Software/Physics</h3>
                    </div>
                    <img src={logo}/>
                </div>
                <h2 className="course-title">Andre-Marie Ampere's Law</h2>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#AMA">View</button>
            </div>
            <div className="modal fade" id="AMA" tabIndex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Andre-Marie Ampere's Law</h5>
                            <button type="button" className="btn btn-dark close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h2 className='HeaderStyleH2'>Andre-Marie Ampere's Law</h2>
                            <p>
                                The law that defines the unit of the ampere is based on the force between two parallel conductors carrying electric current. <br />
                                This is articulated in the formal definition of the ampere, which is one of the seven base units in the International System of Units (SI). <br />
                                It can be stated as follows: <br />
                                The ampere is defined as the constant current which, if maintained in two straight parallel conductors of infinite length, of negligible circular cross-section, and placed one meter apart in vacuum, would produce a force equal to (2 * 10^(-7)) newton per meter of length between these conductors. <br />
                                Formally, it can be expressed as: <br />
                                "The ampere is that constant current which, if maintained in two straight parallel conductors of infinite length, of negligible circular cross-section, <br />
                                and placed one meter apart in vacuum, would produce between these conductors a force equal to ((2 * 10^-7)) newton per meter of length." <br />
                                This definition reflects Ampère's contributions to the understanding of the relationship between electric currents and the magnetic forces they produce. <br /><br /><hr />
                            </p>
                            <a href="https://drive.google.com/drive/folders/1mp6H1NPinYgFm1RCAa1NNhMQuP8g7LUR"
                                target="_blank">Scientific Papers
                                <FontAwesomeIcon icon={faLink} />
                            </a>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ampere;