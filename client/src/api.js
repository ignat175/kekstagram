const getData = (url, onSuccess) => {
    fetch(url, {
        headers: {
            // Authorization: 'Basic ' + btoa(ACCESS_TOKEN + ':')
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
            // Authorization: 'Basic ' + btoa(ACCESS_TOKEN + ':')
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

let responseOk = null;
const sendData2 = (url, onSuccess, onFail, body) => {
    fetch(url, {
        method: 'POST',
        headers: {
            // Authorization: 'Basic ' + btoa(ACCESS_TOKEN + ':')
        },
        body,
    })
        .then((response) => {
            responseOk = response.ok;

            if (response.status === 422) {
                return response.json();
            } else {
                return JSON.stringify([]);
            }
        })
        .then((errors) => {
            if (responseOk) {
                onSuccess();
            } else {
                onFail(errors);
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
            // Authorization: 'Basic ' + btoa(ACCESS_TOKEN + ':')
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

export {getData, sendData, sendData2, deleteData};
