let displayValue = '';  // The display value
let num = [];  // An array of all digits entered
let ans;  // Result of the calculation
const calcEntries = ['1','2','3','4','5','6','7','8','9','0','+', '-', '*', '/']
let current_data = []

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
	ans = ans.toFixed(3);
	console.log(ans);
	console.log(typeof(ans));
	document.getElementById('screen').innerHTML = ans;	// result display
	if (ans==='Infinity') {
		console.log("To Infinity, and Beyond!")
	} else {
	// send JSON here
	//This updates the server with equation
	updateServer(displayValue, ans)

	//waits 300ms to give the server time, then requests a new results list and updates the notebook.
	setTimeout(function() {
		getResultsData().then(data => writeNotebook(data));
	}, 300);
	}
	
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

async function updateServer(expression, result) {
		const data = {'expression': expression, 'result': result};

		const response = await fetch('/api/new', {
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(data),
		});
		const post = await response.json();
		return post;
}

async function getResultsData() {
  const response = await fetch('/api/get');
  const data = await response.json();
  return data;
}

function writeNotebook(data) {
	if (current_data === data) {
		{}
	} else {
		notebook = document.querySelector('#paperContent');
		notebook.innerHTML = "Results"
		data.forEach(function(entry) {
			listElement = document.createElement("li");
			lineText = `${entry.expression} = ${entry.result}`;
			listElement.innerHTML = lineText;
			notebook.appendChild(listElement);
			//TODO: play sound?
		});
	}
	current_data = data
}

function periodicUpdate() {
	getResultsData().then(data => writeNotebook(data));
	setTimeout(periodicUpdate, 3000);
}

periodicUpdate();

// This binds the relevant keyboard keys to the functions above; whose got time to click?
document.addEventListener('keydown', function(event){
	if (calcEntries.includes(event.key)) {
		sendNum(event.key);
	} else if (event.key === 'x') {
		sendNum('*')
	}	else if (event.key === '=' || event.key === 'Enter') {
		equalTo();
	} else if (event.key === 'Escape') {
		clearScr();
	} else if (event.key === 'Backspace') {
		clearScr();
	} else {}
} );
