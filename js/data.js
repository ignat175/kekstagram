/**
 * @returns {object}
 */
const generateComment = () => {
    return {
        id: getRandomInt(1, MAX_COMMENT_COUNT),
        avatar: `./img/avatar-${getRandomInt(1, 6)}.svg`,
        message: getRandomArrayElement(COMMENT_MESSAGES),
        name: getRandomArrayElement(COMMENT_NAMES),
    };
};

/**
 * @returns {object}
 */
const generatePicture = () => {
    const comments = [];
    
    let i = 0;
    while (i < getRandomInt(0, 10)) {
        comments.push(generateComment());
        i++;
    }

    return {
        id: getRandomInt(1, PICTURE_COUNT),
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
        pictures.push(generatePicture());
        i++;
    }

    return pictures;
}
