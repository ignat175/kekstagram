import {sendData3} from "./api.js";

const loginModalElement = document.querySelector('#loginModal');
const loginForm = loginModalElement.querySelector('form');
const submitButton = loginForm.querySelector('button[type=submit]');
const modalBackdropElement = document.querySelector('.modal-backdrop');

const LOGIN_FIELDS = ['email', 'password'];

const openLoginModal = () => {
    clearValidationErrors();
    loginModalElement.classList.add('show');
    loginModalElement.style.display = 'block';
    modalBackdropElement.style.display = 'block';
    document.body.classList.add('modal-open');
};

const closeLoginModal = () => {
    loginModalElement.classList.remove('show');
    loginModalElement.style.display = 'none';
    modalBackdropElement.style.display = 'none';
    document.body.classList.remove('modal-open');
};

const blockSubmitButton = () => {
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Вхожу...';
    submitButton.style.cursor = 'not-allowed';
};

const unblockSubmitButton = (errors = null) => {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Войти';
    submitButton.style.cursor = 'initial';

    if (errors) {
        clearValidationErrors();
        renderValidationErrors(errors);
    }
};

const clearValidationErrors = () => {
    for (const field of LOGIN_FIELDS) {
        const inputElement = loginForm.querySelector(`[name=${field}]`);
        inputElement.classList.remove('is-invalid');
        inputElement.nextElementSibling.textContent = '';       
    }
};

const renderValidationErrors = (errors) => {
    errors = Object.entries(errors);
    console.log(errors);
    let i = 0;
    while (i < errors.length) {
        console.log(errors[i]);
        if (LOGIN_FIELDS.includes(errors[i][0])) {            
            const inputElement = loginForm.querySelector(`[name=${errors[i][0]}]`);        
            inputElement.classList.add('is-invalid');
            inputElement.nextElementSibling.textContent = errors[i][1][0];
        }
        i++;
    }
};

const setLoginFormSubmit = (onSuccess) => {
    loginForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
     
        blockSubmitButton();
        setTimeout(() => {
         sendData3(
             'http://localhost:80/tokens',
             (token) => {
                 unblockSubmitButton();
                 onSuccess(token);
             },
             (errors) => {
                 unblockSubmitButton(errors);   
             },
             new FormData(evt.target)
         );
        }, 1000);
     });
};

export {openLoginModal, closeLoginModal, setLoginFormSubmit};
