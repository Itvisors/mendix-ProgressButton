## ProgressButton
Widget used to show a button that shows a progress circle when being clicked and visualized the outcome of the action. Widget is based on https://github.com/mathieudutour/react-progress-button

## Features
- Visualizes when a microflow is busy by showing a progress circle
- Visualizes the outcome of an action (error or success)
- Perform another action on error
- Perform another action on success
- Disable the button

## Typical usage scenario
- When you have a long running microflow after a button and want to show that the microflow is busy and freeze the button, but do not want to freeze the complete screen.
- When you want to provide feedback (whether it was a success or not) without showing a popup.

## Configuration
### General
- Button text: Text to show on the button (translatable and other variables can be used)
- Duration success: Time (in ms) how long the button will show the success state
- Duration error: Time (in ms) how long the button will show the success state
- Button disabled: Boolean attribute that can be used to disable the button, such that this can be controlled during runtime

### Events
- On click action: Action to be called when button is clicked
- Action feedback: String attribute that has to be set within the on click action to provide feedback to the user. It can be set to 'error', 'success', or 'none'. Note: This attribute is also used and changed by the widget.
- On success action: Action to be called when the 'Action feedback' was set to success. This action will be called after the 'Duration success'
- On error action: Action to be called when the 'Action feedback' was set to error. This action will be called after the 'Duration error'
