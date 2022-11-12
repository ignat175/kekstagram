import { generatePictures } from "./data.js";
import { renderPictures } from "./gallery.js";
import { setFullScreenModalHandlers } from "./big-picture.js";
import { setUploadFormHandlers } from "./upload-form.js";
import "./slider.js";

const PICTURE_COUNT = 25;

const data = generatePictures(PICTURE_COUNT);
renderPictures(data);

setFullScreenModalHandlers(data);
setUploadFormHandlers();
