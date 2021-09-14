const socket = io()
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $messageFormLocationButton = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;


socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        message
    });
    $messages.insertAdjacentHTML('beforeend', html);
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute("disabled", "disabled");

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute("disabled", "disabled");
        $messageFormInput.value = "";
        $messageFormInput.focus();

        if(error) {
            return console.log(error)
        }

        console.log("message delivered");
    } )
})

$messageFormLocationButton.addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    $messageFormLocationButton.setAttribute("disabled", "disabled");
    navigator.geolocation.getCurrentPosition( position => {
        socket.emit("sendLocation", {
            lat: position.coords.latitude,
            long: position.coords.longitude
        }, () => {
            console.log("Location shared");
            $messageFormLocationButton.removeAttribute("disabled");
        })
    })
})