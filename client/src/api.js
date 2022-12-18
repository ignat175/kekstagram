const Url = {
    DATA: 'http://localhost:80/pictures',
    SERVER: 'http://localhost:80/pictures',
};

const getData = (onSuccess) => {
    fetch(Url.DATA)
        .then((response) => response.json())
        .then((data) => {
            onSuccess(data);
        });
};

const sendData = (url, onSuccess, onFail, body) => {
    fetch(url, {
        method: 'POST',
        body: body
    })
        .then((response) => {
            if (response.ok) {
                onSuccess();
            } else {
                onFail();
            }
        })
        .catch(() => {
            alert(2);
        });
};

export {getData, sendData};
