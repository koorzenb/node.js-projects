const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => console.log('...db Connected!'))
.catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
});