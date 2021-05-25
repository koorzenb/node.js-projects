console.log("Client side js file loaded");

const fetchWeather = (location) => {
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(messageOne.textContent = data.error);
            } else {
                console.log(messageOne.textContent = data.location);
                console.log(messageTwo.textContent = data.forecast);
            }
        })
    })
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    messageOne.textContent = "Loading..."
    messageTwo.textContent = null;
    const location = search.value;
    fetchWeather(location);
})