import {sendData2} from "./api.js";

const signupModalElement = document.querySelector('#signupModal');
const signupForm = signupModalElement.querySelector('form');
const submitButton = signupForm.querySelector('button[type=submit]');

const SIGNUP_FIELDS = ['email', 'password_hash', 'username', 'avatar_path'];

document.addEventListener('keydown', (evt) => {
   if (evt.code === 'Digit1' && evt.ctrlKey) {
    //    clearValidationErrors();
       signupModalElement.classList.add('show');
       signupModalElement.style.display = 'block';
       document.body.classList.add('modal-open');
   }
});

document.addEventListener('keydown', (evt) => {
   if (evt.code === 'Escape') {
      signupModalElement.classList.remove('show');
      signupModalElement.style.display = 'none';
      document.body.classList.remove('modal-open');
   }
});

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
        renderValidationErrors(errors);
    }
};

// const clearValidationErrors = () => {
//     for (const field of SIGNUP_FIELDS) {
//         const inputElement = signupForm.querySelector(`[name=${field}]`);
//         inputElement.style.outline = 'none';
//         inputElement.nextElementSibling.textContent = '';
//         inputElement.nextElementSibling.style.display = 'none';
//     }
// };

const renderValidationErrors = (errors) => {
    console.log(errors);
    let i = 0;
    while (i < errors.length) {
        // if (SIGNUP_FIELDS.includes(errors[i].field)) {
            const inputElement = signupForm.querySelector(`[name=${errors[i].field}]`);  
            inputElement.classList.add('is-invalid');
            inputElement.nextElementSibling.textContent = errors[i].message;
        // }
        i++;
    }
};

signupForm.addEventListener('submit', (evt) => {
   evt.preventDefault();

   blockSubmitButton();
   setTimeout(() => {
    sendData2(
        'http://localhost:80/users',
        () => {
            unblockSubmitButton(); 

            signupModalElement.classList.remove('show');
            signupModalElement.style.display = 'none';
            document.body.classList.remove('modal-open');
        },
        (errors) => {
            unblockSubmitButton(errors);   
        },
        new FormData(evt.target)
    );
   }, 1000);
});
