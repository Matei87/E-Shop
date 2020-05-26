"use strict";
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirm_password')

function validatePassword() {

    if ( password.value === confirmPassword .value ){
        confirmPassword.setCustomValidity('');
    } else {
        confirmPassword.setCustomValidity('Password Don`t Match');
    }
}
password.onchange = validatePassword;
confirmPassword .onkeyup = validatePassword;