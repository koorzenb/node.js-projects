require("../src/db/mongoose");
const Task = require('../src/models/task');

Task.findByIdAndDelete('60bed1c586a92a620cbbf96d').then((task) => {
    console.log(task);
    return Task.countDocuments({completed: false});
}).then(result => {
    console.log(result);
}).catch(e => {
    console.log(e);
})


const deleteTaskAndCount = async () => {
    await Task.findByIdAndDelete('60c6643ecf8e43514c005caf');
    return Task.countDocuments({completed: false})
}

deleteTaskAndCount().then( results => console.log(results)).catch(e => console.log(e))