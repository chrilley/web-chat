'use strict';
import React from "react";
import ReactDOM from 'react-dom/client';
import MessageContainer from "./MessageContainer";

export class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: props.messages
        }
    }

    componentDidMount() {
        console.log(this, 'Mounted.');
    }

    render() {
        return (
            <div className='chat'>
                <MessageContainer messages={this.state.messages} />
            </div>
        )
    }
}