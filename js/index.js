document.addEventListener("DOMContentLoaded", function () {
  const categoryScience = document.getElementById("category-science");
  const categoryCountry = document.getElementById("category-country");
  const categoryCinema = document.getElementById("category-cinema");

  categoryScience.addEventListener("click", function () {
    window.location.href = "notyet.html";
  });

  categoryCountry.addEventListener("click", function () {
    window.location.href = "start.html";
  });

  categoryCinema.addEventListener("click", function () {
    window.location.href = "notyet.html";
  });
});
