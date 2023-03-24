const carousel = document.getElementById("carousel");
const template = carousel.querySelector("template");
const container = carousel.querySelector("#container");
const leftBtn = carousel.querySelector("#left");
const rightBtn = carousel.querySelector("#right");

function slide() {
    container.setAttribute("style", `transform: translateX(${position}px)`);
    leftBtn.className = position >= 0 ? "" : "visible";
    rightBtn.className = position <= -cardWidth * 9 ? "" : "visible";
}

const cardWidth = 155 + 8;
const slideAmount = cardWidth * 3;
let position = 0;
leftBtn.addEventListener("click", () => {
  position += slideAmount;
  slide();
});
rightBtn.addEventListener("click", () => {
  position -= slideAmount;
  slide();
});

const endpoint = "https://api.almatejida.com/business/?limit=10";
const response = await fetch(endpoint, {
  headers: { authorization: "Token --token-value--" },
});
const body = await response.json();
const items = body.results;

items.forEach((item) => {
  let clone = document.importNode(template.content, true);
  clone
    .querySelector(".img")
    .setAttribute("style", `background-image: url(${item.logo})`);
  clone.querySelector(".name").innerHTML = item.name;
  clone.querySelector(
    ".data"
  ).innerHTML = item.distance_to_user;
  container.appendChild(clone);
});

rightBtn.className = "visible";
