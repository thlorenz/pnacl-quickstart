'use strict';

var HelloTutorialModule;
var statusText = 'NO-STATUS';

// Indicate load success.
function onmoduleLoaded() {
  HelloTutorialModule = document.getElementById('hello_tutorial');
  updateStatus('SUCCESS');
  HelloTutorialModule.postMessage('hello');
}

// The 'message' event handler.  This handler is fired when the NaCl module
// posts a message to the browser by calling PPB_Messaging.PostMessage()
// (in C) or pp::Instance.PostMessage() (in C++).  This implementation
// simply displays the content of the message in an alert panel.
function onMessage(e) {
  console.log(e.data);
}

// If the page loads before the Native Client module loads, then set the
// status message indicating that the module is still loading.  Otherwise,
// do not change the status message.
function onpageLoad() {
}

// Set the global status message.  If the element with id 'statusField'
// exists, then set its HTML to the status message as well.
// opt_message The message test.  If this is null or undefined, then
// attempt to set the element with id 'statusField' to the value of
// |statusText|.
function updateStatus(opt_message) {
  if (opt_message)
    statusText = opt_message;
  var statusField = document.getElementById('statusField');
  if (statusField) {
    statusField.innerHTML = statusText;
  }
}

var listener = document.getElementById('listener');
listener.addEventListener('load', onmoduleLoaded, true);
listener.addEventListener('message', onMessage, true);

updateStatus(HelloTutorialModule ? null : 'LOADING...')
