let displayValue = '';  // The display value
let num = [];  // An array of all digits entered
let ans;  // Result of the calculation

// All the numbers and operators input will be stored in an array "num" using function "sendNum()"
function sendNum(digit){
	num.push(digit);
	displayValue = displayValue + num[num.length-1];	// concatenate the elements of the array "num" into a single string, which will be displayed on the screen
	document.getElementById('screen').innerHTML = displayValue;	// displaying the concatenated string
}

// when the user presses "=", function "equalTo()" is called
function equalTo(){
	document.getElementById('screen').innerHTML = '';
	ans = eval(displayValue); //eval has security concerns; but I don't think the user can inject malicious code in given the entry constraints.
	document.getElementById('screen').innerHTML = ans;		// result display
  num = []
	num.push(ans.toString());
	displayValue = ans;
}

// When user presses "AC", function "clearScr()" is called
function clearScr(){
	document.getElementById('screen').innerHTML = '';
  num = [];
	displayValue ='';
}

// This binds the relevant keyboard keys to the functions above; whose got time to click?
const calcEntries = ['1','2','3','4','5','6','7','8','9','0','+', '-', '*', '/']

document.addEventListener('keydown', function(event){
	if (calcEntries.includes(event.key)) {
		sendNum(event.key);
	} else if (event.key === 'x') {
		sendNum('*')
	}	else if (event.key === '=' || event.key === 'Enter') {
		equalTo();
	} else if (event.key === 'Escape') {
		clearScr();
	}
	else {}
} );
