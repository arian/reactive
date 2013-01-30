"use strict";

var ArrayProto = Array.prototype;
var pop = ArrayProto.pop;
var map = ArrayProto.map;
var slice = ArrayProto.slice;

function Rx(value){
	if (!(this instanceof Rx)) return new Rx(value);
	this.listeners = [];
	if (value !== undefined) this.set(value);
}

Rx.prototype.set = function(value){
	this.value = value;
	this.listeners.forEach(function(listener){
		listener.update(this);
	}, this);
	return this;
};

Rx.prototype.get = function(){
	return this.value;
};

Rx.prototype.update = function(){
	if (!this.action) return this;
	this.set(this.action.apply(this, this.dependencies.map(function(dep){
		return dep.get();
	}).concat([this.value]).concat(slice.call(arguments))));
	return this;
};

Rx.prototype.listen = function(listener){
	this.listeners.push(listener);
	return this;
};

Rx.prototype.use = function(dependencies){
	this.action = pop.call(arguments);
	if (!Array.isArray(dependencies)) dependencies = arguments;
	this.dependencies = map.call(dependencies, function(dependency){
		return dependency.listen(this);
	}, this);
	this.update(dependencies);
	return this;
};

Rx.prototype.valueOf = Rx.prototype.get;

module.exports = Rx;
