import {sendData2} from "./api.js";

const signupModalElement = document.querySelector('#signupModal');
const signupForm = signupModalElement.querySelector('form');
const submitButton = signupForm.querySelector('button[type=submit]');
const modalBackdropElement = document.querySelector('.modal-backdrop');

const SIGNUP_FIELDS = ['email', 'password_hash', 'username', 'avatar'];

const openSignupModal = () => {
    clearValidationErrors();
    signupModalElement.classList.add('show');
    signupModalElement.style.display = 'block';
    modalBackdropElement.style.display = 'block';
    document.body.classList.add('modal-open');
};

const closeSignupModal = () => {
    signupModalElement.classList.remove('show');
    signupModalElement.style.display = 'none';
    modalBackdropElement.style.display = 'none';
    document.body.classList.remove('modal-open');
};

const blockSubmitButton = () => {
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Регистрирую...';
    submitButton.style.cursor = 'not-allowed';
};

const unblockSubmitButton = (errors = null) => {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Зарегистрироваться';
    submitButton.style.cursor = 'initial';

    if (errors) {
        clearValidationErrors();
        renderValidationErrors(errors);
    }
};

const clearValidationErrors = () => {
    for (const field of SIGNUP_FIELDS) {
        const inputElement = signupForm.querySelector(`[name=${field}]`);
        inputElement.classList.remove('is-invalid');
        inputElement.nextElementSibling.textContent = '';       
    }
};

const renderValidationErrors = (errors) => {
    console.log(errors);
    let i = 0;
    while (i < errors.length) {
        if (SIGNUP_FIELDS.includes(errors[i].field)) {            
            const inputElement = signupForm.querySelector(`[name=${errors[i].field}]`);        
            inputElement.classList.add('is-invalid');
            inputElement.nextElementSibling.textContent = errors[i].message;
        }
        i++;
    }
};

const setSignupFormSubmit = (onSuccess) => {
    signupForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
     
        blockSubmitButton();
        setTimeout(() => {
         sendData2(
             'http://localhost:80/users',
             () => {
                 unblockSubmitButton();
                 onSuccess();
             },
             (errors) => {
                 unblockSubmitButton(errors);   
             },
             new FormData(evt.target)
         );
        }, 1000);
     });
};

export {openSignupModal, closeSignupModal, setSignupFormSubmit};
