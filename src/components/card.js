import { openPopup } from "./modal";
import {popupbigImg, popupbigImgCap, bigImg, photoTemplate, userId, photoGrid} from './constants.js';
import {deleteAddedCard, addALike} from './index.js';


function openBigImg(src, title) {
  openPopup(popupbigImg);
  bigImg.src = src;
  bigImg.alt = title;
  popupbigImgCap.textContent = title;
}


function initCard(card) {
  const photoElement = photoTemplate
    .querySelector(".photo-grid__element")
    .cloneNode(true);
  photoElement.querySelector(".photo-grid__title").textContent = card.name;
  const photoImg = photoElement.querySelector(".photo-grid__img");
  const deleteButton = photoElement.querySelector(".photo-grid__delete");
  const heartButton = photoElement.querySelector(".photo-grid__like");
  const likeCounter = photoElement.querySelector('.photo-grid__like-counter');
  const cardId = card._id;

  if(userId.id == card.owner._id) {
    deleteButton.classList.add('photo-grid__delete_active');
  }

  card.likes.forEach((like) => {
    if(userId.id == like._id) {
      heartButton.classList.add('photo-grid__like_active');
    }
  });
  


  deleteAddedCard(deleteButton, photoElement, cardId);

  addALike(heartButton, cardId, likeCounter);

  displayLikes(likeCounter, card);
  photoImg.src = card.link;
  photoImg.alt = card.name;

  photoImg.addEventListener("click", function () {
    openBigImg(card.link, card.name);
  });



  return photoElement;
}




function addNewCard(card) {
  photoGrid.prepend(initCard(card));
}

function displayLikes (likeContainer, card) {
  likeContainer.textContent = card.likes.length;
}

export { initCard, addNewCard, displayLikes};
