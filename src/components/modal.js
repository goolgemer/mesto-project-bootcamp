import { page } from './constants.js';



function openPopup(popup) {
  popup.classList.add("popup_opened");
  page.addEventListener('keydown', closeEsc);
  page.addEventListener('mousedown', clickOver);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  page.removeEventListener('keydown', closeEsc);
  page.removeEventListener('mousedown', clickOver);
}

function closeEsc(evt) {
  if (evt.key === "Escape") {
    const openPopup = page.querySelector(".popup_opened");
    openPopup && closePopup(openPopup);
  }
}

function clickOver(evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target && closePopup(evt.target);
  }
}


export { openPopup, closePopup };