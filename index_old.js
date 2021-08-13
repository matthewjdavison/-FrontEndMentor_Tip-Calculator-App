const formElement = document.querySelector("form");
const billInput = document.querySelector(".bill").children["form_field"].children["bill"];
const tipPercentInput = document.querySelector(".tips").querySelectorAll("button");
const tipPercentCustomInput = document.querySelector(".tips").querySelector("input");
const peopleInput = document.querySelector(".num_of_people").children["form_field"].children["num_of_people"];

const tipPerPersonOutput = document.querySelector(".tipAmount").children["result__cost"];
const totalPerPersonOutput = document.querySelector(".totalTip").children["result__cost"];
const resetBtn = document.querySelector(".result__reset");
formElement.reset();

let bill = 0;
let numOfPeople = 1;
let tip = 0;


function updateBill() {
  if (billInput.value != "") {
    billInput.classList.add("dirty");
  } else {
    billInput.classList.remove("dirty");
  }
  if (billInput.value == "") {
    billInput.setCustomValidity("You paid... nothing?")
  }
  bill = parseFloat(billInput.value);
  if (bill === 0) { 
    // let errorMessage = billInput.parentNode.parentNode.children["bill header"].children["error_message"];
    // billInput.setCustomValidity("You paid... nothing?");
    // errorMessage.innerHTML = billInput.validationMessage;
    // errorMessage.style.display = "block";    
  }
  updateOutput();
}
function updateNumOfPeople(value) {
  if (peopleInput.value != "") {
    peopleInput.classList.add("dirty");
  } else {
    peopleInput.classList.remove("dirty");
  }
  if (value.target.value == "") {
    return;
  }
  numOfPeople = parseInt(value.target.value);
  if (numOfPeople === 0) {
    peopleInput.setCustomValidity("Can't be 0");
    updateValidation(peopleInput, "personnel header")
    // let errorMessage = peopleInput.parentNode.parentNode.children["personnel header"].children["error_message"];
    
    numOfPeople = 1;
  }
  updateOutput();
}
function updateTip(floatValue) {
  tip = parseFloat(floatValue);
  if (tipPercentCustomInput.value != "") {
    tipPercentCustomInput.classList.add("dirty");
  } else {
    tipPercentCustomInput.classList.remove("dirty");
  }
  updateOutput();
}
function updateValidation(input, inputHeader){
  let errorMessage = input.parentNode.parentNode.children[inputHeader].children["error_message"];
  if(input.checkValidity()){
    errorMessage.innerHTML = peopleInput.validationMessage;
    errorMessage.style.display = "block";
  }
}
function updateOutput() {
  if(formElement.checkValidity()) {
    let tipPerPerson = (((bill / 100) * tip) / numOfPeople).toFixed(2);
    let totalPerPerson = (((bill / 100) * tip + bill) / numOfPeople).toFixed(2);

    if (tipPerPerson != "0.00" || totalPerPerson != "0.00") {
      resetBtn.disabled = false;
    } else {
      if (resetBtn.disabled == false) {
        resetBtn.disabled = true;
      }
    }
    tipPerPersonOutput.innerHTML = "$" + tipPerPerson;
    totalPerPersonOutput.innerHTML = "$" + totalPerPerson;
  } else{
    if(billInput.validationMessage != ""){console.log(billInput.validationMessage);}
    if(tipPercentCustomInput.validationMessage != ""){console.log(tipPercentCustomInput.validationMessage);}
    if(peopleInput.validationMessage != ""){console.log(peopleInput.validationMessage);}
    
      
    
  }
}
billInput.addEventListener("change", (_) => {
  updateBill();
  updateValidation(billInput, "bill header")
});
billInput.addEventListener("keydown", (event) => {
  if (event.keyCode == 13) {
    event.preventDefault();
    updateBill();
    updateValidation(billInput, "bill header")
    return;
  }
});
tipPercentInput.forEach((element) => {
  element.addEventListener("click", (fieldSet) => {
    fieldSet.preventDefault();
    let floatValue = fieldSet.target.value.split("%")[0];
    updateTip(floatValue);
    if (document.querySelectorAll(".tip.active").length > 0) {
      document.querySelectorAll(".tip.active")[0].classList.remove("active");
    }
    element.classList.add("active");
  });
});
tipPercentCustomInput.addEventListener("change", (fieldSet) => {
  let floatValue = 0;
  if(fieldSet.target.value == ""){return;}
  floatValue = fieldSet.target.value.split("%")[0];

  updateTip(floatValue);
  
});
tipPercentCustomInput.addEventListener("keydown", (event) => {
  if (event.keyCode == 13) {
    event.preventDefault();

    updateTip(tipPercentCustomInput.value);
    return;
  }
});
peopleInput.addEventListener("change", (target) => {
  updateNumOfPeople(target);
  
});
peopleInput.addEventListener("keydown", (event) => {
  if (event.keyCode == 13) {
    event.preventDefault();
    updateNumOfPeople(event);
    return;
  }
});
resetBtn.addEventListener("click", (_) => {
  formElement.reset();
  bill = 0;
  numOfPeople = 1;
  tip = 0;
  resetBtn.disabled = true;
  updateOutput();
});

updateOutput();


