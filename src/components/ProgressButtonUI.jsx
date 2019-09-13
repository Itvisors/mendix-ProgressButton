import { Component, createElement } from "react";
import ProgressButton from 'react-progress-button'

export class ProgressButtonUI extends Component {
    constructor(props) {
        super(props);
      }

    render() {
        return <ProgressButton 
            onClick = {this.props.onButtonClick}
            state = {this.props.buttonState}
            durationError = {this.props.durationError}
            durationSuccess = {this.props.durationSuccess}
            onError = {this.props.onError}
            onSuccess = {this.props.onSuccess}
            >
                {this.props.buttonText}
            </ProgressButton>;
    }
}
