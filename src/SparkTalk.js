import React, { useState } from "react";

const SparkTalk = () => {
    const [isChatVisible, setIsChatVisible] = useState(false);  // To toggle chat visibility
    const [userInput, setUserInput] = useState("");
    const [messages, setMessages] = useState([
        { content: "Welcome, mate :) \nHow Can I help You?", className: "incoming" },
    ]);

    const API_KEY = "sk-proj-H593UuAYWP93ZRzVC28gT3BlbkFJpJE6y7hBP5NcSif4JZxS";

    const createBotList = (message, className) => ({
        content: message,
        className: className,
    });

    const generateAiResponseMessage = () => {
        const OpenAIApi = "https://api.openai.com/v1/chat/completions";
        const messageRequestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userInput }],
            }),
        };

        fetch(OpenAIApi, messageRequestOptions)
            .then((res) => res.json())
            .then((data) => {
                const botMessage = createBotList(
                    data.choices[0].message.content,
                    "incoming"
                );
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            })
            .catch(() => {
                const errorMessage = createBotList(
                    "Sorry, something went wrong. Please try again.",
                    "incoming error"
                );
                setMessages((prevMessages) => [...prevMessages, errorMessage]);
            });
    };

    const handleSend = () => {
        if (!userInput.trim()) return;
        const outgoingMessage = createBotList(userInput, "outgoing");
        setMessages((prevMessages) => [...prevMessages, outgoingMessage]);
        setUserInput("");

        setTimeout(() => {
            const loadingMessage = createBotList("Responding...", "incoming");
            setMessages((prevMessages) => [...prevMessages, loadingMessage]);
            generateAiResponseMessage();
        }, 600);
    };

    // Toggles the chatbot visibility
    const toggleChatVisibility = () => {
        setIsChatVisible(!isChatVisible);
    };

    return (
        <div className="bot-container">
            {/* Icon/button to toggle chat visibility */}
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
                    <ul className="electrochat">
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
