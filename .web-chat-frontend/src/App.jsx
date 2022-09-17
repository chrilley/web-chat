'use strict';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Chat } from './components/Chat';
import Lobby from './components/Lobby';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            connection: null,
            messages: []
        }
    }
    componentDidUpdate() {
        console.log('App updated:', this.state.messages);
    }

    joinRoom = async (user, room) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl('https://localhost:44391/chat')
                .configureLogging(LogLevel.Information)
                .build();

            connection.on('ReceiveMessage', (user, message) => {
                console.log('message received:', message);
                const newMsg = [...this.state.messages, { user, message }];
 
                this.setState({ messages: newMsg })
            });

            await connection.start();
            await connection.invoke('JoinRoom', { user, room });

            this.setState({ connection: connection });

        } catch (error) {
            console.log(error);
        }
    }

    sendMessage = async (message) => {
        try {
            await this.state.connection.invoke("SendMessage", message)
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className='App'>
                <h2>Chat Service</h2>
                {!this.state.connection ? <>Disconnected</> : <>Connected</>}
                {!this.state.connection ? <Lobby joinRoom={this.joinRoom} /> : <Chat messages={this.state.messages} sendMessage={this.sendMessage} />}
            </div>
        )
    }
}
