const Url = {
    DATA: 'http://localhost:80/pictures',
    SERVER: 'http://localhost:80/pictures',
};

const getData = (onSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', Url.DATA);

    xhr.addEventListener('load', () => {
        if (xhr.status === 200 ) {
            const pictures = xhr.response;
            onSuccess(pictures);
        }
    });

    xhr.send();
};

const sendData = (onSuccess, body) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', Url.SERVER);

    xhr.addEventListener('load', () => {
        if (xhr.status === 201) {
            onSuccess();
            // console.log(xhr.response);
            // console.log(JSON.parse(xhr.response));
        }
    });

    xhr.send(body);
};

export {getData, sendData};
