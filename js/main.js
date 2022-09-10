const renderPhotos = () => {
    const picturesElement = document.querySelector('.pictures');

    const html = `
        <a href="#" class="picture">
            <img class="picture__img" src="./photos/1.jpg" width="182" height="182" alt="Случайная фотография">
            <p class="picture__info">
            <span class="picture__comments">100</span>
            <span class="picture__likes">200</span>
            </p>
        </a>
    `;

    let i = 0;
    while (i < 25) {
        picturesElement.insertAdjacentHTML('beforeend', html);
        i++;
    }
};

renderPhotos();
