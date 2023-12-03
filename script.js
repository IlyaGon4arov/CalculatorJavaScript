function doing(number1, number2, option) {
  let answ = 0;

  switch (option) {
    case "+":
      answ = number1 + number2;
      break;
    case "-":
      answ = number1 - number2;
      break;
    case "*":
      answ = number1 * number2;
      break;
    case "/":
      answ = number1 / number2;
      break;
  }

  return String(answ);
}


function transformNumb(number){
  var main_number = number.split(".");

  var ones = main_number[0].split("").reverse();
  var answ = "";
  
  for (var i = 1; i <= ones.length; i++) {
      answ += ones[i-1];
      if (i % 3 == 0 && i != ones.length) {answ += " ";}
  }

  if (main_number.length == 1) {answ = answ.split("").reverse().join("");}
  else {answ = answ.split("").reverse().join("") + "." + main_number[1];}
  return answ;
}


const buttonElementsNumbers = document.querySelectorAll('.numbers .button');
var numb = document.getElementById("main_numb");
var sup_numb = document.getElementById("sup_numb");

var last_number = undefined;
var main_number = "0";
var operation = undefined;

var is_new_number = false;


buttonElementsNumbers.forEach(function(button) {
  button.addEventListener('click', function() {
    if (main_number.length >= 16){return 0;}

    const press_number = this.textContent;
    
    if (is_new_number) {main_number = press_number; is_new_number = false;}
    else if ((press_number != "." && main_number != "0") || (press_number == "." && main_number.indexOf(".") == -1)) {
      main_number += press_number;
    }
    else {main_number = press_number;}

    numb.textContent = transformNumb(main_number);
  });
});

const buttonElementsOptions = document.querySelectorAll('.options .button');


buttonElementsOptions.forEach(function(button) {
  button.addEventListener('click', function() {
    const press_option = this.textContent;

    if (press_option == "C") {
      last_number = undefined;
      main_number = "0";
      operation = undefined;
    }
    else if (press_option == "<--")
    {
      if (main_number.length == 1) {main_number = "0";}
      else {main_number = main_number.slice(0, -1);}
    }
    else {
      if (last_number != undefined) {
        if (operation == "/" && main_number == "0") {alert("You can not do this!"); return 0;}
        main_number = doing(Number(last_number), Number(main_number), operation);
      }

      if (press_option == "=") {
        if (last_number == undefined) {return 0;}
        is_new_number = true;
        last_number = undefined;
        operation = undefined;
      }
      else {
        last_number = main_number;
        main_number = "0";
        operation = press_option;
      }
    }

    numb.textContent = transformNumb(main_number);
    if (last_number != undefined) {
      sup_numb.textContent = transformNumb(last_number) + " " + operation;
    }
    else {sup_numb.textContent = "Nothing";}
  });
});