const express = require("express");
const User = require("../models/user")
const router = new express.Router();

router.post('/users', async (req,res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token});
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/users/login', async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (error) {
        res.status(400).send();
    }
})

router.get('/users', async (req,res) => {
    
    try {
        const users = await User.find({})
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.patch('/users/:id', async (req,res) => {
    const updates = Object.keys(req.body);
    console.log(updates); 
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperations = updates.every(update => allowedUpdates.includes(update));
    console.log(isValidOperations);

    if(!isValidOperations) {
        return res.status(400).send( {error: "InVaLiD update"})
    }

    try {

        const user = await User.findById(req.params.id);

        updates.forEach(update => user[update] = req.body[update])

        await user.save;

        if(!user) {
            return res.status(404).send("No such user");
        }
        res.send(user);
    } catch (error) {
        res.status(400).send("No such user")
    }
})

router.get('/users/:id', async (req,res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/users/:id', async (req,res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);        
    }
})

module.exports = router;