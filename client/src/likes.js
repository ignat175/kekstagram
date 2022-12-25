import {getData, sendData, deleteData} from "./api";

// const isLike = (likes) => {
//     const like = likes.find(function (like) {
//         return like.user_id === 1;
//     });
//     return Boolean(like);
// };

const likesCountElement = document.querySelector('.likes-count');

const getLike = (likes) => likes.find((like) => like.user_id === 1);

const updateLikesCount = (picture) => {
    const likes = picture.likes;

    if (Boolean(getLike(likes))) {
        likesCountElement.classList.add('likes-count--active');
    } else {
        likesCountElement.classList.remove('likes-count--active');
    }

    likesCountElement.textContent = String(likes.length);
};

const setLikesCountClick = (onSuccess) => {
    likesCountElement.addEventListener('click', () => {
        const like = getLike(getData.picture.likes);

        if (!Boolean(like)) {
            const body = new FormData();

            body.set('user_id', 1);
            body.set('picture_id', getData.picture.id);

            sendData(
                'http://localhost:80/likes',
                onSuccess,
                () => {},
                body
            );
        } else {
            deleteData(
                `http://localhost:80/likes/${like.id}`,
                onSuccess,
                () => {}
            );
        }
    });
};

export {setLikesCountClick, updateLikesCount};
