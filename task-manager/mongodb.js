const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error,client) => {
    if (error) return console.log("Unable to connect to database");

    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     name: 'Barend',
    //     age: 43
    // }, (error, result) => {
    //     if(error) return console.log("Unable to insert user");

    //     console.log(result.ops);
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: "Andries",
    //         age: 40
    //     },
    //     {
    //         name: 'Barend',
    //         age: 43
    //     }
    // ], (error, result) => {
    //         if(error) return console.log("Unable to insert user");
    //         console.log(result.ops);
    //     }
    // )
    
    db.collection('tasks').insertMany([
        {
            description: "Do first task",
            completed: true
        },
        {
            description: "Do second task",
            completed: true
        },
        {
            description: "Do third task",
            completed: false
        }
    ], (error, result) => {
            if(error) return console.log("Unable to insert task");
            console.log(result.ops);
        }
    )
});