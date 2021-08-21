const request = require('supertest');
const app = require("../src/app");
const User = require('../src/models/user')

const userOne = {
    name: "Mike",
    email: "mike@example.com",
    password: "34what!!"
}

const userTwo = {
    name: "Barend",
    email: "koorzenb@exmaple.com",
    password: "MyPass777!"
}

beforeEach( async () => {
    await User.deleteMany();
    await new User(userOne).save();
})

test("Should signup a new user", async () => {
    await request(app).post('/users').send({
        name: userTwo.name,
        email: userTwo.email,
        password: userTwo.password
    }).expect(201);
})

test('Should login existing user', async () => {
    await request(app).post('user/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
})

test('Should not login non-existing user', async () => {
    await request(app).post('user/login').send({
        email: "baroendoes@gmail.pop",
        password: userOne.password
    }).expect(400)
})