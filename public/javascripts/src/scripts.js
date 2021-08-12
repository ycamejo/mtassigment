/* Global Event Listeners */
document.addEventListener("DOMContentLoaded", function(){
	console.log('Now that DOM is ready!!! My favorite movie is: Once upon a time!');
	ready();
});
/* Application logic */
let factOptions = {
	"t1" : "You are correct",
	"l1": "You are incorrect",
	"t2": "You are correct"
};
const ready = function() {
	const facts = document.querySelectorAll('input[name="facts"]');
	facts.forEach(fact => {
		fact.addEventListener('change', function () {
			const factValue = fact.value;
			const factAnswer = factOptions[factValue];
			const answer = document.getElementById('answer');
			answer.innerHTML = factAnswer;
			answer.classList.remove('wrong');
			answer.classList.remove('right');
			if(factValue[0] === 't') {
				answer.classList.add('right');
			} else {
				answer.classList.add('wrong');
			}
		});
	});
}