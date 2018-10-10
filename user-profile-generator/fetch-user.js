const url = 'https://randomuser.me/api/';
const avatar = document.querySelector('#avatar');
const fullname = document.querySelector('#fullname');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const city = document.querySelector('#city');
const btn = document.querySelector('#btn');

btn.addEventListener('click', nextUser);

function nextUser() {
    fetch(url)
        .then(handleErrors)
        .then(parseJSON)
        .then(updateProfile)
        .catch(printError);
}

function handleErrors(res) {
    if(!res.ok) {
        throw Error(res.status);
    }
    return res;
}

function printError(err) {
    console.log(err);
}

function parseJSON(res) {
    return res.json().then(function(parsedData){
        return parsedData.results[0];
    });
}

function updateProfile(data) {
    avatar.src = data.picture.large;
    fullname.innerText = `${capitalizeFirstLetter(data.name.first)} ${capitalizeFirstLetter(data.name.last)}`;
    username.innerText = data.login.username;
    email.innerText = data.email;
    city.innerText = capitalizeFirstLetter(data.location.city);

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}