const miForm = document.querySelector('form');

const url = (window.location.hostname.includes('localhost')) ?
    'http://localhost:8080/api/auth/' :
    'https://curso-node-chat-2021.herokuapp.com/api/auth/';


miForm.addEventListener('submit', ev => {
    console.log(ev);
    ev.preventDefault();

    let formData = {};

    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    formData = { correo: correo, password: password };

    fetch(url + 'login', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'content-Type': 'application/json' }
        })
        .then(resp => resp.json())
        .then(({ msg, token }) => {
            if (msg) {
                return console.error(msg);
            }

            localStorage.setItem('token', token);
            window.location = 'chat.html'
        })
        .catch(err => {
            console.log(err)
        })

})



function onSignIn(googleUser) {

    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var id_token = googleUser.getAuthResponse().id_token;
    const data = { id_token };

    fetch(url + 'google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(({ token }) => {

            localStorage.setItem('token', token);
            window.location = 'chat.html'

        })
        .catch(console.log);

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
}