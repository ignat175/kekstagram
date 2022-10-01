const getUniqueId = (entity, maxEntityId) => {
    entity = `used${entity[0].toUpperCase()}${entity.substr(1)}Ids`;

    if (getUniqueId[entity] === undefined) {
        getUniqueId[entity] = [];
    }

    let entityId = getRandomInt(1, maxEntityId);
    while (getUniqueId[entity].includes(entityId)) {
        entityId = getRandomInt(1, maxEntityId);
    }
    getUniqueId[entity].push(entityId);

    return entityId;
};

/**
 * @param {number} maxPictureId
 * @returns {object}
 */
const generateComment = (maxPictureId) => ({
    id: getUniqueId('comment', MAX_COMMENT_COUNT * maxPictureId),
    avatar: `./img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getRandomArrayElement(COMMENT_MESSAGES),
    name: getRandomArrayElement(COMMENT_NAMES)
});

/**
 * @param {number} maxPictureId
 * @returns {object}
 */
const generatePicture = (maxPictureId) => ({
    id: getUniqueId('picture', maxPictureId),
    url: `./photos/${getRandomInt(1, PICTURE_COUNT)}.jpg`,
    description: getRandomArrayElement(PICTURE_DESCRIPTIONS),
    likes: getRandomInt(MIN_LIKE_COUNT, MAX_LIKE_COUNT),
    comments: Array.from({length: getRandomInt(9, MAX_COMMENT_COUNT)}, () => generateComment(maxPictureId))
});

/**
 * @param {number} count
 * @returns {object}
 */
const generatePictures = (count) => Array.from({length: count}, () => generatePicture(count));
