"use strict";

var rx = require('../');

[Document, Window, Element].invoke('implement', 'addEventRx', function(event, fn){
	var r = rx();
	var listener = r._eventListener = function(event){
		var result = fn.call(this, r, event);
		if (result !== undefined) r.set(result);
	};
	this.addEvent(event, listener);
	return r;
});

window.addEvent('domready', function(){

	var listenToKey = function(key){
		return function(r, event){
			if (event.key == key) r.set(!r.get());
		};
	};

	var a = document.addEventRx('keydown', listenToKey('a'));
	var b = document.addEventRx('keydown', listenToKey('b'));
	var c = document.addEventRx('keydown', listenToKey('c'));

	var abc = rx().use(a, b, c, function(a, b, c){
		if (a && b && c){
			document.body.highlight();
		}
	});

	rx().use(a, b, c, function(a, b, c, previous, bool){
		console.log(bool.value);
	});

	var checkboxes = $$('input[type="checkbox"]').addEventRx('click', function(r){
		return this.checked;
	});

	rx().use(checkboxes, function(a, b, c){
		$('checkbox-result').set('text', (a && !b && c) ? 'true' : 'false');
	});

});
