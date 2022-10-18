const fullScreenModalElement = document.querySelector('.big-picture');
const fullScreenModalCloseElement = document.querySelector('#picture-cancel');
const previewElement = document.querySelector('.big-picture__preview');

const openFullScreenModal = () => {
    fullScreenModalElement.classList.remove('hidden');
    document.addEventListener('keydown', documentKeydownHandler);
};

const closeFullScreenModal = () => {
    fullScreenModalElement.classList.add('hidden');
    document.removeEventListener('keydown', documentKeydownHandler);
};

const renderComments = (comments) => {
    const templateElement = document.getElementById('comment');
    const templateContent = templateElement.content;
    const commentTemplate = templateContent.querySelector('.social__comment');
    const commentsContainer = previewElement.querySelector('.social__comments');

    commentsContainer.innerHTML = '';

    let i = 0;
    while (i < comments.length) {
        const comment = comments[i];

        const commentClone = commentTemplate.cloneNode(true);
        commentClone.querySelector('.social__text').textContent = comment.message;

        const imgElement = commentClone.querySelector('img');
        imgElement.setAttribute('src', comment.avatar);
        imgElement.setAttribute('alt', comment.name);

        commentsContainer.append(commentClone);
        i++;
    }
};

picturesContainer.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');

    if (pictureElement) {
        const id = pictureElement.dataset.id;
        const picture = pictures.find((picture) => picture.id === +id);

        const imgElement = previewElement.querySelector('img');
        imgElement.setAttribute('src', picture.url);
        imgElement.setAttribute('alt', picture.description);

        previewElement.querySelector('.social__caption').textContent = picture.description;
        previewElement.querySelector( '.likes-count').textContent = String(picture.likes);
        previewElement.querySelector('.comments-count').textContent = String(picture.comments.length);

        renderComments(picture.comments);
        openFullScreenModal();
    }
});

const documentKeydownHandler = (evt) => {
    if (evt.code === 'Escape') {
        closeFullScreenModal();
    }
};

fullScreenModalCloseElement.addEventListener('click', closeFullScreenModal);
fullScreenModalElement.addEventListener('click', closeFullScreenModal);

previewElement.addEventListener('click', (evt) => {
    evt.stopPropagation();
});
