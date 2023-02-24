import { renderPictures } from "./gallery.js";
import {getData} from "./api.js";
// import "./slider.js";
// import "./validation.js";
import {setPictureFormSubmit} from "./picture-form.js";
import {closeUploadModal} from "./picture-form.js";
// import "./zoom.js";
import {showMessage} from "./messages";
import {MESSAGE_ERROR, MESSAGE_SUCCESS} from "./const";
import {setCommentFormSubmit} from "./comment-form";
import {renderCommentsList} from "./big-picture";
import {setLikesCountClick, updateLikesCount} from "./likes";
import {openLoginModal, closeLoginModal, setLoginFormSubmit} from "./login-modal.js";
import {openSignupModal, closeSignupModal, setSignupFormSubmit} from "./signup-modal.js";
import {openUserModal, closeUserModal} from "./user-modal.js";

// openLoginModal();

setLoginFormSubmit((token) => {
   closeLoginModal();
   localStorage.setItem('user', JSON.stringify(token));
});

setSignupFormSubmit(closeSignupModal);

document.addEventListener('keydown', (evt) => {
   if (evt.code === 'Digit1' && evt.altKey) {
      if (!localStorage.getItem('user')) {
         closeUserModal();
         closeLoginModal();
         openSignupModal();
      } else {
         alert('Регистрация доступна только для гостя!');
      }
   }
});

document.addEventListener('keydown', (evt) => {
   if (evt.code === 'Digit2' && evt.altKey) {
      if (!localStorage.getItem('user')) {
         closeUserModal();
         closeSignupModal();
         openLoginModal();
      } else {
         alert('Вход доступен только для гостя!');
      }
   }
});

document.addEventListener('keydown', (evt) => {
   if (evt.code === 'Digit3' && evt.altKey) {
      if (localStorage.getItem('user')) {
         closeLoginModal();
         closeSignupModal();
         openUserModal();
      } else {
         alert('Выполните вход!');
      }
   }
});
// const socket = new WebSocket('ws://127.0.0.1:2346');

// const init = (callback = null) => {
//     getData(
//         'http://localhost:80/pictures',
//         (pictures) => {
//             renderPictures(pictures);

//             if (callback) {
//                 const picture = pictures.find((picture) => +picture.id === +getData.picture.id);
//                 getData.picture = picture;
//                 callback(picture);
//             }
//         }
//     );
// };

// socket.addEventListener('open', (evt) => {
//     init();

//     setPictureFormSubmit(
//         () => {
//             closeUploadModal();
//             showMessage(MESSAGE_SUCCESS,() => {
//                 getData(
//                     'http://localhost:80/pictures',
//                     (pictures) => {
//                         socket.send(JSON.stringify(pictures));
//                         renderPictures(pictures);
//                     }
//                 );
//             });
//         },
//         () => {
//             closeUploadModal();
//             showMessage(MESSAGE_ERROR, () => {});
//         }
//     );

//     setCommentFormSubmit(
//         () => {
//             init(renderCommentsList);
//         }
//     );

//     setLikesCountClick(
//         () => {
//             init(updateLikesCount)
//         }
//     );

// });

// socket.addEventListener('message', (evt) => {
//     renderPictures(JSON.parse(evt.data));
// });

