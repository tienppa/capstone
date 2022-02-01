// change color theme
const styleToggler = document.querySelector(".style-switcher-toggler");
styleToggler.addEventListener("click", () => {
  document.querySelector(".style-switcher").classList.toggle("open");
});
window.addEventListener("scroll", () => {
  if (document.querySelector(".style-switcher").classList.contains("open")) {
    document.querySelector(".style-switcher").classList.remove("open");
  }
});

// theme colors
const alternateStyle = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
  localStorage.setItem("color", color);
  changeColor();
}

function changeColor() {
  alternateStyle.forEach((style) => {
    if (localStorage.color === style.getAttribute("title")) {
      style.removeAttribute("disabled");
    } else {
      style.setAttribute("disabled", "true");
    }
  });
}

if (localStorage.color !== null) {
  changeColor();
}

// dark and light
const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
  if (dayNight.querySelector(".sun-light").classList.contains("fa-moon")) {
    dayNight.querySelector(".sun-light").classList.toggle("fa-sun");
    document.body.classList.remove("light");
    document.body.classList.add("dark");
  } else {
    dayNight.querySelector(".sun-light").classList.toggle("fa-moon");
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  }
});
