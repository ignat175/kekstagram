const picturesContainer = document.querySelector('.pictures');

/**
 * @param {object} pictures
 * @return {undefined}
 */
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
        imgElement.setAttribute('src', picture.url);
        imgElement.setAttribute('alt', picture.description);

        fragment.append(pictureClone);
        i++;
    }

    picturesContainer.append(fragment);
};

const pictures = generatePictures(PICTURE_COUNT);

renderPictures(pictures);
console.log(pictures);
