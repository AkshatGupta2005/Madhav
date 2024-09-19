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
const arrowBtn = document.querySelectorAll(".arrow div");
var previousTouch;
var isDragging = false;
const dragging = (e) => {
  if (!isDragging) return;
  imgBox.scrollLeft -= e.movementX;
  imgBox.style.cursor = "grabbing";
  scrollBarProgress();
};
const mobileDragging = (e) => {
  if(isDragging = true){
  const touch = e.touches[0];
  if(previousTouch){
    e.movementX = previousTouch.pageX - touch.pageX;
    e.movementY = touch.pageY - previousTouch.pageY;
    imgBox.scrollLeft = imgBox.scrollLeft + e.movementX;
  }
  previousTouch = touch;
  scrollBarProgress();
}
}
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

var scrollBarProgress = () => {
  var progressBar =document.querySelector(".progressBar");
  var progress = 10 + (imgBox.scrollLeft/imgBox.scrollWidth)*100;
  progressBar.style.width = progress + "%";
  console.log(progress);
}