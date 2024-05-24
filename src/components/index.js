import "../pages/index.css";
import { openPopup, closePopup} from "./modal.js";
import { initCard, addNewCard, displayLikes } from "./card";
import { enableValidation } from "./validate.js";
import { getUserData, getInitialCards, editUserData, changeAvatar, addCard, deleteCard, addLike, deleteLike } from './api.js';
import { renderFormLoading } from './utils.js';
import {
  profileEdit, profileAdd, popupEdit, imgPopup, closeButtons, formEdit, nameInput, aboutInput,
  profileName, profileAbout, formElementImage, placeNameInput, placeLinkInput, photoGrid, profileAvatar, editAvatarButton, avatarPopup, avatarLink, profileAvatarForm, userId, editAvatarDot, editProfileDot,cardBtnSubmit
} from "./constants.js";



Promise.all([getUserData(), getInitialCards()])
  .then(([data, cards]) => {
    profileAvatar.src = data.avatar;
    profileName.textContent = data.name;
    profileAbout.textContent = data.about;
    userId.id = data._id;
    cards.forEach((card) => {
      photoGrid.append(initCard(card));
    });
    console.log(cards);
  })
  .catch(err => {
    console.log(err);
  });

editAvatarButton.addEventListener("click", function () {
  openPopup(avatarPopup);
});
profileAvatarForm.addEventListener("submit", handleProfileAvatarSubmit);


function handleProfileAvatarSubmit(evt) {
  renderFormLoading(true, editAvatarDot);
  evt.preventDefault();
  changeAvatar(avatarLink.value)
    .then(res => {
      console.log(res);
      profileAvatar.src = avatarLink.value;
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.log(err.message);
    })
    .finally(() => {
      renderFormLoading(false, editAvatarDot);
    });
}



profileAdd.addEventListener("click", function () {
  openPopup(imgPopup);
});


profileEdit.addEventListener("click", function () {
  initUserInfo();
  openPopup(popupEdit);
});



closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});
 


function initUserInfo() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}


function editProfileInfo(evt) {
  renderFormLoading(true, editProfileDot);
  evt.preventDefault();
  editUserData(nameInput.value, aboutInput.value)
    .then(res => {
      profileName.textContent = res.name;
      profileAbout.textContent = res.about;
      closePopup(popupEdit);
    })

    .catch((err) => {
      console.log(err.message);
    })
    .finally(() => {
      renderFormLoading(false, editProfileDot);
    });
}


export function deleteAddedCard(button, card, cardId) {
  button.addEventListener('click', () => {
    deleteCard(cardId)
      .then(() => {
        card.remove();
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
}

export function addALike(button, cardId, likeCounter) {
  button.addEventListener('click', () => {
    if (button.classList.contains('photo-grid__like_active')) {
      deleteLike(cardId)
        .then((res) => {
          button.classList.remove('photo-grid__like_active');
          displayLikes(likeCounter, res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      addLike(cardId)
        .then((res) => {
          button.classList.add('photo-grid__like_active');
          displayLikes(likeCounter, res);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  });
}

function submitCardForm(evt) {
  renderFormLoading(true, cardBtnSubmit);
  addCard(placeNameInput.value, placeLinkInput.value)
    .then((res) => {
      addNewCard(res);
      closePopup(imgPopup);
      placeNameInput.value = "";
      placeLinkInput.value = "";
      cardBtnSubmit.disabled = true;
      cardBtnSubmit.classList.add('popup__submit_disabled');
    })
    .catch((err) => {
      console.log(err.message);
    })
    .finally(()=>{
      renderFormLoading(false, cardBtnSubmit);
    });
}


formEdit.addEventListener("submit", editProfileInfo);

formElementImage.addEventListener("submit", submitCardForm);

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inputErrorClass: "popup__input-error",
  errorClass: ".popup__input-error_active",
});
