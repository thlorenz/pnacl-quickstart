'use strict';

var HelloTutorialModule;
var statusText = 'NO-STATUS';

function onmoduleLoaded() {
  HelloTutorialModule = document.getElementById('hello_tutorial');
  updateStatus('SUCCESS');
  
  HelloTutorialModule.postMessage('hello');
}

function onMessage(e) {
  console.log(e.data);
}

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
