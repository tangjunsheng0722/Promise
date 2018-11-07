# Promise
## Promise的含义
> Promise是一种异步编程的解决方案，比传统的解决方案–回调函数和事件监听－－更合理和更强大。
## 同步/异步编程
>同步的概念：执行一个方法或者功能，在没得到结果前，其他方法不执行，一定得等当前方法执行完，才会执行下一步骤

>异步的概念：执行一个方法或者功能，不需要等待到当前方法执行完，其他方法也可以执行
## Promise 的三种状态
```
pending：进行中
fulfilled :已经成功
rejected 已经失败
```
> 状态改变  Promise对象的状态改变，只有两种可能:
```
从pending变为fulfilled
从pending变为rejected
```
## 基本用法
> ES6规定，Promise对象是一个构造函数，用来生成Promise实例
```
let promise = new Promise(function(resolve,reject){
    console.log('Promise');
    resolve();
});
promise.then(function(){
    console.log('resolved');
});
console.log('Hi!');

//Promise
//Hi!
//resolved
```
> resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去

> reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去
## Promise  API
### 1.promise.then()
> 参数是两个个函数  第一个处理resolved状态，第二个处理rejected状态
```
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
```
### 2.  promise.catch()
> catch 当一个 promise 被拒绝(reject)时,catch 方法会被执行
```
new Promise(function(resolve, reject) {
	setTimeout(function() { reject('Done!'); }, 3000);
})
.then(function(e) { console.log('done', e); })
.catch(function(e) { console.log('catch: ', e); });
```
### 3. promise.all();
> 我们的异步调用时经常有这样一种场景：我们需要同时调用多个异步操作，但希望只有等所有的操作都完成后，我们才去执行响应操作——这就是 Promise.all 的作用。 Promise.all 方法可以接收多个 promise 作为参数，以数组的形式，当这些 promise 都成功执行完成后才调用回调函数。
```
Promise.all([promise1, promise2]).then(function(results) {
	// 全部变成 resolved
})
.catch(function(error) {
	// 一个或者多个变成 rejected
});
```
### Promise.race()
> Promise.race 是一个有趣的函数——它不是等待所有的 promise 被resolve 或 reject，而是在所有的 promise 中只要有一个执行结束，它就会触发
```
var req1 = new Promise(function(resolve, reject) {
	setTimeout(function() { resolve('First!'); }, 8000);
});
var req2 = new Promise(function(resolve, reject) {
	setTimeout(function() { resolve('Second!'); }, 3000);
});
Promise.race([req1, req2]).then(function(one) {
	console.log('Then: ', one);
}).catch(function(one, two) {
	console.log('Catch: ', one);
});
```
> 一个有用的场景是，从多个镜像服务器下载资源，一旦有一个返回，其它的返回也就不用处理了
