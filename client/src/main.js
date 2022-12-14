import { renderPictures } from "./gallery.js";
import {getData} from "./api.js";
import "./slider.js";
import "./validation.js";
import {setPictureFormSubmit} from "./picture-form.js";
import {closeUploadModal} from "./picture-form.js";
import "./zoom.js";
import {showMessage} from "./messages";
import {MESSAGE_ERROR, MESSAGE_SUCCESS} from "./const";
import {setCommentFormSubmit} from "./comment-form";
import {renderCommentsList} from "./big-picture";
import {setLikesCountClick, updateLikesCount} from "./likes";
import "./signup-modal.js";

const socket = new WebSocket('ws://127.0.0.1:2346');

const init = (callback = null) => {
    getData(
        (pictures) => {
            renderPictures(pictures);

            if (callback) {
                const picture = pictures.find((picture) => +picture.id === +getData.picture.id);
                getData.picture = picture;
                callback(picture);
            }
        }
    );
};

socket.addEventListener('open', (evt) => {
    init();

    setPictureFormSubmit(
        () => {
            closeUploadModal();
            showMessage(MESSAGE_SUCCESS,() => {
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

    setCommentFormSubmit(
        () => {
            init(renderCommentsList);
        }
    );

    setLikesCountClick(
        () => {
            init(updateLikesCount)
        }
    );

});

socket.addEventListener('message', (evt) => {
    renderPictures(JSON.parse(evt.data));
});

