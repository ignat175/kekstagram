const modalWindow = document.querySelector('.big-picture');
const buttonElement = document.querySelector('#picture-cancel');

picturesContainer.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');
    const id = pictureElement.dataset.id;

    if (pictureElement) {
        const picture = pictures.find((picture) => picture.id === +id);
        modalWindow.querySelector('img').src = picture.url;
        modalWindow.classList.remove('hidden');
    }
});

buttonElement.addEventListener('click', () => {
    modalWindow.classList.add('hidden');
});

modalWindow.addEventListener('click', () => {
    modalWindow.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Escape') {
        modalWindow.classList.add('hidden');
    }
});






