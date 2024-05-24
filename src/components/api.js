const config = {
    baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-8',
    headers: {
      authorization: '3f48c328-141f-4a59-b0e8-0fbe18fe8dd1',
      'Content-Type': 'application/json'
    }
  };
  
  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }

  export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    })
    .then(res => checkResponse(res));
  
  };
  
  export const getInitialCards = (res) => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    })
    .then(res => checkResponse(res));
   
  };

  export const editUserData = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => checkResponse(res));
  };
  export const changeAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => checkResponse(res));
  };

  export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
     headers: config.headers,
  })
  .then(checkResponse);
};

export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    })
  })
  .then(checkResponse);
};


export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
     headers: config.headers,
  })
  .then(checkResponse);
};

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
     headers: config.headers,
  })
  .then(checkResponse);
};
