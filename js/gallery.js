/**
 * @param {object} pictures
 * @return {undefined}
 */
const renderPictures = (pictures) => {
    const picturesElement = document.querySelector('.pictures');

    let i = 0;
    while (i < pictures.length) {
        const picture = pictures[i];

        const html = `
            <a href="#" class="picture">
                <img
                    class="picture__img"
                    src="${picture.url}"
                    width="182"
                    height="182"
                    alt="${picture.description}"
                >
                <p class="picture__info">
                    <span class="picture__comments">${picture.comments.length}</span>
                    <span class="picture__likes">${picture.likes}</span>
                </p>
            </a>
        `;
   
        picturesElement.insertAdjacentHTML('beforeend', html);
        i++;
    }
};

const pictures = generatePictures(PICTURE_COUNT);

renderPictures(pictures);
console.log(pictures);
