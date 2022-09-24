// const templateElement = document.querySelector('#picture');
const templateElement = document.getElementById('picture');
const templateContent = templateElement.content;
const pictureTemplate = templateContent.querySelector('.picture');



/**
 * @param {object} pictures
 * @return {undefined}
 */
const renderPictures = (pictures) => {
    const picturesElement = document.querySelector('.pictures');

    let i = 0;
    while (i < pictures.length) {
        const picture = pictures[i];

        const pictureClone = pictureTemplate.cloneNode(true);  
        // pictureClone.querySelector('img').setAttribute('src', picture.url);
        pictureClone.querySelector('picture__likes').textContent = picture.likes;
        pictureClone.querySelector('picture__comments').textContent = picture.comments.length;

        const imgElement = pictureClone.querySelector('img');
        imgElement.setAttribute('src', picture.url);
        imgElement.setAttribute('alt', picture.description);
        
        // const html = `
        //     <a href="#" class="picture">
        //         <img
        //             class="picture__img"
        //             src="${picture.url}"
        //             width="182"
        //             height="182"
        //             alt="${picture.description}"
        //         >
        //         <p class="picture__info">
        //             <span class="picture__comments">${picture.comments.length}</span>
        //             <span class="picture__likes">${picture.likes}</span>
        //         </p>
        //     </a>
        // `;
   
        picturesElement.insertAdjacentElement('beforeend', pictureClone);
        i++;
    }
};

const pictures = generatePictures(PICTURE_COUNT);

renderPictures(pictures);
console.log(pictures);
