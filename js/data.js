function getPhoto () {
    return {
        id: 23,
        url: './photos/23.jpg',
        description: 'Schwarzwald',
        likes: 200,
        comments: [
            {
                id: 10,
                avatar: './img/avatar.svg',
                message: 'красивое фото',
                name: 'NIK'
            },
            {
                id: 10,
                avatar: './img/avatar.svg',
                message: 'красивое фото',
                name: 'NIK'
            },
        ]
    };
}

function getPhotos (count) {
    return [
        getPhoto(),
        getPhoto(),
        getPhoto(),
    ];
}

console.log(getPhotos(25));