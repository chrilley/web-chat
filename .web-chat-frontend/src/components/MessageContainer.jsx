import React from "react"
import ReactDOM from "react-dom/client"
import { useEffect, useRef } from "react";

const MessageContainer = ({ messages }) => {
    // Scroll MessageContainer every time the messages stack updates.
    const messageRef = useRef();

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({
                left: 0, top: scrollHeight - clientHeight,
                behavior: 'smooth'
            });
        }
    },[messages]);

    return (
        <div className='message-container'>
            {messages.map((msg, index) =>
                <div key={index} className='user-message'>
                    <div className='from-user'>{msg.user}</div>
                    <div className='message'>{msg.message}</div>
                </div>
            )}
        </div>)
}

export default MessageContainer;