const socket = io()
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $messageFormLocationButton = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML;
const sideBarTemplate = document.querySelector("#sidebar-template").innerHTML;

//Options
const {username, room} = Qs.parse(location.search, { ignoreQueryPrefix: true});
console.log(room);
socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
})

socket.on('locationMessage', (message) => {
    console.log(message);
    const html = Mustache.render(locationTemplate, {
        username: message.username,
        location: message.location,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
})

socket.on('roomData', ({room, users}) => {
    const html = Mustache.render(sideBarTemplate, {
        room,
        users
    })

    document.querySelector("#sidebar").innerHTML = html; 
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

socket.emit("join", {username, room}, error => {
    if(error) {
        alert(error);
        location.href = '/'
    }
})