const sliderElement = document.querySelector('.effect-level__slider');
noUiSlider.create(sliderElement, {
    range: {
        'min': 0,
        'max': 100
    },
    start: 40,
    step: 1,
    connect: 'lower'
});
sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
   console.log(unencoded[handle]);
});
