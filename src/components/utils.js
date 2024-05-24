const renderFormLoading = (isLoading, submitButton) => {
    if (isLoading) {
      submitButton.textContent = 'Cохранение...';
    } else {
      submitButton.textContent = 'Сохранить';
    }
  };

  export {renderFormLoading };