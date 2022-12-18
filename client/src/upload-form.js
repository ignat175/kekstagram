import {sendData} from "./api.js";
import {showMessage} from "./messages";

const fileInputElement = document.getElementById('upload-file');
const uploadModalElement = document.querySelector('.img-upload__overlay');
const uploadModalCloseElement = document.querySelector('#upload-cancel');
const uploadPreviewImgElement = document.querySelector('.img-upload__preview img');
const effectPreviewElements = document.querySelectorAll('.effects__preview');
const uploadFormElement = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

const documentKeydownHandler = (evt) => {
    if (evt.code === 'Escape') {
        closeUploadModal();
    }
};

const updateUploadPreview = (file) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
        uploadPreviewImgElement.src = reader.result;
        effectPreviewElements.forEach((preview) => {
            preview.style.backgroundImage = `url(${reader.result})`;
        });
    });

    reader.readAsDataURL(file);
}

const openUploadModal = (evt) => {
    uploadPreviewImgElement.style.width = '586px';
    uploadPreviewImgElement.style.height = '586px';
    uploadPreviewImgElement.style.objectFit = 'cover';
    uploadPreviewImgElement.style.objectPosition = 'center';

    updateUploadPreview(evt.target.files[0]);
    uploadModalElement.classList.remove('hidden');
    document.addEventListener('keydown', documentKeydownHandler);
    uploadModalCloseElement.addEventListener('click', closeUploadModal);
};

const closeUploadModal = () => {
    uploadModalElement.classList.add('hidden');
    document.removeEventListener('keydown', documentKeydownHandler);
    uploadModalCloseElement.removeEventListener('click', closeUploadModal);
};

fileInputElement.addEventListener('change', openUploadModal);

const blockSubmitButton = () => {
    submitButton.disabled = true;
    submitButton.textContent = ' Loading...';
    // submitButton.insertAdjacentHTML(
    //     'afterbegin',
    //     '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
    // );
};
const unblockSubmitButton = () => {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Опубликовать';
};

const setUploadFormSubmit = (onSuccess, onFail) => {
    uploadFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();

        blockSubmitButton();
        // setTimeout(() => {
            sendData(
                'http://localhost:80/pictures',
                () => {
                    onSuccess();
                    unblockSubmitButton();
                },
                () => {
                    onFail();
                    unblockSubmitButton();
                },
                new FormData(evt.target)
            );
        // }, 1000);
    });
};

export {setUploadFormSubmit, closeUploadModal};
