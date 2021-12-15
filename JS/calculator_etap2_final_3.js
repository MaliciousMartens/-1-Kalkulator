var numberOfButtons = document.querySelectorAll('.calc').length;
//Array do którego wchodzą kliknięte przyciski
var calcArray = [];
//Złożone z liczb (str) i znaków działań wyrażenie -> wartość początkowa
var compoundExpression = 0;

var key = calcArray[calcArray.length - 1];
// console.log('key = ' + key);

var score = eval(compoundExpression);

var eventKeyArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '+', '*', '/', 'Enter', 'Backspace', '.', 'Escape', 'Delete'];

var numbersArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

var storedNumbers =[];

function handleClick(item) {
  calcArray.push(`${item}`);
  compoundExpression = calcArray.join('');
  // console.log('calcArray: ' + calcArray);
  // console.log('compoundExpression: ' + compoundExpression);
}

function tempStoredNumbers (key) {
  while (numbersArray.includes(key)) {
    storedNumbers.push(key);
    break;
  }
}


//Moduł eventowy

const clickButtons = document.querySelectorAll('button');

clickButtons.forEach(item => {
  item.addEventListener('click', (event) => {
    let trigger = event.target.textContent;
    // console.log(event.target.textContent);
    handleClick(trigger);
    // console.log('klawisz z myszki triggerem: ' + trigger);
    switchFunction(trigger);

  });
});

document.addEventListener('keyup', event => {
  // while (event.key >= 0 && event.key <= 9 || event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/' || event.key === '=' || event.key === 'Enter' || event.key === 'Backspace' || event.key === '.' || event.key === 'Escape') {
    while (eventKeyArray.includes(event.key) === true){
    let trigger = event.key;
    handleClick(trigger);
    switchFunction(trigger);
    // console.log(event.key);
    // console.log('"klawisz" z klawiatury triggerem: ' + trigger);
    break;
  }
});


//Moduł wykonujący operacje
function switchFunction(key) {
  switch (key) {

    case '+':
    case '-':
    case '*':
    case '/':
      // console.log('case ze znakami');

      calcDispMain('');
      calcDispHist(compoundExpression);
      storedNumbers = [];
      break;

    case '=':
    case 'Enter':
      calcArray.pop();
      compoundExpression = calcArray.join('');
      // console.log('case z =');
      // console.log('compoundExpression ze switcha: ' + compoundExpression);
      var score = eval(compoundExpression);
      // console.log('wynik po = ' + score);

      calcDispMain(score);
      calcDispHist(compoundExpression);

      break;

    case 'CE':
    case 'Backspace':
    case 'Escape':
    case 'Delete':
      calcArray = [];
      compoundExpression = 0;
      storedNumbers = [];
      // console.log('case z CE');

      calcDispMain(compoundExpression);
      calcDispHist(compoundExpression);

      break;

    case '+/-':
      console.log('naciśnięto +/-');
      calcArray.pop(); // usuwa "+/-" i "." z calcArray
      alert("Ta funkcjonalność nie jest obecnie obsługiwana.");

      break;

    default:
      // console.log('naciśnięto liczbę case');

      tempStoredNumbers(key);
      calcDispMain(storedNumbers.join(''));
      // console.log('storedNumbers = ' + storedNumbers);
      // console.log('storedNumbers.join = ' +storedNumbers.join('') );
      calcDispHist(compoundExpression);

      break;
  }
}


//Moduł wyświetlająco-alertowy

function calcDispMain(expression) {
  document.querySelector('#calc-display').innerHTML = expression;
  // console.log('z calcDispMain');
}

function calcDispHist(compoundExpression) {
  document.querySelector('#calc-display-history').innerHTML = compoundExpression;
  // console.log('z calcDispHist()');
}
