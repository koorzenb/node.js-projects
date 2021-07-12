const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs'); 
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not valid email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate(value) {
            if (value.toLowerCase().includes("password")) throw new Error("Cannot use 'password'")
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) throw new Error("Age must be a natural number")
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});


// .methods are for methods on instance and individual user
// .statics for methods on (uppercase) User model

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, "thisismynewcourse");

    user.tokens = user.tokens.concat({token})
    await user.save();

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});

    if(!user) {
        throw new Error ('Unable to login - no such user')
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        throw new Error("Unable to login - wrong pass")
    }

    return user; 
}

// Hash  plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

const User = mongoose.model("User", userSchema);

module.exports = User; 