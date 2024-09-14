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
