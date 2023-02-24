import {deleteData} from "./api";

const userModalElement = document.querySelector('#userModal');
const modalBackdropElement = document.querySelector('.modal-backdrop');

const openUserModal = () => {
   userModalElement.classList.add('show');
   userModalElement.style.display = 'block';
   modalBackdropElement.style.display = 'block';
   document.body.classList.add('modal-open');

   const {user} = JSON.parse(localStorage.getItem('user'));

   userModalElement.querySelector('.modal-body .wrapper').innerHTML = '';
   userModalElement.querySelector('.modal-body .wrapper').innerHTML = `
      <h2>email: ${user.email}</h2>
      <h2>name: ${user.name}</h2>
   `;
};

const closeUserModal = () => {
   userModalElement.classList.remove('show');
   userModalElement.style.display = 'none';
   modalBackdropElement.style.display = 'none';
   document.body.classList.remove('modal-open');
};

document.querySelector('#logout').addEventListener('click', () => {
   const token = JSON.parse(localStorage.getItem('user'));
   
   deleteData(
      `http://localhost:80/tokens/${token.id}`,
      () => {
         closeUserModal();
         localStorage.removeItem('user');
      },
      () => {},
   )
});

export {openUserModal, closeUserModal};
