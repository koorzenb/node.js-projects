const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user")
const taskRouter = require("./routers/task")

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

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log(`Server is up on port ${port}`))

const jwt = require('jsonwebtoken');

const fn = async () => {
    const token = jwt.sign({ _id: 'abc123'}, 'thisismynewcourse');
    // console.log(token );

    const data = jwt.verify(token, "thisismynewcourse");
    // console.log(data);

}

fn();
