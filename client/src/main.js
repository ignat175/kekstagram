import { renderPictures } from "./gallery.js";
import {getData} from "./api.js";
import "./slider.js";
import "./validation.js";
import {setUploadFormSubmit} from "./upload-form.js";
import {closeUploadModal} from "./upload-form.js";
import "./zoom.js";
import {showMessage} from "./messages";
import {MESSAGE_ERROR, MESSAGE_SUCCESS} from "./const";
import {setCommentFormSubmit} from "./comments";

const socket = new WebSocket('ws://127.0.0.1:2346');

socket.addEventListener('open', (evt) => {
    getData((pictures) => {
        renderPictures(pictures);
    });

    setUploadFormSubmit(
        () => {
            closeUploadModal();
            showMessage(MESSAGE_SUCCESS, () => {
                getData((pictures) => {
                    socket.send(JSON.stringify(pictures));
                    renderPictures(pictures);
                });
            });
        },
        () => {
            closeUploadModal();
            showMessage(MESSAGE_ERROR, () => {});
        }
    );

    setCommentFormSubmit();
});

socket.addEventListener('message', (evt) => {
    renderPictures(JSON.parse(evt.data));
});
