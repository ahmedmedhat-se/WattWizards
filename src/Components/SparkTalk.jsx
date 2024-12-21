import React, { useState, useRef, useEffect } from "react";

const SparkTalk = () => {
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState([
        { content: "Welcome! How can I assist you today? Type 'help' for commands.", className: "incoming" },
    ]);

    const predefinedCommands = {
        help: "Here are the available commands: 'help', 'about', 'contact', 'exit', 'project', 'objectives', 'methodology', 'features', 'testing', 'results', 'conclusion', 'references'.",
        about: "I am SparkTalk, your friendly assistant. I can help you with various tasks. Just type one of the available commands.",
        contact: "You can contact us via email at support@example.com or call us at 123-456-7890.",
        exit: "Thanks for chatting with me! Have a great day!",
        project: "The WattWizards project is a multi-platform application developed to assist electrical engineers and technicians with accurate and efficient electrical circuit analysis and calculations. The application is designed to minimize errors, save time, and improve workflow efficiency in workshop and factory environments.",
        objectives: "Project Objectives: \n1. Improve accuracy in electrical calculations and circuit analysis. \n2. Provide an intuitive and user-friendly interface. \n3. Ensure cross-platform availability (desktop, web). \n4. Integrate tools to enhance UX, such as an AI-based chatbot. \n5. Maintain flexibility for future updates.",
        methodology: "The project was developed using the Agile SDLC methodology, which emphasizes iterative development, collaboration, and adaptability. Key stages included: \n1. Planning and Requirement Analysis: Data collection through surveys to understand user needs. \n2. Design and Prototyping: Development of wireframes and prototypes. \n3. Development: Transition from an Excel-based tool to a Python desktop app, followed by a web app with AI integration. \n4. Testing and Deployment: Iterative testing and deployment based on feedback.",
        features: "Key Features: \n1. Calculation Tools: Automated complex electrical computations with real-time error detection. \n2. AI Chatbot: Initially developed with React.js and OpenAI's API, now redesigned as a command-based tool. \n3. Responsive Design: UI works across desktops, tablets, and mobile devices. \n4. Cross-Platform Functionality: Designed for both desktop and web environments, with plans for mobile expansion.",
        testing: "Testing Process: \n1. Unit testing and integration testing after each sprint. \n2. Usability testing with engineers and technicians to validate UX improvements. \n3. Continuous testing throughout the development process to ensure reliability and functionality.",
        results: "Results: \n1. Positive feedback from engineers and technicians about improved calculation accuracy and time efficiency. \n2. Successful adoption and increased productivity. \n3. Transitioned from basic prototypes to a scalable, fully functional web application.",
        conclusion: "The project successfully delivered a robust, user-friendly application to address calculation challenges in electrical engineering. Future improvements will focus on enhancing the AI chatbot with natural language processing (NLP), expanding mobile application functionality, and introducing multilingual support.",
        references: "References: \n1. IEEE Organization. Power Factor Correction Solutions and Applications. \n2. Iowa State University Extension and Outreach. Conversion of Electrical Units. \n3. University of Texas at Dallas. Electricity and Magnetism Equation Sheet. \n4. Al-Suwaidi Catalogue. Power Cables."
    };

    const createBotList = (message, className) => ({
        content: message,
        className: className,
    });

    const handleCommand = (command) => {
        const response = predefinedCommands[command.toLowerCase()];
        if (response) {
            const botMessage = createBotList(response, "incoming");
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } else {
            const botMessage = createBotList("Sorry, I don't recognize that command. Type 'help' for a list of available commands.", "incoming error");
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
    };

    const handleSend = () => {
        if (!userInput.trim()) return;
        const outgoingMessage = createBotList(userInput, "outgoing");
        setMessages((prevMessages) => [...prevMessages, outgoingMessage]);
        setUserInput("");

        setTimeout(() => {
            handleCommand(userInput);
        }, 600);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            handleSend();
        }
    };

    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
    };

    const chatContainerRef = useRef(null);
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="bot-container">
            {!isChatVisible && (
                <button className="open-chat-btn" onClick={toggleChatVisibility}>
                    <i className="fas fa-robot"></i>
                </button>
            )}

            {isChatVisible && (
                <div className="SparkTalk">
                    <header>
                        <h2>SparkTalk</h2>
                        <button className="close-chat-btn" onClick={toggleChatVisibility}>
                            &#10005;
                        </button>
                    </header>

                    <ul className="electrochat" ref={chatContainerRef}>
                        {messages.map((msg, index) => (
                            <li key={index} className={`message ${msg.className}`}>
                                {msg.className === "incoming" && <span className="far fa-comment-alt"></span>}
                                <p>{msg.content}</p>
                            </li>
                        ))}
                    </ul>

                    <div className="bot-input">
                        <input
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message here..."
                            required
                        />
                        <span id="send-btn" className="fas fa-paper-plane" onClick={handleSend}></span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SparkTalk;