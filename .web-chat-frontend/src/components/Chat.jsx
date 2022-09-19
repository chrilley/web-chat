'use strict';
import React from "react";
import ReactDOM from 'react-dom/client';
import ConnectedUsers from "./ConnectedUsers";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

export class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: props.messages,
            sendMessage: props.sendMessage,
            users: props.users
        }
    }

    componentDidMount() {
        console.log('chat mounted users', this.state.users);
    }

    componentDidUpdate() {
        console.log('chat updated users', this.state.users);
    }

    render() {
        return (
            <>

                <div className='chat-container'>
                    <ConnectedUsers users={this.state.users} />
                    
                    <div className='chat'>
                        <MessageContainer messages={this.props.messages} />
                        <SendMessageForm sendMessage={this.state.sendMessage}></SendMessageForm>
                    </div>

                    <div className="leave-room">
                        <button className='btn btn-leave-room' onClick={() => this.props.closeConnection()}>Leave Room</button>
                    </div>

                </div>
            </>
        )
    }
}