// Read: http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html
const {MongoClient,ObjectID} = require("mongodb");

const connectionURL = process.env.MONGODB_URL;
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error,client) => {
    if (error) return console.log("Unable to connect to database");

    const db = client.db(databaseName);

    // db.collection("users").deleteMany(
    //     {
    //         age: 43
    //     }
    //     ).then( result => console.log(result))
    // .catch(error => console.log(error));

    db.collection("users").deleteOne(
        {
            description: "Do a third task"
        }
        ).then( result => console.log(result))
    .catch(error => console.log(error));
});