import {sendData} from "./api";

const commentForm = document.querySelector('.social__footer');
const submitButton = commentForm.querySelector('button[type=submit]');

const blockSubmitButton = () => {
    submitButton.disabled = true;
    submitButton.textContent = ' Отправка...';
    submitButton.insertAdjacentHTML(
        'afterbegin',
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
    );
};
const unblockSubmitButton = () => {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Отправить';
};

const setCommentFormSubmit = (onSuccess) => {
    commentForm.addEventListener('submit', (evt) => {
        evt.preventDefault();

        blockSubmitButton();
        setTimeout(() => {
            sendData(
                'http://localhost:80/comments',
                () => {
                    onSuccess();
                    unblockSubmitButton();
                },
                () => {},
                new FormData(evt.target)
            );
        }, 1000);
    });
};

export {setCommentFormSubmit};
