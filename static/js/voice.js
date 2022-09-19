'use strict'

function pronounce() {

	let word = document.getElementById('word').value;
	let u = new SpeechSynthesisUtterance();
	u.lang = 'en-US';
	u.text = word;
	speechSynthesis.speak(u);

}