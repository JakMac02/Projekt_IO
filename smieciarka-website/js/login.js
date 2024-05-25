document.addEventListener('DOMContentLoaded', function() {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const SignInButton =document.getElementById('b_si');
    const SignUpButton =document.getElementById('b_su');

    loginTab.addEventListener('click', function() {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });

    registerTab.addEventListener('click', function() {
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    });
    SignInButton.addEventListener('click', function() {
        location.href = "https://jakmac02.github.io/Projekt_IO/index.html";

    });
    SignUpButton.addEventListener('click', function() {
        location.href = "https://jakmac02.github.io/Projekt_IO/index.html";

    });


});