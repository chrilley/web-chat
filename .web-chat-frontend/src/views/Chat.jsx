'use strict';
import React from "react";
import ReactDOM from 'react-dom/client';

export class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        console.log(this, 'Mounted.');
    }

    render() {
        return(
            <>
            <p>Chat Component</p>
            </>
        )
    }
}