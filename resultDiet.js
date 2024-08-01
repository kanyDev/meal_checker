
// HTML이 로드된 후에 실행되도록 변경
window.addEventListener("DOMContentLoaded", (event) => {
  let recommendedCarbohydrates = localStorage.getItem(
    "recommendedCarbohydrates"
  );
  let recommendedProteins = localStorage.getItem("recommendedProteins");
  let recommendedFats = localStorage.getItem("recommendedFats");

  let totalCarbohydrates = localStorage.getItem("totalCarbohydrates");
  let totalProteins = localStorage.getItem("totalProteins");
  let totalFats = localStorage.getItem("totalFats");

  document.getElementById("carbs-p").textContent = recommendedCarbohydrates + "g";
  document.getElementById("protein-p").textContent = recommendedProteins + "g";
  document.getElementById("fat-p").textContent = recommendedFats + "g";

  document.getElementById("selected-carbs-p").textContent = totalCarbohydrates + "g";
  document.getElementById("selected-protein-p").textContent = totalProteins + "g";
  document.getElementById("selected-fat-p").textContent = totalFats + "g";

  showDifference(
    recommendedCarbohydrates,
    recommendedProteins,
    recommendedFats,
    totalCarbohydrates,
    totalProteins,
    totalFats
  );

});

function showDifference(
  recommendedCarbohydrates,
  recommendedProteins,
  recommendedFats,
  totalCarbohydrates,
  totalProteins,
  totalFats
) {
  let carbsDifference = totalCarbohydrates - recommendedCarbohydrates;
  let carbsMessage;
  let carbsElement = document.getElementById("carbsMessage").parentElement;

  if (carbsDifference >= 10) {
    carbsMessage = "탄수화물 함량이 높아요";
  } else if (carbsDifference <= -10) {
    carbsMessage = "탄수화물 함량이 낮아요";
  } else {
    carbsMessage = "탄수화물 함량이 적당해요";
    carbsElement.style.backgroundColor = "green";
  }

  document.getElementById("carbsMessage").textContent = carbsMessage;

  let proteinDifference = totalProteins - recommendedProteins;
  let proteinMessage;
  let proteinElement = document.getElementById("proteinMessage").parentElement;

  if (proteinDifference >= 10) {
    proteinMessage = "단백질 함량이 높아요";
  } else if (proteinDifference <= -10) {
    proteinMessage = "단백질 함량이 낮아요";
  } else {
    proteinMessage = "단백질 함량이 적당해요";
    proteinElement.style.backgroundColor = "green";
  }

  document.getElementById("proteinMessage").textContent = proteinMessage;

  let fatDifference = totalFats - recommendedFats;
  let fatMessage;
  let fatElement = document.getElementById("fatMessage").parentElement;

  if (fatDifference >= 5) {
    fatMessage = "지방 함량이 높아요";
  } else if (fatDifference <= -10) {
    fatMessage = "지방이 함량이 낮아요";
  } else {
    fatMessage = "지방 함량이 적당해요";
    fatElement.style.backgroundColor = "green";
  }

  document.getElementById("fatMessage").textContent = fatMessage;
}
