import { getRandomInt, getRandomArrayElement } from "./util.js";

const MIN_LIKE_COUNT = 15;
const MAX_LIKE_COUNT = 200;
const MAX_COMMENT_COUNT = 10;

const PICTURE_DESCRIPTIONS = [
    'Schwarz1',
    'Schwarz2',
    'Schwarz3',
];

const COMMENT_MESSAGES = [
    'коммментарий1',
    'коммментарий2',
    'коммментарий3',
];

const COMMENT_NAMES = [
    'name1',
    'name2',
    'name3',
];

/**
 * @param maxEntityId
 * @returns {number}
 */
const getUniqueId = function (maxEntityId) {
    if (this.usedEntityIds === undefined) {
        this.usedEntityIds = [];
    }

    // let entityId = getRandomInt(1, maxEntityId);
    // while (this.usedEntityIds.includes(entityId)) {
    //     entityId = getRandomInt(1, maxEntityId);
    // }

    let entityId;
    do {
      entityId = getRandomInt(1, maxEntityId);
    } while (this.usedEntityIds.includes(entityId));

    this.usedEntityIds.push(entityId);

    return entityId;
};

/**
 * @param {number} maxPictureId
 * @returns {object}
 */
const generateComment = (maxPictureId) => ({
    id: getUniqueId.call(generateComment, MAX_COMMENT_COUNT * maxPictureId),
    message: getRandomArrayElement(COMMENT_MESSAGES),
    user: {
        name: getRandomArrayElement(COMMENT_NAMES),
        avatar: `./img/avatar-${getRandomInt(1, 6)}.svg`,
    },
});

/**
 * @param {number} maxPictureId
 * @returns {object}
 */
const generatePicture = (maxPictureId) => ({
    id: getUniqueId.call(generatePicture, maxPictureId),
    url: `./photos/${getRandomInt(1, maxPictureId)}.jpg`,
    description: getRandomArrayElement(PICTURE_DESCRIPTIONS),
    likes: getRandomInt(MIN_LIKE_COUNT, MAX_LIKE_COUNT),
    comments: Array.from({length: getRandomInt(0, MAX_COMMENT_COUNT)}, () => generateComment(maxPictureId))
});

/**
 * @param {number} count
 * @returns {object}
 */
const generatePictures = (count) => Array.from({length: count}, () => generatePicture(count));

export {generatePictures};
