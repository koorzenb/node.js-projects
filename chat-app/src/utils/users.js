const users = [];

const addUser = ({ id, username, room }) => {
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if (!username || !room) {
        return {
            error: 'Username and room are required'
        }
    }

    const existingUser = users.find(user => {
        return user.room === room && user.username === username;
    })

    if (existingUser) {
        return {
            error: 'Username is in use'
        }
    }

    const user = { id, username, room }
    users.push(user);
    return { user }
}

const removeUser = id => {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}
/**
 * Returns user it find for id that was sent
 * @param {string} id - id of user
 * @returns 
 */
const getUser = id => {
    const user = users.find( user => user.id === id);
    return user != undefined ? user : {error: "No such user"}
}

const getUsersInRoom = room => {
    room = room.trim().toLowerCase();;
    const usersInRoom = users.filter(user => user.room === room);
    return usersInRoom.length != 0 ? usersInRoom : {error: "Room is empty"}
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}