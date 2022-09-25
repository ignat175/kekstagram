// const usedPictureIds = [];
// const usedCommentIds = [];

/**
 * @param {number} maxPictureId
 * @returns {object}
 */
const generateComment = (maxPictureId) => {
    const maxCommentId = MAX_COMMENT_COUNT * maxPictureId;
    if (generateComment.usedCommentIds === undefined) {
        generateComment.usedCommentIds = [];
    }

    let commentId = getRandomInt(1, maxCommentId);
    while (generateComment.usedCommentIds.includes(commentId)) {
        commentId = getRandomInt(1, maxCommentId);
    }
    generateComment.usedCommentIds.push(commentId);

    return {
        id: commentId,
        avatar: `./img/avatar-${getRandomInt(1, 6)}.svg`,
        message: getRandomArrayElement(COMMENT_MESSAGES),
        name: getRandomArrayElement(COMMENT_NAMES),
    };
};

/**
 * @param {number} maxPictureId
 * @returns {object}
 */
const generatePicture = (maxPictureId) => {
    if (generatePicture.usedPictureIds === undefined) {
        generatePicture.usedPictureIds = [];
    }
    
    let pictureId = getRandomInt(1, maxPictureId);
    while (generatePicture.usedPictureIds.includes(pictureId)) {
        pictureId = getRandomInt(1, maxPictureId);
    }
    generatePicture.usedPictureIds.push(pictureId);

    const comments = [];

    let i = 0;
    while (i < getRandomInt(1, MAX_COMMENT_COUNT)) {
        comments.push(generateComment(maxPictureId));
        i++;
    }

    return {
        id: pictureId,
        url: `./photos/${getRandomInt(1, PICTURE_COUNT)}.jpg`,
        description: getRandomArrayElement(PICTURE_DESCRIPTIONS),
        likes: getRandomInt(MIN_LIKE_COUNT, MAX_LIKE_COUNT),
        comments: comments
    };
}

/**
 * @param {number} count
 * @returns {object}
 */
const generatePictures = (count) => {
    const pictures = [];

    let i = 0;
    while (i < count) {
        pictures.push(generatePicture(count));
        i++;
    }

    return pictures;
}
