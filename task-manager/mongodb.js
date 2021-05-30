const {MongoClient,ObjectID} = require("mongodb");

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error,client) => {
    if (error) return console.log("Unable to connect to database");

    const db = client.db(databaseName);

    // db.collection("users").findOne({name: "Rita"}, (error,user) => {
    //     if(error) return console.log("Did not find user");
    //     console.log(user);
    // })

    // db.collection("users").findOne({_id: new ObjectID("60b3dd526a12fd4d30a4e9d1")}, (error,user) => {
    //     if(error) return console.log("Did not find user");
    //     console.log(user);
    // })

    // First read: http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#find
    // then: follow hyperlink to Cursor
    db.collection('users').find({age: 43}).toArray((error, users)=>{
        console.log(users);
    })

    //find last task by id
    db.collection('tasks').findOne({_id: new ObjectID("60b3de6a320acd571809d69d")}, (error, task) => {
        console.log(task);
    })

    //find all tasks not completed
    db.collection('tasks').find({completed: false}).toArray((error,tasks) => {
        console.log(tasks);
    })

});