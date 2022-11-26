const fullScreenModalElement = document.querySelector('.big-picture');
const fullScreenModalCloseElement = document.querySelector('#picture-cancel');
const previewElement = document.querySelector('.big-picture__preview');
const picturesContainerElement = document.querySelector('.pictures');

const documentKeydownHandler = (evt) => {
    if (evt.code === 'Escape') {
        closeFullScreenModal();
    }
};

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
        imgElement.setAttribute('src', comment.user.avatar);
        imgElement.setAttribute('alt', comment.user.name);

        commentsContainer.append(commentClone);
        i++;
    }
};

const pictureClickHandler = (evt, pictures) => {
    const pictureElement = evt.target.closest('.picture');

    if (pictureElement) {
        evt.preventDefault();
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
};

const setFullScreenModalHandlers = (pictures) => {
    fullScreenModalCloseElement.addEventListener('click', closeFullScreenModal);
    picturesContainerElement.addEventListener('click', (evt) => {
        pictureClickHandler(evt, pictures);
    });
};

export {setFullScreenModalHandlers};