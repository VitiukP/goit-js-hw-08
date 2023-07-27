import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const inputEmail = form.elements.email; 
const inputMessage = form.elements.message;
const localStorageKey = 'feedback-form-state';
let savedData = localStorage.getItem(localStorageKey);

if (savedData) {
    savedData = JSON.parse(savedData);
    inputEmail.value = savedData.email;
    inputMessage.value = savedData.message;
}

form.addEventListener('input', throttle(saveToLocalStorage, 500));
form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log({
        email: inputEmail.value,
        message: inputMessage.value,
    });

    inputEmail.value = '';
    inputMessage.value = '';
    localStorage.removeItem(localStorageKey);
});

function saveToLocalStorage() {
    const data = {
        email: inputEmail.value,
        message: inputMessage.value,
    };

    localStorage.setItem(localStorageKey, JSON.stringify(data));
}

