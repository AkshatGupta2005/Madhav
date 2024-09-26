var loadingScreen = document.querySelector(".loading");
window.addEventListener("load", function () {
  loadingScreen.style.display = "none";
});
const menu_toggle = document.querySelector(".toggle");
const sidebar = document.querySelector(".sidebar");

menu_toggle.addEventListener("click", () => {
  menu_toggle.classList.toggle("is-active");
  sidebar.classList.toggle("is-active");
});

const imgBox = document.querySelector(".imageBox");
var defaultProgress;
const arrowBtn = document.querySelectorAll(".arrow div");
var defaultProgress = document.client;
var previousTouch;
var isDragging = false;
const dragging = (e) => {
  if (!isDragging) return;
  imgBox.scrollLeft -= e.movementX;
  imgBox.style.cursor = "grabbing";
  scrollBar.value = imgBox.scrollLeft;
};
const mobileDragging = (e) => {
  if ((isDragging = true)) {
    const touch = e.touches[0];
    if (previousTouch) {
      e.movementX = previousTouch.pageX - touch.pageX;
      e.movementY = touch.pageY - previousTouch.pageY;
      imgBox.scrollLeft = imgBox.scrollLeft + e.movementX;
      scrollBar.value = imgBox.scrollLeft;
    }
    previousTouch = touch;
  }
};
const dragStop = () => {
  previousTouch = null;
  isDragging = false;
  imgBox.style.cursor = "default";
};
imgBox.addEventListener("mousedown", () => (isDragging = true));
imgBox.addEventListener("touchstart", () => (isDragging = true));
imgBox.addEventListener("mousemove", dragging);
imgBox.addEventListener("touchmove", mobileDragging);
document.addEventListener("mouseup", dragStop);
document.addEventListener("touchend", dragStop);

const scrollBar = document.querySelector(".slider");
var screenWidth = imgBox.offsetWidth;
var scrollWidth = imgBox.scrollWidth;
scrollBar.min = 0;
scrollBar.max = scrollWidth - screenWidth;
scrollBar.addEventListener("input", (event) => {
  imgBox.scrollLeft = event.target.value;
  console.log(languageTab);
});

