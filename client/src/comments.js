import {sendData} from "./api";

const commentForm = document.querySelector('.social__footer');
const setCommentFormSubmit = () => {
    commentForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        sendData(
            'http://localhost:80/comments',
            () => {},
            () => {},
            new FormData(evt.target)
        );
    });
};

export {setCommentFormSubmit};
