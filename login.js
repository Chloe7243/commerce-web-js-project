"use strict";
const form = document.querySelector("#form-container");
const allInputs = document.querySelectorAll(".form-input");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const numberInput = document.getElementById("phone-number");
const passwordInput = document.getElementById("password");
const eye = document.querySelector(".password-mode");
const submitButton = document.querySelector(".button-one");

let allAccounts = {};
localStorage.setItem("isLoggedIn", false);

for (let i = 0; i < localStorage.length; i++) {
  allAccounts[localStorage.key(i)] = JSON.parse(
    localStorage.getItem(localStorage.key(i))
  );
}

const firstCapitalLetter = function (name) {
  const nameArr = name.toLowerCase().split(" ");
  const newNames = [];
  for (let i = 0; i < nameArr.length; i++) {
    newNames.push(
      nameArr[i].replace(nameArr[i][0], nameArr[i][0].toUpperCase())
    );
  }
  return newNames.join(" ");
};

class LoginDetails {
  constructor(fullName, email, password, number) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.number = number;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault()
  let emailValue = emailInput.value.toLowerCase();
  let passwordValue = passwordInput.value;

  if (document.title.toLowerCase().replaceAll(" ", "") === "signuppage") {
    let nameValue = firstCapitalLetter(nameInput.value);
    let numberValue = numberInput.value;

    if (allAccounts[emailValue]) {
      alert("Account already exists");
      return;
    } else {
      allAccounts[emailValue] = new LoginDetails(
        nameValue,
        emailValue,
        passwordValue,
        numberValue
      );
      localStorage.setItem(
        allAccounts[emailValue].email,
        JSON.stringify(allAccounts[emailValue])
      );
      this.window.location.href = "http://127.0.0.1:5501";
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem(
        "currentAccount",
        JSON.stringify(allAccounts[emailValue])
      );
    }
  }

  if (document.title.toLowerCase().replaceAll(" ", "") === "loginpage") {
    if (allAccounts[emailValue]) {
      if (passwordValue != allAccounts[emailValue].password) {
        e.preventDefault();
        alert("Check Password and Try Again");
      } else {
        console.log("WELCOME ");
        this.window.location.href = "http://127.0.0.1:5501";
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem(
          "currentAccount",
          JSON.stringify(allAccounts[emailValue])
        );
      }
    } else alert("Account Doesn't Exist, Try Signing Up");
  }

  // nameInput
  //   ? (nameValue = emailValue = passwordValue = "")
  //   : (emailValue = passwordValue = "");
});

form.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-eye")) {
    password.type = "password";
    eye.classList.toggle("fa-eye-slash");
    if (e.target.classList.contains("fa-eye-slash")) password.type = "text";
  }

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

console.log(allAccounts);
console.log(this.window.location);

