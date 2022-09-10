const renderPhotos = (pictures) => {
    const picturesElement = document.querySelector('.pictures');

    let i = 0;
    while (i < pictures.length) {
        const picture = `
            <a href="#" class="picture">
                <img
                    class="picture__img"
                    src="${pictures[i].url}"
                    width="182"
                    height="182"
                    alt="Случайная фотография"
                >
                <p class="picture__info">
                    <span class="picture__comments">100</span>
                    <span class="picture__likes">200</span>
                </p>
            </a>
        `;
   
        picturesElement.insertAdjacentHTML('beforeend', picture);
        i++;
    }
};
const pictures = getPictures(25);
renderPhotos(pictures);
