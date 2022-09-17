'use strict';
import React from "react";
import ReactDOM from 'react-dom/client';
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

export class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: props.messages,
            sendMessage: props.sendMessage
        }
    }

    componentDidMount() {
        console.log(this.state.messages);
    }

    componentDidUpdate(){
        console.log(this.state.messages);
    }

    render() {
        return (
            <div className='chat'>
                <MessageContainer messages={this.props.messages} />
                <SendMessageForm sendMessage={this.state.sendMessage}></SendMessageForm>
            </div>
        )
    }
}