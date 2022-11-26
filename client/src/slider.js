// noinspection JSUnresolvedVariable

const sliderElement = document.querySelector('.effect-level__slider');
const sliderWrapperElement = document.querySelector('.img-upload__effect-level');
const imageElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');

sliderWrapperElement.classList.add('hidden');

noUiSlider.create(sliderElement, {
    range: {
        'min': 0,
        'max': 1
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
        to: function (value) {
            if (Number.isInteger(value)) {
                return value.toFixed(0);
            }
            return value.toFixed(1);
        },
        from: function (value) {
            return parseFloat(value);
        }
    }
});

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    const effect = document.querySelector('.effects__radio:checked').value;

    if (effect === 'chrome') {
        imageElement.style.filter = `grayscale(${unencoded[handle]})`;
    } else if (effect === 'sepia') {
        imageElement.style.filter = `sepia(${unencoded[handle]})`;
    } else if (effect === 'marvin') {
        imageElement.style.filter = `invert(${unencoded[handle]}%)`;
    } else if (effect === 'phobos') {
        imageElement.style.filter = `blur(${unencoded[handle]}px)`;
    } else if (effect === 'heat') {
        imageElement.style.filter = `brightness(${unencoded[handle]})`;
    }
});

effectsListElement.addEventListener('change', (evt) => {
    imageElement.className = `effects__preview--${evt.target.value}`;

    if (evt.target.value === 'chrome' || evt.target.value === 'sepia') {
        sliderWrapperElement.classList.remove('hidden');
        sliderElement.noUiSlider.updateOptions({
            range: {min: 0, max: 1},
            step: 0.1
        });
        sliderElement.noUiSlider.set(1);

    } else if (evt.target.value === 'marvin') {
        sliderWrapperElement.classList.remove('hidden');
        sliderElement.noUiSlider.updateOptions({
            range: {min: 0, max: 100},
            step: 1
        });
        sliderElement.noUiSlider.set(100);

    } else if (evt.target.value === 'phobos') {
        sliderWrapperElement.classList.remove('hidden');
        sliderElement.noUiSlider.updateOptions({
            range: {min: 0, max: 3},
            step: 0.1
        });
        sliderElement.noUiSlider.set(3);

    } else if (evt.target.value === 'heat') {
        sliderWrapperElement.classList.remove('hidden');
        sliderElement.noUiSlider.updateOptions({
            range: {min: 1, max: 3},
            step: 0.1
        });
        sliderElement.noUiSlider.set(3);

    } else if (evt.target.value === 'none') {
        sliderWrapperElement.classList.add('hidden');
        imageElement.style.filter = 'unset';
    }
});
