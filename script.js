// Get all elements
const firstname = document.getElementById("firstName");
const lastname = document.getElementById("lastName");
const email = document.getElementById("email");
const password_1 = document.getElementById("password-1");
const password_2 = document.getElementById("password-2");
const dob = document.getElementById("dob");
const street = document.getElementById("street");
const postCode = document.getElementById("postCode");
const city = document.getElementById("city");
const button = document.getElementById("btn");
const form = document.getElementById("form");

// Add event listeners
form.addEventListener("submit", (submitEvent) => {
  submitEvent.preventDefault();
  console.log(firstname.value);
  console.log(lastname.value);
});

firstname.addEventListener("keyup", (keyboardEvent) => {
  const element = keyboardEvent.target;
  const regEx = /^.{2,}$/;
  validateWithRegEx(element, regEx, "Du måste ange minst 2 tecken");
  validateFormToSubmit();
});

lastname.addEventListener("keyup", (keyboardEvent) => {
  const element = keyboardEvent.target;
  const regEx = /^.{2,}$/;
  validateWithRegEx(element, regEx, "Du måste ange minst 2 tecken");
  validateFormToSubmit();
});

email.addEventListener("keyup", (keyboardEvent) => {
  const element = keyboardEvent.target;
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  validateWithRegEx(element, regEx, "Ange en giltig e-postadress");
  validateFormToSubmit();
});

password_1.addEventListener("keyup", (keyboardEvent) => {
  const element = keyboardEvent.target;
  const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  validateWithRegEx(element, regEx, "Måste vara minst 8 tecken samt bestå av: 0-9, a-ö, A-Ö, !@#$%^&*");
  validatePassword2(element, password_2);
  validateFormToSubmit();
});

password_2.addEventListener("keyup", (keyboardEvent) => {
  validatePassword2(password_1, keyboardEvent.target);
  validateFormToSubmit();
});

dob.addEventListener("change", (changeEvent) => {
  const element = changeEvent.target;
  const date = new Date(element.value);

  let minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 18);

  if (date < minDate) {
    markAsValid(element);
  } else {
    markAsInvalid(element, "Du behöver vara minst 18 år");
  }
  validateFormToSubmit();
});

street.addEventListener("keyup", (keyboardEvent) => {
  const element = keyboardEvent.target;
  const regEx = /^.{2,}$/;
  validateWithRegEx(element, regEx, "Du måste ange minst 2 tecken");
  validateFormToSubmit();
});

postCode.addEventListener("keyup", (keyboardEvent) => {
  const element = keyboardEvent.target;
  const regEx = /^[0-9]{5,}/;
  validateWithRegEx(element, regEx, "Du måste ange 5 siffror");
  validateFormToSubmit();
});

city.addEventListener("keyup", (keyboardEvent) => {
  const element = keyboardEvent.target;
  const regEx = /^.{2,}$/;
  validateWithRegEx(element, regEx, "Du måste ange minst 2 tecken");
  validateFormToSubmit();
});

// Show and hide error messages
const markAsValid = (element) => {
  const inputBox = element.parentElement;
  inputBox.className = "input-box success";
  element.style.borderColor = "green";
};

const markAsInvalid = (element, text) => {
  const inputBox = element.parentElement;
  inputBox.className = "input-box error";
  const small = inputBox.querySelector("small");
  small.innerText = text;
  element.style.borderColor = "red";
};

// Validation
const validateWithRegEx = (element, regEx, errorMessage) => {
  if (regEx.test(element.value)) {
    markAsValid(element);
  } else {
    markAsInvalid(element, errorMessage);
  }
};

const validatePassword2 = (password1Element, password2Element) => {
  if (password1Element.value === password2Element.value) {
    markAsValid(password2Element);
  } else {
    markAsInvalid(password2Element, "Lösenorden måste vara lika");
  }
};

const validateFormToSubmit = () => {
  let disable = true;
  const errors = document.querySelectorAll(".input-box.success");

  if (errors.length === 9) {
    disable = false;
  }

  button.disabled = disable;
};
