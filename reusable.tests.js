      // Utility --- Complete Functions Below

describe('Utilities', function() {
	describe('identity', function() {
		var newObject = {};

		it('should return whatever value it is passed', function() {
		expect(library.identity(1)).to.equal(1);

		expect(library.identity('string')).to.equal('string');

		expect(library.identity(false)).to.equal(false);

		expect(library.identity(newObject)).to.equal(newObject);
		});
	});
});

      // Collections --- Complete Functions Below

describe('Collections', function() {
	describe('each', function() {
		it('should iterate over arrays, (element, index and array)', function() {
		var animals = ['platypus', 'tiger', 'lion'];
		var inputs = [];

		library.each(animals, function(animal, index, list) {
			inputs.push([animal, index, list]);
		});

		expect(inputs).to.eql([
				['platypus', 0, animals],
				['tiger', 1, animals],
				['lion', 2, animals]
			]);
		});

		it('should only iterate over the array elements, not properties', function() {
			var animals = ['platypus', 'tiger', 'lion'];
			var inputs = [];

			animals.dontAcknowledge = 'Invisible!';

			library.each(animals, function(animal, index, list) {
				inputs.push([animal, index, list]);
			});

		expect(inputs).to.eql([
				['platypus', 0, animals],
				['tiger', 1, animals],
				['lion', 2, animals]
			]);
		});

		it('should iterate over objects, (key, value and object)', function() {
			var animals = {'a': 'platypus', 'b': 'tiger',  'c':'lion'};
			var inputs = [];

			library.each(animals, function(animal, key, object) {
				inputs.push([animal, key, object]);
			});

			expect(inputs).to.eql([
				['platypus', 'a', animals],
				['tiger', 'b', animals],
				['lion', 'c', animals]
			]);
		});
	});

	describe('filter', function() {
		it('should return all even numbers', function() {
			var isEven = function(num) { return num % 2 === 0; };
			var odd = library.filter([1, 2, 3, 4, 5, 6], isEven);

			expect(odd).to.eql([2, 4, 6]);
		});

		it('should return all odd numbers', function() {
			var isOdd = function(num) { return num % 2 !== 0; };
			var even = library.filter([1, 2, 3, 4, 5, 6], isOdd);

			expect(even).to.eql([1, 3, 5]);
		});
	});

	describe('reject', function() {
		it('should return all odd numbers', function() {
		var isEven = function(num) { return num % 2 === 0; };
		var odd = library.reject([1, 2, 3, 4, 5, 6], isEven);

		expect(odd).to.eql([1, 3, 5]);
		});

		it('should return all even numbers', function() {
		var isOdd = function(num) { return num % 2 !== 0; };
		var even = library.reject([1, 2, 3, 4, 5, 6], isOdd);

		expect(even).to.eql([2, 4, 6]);
		});
	});

	describe('map', function() {
		it('should results of running iterator over each element', function() {
		var dividedByTwo = library.map([2, 4, 6, 8], function(num) {
			return num / 2;
		});

		expect(dividedByTwo).to.eql([1, 2, 3, 4]);
		});
	});

	describe('pluck', function() {
		it('should return an array of user-specified extracted values', function() {
		var places = [{city: 'Birmingham' , state: 'Alabama'}, {city: 'Austin', state:'Texas'}];

		expect(library.pluck(places, 'state')).to.eql(['Alabama', 'Texas']);
		});
	});

	describe('reduce', function() {
		it('should start with first item in array as default', function() {
		var result = library.reduce([1, 2, 3], function(a, b) {
			return a + b;
		});

		expect(result).to.equal(7);
		});
		it('should sum an array', function() {
		var result = library.reduce([1, 2, 3], function(a, b) {
			return a + b;
		}, 0);

		expect(result).to.equal(6);
		});

	});

	describe('every', function() {
		it('should pass for empty list', function() {
		expect(library.every([], library.identity)).to.equal(true);
		});

		it('should pass for list of all true values', function() {
		expect(library.every([true, 'one', 1], library.identity)).to.equal(true);
		});

		it('should fail if has single false value', function() {
		expect(library.every([true, true, false], library.identity)).to.equal(false);
		});

		it('should fail for mixed true and false values', function() {
		expect(library.every([1, 0, 'pass', undefined], library.identity)).to.equal(false);
		});

		it('should handle being passed a callback', function() {
		var isOdd = function(num) {
			return num % 2 !== 0;
		};

		expect(library.every([1, 3, 7], isOdd)).to.equal(true);
		expect(library.every([2, 4, 6], isOdd)).to.equal(false);
		});

		it('should perceive each item as callback result if none specified', function() {
		expect(library.every([true, true, true])).to.equal(true);
		});
	});

	describe('some', function() {
		it('returns false with default checker for empty list', function() {
		expect(library.some([])).to.equal(false);
		});

		it('result should be a boolean', function() {
		expect(library.some([1]), library.identity).to.equal(true);
		expect(library.some([0]), library.identity).to.equal(false);
		});

		it('fails if no value passes test', function() {
		expect(library.some([1, 3, 7], function(num) {
			return num % 2 === 0;
		})).to.equal(false);
		});

		it('passes if one value is true', function() {
		expect(library.some([null, 0, 'false', false], library.identity)).to.equal(true);
		});

		it('returns false for all false values', function() {
		expect(library.some([null, 0, undefined]), library.identity).to.equal(false);
		});
	});

	describe('contains', function() {
		it('should return false if value specified is not found', function() {
		expect(library.contains([1,2,3], 4)).to.equal(false);
		});

		it('should work on objects', function() {
		expect(library.contains({a: 1, b: 2, c: 3}, 2)).to.equal(true);
		});

		it('should return true if value found', function() {
		expect(library.contains([1,2,3], 2)).to.equal(true);
		});
	});

	describe('Advanced Collections', function() {
		describe('shuffle', function() {
		it('should not alter original input', function() {
			var numbers = [4, 5, 6];
			var shuffled = library.shuffle(numbers).sort();

			expect(shuffled).to.not.equal(numbers);
			expect(numbers).to.eql([4, 5, 6]);
		});

		it('should return an object with the same elements', function() {
			var numbers = [4, 5, 6];
			var shuffled = library.shuffle(numbers).sort();

			expect(JSON.stringify(shuffled)).to.equal(JSON.stringify(numbers));
		});

		it('should be in a different order', function() {
			var numbers = [4, 5, 6, 7, 8, 9, 10];
			var shuffled = library.shuffle(numbers);

			expect(JSON.stringify(shuffled)).to.not.equal(JSON.stringify(numbers));
		});
		});

		describe('invoke', function() {
		describe('invoke, with functions', function() {
			it('should take function and iterate over each array item and return results', function() {
			var reverse = function(){
				return this.split('').reverse().join('');
			};

			expect(library.invoke(['dog', 'cat'], reverse)).to.eql(['god', 'tac']);
			});
		});

		describe('invoke, with method names', function() {
			it('should iterate over each array item with specified method and return results', function() {
			expect(library.invoke(['dog', 'cat'], 'toUpperCase')).to.eql(['DOG', 'CAT']);
			});
		});
		});

		describe('sortBy', function() {
		it('should sort by age', function() {
			var human = [{stage : 'baby', age : 2}, {stage : 'adult', age : 30}];
			human = library.sortBy(human, function(person) {
			return person.age;
			});

			expect(library.pluck(human, 'stage')).to.eql(['baby', 'adult']);
		});

		it('should handle undefined values', function() {
			var list = [undefined, 4, 1, undefined, 3, 2];
			var result = library.sortBy(list, function(i) { return i; });

			expect(result).to.eql([1, 2, 3, 4, undefined, undefined]);
		});

		it('should sort by length', function() {
			var list = ['one', 'two', 'three', 'four', 'five'];
			var sorted = library.sortBy(list, 'length');

			expect(sorted).to.eql(['one', 'two', 'four', 'five', 'three']);
		});
		});
	});
});

