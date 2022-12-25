import {getData} from "./api";
import {updateLikesCount} from "./likes";

const fullScreenModalElement = document.querySelector('.big-picture');
const fullScreenModalCloseElement = document.querySelector('#picture-cancel');
const previewElement = document.querySelector('.big-picture__preview');
const COMMENT_COUNT_PER_STEP = 5;
const commentsLoaderElement = document.querySelector('.comments-loader');

const templateElement = document.getElementById('comment');
const templateContent = templateElement.content;
const commentTemplate = templateContent.querySelector('.social__comment');

const commentsContainer = previewElement.querySelector('.social__comments');

const documentKeydownHandler = (evt) => {
    if (evt.code === 'Escape') {
        closeFullScreenModal();
    }
};

const openFullScreenModal = () => {
    fullScreenModalElement.classList.remove('hidden');
    fullScreenModalCloseElement.addEventListener('click', closeFullScreenModal);
    document.addEventListener('keydown', documentKeydownHandler);
};

const closeFullScreenModal = () => {
    fullScreenModalElement.classList.add('hidden');
    fullScreenModalCloseElement.removeEventListener('click', closeFullScreenModal);
    document.removeEventListener('keydown', documentKeydownHandler);
};

let renderedCommentCount = 0;
const setLoaderClick = function (picture) {
    if (this.onLoaderClick !== undefined) {
        commentsLoaderElement.removeEventListener('click', this.onLoaderClick);
    }

    this.onLoaderClick = () => {
        renderComments(picture.comments.slice(renderedCommentCount, renderedCommentCount + COMMENT_COUNT_PER_STEP));
        previewElement.querySelector('.rendered-comments-count').textContent = String(renderedCommentCount);

        if (picture.comments.length > renderedCommentCount) {
            commentsLoaderElement.classList.remove('hidden');
        } else {
            commentsLoaderElement.classList.add('hidden');
        }
    };

    commentsLoaderElement.addEventListener('click', this.onLoaderClick);
};

const renderCommentsList = (picture) => {
    const end = Math.min(picture.comments.length, COMMENT_COUNT_PER_STEP);
    const comments = picture.comments.slice(0, end);

    previewElement.querySelector('.comments-count').textContent = String(picture.comments.length);
    previewElement.querySelector('.rendered-comments-count').textContent = String(comments.length);

    if (picture.comments.length > comments.length) {
        commentsLoaderElement.classList.remove('hidden');
    } else {
        commentsLoaderElement.classList.add('hidden');
    }

    commentsContainer.innerHTML = '';
    renderedCommentCount = 0;
    renderComments(comments);

    setLoaderClick.call(renderCommentsList, picture);
};

const renderComments = (comments) => {
    let i = 0;
    while (i < comments.length) {
        const comment = comments[i];

        const commentClone = commentTemplate.cloneNode(true);
        commentClone.querySelector('.social__text').textContent = comment.message;

        const imgElement = commentClone.querySelector('img');
        imgElement.setAttribute('src', comment.user.avatar);
        imgElement.setAttribute('alt', comment.user.name);

        commentsContainer.append(commentClone);
        renderedCommentCount++;
        console.log(renderedCommentCount);
        i++;
    }
};

const pictureClickHandler = (evt, pictures) => {
    const pictureElement = evt.target.closest('.picture');

    if (pictureElement) {
        evt.preventDefault();
        const id = pictureElement.dataset.id;
        const picture = pictures.find((picture) => picture.id === +id);
        getData.picture = picture;


        const imgElement = previewElement.querySelector('img');
        imgElement.setAttribute('src', 'http://localhost/uploads/' + picture.url);
        imgElement.setAttribute('alt', picture.description);

        const value = +picture.scale.replace('%', '');
        imgElement.style.transform = 'scale(' + (value / 100) + ')';

        imgElement.style.objectFit = 'cover';
        imgElement.style.objectPosition = 'center';

        if (picture.effect_id === 1) {
            imgElement.style.filter = `unset`;
        } else if (picture.effect_id === 2) {
            imgElement.style.filter = `grayscale(1)`;
        } else if (picture.effect_id === 3) {
            imgElement.style.filter = `sepia(1)`;
        } else if (picture.effect_id === 4) {
            imgElement.style.filter = `invert(100%)`;
        } else if (picture.effect_id === 5) {
            imgElement.style.filter = `blur(3px)`;
        } else if (picture.effect_id === 6) {
            imgElement.style.filter = `brightness(3)`;
        }

        previewElement.querySelector('.social__caption').textContent = picture.description;


        updateLikesCount(picture);

        renderCommentsList(picture);
        openFullScreenModal();

        document.querySelector('.social__footer [name=picture_id]').setAttribute('value', picture.id);
    }
};

export {pictureClickHandler, renderCommentsList};
