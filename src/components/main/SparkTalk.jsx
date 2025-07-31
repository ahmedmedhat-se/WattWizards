import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/spark-talk.css";

const SparkTalk = () => {
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState([
        {
            content: "Welcome! Type 'help' for commands or enter a '/path' to navigate.",
            className: "incoming",
            timestamp: new Date().toLocaleString(undefined, {
                weekday: 'short',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }),
        },
    ]);

    const navigate = useNavigate();

    const routes = [
        { path: '/wattwizards', name: 'Home' },
        { path: '/wattwizards/programs', name: 'Programs' },
        { path: '/wattwizards/workspace', name: 'Workspace' },
        { path: '/wattwizards/vault', name: 'CircuitVault' },
        { path: '/wattwizards/login', name: 'Login' },
        { path: '/wattwizards/profile', name: 'Profile' },
        { path: '/wattwizards/project', name: 'DevSync' },
        { path: '/wattwizards/products', name: 'Product' },
        { path: '/wattwizards/cart', name: 'Cart' },
    ];

    const predefinedCommands = {
        hi: "Hi, I am SparkTalk if you need my help, just type help.",
        help: "Commands: 'help', 'about', 'contact', 'exit', 'manual'. You can also enter '/path' to navigate.",
        about: "I am SparkTalk, your assistant for navigating WattWizards and providing guidance.",
        contact: "For support, email us at xoperations.contact@gmail.com",
        exit: "Thanks for chatting! Have a great day!",
        manual: `WattWizards User Manual:\n1. Navigate to 'Programs' for calculations.\n2. Use 'Workspace' to upload/download files.\n3. Manage data in 'CircuitVault'.\n4. Ensure stable internet for real-time features.\n5. Contact support for troubleshooting.`,
    };

    const createBotList = (message, className) => {
        const now = new Date();
        const timestamp = now.toLocaleString(undefined, {
            weekday: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
        return { content: message, className, timestamp };
    };

    const handleCommand = (command) => {
        if (command.startsWith("/")) {
            const routePath = `/wattwizards${command}`;
            const route = routes.find(r => r.path === routePath);

            if (route) {
                navigate(route.path);
                setMessages(prev => [...prev, createBotList(`Navigating to ${route.name}...`, "incoming")]);
                return;
            }
        }

        const response = predefinedCommands[command.toLowerCase()];
        setMessages(prev => [
            ...prev,
            createBotList(response || "Unknown command. Type 'help'.", "incoming"),
        ]);
    };

    const handleSend = () => {
        if (!userInput.trim()) return;
        setMessages(prev => [...prev, createBotList(userInput, "outgoing")]);
        setUserInput("");
        setTimeout(() => handleCommand(userInput), 600);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSend();
        }
    };

    const toggleChatVisibility = () => setIsChatVisible(!isChatVisible);

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
                    <i className="fas fa-headset"></i>
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
                                <div>
                                    <p>{msg.content}</p>
                                    <small className="timestamp">{msg.timestamp}</small>
                                </div>
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
