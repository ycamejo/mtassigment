"use strict";

/* Global Event Listeners */
document.addEventListener("DOMContentLoaded", function () {
	console.log('Now that DOM is ready!!! My favorite movie is: Once upon a time!');
	ready();
});
/* Application logic */
var factOptions = {
	"t1": "You are correct",
	"l1": "You are incorrect",
	"t2": "You are correct"
};
var ready = function ready() {
	var facts = document.querySelectorAll('input[name="facts"]');
	facts.forEach(function (fact) {
		fact.addEventListener('change', function () {
			var factValue = fact.value;
			var factAnswer = factOptions[factValue];
			var answer = document.getElementById('answer');
			answer.innerHTML = factAnswer;
			answer.classList.remove('wrong');
			answer.classList.remove('right');
			if (factValue[0] === 't') {
				answer.classList.add('right');
			} else {
				answer.classList.add('wrong');
			}
		});
	});
};
//# sourceMappingURL=bundle.js.map
