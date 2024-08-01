import { faMobile, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons/faPaperclip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Features() {
    return (
        <section className="features" id="features">
            <header className="section-header">
                <h1>Why WattWizards ?</h1>
                <p>We are a team that combines software science and electricity to produce digital solutions to
                    facilitate many complex mathematical operations in the field of electricity. Our team consists of
                    electrical engineers, mobile and web application developers, as well as people working in
                    entrepreneurship and business.</p>
            </header>

            <div className="features-contents">
                <div className="features-box">
                    <div className="features-icon">
                        <FontAwesomeIcon icon={faUsers} />
                    </div>
                    <div className="features-desc">
                        <h2>WattWizards Community</h2>
                        <p>We have created a community for ourselves, which includes many sciences such as software
                            science and electricity under one roof to provide digital solutions</p>
                    </div>
                </div>

                <div className="features-box">
                    <div className="features-icon">
                        <FontAwesomeIcon icon={faMobile}/>
                    </div>
                    <div className="features-desc">
                        <h2>WattWizards Mobile App</h2>
                        <p>A version of our app is now available on mobile devices, and so soon it will be available for
                            iOS users.</p>
                    </div>
                </div>

                <div className="features-box">
                    <div className="features-icon">
                        <FontAwesomeIcon icon={faPaperclip}/>
                    </div>
                    <div className="features-desc">
                        <h2>Creating a community specialized in the field of electricity</h2>
                        <p>Our project has been approved by the Academy of Scientific Research - Department of Software
                            and Computer Systems.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Features