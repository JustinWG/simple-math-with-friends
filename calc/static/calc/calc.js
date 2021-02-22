let displayValue = '';  // The display value
let num = [];  // An array of all digits entered
let ans;  // Result of the calculation


// Posts an expression & result to the REST API Server
function updateServer(expression, result) {
	const data = {'expression': expression, 'result': result};

	fetch('http://127.0.0.1:8000/api/new', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
}

// Grabs data from the Rest API and 'draws' it on the notebook
// function updateResultsData() {
// 	var obj;
// 	fetch('http://127.0.0.1:8000/api/get')
//   .then(response => response.json())
// 	.then(data => {
// 		dataset = data;
// 		drawResults();
// 	});
// 	function drawResults() {
// 		notebook = document.querySelector('#paperContent');
// 		notebook.innerHTML = "Results"
// 		dataset.forEach(function(entry) {
// 			listElement = document.createElement("li");
// 			lineText = `${entry.expression} = ${entry.result}`;
// 			listElement.innerHTML = lineText;
// 			notebook.appendChild(listElement);
// 		});
// 	}
// }

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
	// send JSON here
	updateServer(displayValue, ans);
	// receive JSON here
	updateNotebook;
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

const updateNotebook = updateResultsData().then(data => drawResults(data));
// sets the Results list on page-load (and recursively calls itself thereafter)
updateNotebook;

async function updateResultsData() {
  const response = await fetch('/api/get');
  const data = await response.json();
  return data;
}

function drawResults(data) {
	notebook = document.querySelector('#paperContent');
	notebook.innerHTML = "Results"
	data.forEach(function(entry) {
		listElement = document.createElement("li");
		lineText = `${entry.expression} = ${entry.result}`;
		listElement.innerHTML = lineText;
		notebook.appendChild(listElement);
	});
}