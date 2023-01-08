const Url = {
    DATA: 'http://localhost:80/pictures',
    SERVER: 'http://localhost:80/pictures',
};

const ACCESS_TOKEN = '555';

const getData = (onSuccess) => {
    fetch(Url.DATA, {
        headers: {
            Authorization: 'Basic ' + btoa(ACCESS_TOKEN + ':')
        }
    })
        .then((response) => response.json())
        .then((data) => {
            onSuccess(data);
        });
};

const sendData = (url, onSuccess, onFail, body) => {
    fetch(url, {
        method: 'POST',
        body: body,
        headers: {
            Authorization: 'Basic ' + btoa(ACCESS_TOKEN + ':')
        }
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
const deleteData = (url, onSuccess, onFail) => {
    fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: 'Basic ' + btoa(ACCESS_TOKEN + ':')
        }
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
}

export {getData, sendData, deleteData};
