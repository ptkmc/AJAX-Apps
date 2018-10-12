const url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
const quote = document.querySelector('#quote');

document.querySelector('#xhr').addEventListener('click', retrieveWithXHR);
document.querySelector('#fetch').addEventListener('click', retrieveWithFetch);
document.querySelector('#jquery').addEventListener('click', retrieveWithjQuery);
document.querySelector('#axios').addEventListener('click', retrieveWithAxios);

function retrieveWithXHR(){
    const XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function() {
        if(XHR.readyState == 4 && XHR.status == 200){
            newQuote(JSON.parse(XHR.responseText)[0]);
        } else if (XHR.readyState == 4 && XHR.status != 200) {
            console.log(XHR.status + ': ' + XHR.responseText);
        }
    }
    XHR.open('GET', url);
    XHR.send();
}

function retrieveWithFetch(){
    fetch(url)
    .then(function(res){
        if(!res.ok){
            throw Error(res.status);
        }
        return res;
    })
    .then(function(data){
        return data.json()
    })
    .then(function(parsedData){
        newQuote(parsedData[0])
    })
    .catch(function(err) {
        console.log(err);
    });
}

function retrieveWithjQuery(){
    $.ajax({
        method: 'GET',
        url: url,
        dataType: 'json'
    })
    .done(newQuote)
    .fail(function(res){
        console.log(res.status + ': ' + res.responseText);
    })
}

function retrieveWithAxios(){
    axios.get(url)
    .then(function(res) {
        newQuote(res.data[0])
    })
    .catch(function(err){
        console.log(err);
    });
}

function newQuote(string) {
    quote.innerText = string;
}