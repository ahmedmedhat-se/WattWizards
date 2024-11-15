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
                            <p style={{ fontWeight: "bold", fontSize: "1.2rem", wordSpacing: "2px" }}>CodeCrafters developed an innovative web application that serves as a versatile software tool, 
                            addressing numerous challenges in the electricity sector. 
                            Our groundbreaking work has earned us numerous national competition victories, 
                            qualification for international competitions, and recognition as one of the top 1,000 projects worldwide.</p>
                        </div>
                        <div className="CodeCrafters-img">
                            <div className="CodeCrafters-img-container">
                                <img
                                    src="https://img.freepik.com/premium-photo/electrical-engineer-hd-image_1012565-6359.jpg"/>
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
        </>
    )
};

export default Homepage;