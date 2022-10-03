const modalWindow = document.querySelector('.big-picture');

picturesContainer.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
        modalWindow.classList.remove('hidden');
    }
});



