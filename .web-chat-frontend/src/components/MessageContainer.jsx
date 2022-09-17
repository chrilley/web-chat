import React from "react"
import ReactDOM from "react-dom/client"

const MessageContainer = ({ messages }) => {
    console.log('Message-cointainer updated!', messages);
    return (
        <div className='message-container'>
            {messages.map((msg, index) =>
                <div key={index} className='user-message'>
                    <div className='message'>{msg.message}</div>
                    <div className='from-user'>{msg.user}</div>
                </div>
            )}
        </div>)
}

export default MessageContainer;