"use strict";
// DOM ELEMENTS
const form = document.querySelector("#form-container");
const allInputs = document.querySelectorAll(".form-input");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const numberInput = document.getElementById("phone-number");
const passwordInput = document.getElementById("password");
const eye = document.querySelector(".password-mode");
const submitButton = document.querySelector(".button-one");

// LOG STATE
let allAccounts = {};
localStorage.setItem("isLoggedIn", false);

// GETTING USER INFO FROM STORAGE
for (let i = 0; i < localStorage.length; i++) {
  allAccounts[localStorage.key(i)] = JSON.parse(
    localStorage.getItem(localStorage.key(i))
  );
}

// =================== FUNCTIONS ===============
// CAPITALIZING FIRST LETTER OF ANY NAME
const capitalizeLetter = function (name) {
  const nameArr = name.toLowerCase().split(" ");
  const newNames = [];
  for (let i = 0; i < nameArr.length; i++) {
    newNames.push(
      nameArr[i].replace(nameArr[i][0], nameArr[i][0].toUpperCase())
    );
  }
  return newNames.join(" ");
};

// LOGGING A USER IN
const logUserIn = function () {
  this.window.location.href = "http://127.0.0.1:5501";
  localStorage.setItem("isLoggedIn", true);
  localStorage.setItem(
    "currentAccount",
    JSON.stringify(allAccounts[emailValue])
  );
};

// CLASS FOR USER DETAILS
class LoginDetails {
  constructor(fullName, email, password, number) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.number = number;
  }
}

// HANDLING FORM SUBMIT EVENT
// NEW USER => SIGN UP
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let emailValue = emailInput.value.toLowerCase();
  let passwordValue = passwordInput.value;

  if (document.title.toLowerCase().replaceAll(" ", "") === "signuppage") {
    let nameValue = capitalizeLetter(nameInput.value);
    let numberValue = numberInput.value;

    // HANDLING SIGN UP WHEN ACCOUNT EXISTS
    if (allAccounts[emailValue]) {
      alert("Account already exists");
      return;
    }

    // WHEN ACCOUNT DOESN'T EXIST
    else {
      // INSTANCE OF LOGIN DETAILS
      allAccounts[emailValue] = new LoginDetails(
        nameValue,
        emailValue,
        passwordValue,
        numberValue
      );

      // SENDING DETAILS TO THE STORAGE
      localStorage.setItem(
        allAccounts[emailValue].email,
        JSON.stringify(allAccounts[emailValue])
      );

      // AFTER SIGNING UP TAKING THE USER BACK TO HOME PAGE AND LOGGING USER IN
      logUserIn();
    }
  }

  // OLD USER => LOG IN
  if (document.title.toLowerCase().replaceAll(" ", "") === "loginpage") {
    if (allAccounts[emailValue]) {
      if (passwordValue != allAccounts[emailValue].password) {
        e.preventDefault();
        alert("Check Password and Try Again");
      } else {
        logUserIn();
      }
    } else alert("Account Doesn't Exist, Try Signing Up");
  }
});

// HANDLING FORM INPUT
form.addEventListener("click", function (e) {
  //HANDLING SHOWING PASSWORD
  if (e.target.classList.contains("fa-eye")) {
    password.type = "password";
    eye.classList.toggle("fa-eye-slash");
    if (e.target.classList.contains("fa-eye-slash")) password.type = "text";
  }

  // HANDLING VALIDITY OF USER INPUTS
  if (e.target.classList.contains("button-one")) {
    allInputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (
          input.validity.tooLong ||
          input.validity.tooShort ||
          input.validity.valueMissing
        ) {
          input.reportValidity();
        } else {
          input.setCustomValidity("");
        }
      });
    });
  }
});