// Objects --- Complete Functions Below

describe('Objects', function() {
	describe('extend', function() {
		it('returns the first argument', function() {
		var start = {};
		var end = {};
		var extended = library.extend(start, end);

		expect(extended).to.equal(start);
		});

		it('should extend an object with the attributes of another', function() {
		var start = {};
		var end = {a:'b'};
		var extended = library.extend(start, end);

		expect(extended.a).to.equal('b');
		});

		it('should override properties found on the destination', function() {
		var start = {a:'x'};
		var end = {a:'b'};
		var extended = library.extend(start, end);

		expect(extended.a).to.equal('b');
		});

		it('should not override properties not found in the source', function() {
		var start = {x:'x'};
		var end = {a:'b'};
		var extended = library.extend(start, end);

		expect(extended.x).to.equal('x');
		});

		it('should extend from multiple source objects', function() {
		var extended = library.extend({x:1}, {a:2}, {b:3});

		expect(extended).to.eql({x:1, a:2, b:3});
		});

		it('should copy undefined values', function() {
		var extended = library.extend({}, {a: void 0, b: null});

		expect('a' in extended && 'b' in extended).to.be(true);
		});
	});

	describe('defaults', function() {
		var options;

		beforeEach(function() {
			options = {zero: 0, one: 1, empty: '', nan: NaN, string: 'string'};
			library.defaults(options, {zero: 1, one: 10, twenty: 20}, {empty: 'full'}, {nan: 'nan'}, {word: 'word'}, {word: 'dog'});
		});

		it('returns the first argument', function() {
			var start = {};
			var end = {};
			var defaulted = library.defaults(start, end);

			expect(defaulted).to.equal(start);
		});

		it('should copy a property if that key is already set on the target', function() {
			var start = {};
			var end = {a:1};
			var defaulted = library.defaults(start, end);

			expect(defaulted.a).to.equal(1);
		});

		it('should not copy a property if that key is already set on the target, even if the value for that key is false', function() {
			var start = {a: '', b: NaN};
			var end = {a: 1, b: 2};
			var defaulted = library.defaults(start, end);

			expect(defaulted.a).to.equal('');
			expect(isNaN(defaulted.b)).to.equal(true);
		});

		it('prefers the first value found, when two objects are provided with properties at the same key', function() {
			var start = {};
			var end = {a: 1};
			var endExtend = {a: 2};
			var defaulted = library.defaults(start, end, endExtend);

			expect(defaulted.a).to.equal(1);
		});

	});
});

      // Arrays --- Complete Functions Below && Advanced Arrays --- Complete Functions Below

