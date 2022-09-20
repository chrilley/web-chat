import React from "react";
import ReactDOM from "react-dom/client";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            hasError: false
        }
    }

    componentDidCatch(error) {
        console.log(error);
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error: error.toString() };
    }

    refresh() {
        window.location.reload();
    }

    render() {
        return (
            this.state.hasError ?
                <>
                    <div className='error-message'>{this.state.error}</div>
                    <button className='btn' onClick={this.refresh}>Refresh</button>
                </>
                : this.props.children
        )
    }
}