const getComment = () => {
    return {
        id: 10,
        avatar: './img/avatar.svg',
        message: 'красивое фото',
        name: 'NIK'
    };
};

const getPhoto = () => {
    return {
        id: 23,
        url: './photos/23.jpg',
        description: 'Schwarzwald',
        likes: 200,
        comments: [
            getComment(),
            getComment(),
            getComment(),
        ]
    };
}

const getPhotos = (count) => {
    const photos = [];

    let i = 0;
    while (i < count) {
        photos.push(getPhoto());
        i++;
    }

    return photos;
}

console.log(getPhotos(25));

