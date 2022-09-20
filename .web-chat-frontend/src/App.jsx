'use strict';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Chat } from './components/Chat';
import Lobby from './components/Lobby';
import Footer from './components/Footer';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            connection: null,
            messages: [],
            users: [],
            error: null,
            hasError: false
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
            this.setState({ error: error });
            this.setState({ hasError: true });
        }
    }

    closeConnection = async () => {
        try {
            await this.state.connection.stop();
        } catch (error) {
            this.setState({ error: error });
            this.setState({ hasError: true });
        }
    }

    sendMessage = async (message) => {
        try {
            await this.state.connection.invoke("SendMessage", message)
        } catch (error) {
            this.setState({ error: error });
            this.setState({ hasError: true });
        }
    }

    refresh = () => {
        window.location.reload();
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <div className='error-message'>
                        {this.state.error.toString()}
                        <button className='btn' onClick={this.refresh}>Refresh</button>
                    </div>

                </>)
        }
        return (
            <>
                <div className='App'>
                    <div className='header no-select'>
                        <h2>Web Chat</h2>
                    </div>
                    {!this.state.connection ? <Lobby joinRoom={this.joinRoom} /> : <Chat messages={this.state.messages} sendMessage={this.sendMessage} closeConnection={this.closeConnection} users={this.state.users} />}
                    <Footer />
                </div>
            </>
        )
    }
}
