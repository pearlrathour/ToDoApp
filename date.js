//my module

// console.log(module)
module.exports.getDate=getDate;

function getDate(){
    let today = new Date();
    let options={
        weekday: "long",
        month:"long",
        day: "numeric",
        year: "numeric"
    }
    return day = today.toLocaleDateString("en", options);
}

// module.exports.getDay= function(){
//     let today = new Date();
//     let options={
//         weekday: "long",
//     }
//     let day = today.toLocaleDateString("en", options);
//     return day;
// }
