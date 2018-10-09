// =================
// Node only
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// =================

var XHR = new XMLHttpRequest();

XHR.onreadystatechange = function() {
    console.log('READY STATE IS...', XHR.readyState);
    if(XHR.readyState == 4){
        if(XHR.status == 200) {
            console.log(XHR.responseText);
        } else {
            console.log('There was a problem');
        }
    }
}

XHR.open('GET', 'https://api.github.com/zen');
XHR.send();