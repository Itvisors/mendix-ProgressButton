import { Component, createElement } from "react";
import { hot } from "react-hot-loader/root";

import { ProgressButtonUI } from "./components/ProgressButtonUI";
import "./ui/ProgressButton.css";

class ProgressButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonState: ''
        };
        this.onButtonClick = this.clickButton.bind(this);
        this.onError = this.errorAction.bind(this);
        this.onSuccess = this.successAction.bind(this);
    }

    componentDidUpdate (prevProps) {
        // If component is currently in state loading, the button has been clicked before. 
        // Check whether the prop actionSucceeded did change and change the state
        if (this.state.buttonState === 'loading' && this.props.actionSucceeded !== prevProps.actionSucceeded){
            if (this.props.actionSucceeded.value === 'success') {
                this.setState({buttonState: 'success'});
            } else if (this.props.actionSucceeded.value === 'error') {
                this.setState({buttonState: 'error'});
            } else {
                this.setState({buttonState: ''});
            }
            this.props.actionSucceeded.setValue('');
        // Check if the disabled prop changed and if so, disable or enable the button
        } else if (this.props.buttonDisabled !== prevProps.buttonDisabled) {
            if (this.props.buttonDisabled.value) {
                this.setState({buttonState: 'disabled'});
            } else {
                this.setState({buttonState: ''});
            }
        }
    }

    clickButton() {
        // Execute the onclick action if there is one
        if (this.props.onClickAction && this.props.onClickAction.canExecute) {
            //switch layout to loading, untill this.props.actionSucceeded is changed
            this.setState({buttonState: 'loading'});
            this.props.onClickAction.execute();
        }
    }

    errorAction() {
        // Execute the onError action if there is one
        if (this.props.onError && this.props.onError.canExecute) {
            this.props.onError.execute();
        }
    }

    successAction() {
        // Execute the onSuccess action if there is one
        if (this.props.onSuccess && this.props.onSuccess.canExecute) {
            this.props.onSuccess.execute();
        }
    }

    render() {
        return <ProgressButtonUI 
            buttonText = {this.props.buttonText.value}
            buttonState = {this.state.buttonState}
            onButtonClick = {this.onButtonClick}
            durationError = {this.props.durationError}
            durationSuccess = {this.props.durationSuccess}
            onError = {this.onError}
            onSuccess = {this.onSuccess} 
        />;
    }
}

export default hot(ProgressButton);
