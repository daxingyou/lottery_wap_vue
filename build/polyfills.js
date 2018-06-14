"use strict"

if (typeof promise === 'undefined') {
	require('promise/lib/rejection-tracking').enable()
	window.promise = require('promise/lib/es6-extensions.js')
}
