const express = require("express");
const User = require("../models/user")
const auth = require('../middleware/auth');
const router = new express.Router();
const multer = require('multer');

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
    console.log("Body = ", req.body);
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({message: "Logged in", user, token});    // to see how this works, watch @ 10min: https://www.udemy.com/course/the-complete-nodejs-developer-course-2/learn/lecture/13729316#questions 
    } catch (error) {
        res.status(400).send();
    }
})

router.post('/users/logout', auth, async (req,res) => {
    console.log(req.user);
    try {
        req.user.tokens = req.user.tokens.filter( token => token.token !== req.token);
        await req.user.save();

        res.send("Logged out");
    } catch (error) {
        res.status(500).send();
    }
})

router.post('/users/logoutAll', auth, async (req,res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send("Logged out all");
    } catch (error) {
        res.status(500).send();
    }
})

router.get('/users/me', auth, async (req,res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req,res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperations = updates.every(update => allowedUpdates.includes(update));

    if(!isValidOperations) {
        return res.status(400).send( {error: "InVaLiD update"})
    }

    try {
        
        updates.forEach(update => req.user[update] = req.body[update])

        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(400).send("Something went wrong...")
    }
})

router.delete('/users/me', auth, async (req,res) => {

    try {
        // const user = await User.findByIdAndDelete(req.user._id);
        // if(!user) {
        //     return res.status(404).send();
        // }

        await req.user.remove();

        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);        
    }
})

const upload = multer({
    dest: 'avatars'
})

router.post('/users/me/avatar', upload.single('avatar'), (req,res) => {
    res.send();
})


// TODO: Administrator priviledge
// router.get('/users/:id', async (req,res) => {
//     const _id = req.params.id;

//     try {
//         const user = await User.findById(_id);
//         if(!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })
module.exports = router;