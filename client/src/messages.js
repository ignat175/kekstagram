const templateElement = document.getElementById('success');
const templateContent = templateElement.content;
const successTemplate = templateContent.querySelector('.success');

const documentKeydownHandler = (evt) => {
    if (evt.code === 'Escape') {
        removeSuccessMessage(evt);
    }
};

const showSuccessMessage = () => {
    const successElement = successTemplate.cloneNode(true);
    document.body.append(successElement);

    successElement.addEventListener('click', removeSuccessMessage);
    document.addEventListener('keydown', documentKeydownHandler);
};

const removeSuccessMessage = (evt) => {
    if (
        evt.type === 'keydown'
        || (evt.target.matches('.success__button') || evt.target.matches('.success'))
    ) {
        document.querySelector('.success').remove();
        document.removeEventListener('keydown', documentKeydownHandler);
    }
};

export {showSuccessMessage};
