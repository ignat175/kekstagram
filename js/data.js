const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getComment = () => {
    return {
        id: 10,
        avatar: './img/avatar.svg',
        message: 'красивое фото',
        name: 'NIK'
    };
};

const getPicture = () => {
    return {
        id: 24,
        url: `./photos/${getRandomInt(1, 25)}.jpg`,
        description: 'Schwarzwald',
        likes: 200,
        comments: [
            getComment(),
            getComment(),
            getComment(),
        ]
    };
}

const getPictures = (count) => {
    const pictures = [];

    let i = 0;
    while (i < count) {
        pictures.push(getPicture());
        i++;
    }

    return pictures;
}

console.log(getPictures(25));

