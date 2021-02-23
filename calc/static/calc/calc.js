let displayValue = '';  // The display value
let numberStack = [];  // An array of all digits entered
const calcEntries = ['1','2','3','4','5','6','7','8','9','0','+', '-', '*', '/'];

// All the numbers and operators input will be stored in an array "num" using function "sendNum()"
function sendNum(digit){
  numberStack.push(digit);
  displayValue = displayValue + numberStack[numberStack.length-1];	// concatenate the elements of the array "num" into a single string, which will be displayed on the screen
  document.querySelector('.screen').innerHTML = displayValue;	// displaying the concatenated string
}

// when the user presses "=", function "equalTo()" is called
function equalTo(){
  document.querySelector('.screen').innerHTML = '';
  let answer = math.evaluate(displayValue); //math.eval is a JavaScript library from MathJS that aleviates some security concerns from standard eval;
  answer = answer.toFixed(3);
  document.querySelector('.screen').innerHTML = answer;	// result display
  if (answer=='Infinity' || isNaN(answer)) {
  } else {
    //This updates the server with equation
    updateServer(displayValue, answer);
    //waits 300ms to give the server time, then requests a new results list and updates the notebook.
    setTimeout(function() {
      getResultsData().then(data => writeNotebook(data));
    }, 300);
  }
  //Resets the screen and numbers for next calculation
  numberStack = []
  // numberStack.push(answer.toString());
  displayValue = [];
}

// When user presses "AC", function "clearScr()" is called
function clearScr(){
  document.querySelector('.screen').innerHTML = '';
  numberStack = [];
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
    notebook = document.querySelector('.paperContent');
    notebook.innerHTML = "Results";
    data.forEach(function(entry) {
      listElement = document.createElement("li");
      lineText = `${entry.expression} = ${entry.result}`;
      listElement.innerHTML = lineText;
      notebook.appendChild(listElement);
    });
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
    sendNum('*');
  }	else if (event.key === '=' || event.key === 'Enter') {
    equalTo();
  } else if (event.key === 'Escape') {
    clearScr();
  } else if (event.key === 'Backspace') {
    clearScr();
  } else {}
});
