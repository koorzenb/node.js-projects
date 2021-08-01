const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")
const jwt = require("jsonwebtoken")

// see https://mongoosejs.com/docs/queries.html for more methods

const app = express();
const port = process.env.PORT || 3000;

// app.use((req,res,next) => {
//     if(req.method === "GET") {
//         res.status(503).send("Service down for maintenance");
//     } else {
//         next();
//     }
// })

// app.use((req,res,next) => {
//         res.status(503).send("Service down for maintenance");
// })

const multer = require('multer');
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        // see https://www.npmjs.com/package/multer -> API for more info
        // if(!file.originalname.endsWith('.pdf')) {
            //     return cb(new Error('Please upload PDF'))
            // }
            
            if(!file.originalname.match(/\.(doc|docx)$/)) {
                return cb(new Error('Please upload a Word doc'))
            }
        // cb(new Error('File must be a pdf'));
        cb(undefined, true);
        // cb(undefined, false);
    }
})

app.post('/upload' ,upload.single('upload'), (req,res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message});
})

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log(`Server is up on port ${port}`))

const Task = require('./models/task')
const User = require("./models/user")

const main = async () => {
    const task = await Task.findById('60ede7eb05a3ad3a2486294f');

    // const token = jwt.sign({_id: "abc123"}, "thisismynewcourse")
    // console.log("@index.js main - new signed token = ", token);
    
    // await task.populate('owner').execPopulate()
    // console.log(task.owner);

    // const user = await User.findById("60ede234284fc81a18954c6e");
    // await user.populate('tasks').execPopulate();
    // console.log(user.tasks);
}

main();
