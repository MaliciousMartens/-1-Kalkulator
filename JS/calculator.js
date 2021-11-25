//Określa liczbę przycisków do addEventListener
var numberOfButtons = document.querySelectorAll('.calc').length;
//Array do którego wchodzą kliknięte przyciski
var calcArray = [];
//Złożone z liczb (str) i znaków działań wyrażenie -> wartość początkowa
var zlozoneWyrazenie = 0;

//Nasłuchiwanie przycisków
for (var i = 0; i < numberOfButtons; i++) {
  document.querySelectorAll('.calc')[i].addEventListener('click', handleClick);

  //Opisuje co stanie się po kliknięciu przycisku
  function handleClick() {
    calcArray.push(this.innerHTML); //Dodaje zawartość klikniętych przycisków do calcArray
    zlozoneWyrazenie = calcArray.join("");
    document.querySelector('#calc-display-history').innerHTML = zlozoneWyrazenie; //Prezentuje złożony numer w formie liczby w wyświetlaczu

    //Sprawdza czy został naciśnięty "=", "CE", nieobsługiwane na razie ""+/-"" i "." czy cyfra

    if (this.innerHTML == "=") {
      calcArray.pop(); // usuwa "=" z calcArray
      zlozoneWyrazenie = calcArray.join(""); // Składa elementy numbersArray w stringa
      document.querySelector('#calc-display').innerHTML = eval(zlozoneWyrazenie); //Prezentuje wynik na wyświetlaczu

    } else if (this.innerHTML == "CE") {
      calcArray = [];
      zlozoneWyrazenie = 0;
      document.querySelector('#calc-display-history').innerHTML = zlozoneWyrazenie;
      document.querySelector('#calc-display').innerHTML = zlozoneWyrazenie;


    } else if (this.innerHTML == "+/-" || this.innerHTML == ".") {
      calcArray.pop(); // usuwa "+/-" i "." z calcArray
      alert("Ta funkcjonalność nie jest obecnie obsługiwana.");

    } else {
      document.querySelector('#calc-display-history').innerHTML = zlozoneWyrazenie; //Prezentuje złożony numer albo dziłanie na wyświetlaczu historii
    }
  }
}
