import { createRef, Component, createElement } from "react";
import { hot } from "react-hot-loader/root";

import { ProgressButtonUI } from "./components/ProgressButtonUI";
import "./ui/ProgressButton.css";
import "./ui/ProgressButtonTypes.css";

class ProgressButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonState: '',
            buttonWidth: null,
            buttonHeight: null         
        };
        this.onButtonClick = this.clickButton.bind(this);
        this.onError = this.errorAction.bind(this);
        this.onSuccess = this.successAction.bind(this);
        this.progressButton = createRef();
    }

    componentDidUpdate (prevProps) {
        // If component is currently in state loading, the button has been clicked before. 
        // Check whether the prop actionSucceeded did change and change the state
        if (this.state.buttonState === 'loading' && this.props.actionSucceeded.value !== prevProps.actionSucceeded.value){
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
        //check if button not already clicked
        if (this.state.buttonState === '') {
            //Get height and width of button, and set them to the state, such that render can use these dimensions
            var height = this.progressButton.current.clientHeight;
            var width = this.progressButton.current.clientWidth;
            this.setState({buttonWidth: width});
            this.setState({buttonHeight: height});
            // Execute the onclick action if there is one
            if (this.props.onClickAction && this.props.onClickAction.canExecute) {
                //Switch layout to loading, untill this.props.actionSucceeded is changed
                this.setState({buttonState: 'loading'});
                this.props.onClickAction.execute();
            }
        }
    }

    errorAction() {
        // Execute the onError action if there is one
        if (this.props.onError && this.props.onError.canExecute) {
            this.props.onError.execute();
        }
        //Set state back to initial value
        this.setState({buttonState: ''});
    }

    successAction() {
        // Execute the onSuccess action if there is one
        if (this.props.onSuccess && this.props.onSuccess.canExecute) {
            this.props.onSuccess.execute();
        }
        //Set state back to initial value
        this.setState({buttonState: ''});
    }

    render() {
        //determine classes (also get mendix classes)
        var className = this.props.buttonType + 'pb ' + this.props.class;
        //Intialize style object to set the width and height. 
        //Height will only be set after the first buttonclick, to make sure it won't change in another state
        var buttonStyle = {};
        //determine width if not yet initialized
        if (this.state.buttonWidth === null) {
            var buttonWidth = '';
            if (this.props.buttonWidth === 'fitcontent') {
                buttonWidth = 'fit-content';
            } else if (this.props.buttonWidth === 'fullwidth') {
                buttonWidth = '100%';
            } else if (this.props.buttonWidth === 'pixels') {
                buttonWidth = this.props.percentageOrPixels + 'px';
            } else {
                buttonWidth = this.props.percentageOrPixels + '%';
            }
            buttonStyle.width = buttonWidth;
        } else {
            buttonStyle.width = this.state.buttonWidth;
        }
        //determine height if not yet initialized
        if (this.state.buttonHeight !== null) {
            buttonStyle.height =  this.state.buttonHeight;
        }
        //set display value to table, since fit-content is not cross-browser compatible
        buttonStyle.display = 'table';

        return <div 
            className = {className}
            style = {buttonStyle}
            ref = {this.progressButton}
            >
            <ProgressButtonUI 
                buttonText = {this.props.buttonText.value}
                buttonState = {this.state.buttonState}
                onButtonClick = {this.onButtonClick}
                durationError = {this.props.durationError}
                durationSuccess = {this.props.durationSuccess}
                onError = {this.onError}
                onSuccess = {this.onSuccess} 
            />
        </div>;
    }
}

export default hot(ProgressButton);
