"use strict";

var rx = require('./index');

var obj1 = rx(1);
var obj2 = rx(2);

var obj3 = rx().use(obj1, obj2, function(a, b){
	return a + b;
});

var obj4 = rx().use(obj2, obj3, function(a, b){
	return a + b;
});

console.log(obj1.get(), obj2.get(), obj3.get(), obj4.get());

obj1.set(2);
console.log(obj1.get(), obj2.get(), obj3.get(), obj4.get());

obj2.set(3);
console.log(obj1.get(), obj2.get(), obj3.get(), obj4.get());
