var library = (function () {
	var property = function (key) {
		return function (obj) {
			return obj == null ? void 0 : obj[key];
		};
	};
	var getLength = property('length');
	var isArrayLike = function (collection) {
		var length = getLength(collection);
		return typeof length == 'number' && length >= 0 && length;
	};
	return {
		// Utility --- Complete Functions Below
		identity: function (val) {
			return val;
		},

		// Collections --- Complete Functions Below
		each: function(list, iterator) {
			if(list.constructor === Array){
				for(var i = 0; i < Object.keys(list).length; i++) {
					var key = Object.keys(list)[i];
				}
				for(var i = 0; i < list.length; i++) {
					iterator(list[i],i,list);
				}
			}
		else if (list instanceof Object) {
               for (var key in list)
                   iterator(list[key], key, list);
           } else if (list === null) 
		   {
return list;}
		},

		filter: function (list, test) {
			var Arr = [];
			for (var i = 0; i < list.length; i++) {
				if (test(list[i])) {
					Arr.push(list[i]);
				}
			}
			return Arr;
		},

		reject: function (list, test) {
			var Arr = [];
			for (var i = 0; i < list.length; i++) {
				if (!test(list[i])) {
					Arr.push(list[i]);
				}
			}
			return Arr;
		},

		map: function (list, iterator) {
			var results = [];
			for (var i = 0; i < list.length; i++) {
				results.push(iterator(list[i], i, list));
			}
			return results;
		},

		pluck: function (list, key) {
			return this.map(list, function (item) {
				return item[key];
			});
		},
		reduce: function (list, iterator, accumulator) {
			if (arguments.length < 3) {
				accumulator = list[0];
			}
			library.each(list, function (value) {
				accumulator = iterator(accumulator, value);
			});
			return accumulator;

		},

		every: function (list, iterator) {
			if (arguments.length < 2) {
				return true;
			}
			else {
				return library.reduce(list, function (allFound, item) {
					return !!iterator(item) && allFound;
				}, true);
			}

		},

		some: function (list, iterator) {
			if (!iterator) { iterator = library.identity };
			for (var i = 0; i < list.length; i++) {
				if (iterator(list[i])) return true;
			}
			return false;
		},

		contains: function (list, target) {
			if (isArrayLike(list)) {
				for (var i = 0; i < list.length; i++) {
					if (target == (list[i])) return true;
				}
			}
			else {
				for (var i = 0; i < Object.keys(list).length; i++) {
					if (target == (list[Object.keys(list)[i]])) return true;
				}
			}
			return false;
		},

		// Advanced Collections --- Complete Functions Below
		shuffle: function (array) {
			var shuffled = [], rand;
			this.each(array, function (value, index, list) {
				if (index == 0) {
					shuffled[0] = value;
				} else {
					rand = Math.floor(Math.random() * (index + 1));
					shuffled[index] = shuffled[rand];
					shuffled[rand] = value;
				}
			});
			return shuffled;

		},

		invoke: function (list, methodName, args) {
			if (typeof methodName === 'string') {
				return this.map(list, function (val) {
					return val[methodName](args);
				});
			}
			return this.map(list, function (val) {
				return methodName.apply(val, args);
			});
		},

		sortBy: function (list, iterator) {
			if (typeof iterator !== 'function') {
				var str = iterator;
				iterator = function (item) { return item[str] }

				return list.sort(function (a, b) {
					if (a.length > b.length) return 1;
					if (a.length < b.length) return -1;
					if (a.length = b.length) return 0;
				})
			}
			else { return list.sort() }
		},

		// Objects --- Complete Functions Below
		extend: function (obj) {
			this.each([].slice.call(arguments, 1), function (source) {
				for (var prop in source) {
					if (Object.prototype.hasOwnProperty.call(source, prop)) {
						obj[prop] = source[prop];
					}
				}
			});
			return obj;
		},

		defaults: function (obj) {
			this.each(Array.prototype.slice.call(arguments, 1), function (source) {
				for (var prop in source) {
					if (obj[prop] == null) obj[prop] = source[prop];
				};
			});
			return obj;
		},

		// Arrays --- Complete Functions Below
		first : function(array, n) {
			return n === undefined ? array[0] : array.slice(0, n);
		},

		last : function(array, n) {
            if (n > array.length) {
                return array;
            } else {
                if (n === undefined) {
                    return array[array.length - 1];
                } else {
                    return array.slice(array.length - n);
                }
            }
        },


		indexOf: function (array, target) {
			for (var i = 0; i < array.length; i++) {
				if (array[i] === target) {
					return i;
					break;
				}
			}
			return -1;
		},

		uniq: function (array) {
			var uniq = {};
			array.forEach(function (i) { uniq[i] = true; });
			return Object.keys(uniq);
		},

		// Advanced Arrays --- Complete Functions Below
		zip: function () {
			var argumentsArray = Array.prototype.slice.call(arguments);
			var longestArray = argumentsArray.sort(function (a, b) {
				return b.length - a.length
			})[0];

			return longestArray.map(function (value, index, array) {
				return argumentsArray.map(function (val, i, arr) {
					return val[index];
				});
			});
		},

		flatten : function(nestedArray, result) {},

		intersection : function() {},

		difference : function(array) {},

		// Functions --- Complete Functions Below
		once : function(func) {
			var hasBeenCalled = false;
			return function(){
				if(hasBeenCalled === false){
					hasBeenCalled = true;
					func();
				}
			}
		},

		memoize: function (func) {
			var memo = {};
			return function () {
				var key = arguments[0];
				if (!memo[key]){ memo[key] = func.apply(this, arguments);}
				return memo[key];

			};
		},

		delay: function (func, wait) {
			var args = [].slice.call(arguments, 2);
			return setTimeout(function () { return func.apply(func, args); }, wait);
		}
	}
})();



