import { renderPictures } from "./gallery.js";
import { setFullScreenModalHandlers } from "./big-picture.js";
import {getData} from "./api.js";
import "./slider.js";
import "./validation.js";

import {setUploadFormSubmit} from "./upload-form.js";
import {closeUploadModal} from "./upload-form.js";

getData((pictures) => {
    renderPictures(pictures);
    setFullScreenModalHandlers(pictures);
});

setUploadFormSubmit(closeUploadModal);
