const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        // autgh might be issue. See how setup and make sure this is correct
        const decoded = jwt.verify(token,'thisismynewcourse');
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});
        console.log("@auth: User id = ", decoded._id);
        console.log("@auth: Token = ", token);

        if(!user) {
            console.log("");
            const userB = await User.findOne({_id: decoded._id, 'tokens.token': token});

            throw new Error();
        }
        
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate"})
    }
}

module.exports = auth;