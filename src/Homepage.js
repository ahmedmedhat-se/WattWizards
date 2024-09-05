import Features from "./Features.js";
import Programs from './Programs';
import Achievments from './Achievments';
import SparkTalk from "./SparkTalk.js";

function Homepage() {
    return (
        <>
            <div className='home-landing'>
                <section className='home' id='home'>
                    <div className='CodeCrafters'>
                        <div className='CodeCrafters-desc'>
                            <h2>CodeCrafters Team</h2>
                            <p style={{ fontWeight: "bold", fontSize: "1.2rem", wordSpacing: "2px" }}>CodeCrafters developed an innovative web/mobile application that serves as a versatile software tool, addressing numerous challenges in the electricity sector. Our groundbreaking work has earned us numerous national competition victories, qualification for international competitions, and recognition as one of the top 1,000 projects worldwide.</p>
                        </div>
                        <div className="CodeCrafters-img">
                            <div className="CodeCrafters-img-container">
                                <img
                                    src="https://images.credly.com/images/d30e23c4-60cb-4a5d-b826-b0cd4a9cb0bc/profile_img.jpg" />
                            </div>
                        </div>
                        <div className="box">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </section>
            </div>
            <SparkTalk />
            <Features />
            <Programs />
            <Achievments />
        </>
    )
};

export default Homepage;