describe('Arrays', function() {
	describe('first', function() {
          it('should return the first element in array if n is undefined', function() {
            expect(library.first([1,2,3])).to.equal(1);
          });

          it('should be able to accept n-elements as an argument', function() {
            expect(library.first([1,2,3], 0)).to.eql([]);
            expect(library.first([1,2,3], 2)).to.eql([1, 2]);
            expect(library.first([1,2,3], 5)).to.eql([1, 2, 3]);
          });
	});

	describe('last', function() {
          it('should return the last element from an array', function() {
            expect(library.last([1,2,3])).to.equal(3);
          });

          it('should accept an specified argument', function() {
            expect(library.last([1,2,3], 2)).to.eql([2, 3]);
          });

          it('should return nothing if zero is passed in as the index', function() {
            expect(library.last([1,2,3], 0)).to.eql([]);
          });

          it('should return all array elements if argument is larger than the length of the array', function() {
            expect(library.last([1,2,3], 5)).to.eql([1, 2, 3]);
          });

	});

	describe('indexOf', function() {
          it('should contain 15', function() {
            var listOfNumbers = [5, 10, 15, 20 ,25, 30];

            expect(library.indexOf(listOfNumbers, 15)).to.be(2);
          });

          it('should return -1 when the target is not in the array', function() {
            var listOfNumbers = [5, 10, 15, 20 ,25, 30];

            expect(library.indexOf(listOfNumbers, 1)).to.be(-1);
          });

          it('should return the first index where the target is found', function(){
            var listOfNumbers = [5, 10, 15, 15, 15, 15, 20 ,25, 30];

            expect(library.indexOf(listOfNumbers, 15)).to.be(2);
          });
	});

	describe('uniq', function() {
		it('should return all unique values in an unsorted array', function() {
            var listOfNumbers = [5, 10, 5, 15, 20, 15, 20, 25, 30];

            expect(library.uniq(listOfNumbers)).to.eql([5, 10, 15, 20, 25, 30]);
		});

          it('should handle iterators that work with a sorted array', function() {
            var iterator = function(value) { return value +1; };
            var list = [1, 2, 2, 3, 4, 4];

            expect(library.uniq(list, true, iterator)).to.eql([1, 2, 3, 4]);
		});
	});

	describe('Advanced Arrays', function() {
		describe('zip', function() {
            it('should merge arrays with unbalanced lengths', function() {
              var one = [1, 2, 3], two = ['a', 'b', 'c'], three = ['apples'];

              expect(library.zip(one, two, three)).to.eql([
                [1, 'a', 'apples'],
                [2, 'b', undefined],
                [3, 'c', undefined]
              ]);
            });
		});

		describe('flatten', function() {
            it('should flatten a nested array', function() {
              expect(library.flatten([1, [2, [3, [4]]]])).to.eql([1, 2, 3, 4]);
            });
		});

		describe('intersection', function() {
            it('should return the intertersection of arrays', function() {
              var land = ['bird', 'beaver', 'platypus'];
              var water = ['platypus', 'fish', 'whale'];

              expect(library.intersection(land, water)).to.eql(['platypus']);
            });
		});

		describe('difference', function() {
            it('should return the differnce between multiple array inputs', function() {
              expect(library.difference([1,2,3], [2,4,5])).to.eql([1, 3]);
              expect(library.difference([12, 24, 48, 60], [12, 20, 30, 40], [24, 45, 55, 65])).to.eql([48, 60]);
            });
		});
	});
});

      // Functions --- Complete Functions Below

