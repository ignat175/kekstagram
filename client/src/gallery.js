import {pictureClickHandler} from "./big-picture";

const picturesListElement = document.querySelector('.pictures');
const pictureElements = picturesListElement.getElementsByClassName('picture');

const restoreHandler = function (pictures) {
    if (this.onPictureClick !== undefined) {
        picturesListElement.removeEventListener('click', this.onPictureClick);
    }

    this.onPictureClick = (evt) => {
        pictureClickHandler(evt, pictures);
    };

    picturesListElement.addEventListener('click', this.onPictureClick);
}

const renderPictures = (pictures) => {
    const templateElement = document.getElementById('picture');
    const templateContent = templateElement.content;
    const pictureTemplate = templateContent.querySelector('.picture');

    const fragment = document.createDocumentFragment();

    let i = 0;
    while (i < pictures.length) {
        const picture = pictures[i];

        const pictureClone = pictureTemplate.cloneNode(true);
        pictureClone.dataset.id = picture.id;
        pictureClone.querySelector('.picture__likes').textContent = picture.likes;
        pictureClone.querySelector('.picture__comments').textContent = picture.comments.length;

        const imgElement = pictureClone.querySelector('img');
        imgElement.setAttribute('src', 'http://localhost:80/uploads/' + picture.url);
        imgElement.setAttribute('alt', picture.description);

        imgElement.style.width = '185.71px';
        imgElement.style.height = '185.71px';
        imgElement.style.objectFit = 'cover';
        imgElement.style.objectPosition = 'center';

        fragment.append(pictureClone);
        i++;
    }

    Array.from(pictureElements).forEach((picture) => picture.remove());
    picturesListElement.append(fragment);

    restoreHandler.call(renderPictures, pictures);
};

export {renderPictures};
