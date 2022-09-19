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
            messages: [],
            users: []
        }
    }

    joinRoom = async (user, room) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl('https://localhost:44391/chat')
                .configureLogging(LogLevel.Information)
                .build();

            connection.on('UsersInRoom', (users) => {
                this.setState({ users: users });
            });

            connection.on('ReceiveMessage', (user, message) => {
                const newMsg = [...this.state.messages, { user, message }];

                this.setState({ messages: newMsg });
            });

            connection.onclose(e => {
                this.setState({ connection: null });
                this.setState({ messages: [] });
                this.setState({ users: [] });
            })

            await connection.start();
            await connection.invoke('JoinRoom', { user, room });

            this.setState({ connection: connection });

        } catch (error) {
            console.log(error);
        }
    }

    closeConnection = async () => {
        try {
            await this.state.connection.stop();
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
                <div className='header'>
                    <h2>Web Chat</h2>
                </div>
                {!this.state.connection ? <Lobby joinRoom={this.joinRoom} /> : <Chat messages={this.state.messages} sendMessage={this.sendMessage} closeConnection={this.closeConnection} users={this.state.users} />}
            </div>
        )
    }
}
