// const templateElement = document.querySelector('#picture');
const templateElement = document.getElementById('picture');
const templateContent = templateElement.content;
const pictureTemplate = templateContent.querySelector('.picture');



/**
 * @param {object} pictures
 * @return {undefined}
 */
const renderPictures = (pictures) => {
    const picturesElement = document.querySelector('.pictures');

    let i = 0;
    while (i < pictures.length) {
        const picture = pictures[i];

        const pictureClone = pictureTemplate.cloneNode(true);  
        pictureClone.querySelector('.picture__likes').textContent = picture.likes;
        pictureClone.querySelector('.picture__comments').textContent = picture.comments.length;

        const imgElement = pictureClone.querySelector('img');
        imgElement.setAttribute('src', picture.url);
        imgElement.setAttribute('alt', picture.description);
   
        picturesElement.insertAdjacentElement('beforeend', pictureClone);
        i++;
    }
};

// const pictures = generatePictures(PICTURE_COUNT);
const pictures = generatePictures(5);

renderPictures(pictures);
console.log(pictures);
