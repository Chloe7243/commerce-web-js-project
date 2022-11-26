"use strict";
const contentBody = document.querySelector(".body-area");
const fowButton = document.querySelector(".fa-arrow-right");
const bkButton = document.querySelector(".fa-arrow-left");
const loginState = document.querySelector(".login");
const orderButton = document.querySelectorAll(".order");
const cart = document.querySelector(".fa-cart-shopping");
const logo = document.querySelector(".logo");
const cartItems = document.querySelector(".shopping-cart-items");
const closeButton = document.querySelector(".fa-times");
const allItems = document.querySelector(".products");
const modal = document.querySelector(".modal");
const overlay = document.querySelectorAll(".overlay");
const allPickedItems = document.querySelector(".all-selected-items");
const emptyCartHtml = document.querySelector(".empty-cart");

// console.log(itemQuantity.childNodes);
const slidesContainer = document.querySelector(".main-content");
let slides = document.querySelectorAll(".content");

const widthMov = slides[0].getBoundingClientRect().width;
const gapBtwn = getComputedStyle(slidesContainer).rowGap;
const totalWidth = widthMov + parseInt(gapBtwn);
const currentAccount = JSON.parse(localStorage.getItem("currentAccount"));

let index = 0;
let interval = 7000;
let slideId;
let slideIndex = slides[index];

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

slidesContainer.prepend(lastClone);
slidesContainer.append(firstClone);

const moveSlide = function () {
  slideId = setInterval(() => {
    slidesContainer.style.transform = `translateX(${-totalWidth * index}px)`;
    slidesContainer.style.transition = ".7s ";
    // console.log(slideItem[index].id);
    index++;
  }, interval);

  slidesContainer.addEventListener("transitionend", function () {
    slides = getSlides();
    if (index >= (slideId > 0 ? slides.length : slides.length - 1)) {
      slidesContainer.style.transition = "none";
      index = 1;
      slidesContainer.style.transform = `translateX(${-totalWidth * index}px)`;
    }
    if (slides[index].id == lastClone.id) {
      slidesContainer.style.transition = "none";
      index = slides.length - 2;
      slidesContainer.style.transform = `translateX(${-totalWidth * index}px)`;
    }
  });
};

contentBody.addEventListener("mouseenter", () => {
  clearInterval(slideId);
  slideId = 0;
});

contentBody.addEventListener("mouseleave", () => {
  setTimeout(moveSlide, 10000);
});

const getSlides = () => document.querySelectorAll(".content");

moveSlide();

contentBody.addEventListener("click", function (e) {
  if (!e.target.classList.contains("fa-solid")) return;
  if (e.target === fowButton) {
    slides = getSlides();
    if (index >= slides.length - 1) return;
    index++;
    slidesContainer.style.transition = "none";
    slidesContainer.style.transform = `translateX(${-totalWidth * index}px)`;
    slidesContainer.style.transition = ".7s ";
  } else {
    if (index <= 0) return;
    index--;
    slidesContainer.style.transition = "none";
    slidesContainer.style.transform = `translateX(${-totalWidth * index}px)`;
    slidesContainer.style.transition = ".7s ";
  }
});

// const slidesButton = function (direction) {
//   slidesContainer.style.transition = `transform 450ms ease-in-out`
//   direction
// }

// if (allPickedItems.children.length < 1) {
//   emptyCartHtml.classList.add('hidden');

// } // else {
//   emptyCartHtml.classList.remove('hidden')
// }

