import { faMobile, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons/faPaperclip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import features from "../Env/features.json";

function Features() {
    return (
        <section className="features" id="features">
            <header className="section-header">
                <h1>{features.sectionHeader.title}</h1>
                <p>{features.sectionHeader.description}</p>
            </header>

            <div className="features-contents">
                <div className="features-box">
                    <div className="features-icon">
                        <FontAwesomeIcon icon={faUsers} />
                    </div>
                    <div className="features-desc">
                        <h2>{features.community.title}</h2>
                        <p>{features.community.description}</p>
                    </div>
                </div>

                <div className="features-box">
                    <div className="features-icon">
                        <FontAwesomeIcon icon={faPaperclip} />
                    </div>
                    <div className="features-desc">
                        <h2>{features.features.title}</h2>
                        <p>{features.features.description}</p>
                    </div>
                </div>

                <div className="features-box">
                    <div className="features-icon">
                        <FontAwesomeIcon icon={faMobile} />
                    </div>
                    <div className="features-desc">
                        <h2>{features.mobile.title}</h2>
                        <p>{features.mobile.description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Features