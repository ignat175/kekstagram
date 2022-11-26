const commentInputElement = document.querySelector('.social__footer-text');
const textAreaElement = document.querySelector('.text__description');
const hashtagsInputElement = document.querySelector('.text__hashtags');

const MAX_COMMENT_LENGTH = 140;

const onCommentTextAreaInput = (evt) => {
    const valueLength = evt.target.value.length;

    let error = '';
    if (valueLength > MAX_COMMENT_LENGTH) {
        error = `Удалите лишние ${Math.abs(MAX_COMMENT_LENGTH - valueLength)} симв.`;
    }

    evt.target.setCustomValidity(error);
    evt.target.reportValidity();
};

const onHashtagsInputInput = (evt) => {
    const hashtags = evt.target.value.split(' ');
    console.log(hashtags);
};

commentInputElement.addEventListener('input', onCommentTextAreaInput);
textAreaElement.addEventListener('input', onCommentTextAreaInput);
hashtagsInputElement.addEventListener('input', onHashtagsInputInput);
