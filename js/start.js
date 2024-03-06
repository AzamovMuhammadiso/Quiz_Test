const goBack = () => {
  window.location.href = "index.html";
};
function startQuiz() {
  document.body.innerHTML =
    '<div class="container"><div class="yellow"></div><div class="red"></div><div class="blue"></div><div class="violet"></div></div>';
  setTimeout(function () {
    window.location.href = "home.html";
  }, 3000);
}
