## ProgressButton
Widget used to show a button that shows a progress circle while the onclick action is running and visualizes the outcome of the action. Widget is based on https://github.com/mathieudutour/react-progress-button

## Features
- Visualizes when a microflow is busy by showing a progress circle
- Visualizes the outcome of an action (error or success)
- Perform an action on error and on success
- Possibility to disable the button

## Typical usage scenario
- When you have a long running microflow after a button and want to show that the microflow is busy and freeze the button, but do not want to freeze the complete screen.
- When you want to provide feedback (whether it was a success or not) without showing a popup.

## Configuration
### General
- Button text: Text to show on the button (translatable and other variables can be used)
- Duration success: Time (in ms) how long the button will show the success state
- Duration error: Time (in ms) how long the button will show the success state
- Button disabled: Boolean attribute that can be used to disable the button, such that this can be controlled during runtime
- Button type: To set the styling of the button to the mendix styling. Note that if you changed the button classes yourself, you have to do the same for this widget. A class will be set on the widgets outer div element (pbdefault for default, pbsuccess for success, etc.)
- Button width: How to determine the width of the button, can be fit-content, full-width, pixels, or percentage
- Percentage / pixels: If one of these 2 options is chosen, what should be the value.

### Events
- On click action: Action to be called when button is clicked. To use the widget, this has to be a nanoflow or microflow.
- Action feedback: String attribute that has to be set within the on click action to provide feedback to the user. It can be set to 'error', 'success', or 'none'. Note: This attribute is also used and changed by the widget.
- On success action: Action to be called when the 'Action feedback' was set to success. This action will be called after the 'Duration success'
- On error action: Action to be called when the 'Action feedback' was set to error. This action will be called after the 'Duration error'
