// Read: http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html
const {MongoClient,ObjectID} = require("mongodb");

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error,client) => {
    if (error) return console.log("Unable to connect to database");

    const db = client.db(databaseName);

    db.collection("users").updateOne(
        {
            _id: new ObjectID("60b3d4472238354ce03556e6")
        },
        {
            $set:{
                name:"Pietie"
            }
        }).then(result => console.log(result))
    .catch(error => console.log(error));
});