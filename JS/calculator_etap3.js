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

var mathOperatorArray = ['+', '-', '*', '/'];

// var calcArrayPrev = calcArray[calcArray.length-2];

// var storedNumbers =[];

function handleClick(item) {
  calcArray.push(`${item}`);
  compoundExpression = calcArray.join('');
  // console.log('calcArray: ' + calcArray);
  // console.log('compoundExpression: ' + compoundExpression);
}

function tempStoredNumbers(key) {
  while (numbersArray.includes(key)) {
    storedNumbers.push(key);
    break;
  }
}

// function calcArraySplicePrev(calcArray) {
//   if (calcArrayPrev === '+' || calcArrayPrev === '-' || calcArrayPrev === '*' || calcArrayPrev === '/') {
//     calcArray.splice(calcArray.length - 2, 1);
//     // calcDispMain('calcArray');
//     compoundExpression = calcArray.join('');
//   }
// }

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
  while (eventKeyArray.includes(event.key) === true) {
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

  var calcArrayPrev = calcArray[calcArray.length - 2];

  switch (key) {

    case '+':
    case '-':
    case '*':
    case '/':


      if (calcArrayPrev === '+' || calcArrayPrev === '-' || calcArrayPrev === '*' || calcArrayPrev === '/') {
        calcArray.splice(calcArray.length - 2, 1);
        // calcDispMain('calcArray');
        compoundExpression = calcArray.join('');
      }


      calcDispMain(compoundExpression);
      calcDispHist(compoundExpression);

      break;

    case '=':
    case 'Enter':

      //Jeśli wyrażenie kończy się '+', '-', '*' lub '/'

      if (calcArrayPrev === '+' || calcArrayPrev === '-' || calcArrayPrev === '*' || calcArrayPrev === '/') {
        calcArray.splice(calcArray.length - 2, 1);
        compoundExpression = calcArray.join('');
      }

      calcArray.pop();
      compoundExpression = calcArray.join('');

      score = eval(compoundExpression);
      calcDispMain(score);
      calcDispHist(compoundExpression);

      // Jeśli '=' jest pierwszym znakiem
      if (calcArray.length === 0) {
        calcDispMain('0');
        calcDispHist('=');

      }


      break;

    case 'CE':
    case 'Backspace':
    case 'Escape':
    case 'Delete':
      calcArray = [];
      compoundExpression = 0;


      calcDispMain(compoundExpression);
      calcDispHist(compoundExpression);

      break;

    case '+/-':
      console.log('naciśnięto +/-');
      calcArray.pop(); // usuwa "+/-" i "." z calcArray
      

      //arr.splice(index, 0, item);

      break;

    default:
      // console.log('naciśnięto liczbę case');



      // tempStoredNumbers(key);
      score = eval(compoundExpression);
      calcDispMain(score);
      // calcDispMain(storedNumbers.join(''));
      // console.log('storedNumbers = ' + storedNumbers);
      // console.log('storedNumbers.join = ' +storedNumbers.join('') );
      calcDispHist(compoundExpression);

      if (calcArray[calcArray.length - 1] === '.') {
        calcDispMain(compoundExpression);
      }


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
