import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faAward } from "@fortawesome/free-solid-svg-icons/faAward";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Achievments() {
    const AnchorStyle = {
        fontSize: "18px",
        textDecoration: "none",
    }

    const ParagraphStyle = {
        fontWeight: "bold",
        fontSize: "18px",
        color: "#000"
    }

    return (
        <>
            <section className="cards-lg-containers" id="cards-lg-containers">
                <header className="section-header">
                    <div className="header-text">
                        <h1>Our Achievments</h1>
                        <p style={{ color : "#000", fontWeight : "bold", fontSize : "18px" }}>
                            These awards that we've obtained,
                            you can now view our certificates - awards,
                            Welcome to our gallery!.
                        </p>
                    </div>
                    <button className="cards-lg-containers-btn btn" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Consultations Form
                    </button>
                    <a style={AnchorStyle}
                        href="https://drive.google.com/drive/folders/1kRrhAZokFGh8P3DNR8rIo-a6WUwVcd17" target="_blank">
                        <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faAward} />
                        Certificates
                    </a>
                </header>
                <div className="cards-lg-containers-contents">
                    {/* <!-- BASEF24 Program Starts --> */}
                    <div className="cards-lg-containers-card">
                        <img src="https://img.peapix.com/2622272799050844425_UHD.jpg?attachment&modal" />
                        <h2 className="course-title">BASEF 2024</h2>
                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#BASEF24">View</button>
                    </div>
                    <div className="modal fade" id="BASEF24" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">BASEF 2024</h5>
                                    <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="alert alert-success">
                                        <p style={ParagraphStyle}>
                                            BASEF 2024 - Bronze Medal Winners at the republican science
                                            and engineering fair - Software systems branch.
                                        </p>
                                    </div>
                                    <a href="https://drive.google.com/drive/folders/1mp6H1NPinYgFm1RCAa1NNhMQuP8g7LUR"
                                        target="_blank">Abstracts/Presentations
                                        <FontAwesomeIcon icon={faLink} />
                                    </a>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- BASEF24 Program Ends --> */}
                    {/* <!-- IEEE Program Starts --> */}
                    <div className="cards-lg-containers-card">
                        <img src="https://i.ytimg.com/vi/wHz12mg5MQ4/maxresdefault.jpg" />
                        <h2 className="course-title">IEEE YESIST12 Junior Einstein</h2>
                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#IEEE">View</button>
                    </div>
                    <div className="modal fade" id="IEEE" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">IEEE YESIST12 Junior Einstein</h5>
                                    <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="alert alert-success">
                                        <p style={ParagraphStyle}>
                                            IEEE YESIST12 Junior Einstein 2024 - 1st Place Winners (National Level),
                                            Qualified to complete the international competition in Tunisia.
                                        </p>
                                    </div>
                                    <a href="https://drive.google.com/drive/folders/1mp6H1NPinYgFm1RCAa1NNhMQuP8g7LUR"
                                        target="_blank">Abstracts/Presentations
                                        <FontAwesomeIcon icon={faLink} />
                                    </a>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- IEEE Program Ends --> */}
                    {/* <!-- NCCSI Program Starts --> */}
                    <div className="cards-lg-containers-card">
                        <img
                            src="https://media.licdn.com/dms/image/D4D22AQGYf8O7059Jiw/feedshare-shrink_800/0/1717161113360?e=2147483647&v=beta&t=hH-NNzss8KJjowZys8ylGlT3L3Q0_B_MPyHLgZQrYYE" />
                        <h2 className="course-title">NCCSI 2024</h2>
                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#NCCSI">View</button>
                    </div>
                    <div className="modal fade" id="NCCSI" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">NCCSI 2024</h5>
                                    <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="alert alert-success">
                                        <p style={ParagraphStyle}>
                                            We are among the projects nominated to participate in the National Competition for
                                            Creative
                                            Sustainable Ideas National Competition for Creative Sustainable Ideas (NCCSI)
                                            On the sidelines of the Fourth International Telecommunications Conference ITC Egypt
                                            2024.
                                        </p>
                                    </div>
                                    <a href="https://drive.google.com/drive/folders/1mp6H1NPinYgFm1RCAa1NNhMQuP8g7LUR"
                                        target="_blank">Abstracts/Presentations
                                        <FontAwesomeIcon icon={faLink} />
                                    </a>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- NCCSI Program Ends --> */}
                    {/* <!-- SRTA Program Starts --> */}
                    <div className="cards-lg-containers-card">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/2/25/SRTA-City.jpg" />
                        <h2 className="course-title">City of Scientific Research and Technological Applications - Approval Of Scientific Research</h2>
                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#SRTA">View</button>
                    </div>
                    <div className="modal fade" id="SRTA" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">SRTA - Approval Of Scientific Research</h5>
                                    <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="alert alert-success">
                                        <p style={ParagraphStyle}>
                                            We have been granted the required scientific research credits by the
                                            City of Scientific Research and Technological Applications located
                                            in the new city of Burj Al Arab,
                                            and our project has now been officially approved by a committee and body of senior scientists.
                                        </p>
                                    </div>
                                    <a href="https://drive.google.com/drive/folders/1mp6H1NPinYgFm1RCAa1NNhMQuP8g7LUR"
                                        target="_blank">Approval of scientific research
                                        <FontAwesomeIcon icon={faLink} />
                                    </a>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- SRTA Program Ends --> */}
                </div>
            </section>

            {/* <!-- Consultations Area Starts --> */}
            <div id="feedback-form-wrapper">
                <div id="feedback-form-modal">
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Consultations Form</h5>
                                    <button type="button" className="btn btn-danger close" data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            <label for="exampleFormControlTextarea1">How likely you would like to recommand
                                                us to your friends?</label>
                                            <div className="rating-input-wrapper d-flex justify-content-between mt-2">
                                                <label><input type="radio" name="rating" /><span
                                                    className="border rounded px-3 py-2">1</span></label>
                                                <label><input type="radio" name="rating" /><span
                                                    className="border rounded px-3 py-2">2</span></label>
                                                <label><input type="radio" name="rating" /><span
                                                    className="border rounded px-3 py-2">3</span></label>
                                                <label><input type="radio" name="rating" /><span
                                                    className="border rounded px-3 py-2">4</span></label>
                                                <label><input type="radio" name="rating" /><span
                                                    className="border rounded px-3 py-2">5</span></label>
                                                <label><input type="radio" name="rating" /><span
                                                    className="border rounded px-3 py-2">6</span></label>
                                                <label><input type="radio" name="rating" /><span
                                                    className="border rounded px-3 py-2">7</span></label>
                                                <label><input type="radio" name="rating" /><span
                                                    className="border rounded px-3 py-2">8</span></label>
                                                <label><input type="radio" name="rating" /><span
                                                    className="border rounded px-3 py-2">9</span></label>
                                                <label><input type="radio" name="rating" /><span
                                                    className="border rounded px-3 py-2">10</span></label>
                                            </div>
                                            <div className="rating-labels d-flex justify-content-between mt-3 mb-3">
                                                <label>Very unlikely</label>
                                                <label>Very likely</label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label for="input-one">What made you leave us so early?</label>
                                            <input type="text" className="form-control" id="input-one" placeholder="" />
                                        </div>
                                        <div className="form-group">
                                            <label for="input-two">Would you like to say something?</label>
                                            <textarea className="form-control" id="input-two" rows="3"></textarea>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <input type="submit" value="Submit" className="btn btn-success"/>
                                    <input type="submit" data-bs-dismiss="modal" value="Close" className="btn btn-danger"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Consultations Area Ends --> */}
        </>
    );
}

export default Achievments;