import {MESSAGE_SUCCESS} from "./const";

const messagesTemplateElement = document.getElementById('messages');
const messageTemplateContent = messagesTemplateElement.content;
const messagesTemplate = messageTemplateContent.querySelector('.img-upload__message');

const TRANSITION_DURATION = 2;

const documentKeydownHandler = (evt) => {
    if (evt.code === 'Escape') {
        removeMessage(evt);
    }
};

const setProgressBarStyle = (element, type) => {
    element.style.transitionDuration = (TRANSITION_DURATION * 1000) + 'ms';

    element.classList.remove('bg-primary', 'bg-danger');
    element.classList.add(type === MESSAGE_SUCCESS ? 'bg-primary' : 'bg-danger');
};

const showMessage = (type, cb) => {
    const template = document.getElementById(type).content.querySelector(`.${type}`);
    const messagesElement = messagesTemplate.cloneNode(true);
    const progressElement = messagesElement.querySelector('.progress-bar');
    setProgressBarStyle(progressElement, type);

    document.body.append(messagesElement);

    // setTimeout(() => {
    //     messagesElement.querySelector('.progress-bar').style.width = '100%';
    //     setTimeout(() => {
    //         messagesElement.remove();
    //         const successElement = successTemplate.cloneNode(true);
    //         document.body.append(successElement);
    //
    //         successElement.addEventListener('click', removeSuccessMessage);
    //         document.addEventListener('keydown', documentKeydownHandler);
    //         cb();
    //     }, 2000);
    // }, 0);

    const p = new Promise((resolve, reject) => {
        setTimeout(() => {
            messagesElement.querySelector('.progress-bar').style.width = '100%';
            resolve();
        }, 100);
    });

    p.then(() => {
        setTimeout(() => {
            messagesElement.remove();
            const message = template.cloneNode(true);
            document.body.append(message);

            message.addEventListener('click', removeMessage);
            document.addEventListener('keydown', documentKeydownHandler);
            cb();
        }, TRANSITION_DURATION * 1000);
    });
};

const removeMessage = (evt) => {
    if (
        evt.type === 'keydown'
        || (evt.target.matches('.success__button') || evt.target.matches('.success'))
        || (evt.target.matches('.error__button') || evt.target.matches('.error'))
    ) {
        if (document.querySelector('.success')) {
            document.querySelector('.success').remove();
        }
        if (document.querySelector('.error')) {
            document.querySelector('.error').remove();
        }

        document.removeEventListener('keydown', documentKeydownHandler);
    }
};

export {showMessage};

