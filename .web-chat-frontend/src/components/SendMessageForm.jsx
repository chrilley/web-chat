import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";

const SendMessageForm = ({ sendMessage }) => {

    const [message, setMessage] = useState('');
    return (
        <>
            <form className='message-form' onSubmit={e => {
                e.preventDefault();
                sendMessage(message);
                setMessage('');
            }}>
                <input className='message-box' placeholder='Type message...' onChange={e => setMessage(e.target.value)} value={message}></input>
                <button className='btn message-send' type='submit' disabled={!message}>Send Message</button>
            </form>
        </>

    )
}

export default SendMessageForm;