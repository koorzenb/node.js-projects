const { addUser, removeUser, getUser, getUsersInRoom } = require('../src/utils/users')


describe("user tests", () => {
    let userOne;

    beforeEach(() => {
        userOne = addUser({
            id: 22,
            username: '  Barend',
            room: 'city   '
        })
    })

    test("Verify user created", async () => {

        expect(userOne.user.username).toEqual("barend")
        expect(userOne.user.room).toEqual("city")
    })

    test("Error on empty", async () => {
        const userEmpty = addUser({
            id: 23,
            username: '',
            room: ''
        })

        expect(userEmpty.user).toBeNull;
        expect(userEmpty.error).toEqual('Username and room are required')
    })

    test("Duplicate username", async () => {
        const userTwo = addUser({
            id: 24,
            username: '  Barend   ',
            room: '    city   '
        })

        expect(userTwo.user).toBeNull;
        expect(userTwo.error).toEqual('Username is in use')
    })

    test("Removing user", async () => {
        userThree = addUser({
            id: 25,
            username: 'Rita',
            room: 'city   '
        })

        expect(getUser(25).username).toEqual('rita')
        removeUser(25);
        expect(userThree.users).toBeNull;
    })

    test("Get user", async () => {
        const userTwo = addUser({
            id: 23,
            username: '  Rita',
            room: 'City   '
        })
        const entry = getUser(23);
        console.log(entry);
        expect(entry.username).toEqual("rita")
        expect(entry.room).toEqual("city")

    })

    test("GetUserInRoom", async () => {

        const userFour = addUser({
            id: 25,
            username: '  Barend',
            room: 'town'
        })

        const userOne = addUser({
            id: 22,
            username: '  Rita',
            room: '    Town  '
        })

        const users = getUsersInRoom("town");
        expect(users.includes('rita')).toBe.true;
        expect(users.length === 2).toBe.true;
    })
})