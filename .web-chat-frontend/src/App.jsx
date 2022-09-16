'use strict';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Chat } from './views/Chat';

export class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <>
                <Chat />
            </>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);