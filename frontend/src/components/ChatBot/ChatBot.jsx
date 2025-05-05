import React, { useState, useRef, useEffect, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './ChatBot.css';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cartItems, food_list, token } = useContext(StoreContext);
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today?", isBot: true }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        // Add user message
        const newMessages = [...messages, { text: inputMessage, isBot: false }];
        setMessages(newMessages);
        setInputMessage('');

        // Simulate bot response
        setTimeout(() => {
            const botResponse = getBotResponse(inputMessage);
            setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
        }, 500);
    };

    const getBotResponse = (message) => {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return "Hi there! How can I assist you today?";
        }
        if (lowerMessage.includes('menu')) {
            return "You can check our menu in the menu section. We have a variety of dishes!";
        }
        if (lowerMessage.includes('delivery')) {
            return "Yes, we offer delivery services. Please check our delivery areas in the mobile app.";
        }
        if (lowerMessage.includes('hours') || lowerMessage.includes('timing')) {
            return "We're open from 10 AM to 10 PM, seven days a week.";
        }
        if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            // Debug: return lowerMessage
            if (!token) {
                return "Please login to check your cart price.";
            }
            if (Object.keys(cartItems).length === 0) {
                return "Add item";
            } else {
                let totalAmount = 0;
                for (const item in cartItems) {
                    if (cartItems[item] > 0) {
                        let itemInfo = food_list.find((product) => product._id === item);
                        if (itemInfo) { // Check if itemInfo is found
                            totalAmount += itemInfo.price * cartItems[item];
                        }
                    }
                }
                return `Your cart total is $${totalAmount.toFixed(2)}`;
            }
        }
        return "I'm not sure about that. Please contact our support team for more information.";
    };

    return (
        <div className="chatbot-container">
            <div className={`chat-window ${isOpen ? 'open' : ''}`}>
                <div className="chat-header">
                    <h3>Chat Support</h3>
                    <button onClick={toggleChat} className="close-btn">&times;</button>
                </div>
                <div className="messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.isBot ? 'bot' : 'user'}`}>
                            {message.isBot && <div className="bot-icon">🤖</div>}
                            <p>{message.text}</p>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSubmit} className="input-form">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
            <button onClick={toggleChat} className="chat-toggle-btn">
                {isOpen ? '×' : '💬'}
            </button>
        </div>
    );
};

export default ChatBot; 