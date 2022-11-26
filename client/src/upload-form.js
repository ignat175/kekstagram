import {sendData} from "./api.js";

const fileInputElement = document.getElementById('upload-file');
const uploadModalElement = document.querySelector('.img-upload__overlay');
const uploadModalCloseElement = document.querySelector('#upload-cancel');
const uploadPreviewImgElement = document.querySelector('.img-upload__preview img');
const effectPreviewElements = document.querySelectorAll('.effects__preview');
const uploadFormElement = document.querySelector('.img-upload__form');


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

const setUploadFormSubmit = (onSuccess) => {
    uploadFormElement.addEventListener('submit', (evt) => {
        evt.preventDefault();

        sendData(onSuccess, new FormData(evt.target));
    });
};

export {setUploadFormSubmit, closeUploadModal};
