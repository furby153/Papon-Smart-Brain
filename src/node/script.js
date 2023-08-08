const importScript2 = require("./script2")

const a = importScript2.largeNumberExport;
const b = 5;

setTimeout(()=>{
    console.log(a+b);
    console.log(__dirname);
}, 1000)
