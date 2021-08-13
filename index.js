const formElement = document.querySelector("form");
const billInput = document.querySelector(".bill").children["form_field"].children["bill"];
const tipPercentInput = document.querySelector(".tips").querySelectorAll("button");
const tipPercentCustomInput = document.querySelector(".tips").querySelector("input");
const peopleInput = document.querySelector(".num_of_people").children["form_field"].children["num_of_people"];

const tipPerPersonOutput = document.querySelector(".tipAmount").children["result__cost"];
const totalPerPersonOutput = document.querySelector(".totalTip").children["result__cost"];
const resetBtn = document.querySelector(".result__reset");
formElement.reset();

///bill value changes -> Update 'bill' variable
///tip button pressed -> deactivate any active buttons and then activate button. Update the 'tip' variable based on button value.
///custom tip value changes -> update 'tip' variable.
///number of people changes -> update 'numOfPeople' variable

//reset button pressed = all values to 0, update output.
//create function to calculate totalTip (bill / 100 * tip)
//create function to calculate tip per person (totalTip / numOfPeople)
//create function to calculate total per person ((bill + totalTip) / numOfPeople)
//create function to call the above 3 functions.
//create function to update text.

//add custom validation to numOfPeople input to ensure people enter at least 1 before updating numOfPeople variable.



let bill = 0; // The bill is at 0 by default.
let tip = 0; // The tip is 0 by default.
let numOfPeople = 1; //numOfPeople is at 1 by default
let totalTip = 0;

function calculateTotalTip() {
  totalTip = bill / 100 * tip;
}
function calculateTipPerPerson() {
  return totalTip / numOfPeople;
}
function calculateTotalPerPerson() {
  return (bill + totalTip) / numOfPeople;
}
function updateOutput(tipPerPerson, totalPerPerson){
  tipPerPersonOutput.innerHTML = "$"+tipPerPerson;
  totalPerPersonOutput.innerHTML = "$"+totalPerPerson;
  console.log("tip per person: "+tipPerPerson+"\ntotal per person: "+totalPerPerson);
  if(!totalPerPerson == 0.00 || !tipPerPerson == 0.00){
    resetBtn.disabled = false;
  }
}
function calculate() {
  calculateTotalTip();
  let tipPerPerson = calculateTipPerPerson().toFixed(2);
  let totalPerPerson = calculateTotalPerPerson().toFixed(2);
  updateOutput(tipPerPerson, totalPerPerson);
}




//bill value changes -> Update 'bill' variable

billInput.addEventListener('change', update => {
  if (billInput.value != "") {
    billInput.classList.add("dirty");
  } else {
    billInput.classList.remove("dirty");
  }

  if(parseFloat(update.target.value)){
    bill = parseFloat(update.target.value);
    calculate();
  } else{
    console.error("Couldn't parse bill input to float.")
  }
})
//tip button pressed -> deactivate any active buttons and then activate button. Update the 'tip' variable based on button value.
for (const button of tipPercentInput) {
  button.addEventListener('click', update => {
    if(parseFloat(update.target.value)){
      tip = parseFloat(update.target.value);
      calculate();
    }else{
      console.error("Couldn't parse tip input to float.")
    }
  })
}
//custom tip value changes -> update 'tip' variable.
tipPercentCustomInput.addEventListener('change', update => {
  if (tipPercentCustomInput.value != "") {
    tipPercentCustomInput.classList.add("dirty");
  } else {
    tipPercentCustomInput.classList.remove("dirty");
  }
  if(update.target.value.includes('%')){
    let splitString = update.target.value.split('%');
    if(parseFloat(splitString[0])){
      tip = parseFloat(splitString[0]);
      calculate();
    }else{
      console.error("Couldn't parse custom tip input to float. (% included)")
    }
  }
  else{
    if(parseFloat(update.target.value)){
      tip=parseFloat(update.target.value)
      calculate();
    } else{
      console.error("Couldn't parse custom tip input to float. (% not included)")
    }
  }
})
//number of people changes -> update 'numOfPeople' variable
peopleInput.addEventListener('change', update => {
  if (peopleInput.value != "") {
    peopleInput.classList.add("dirty");
  } else {
    peopleInput.classList.remove("dirty");
  }
  if(peopleInput.value == '0'){
    peopleInput.setCustomValidity("Can't be zero")
    let errorMessage = peopleInput.parentNode.parentNode.children["personnel header"].children["error_message"];
    errorMessage.innerHTML = peopleInput.validationMessage;
    errorMessage.style.display = "block"
    return;
  } else{
    peopleInput.setCustomValidity("")
  }
  if(parseInt(update.target.value)){
    numOfPeople = parseInt(update.target.value);
    calculate();
  }else{
    console.error("Couldn't parse number of people to int.")
  }
})
resetBtn.addEventListener('click', _ => {
  bill = 0; // The bill is at 0 by default.
  tip = 0; // The tip is 0 by default.
  numOfPeople = 1; //numOfPeople is at 1 by default
  totalTip = 0;
  calculate();
  formElement.reset();
  let dirtyFields = document.querySelectorAll(".dirty");

  dirtyFields.forEach(field => {
  field.classList.remove("dirty");
});

})





