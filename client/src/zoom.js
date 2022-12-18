const buttonElementSmaller = document.querySelector('.scale__control--smaller');
const buttonElementBigger  = document.querySelector('.scale__control--bigger');
const photoElement =  document.querySelector('.img-upload__preview img');
const inputElement = document.querySelector('.scale__control--value');
let value = 100;
const step = 25;

buttonElementSmaller.addEventListener('click', () => {
    if (value > 25) {
        value = value - step;
        photoElement.style.transform = 'scale(' + (value / 100) + ')';
        // photoElement.style.transform = `scale(${0.25})`;
        inputElement.value = value + '%';
    }
});

buttonElementBigger.addEventListener('click', () => {
    if (value < 100) {
        value = value + step;
        photoElement.style.transform = 'scale(' + (value / 100) + ')';
        // photoElement.style.transform = `scale(${0.25})`;
        inputElement.value = value + '%';
    }
});
