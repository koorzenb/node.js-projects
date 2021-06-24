const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => console.log('...db Connected!'))
.catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
});