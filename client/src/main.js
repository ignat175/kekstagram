import { renderPictures } from "./gallery.js";
import {getData} from "./api.js";
import "./slider.js";
import "./validation.js";
import {setUploadFormSubmit} from "./upload-form.js";
import {closeUploadModal} from "./upload-form.js";
import "./zoom.js";
import {showSuccessMessage} from "./messages";

const socket = new WebSocket('ws://127.0.0.1:2346');

socket.addEventListener('open', (evt) => {
    getData((pictures) => {
        renderPictures(JSON.parse(pictures));
    });

    setUploadFormSubmit(() => {
        closeUploadModal();
        showSuccessMessage();
        getData((pictures) => {
            socket.send(pictures);
            renderPictures(JSON.parse(pictures));
        });
    });
});

socket.addEventListener('message', (evt) => {
    renderPictures(JSON.parse(evt.data));
});
