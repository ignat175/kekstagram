import { sendData } from "./api";

const signupModalElement = document.querySelector('.signup-modal');
const signupForm = document.querySelector('.signup-modal form');

document.addEventListener('keydown', (evt) => {
   if (evt.code === 'Digit1' && evt.ctrlKey) {
      signupModalElement.classList.remove('hidden');
   }
});

document.addEventListener('keydown', (evt) => {
   if (evt.code === 'Escape') {
      signupModalElement.classList.add('hidden');
   }
});

signupForm.addEventListener('submit', (evt) => {
   evt.preventDefault();
   sendData(
      'http://localhost:80/users',
      () => {},
      () => {},
      new FormData(evt.target)
   );
});


