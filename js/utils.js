/**
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
 const getRandomInt = (min, max) => {
   min = Math.ceil(min);
   max = Math.floor(max);

   return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * возвращает случайный элемент массива
 * @param {object} array 
 * @returns {*}
 */
 const getRandomArrayElement = (array) => {
   return array[getRandomInt(0, array.length - 1)];
};
