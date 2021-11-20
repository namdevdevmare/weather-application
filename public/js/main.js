const formElement = document.querySelector('form');
const searchElement = document.querySelector('input');

const messsageOne = document.querySelector('#msg-1');
const messsageTwo = document.querySelector('#msg-2');


formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchQuery = searchElement.value;

    messsageOne.textContent = 'Loading...'
    messsageTwo.textContent = '';

    fetch('/weather?address='+searchQuery).then( (response) => {
        response.json().then((data) => {
            if (data.error) {
                messsageOne.textContent = data.error;
            } else {
                messsageOne.textContent = data.location;
                messsageTwo.textContent = data.forecast;
            }
        });
    });
});