import {getRandomArrayElement} from "./util.js";
import {renderPictures} from "./gallery.js";

const filtarsButtonElements = document.querySelectorAll('.img-filters__button');

const Filter = {
    DEFAULT: 'default',
    RANDOM: 'random',
    DISCUSSED: 'discussed'
};

const comparePictures = (pictureA, pictureB) => {
    const a = pictureA.comments.length;
    const b = pictureB.comments.length;
   
    return b - a;
};

const getRandomPictures = (pictures) => {
    const randomPictures = [];
    let count = pictures.length;

    if (pictures.length > 10) {
        count = 10;
    }

    while (randomPictures.length < count) {
        const randomPicture = getRandomArrayElement(pictures);

        if (!randomPictures.find((picture) => picture.id === randomPicture.id)) {
            randomPictures.push(randomPicture);
        }
    }

    return randomPictures;
};

const onFilterClick = (evt, pictures) => {
    if (evt.target.matches('.img-filters__button')) {
        const filter = evt.target.id.split('-')[1];
        if (onFilterClick.filter === filter && filter !== Filter.RANDOM) {
            return;
        }

        for (const button of filtarsButtonElements) {
            button.classList.remove('img-filters__button--active');
        }

        evt.target.classList.add('img-filters__button--active');
        onFilterClick.filter = filter;

        switch (filter) {
            case Filter.DEFAULT:
                renderPictures(pictures, true);
                break;
            case Filter.RANDOM:
                renderPictures(getRandomPictures(pictures), true);
                break;
            case Filter.DISCUSSED:
                renderPictures(pictures.slice().sort(comparePictures), true);
                break;
        }
    }
};

export {onFilterClick};
