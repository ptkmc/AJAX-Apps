const XHR = new XMLHttpRequest();
const price = document.querySelector('#price');
const currency = document.querySelector('#currency');
const updated = document.querySelector('#updated');

refreshData();

XHR.onreadystatechange = function() {
    const abr = currency.innerText;
    if (XHR.readyState == 4 && XHR.status == 200){
        const rate = JSON.parse(XHR.responseText).bpi[abr].rate;
        const date = new Date(JSON.parse(XHR.responseText).time.updated);
        price.innerText = rate;
        updated.innerText = date.toLocaleString();
    } else if (XHR.status != 200 && XHR.status != 0) {
        console.log(XHR.status);
    }
}

function refreshData(){
    XHR.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json');
    XHR.send();
}

function changeCurrency(abr) {
    currency.innerText = abr;
    refreshData();
}