if (localStorage.getItem("isLoggedIn") === "true") {
  loginState.classList.add("hidden");
  cart.classList.remove("hidden");
  orderButton.forEach((el) => el.setAttribute("href", "#products-section"));
  logo.insertAdjacentHTML(
    "afterend",
    `<p> Welcome, ${currentAccount.fullName.slice(
      0,
      currentAccount.fullName.indexOf(" ")
    )}</p>`
  );

  cart.addEventListener("click", () => {
    cartItems.style.transform = "translateX(0%)";
    overlay[0].classList.remove("hidden");
    document.querySelector("html").style.overflow = "hidden";
  });

  closeButton.addEventListener("click", () => {
    cartItems.style.transform = "translateX(100%)";
    document.querySelector(".overlay").classList.add("hidden");
    document.querySelector("html").style.overflow = "auto";
  });

  allItems.addEventListener("click", function (e) {
    if (allItems.getBoundingClientRect().top > 0) {
      allItems.scrollIntoView(true);
    }
    if (e.target.classList.contains("item")) {
      const itemImage = e.target.childNodes["1"].getAttribute("src");
      const priceOfItem = e.target.childNodes["3"].childNodes["3"].textContent;
      const nameOfItem = e.target.childNodes["3"].childNodes["5"].textContent;

      const modalHtml = `<i class="fa solid fa-times"></i>
        <h2>${nameOfItem}</h2>
        <div class="item-details">
         <img src= ${itemImage} alt="" />
          <div class="details">
            <p>Specifications</p>
            <p>
              <i><b>Price</b></i
              >: <span>${priceOfItem}</span>
            </p>
            <p>
              <i><b>Description</b></i>:
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
              quasi corrupti sint totam quae illum magni saepe repudiandae
              sapiente quos!
            </p>
            <p class="quantity" ><button>-</button> <span>0</span> <button>+</button> </p>
            <button class="add-to-cart">Add to Cart</button>
          </div>
        </div>`;

      modal.innerHTML = modalHtml;
      modal.classList.remove("hidden");
      overlay[1].classList.remove("hidden");
      document.querySelector("html").style.overflow = "hidden";
    }
  });

  let subTotal = 0;

  modal.addEventListener("click", function (e) {
    if (e.target.classList.contains("fa-times")) {
      modal.classList.add("hidden");
      overlay[1].classList.add("hidden");
      document.querySelector("html").style.overflow = "auto";
    }

    const itemQuantityChildren = document.querySelector(".quantity").childNodes;
    let quantity = itemQuantityChildren[2];

    if (e.target === itemQuantityChildren[0]) {
      if (quantity.textContent == 0) return;
      quantity.textContent--;
    }

    if (e.target === itemQuantityChildren[4]) {
      quantity.textContent++;
    }

    if (e.target.classList.contains("add-to-cart")) {
      const itemImage = modal.lastChild.firstElementChild.getAttribute("src");
      const priceOfItem =
        modal.lastChild.lastElementChild.childNodes[3].lastElementChild
          .textContent;
      const nameOfItem = modal.childNodes[2].textContent;
      if (quantity.textContent == 0) {
        alert("Cannot add item when quantity is less than one");
        return;
      } else {
        alert("Item Successfully added to cart");
        document.querySelector("html").style.overflow = "auto";
        cart.setAttribute("data-counter", allPickedItems.children.length);
        emptyCartHtml.classList.add("hidden");
        subTotal += +quantity.textContent * +priceOfItem.slice(1);

        const cartHtml = `<div class="selected-item">
          <img src= ${itemImage} alt="" />
          <div class="about-item">
            <p>${nameOfItem}</p>
            <p>${priceOfItem}</p>
            <p class ="quantity-cart"><button>-</button> <span>${quantity.textContent}</span><button>+</button></p>
            <button class = "delete">Delete Item <i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>`;
        allPickedItems.insertAdjacentHTML("afterbegin", cartHtml);

        const checkoutHtml = `<div class="bottom">
        <div class="total">
          <p>Subtotal:</p>
          <p>$${subTotal}</p>
        </div>
        <button>Checkout</button>
      </div>`;

        cartItems.insertAdjacentHTML("beforeend", checkoutHtml);
        modal.classList.add("hidden");
        overlay[1].classList.add("hidden");
      }
    }
  });

  allPickedItems.addEventListener("click", function (e) {
    if (allPickedItems.children.length < 0) return;
    const itemQuantityChildren =
      e.target.closest(".about-item").children[2].childNodes;

    const priceOfItem = +e.target
      .closest(".about-item")
      .children[1].textContent.slice(1);

    let quantity = itemQuantityChildren[2];

    if (e.target === itemQuantityChildren[0]) {
      if (quantity.textContent == 1) {
        alert("Just delete the item🙄😑");
        return;
      }
      quantity.textContent--;
      subTotal -= priceOfItem;
    }

    if (e.target === itemQuantityChildren[3]) {
      quantity.textContent++;
      subTotal += priceOfItem;
    }

    document.querySelectorAll(".bottom").forEach((bottom) => {
      bottom.children[0].children[1].textContent = "$" + subTotal;
    });

    if (e.target.classList.contains("delete")) {
      subTotal -= priceOfItem * +quantity.textContent;
      document.querySelectorAll(".bottom").forEach((bottom) => {
        bottom.children[0].children[1].textContent = "$" + subTotal;
      });
      console.log(allPickedItems.children.length);

      cart.setAttribute("data-counter", allPickedItems.children.length - 2);
      e.target.parentElement.parentElement.remove();

      if (allPickedItems.children.length <= 1) {
        emptyCartHtml.classList.remove("hidden");
        document.querySelectorAll(".bottom").forEach(() => {
          cartItems.removeChild(document.querySelector(".bottom"));
        });
      }
    }
  });
}

console.log(this.window.location);
