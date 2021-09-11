const socket = io();

socket.on("broadcast", (mes) => console.log(mes))

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault;
    console.log('clicked');
    const message = document.querySelector("input").value;
    socket.emit("sendMessage", message);
});