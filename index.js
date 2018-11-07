/*除了第一个 then ，以后的所有的 then 都是上一个 then 中的返回结果
  then 接收到结果一共有三种情况：
   1. 上一个 then 没有返回值，则就是 undefined
   2. 上一个 then 有普通返回值：数组、数字、字符串、对象。。。
   3. 上一个 then 又返回了一个新的 Promise 对象
       如果是上一个 then 里面返回了一个 Promise 对象，
则这个 then 的回调处理函数就指向了上一个 then 中返回的 Promise 对象中的 resolve*/
let fs = require('fs');
new Promise((resolve,reject)=>{
    fs.readFile('./data/a.txt','utf8',(err,data)=>{
        if(err){
            return reject(err)
        }
        resolve(data)
    })
}).then((resolveData)=>{
    console.log(resolveData)   // './data/a.txt' 文件中的内容
},(rejectErr)=>{

}).then(data=>{
    console.log(data);  //undefined
    return [1,2,3]
}).then(data=> {
    console.log(data);  //[1,2,3]
});