describe('Functions', function() {
	describe('once', function() {
		it('should only run a given function one time', function() {
            var num = 0;
            var add = library.once(function() {
              return num += 1;
            });

            add();
            add();

            expect(num).to.equal(1);
          });
        });

	describe('memoize', function() {
          var fibonacci, memFib, time, memTime, wait;

          beforeEach(function() {
            fibonacci = function(n) { return n < 2 ? n: fibonacci(n - 1) + fibonacci(n - 2);}
            memFib = library.memoize(fibonacci);

            time = function(str) { return str + Date.now(); };
            memTime = library.memoize(time);

            wait = function(t) {
              var start = Date.now();
              while ((Date.now() - start) < t){}
            };
          });

          it('should produce the same result when called with the same arguments', function() {
            expect(fibonacci(10)).to.equal(55);
            expect(memFib(10)).to.equal(55);

          });

          it('should give different results for different arguments', function() {
            expect(fibonacci(10)).to.equal(55);
            expect(memFib(10)).to.equal(55);
            expect(memFib(7)).to.equal(13);
          });

          it('should not run the function twice for the same argument', function() {
            var firstTime = time('shazaam!');
            wait(5);
            var secondTime = memTime('shazaam!');
            wait(5);
            expect(firstTime).to.not.equal(secondTime);
            expect(memTime('shazaam!')).to.equal(secondTime);
          });
        });

	describe('delay', function() {
          var timer;
          beforeEach(function() {
            timer = sinon.useFakeTimers();
          });

          afterEach(function() {
            timer.restore();
          });

          it('should only execute the function after the specified wait time', function() {
            var callback = sinon.spy();
            library.delay(callback, 100);

            timer.tick(30);
            expect(callback.notCalled).to.be(true);

            timer.tick(70);
            expect(callback.calledOnce).to.be(true);
          });

          it('should have successfully passed function arguments in', function() {
            var callback = sinon.spy();

            library.delay(callback, 100, 1, 2);
            timer.tick(100);
            expect(callback.calledWith(1, 2)).to.be(true);
          });
	});
});