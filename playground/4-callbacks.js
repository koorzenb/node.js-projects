

// const add = (num1, num2, callback) => {
//     setTimeout(() => {
//         const result = num1 + num2;
//         callback(result);
//     }, 2000);
// }

// add(1,  4, (sum) => {
//     console.log(sum);
// })

const getName = (myName, callback) => {
    callback(myName);
}

getName("barend.koorzen", (name) => {
    const parts = name.split(".")
    console.log(parts[0]);
})