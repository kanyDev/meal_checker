
// HTML이 로드된 후에 실행되도록 변경
window.addEventListener("DOMContentLoaded", (event) => {
  // URL에서 매개변수 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  let bmr = urlParams.get("bmr");
  let amr = urlParams.get("amr");

  // bmr과 amr를 HTML 요소에 할당
  document.getElementById("BMR-p").textContent = bmr + "kcal";
  document.getElementById("AMR-p").textContent = amr + "kcal";

  // amr 값을 이용하여 탄수화물, 단백질, 지방 계산
  const calculateAMealCarbs = () => {
    return Math.round((((amr - 500) / 3) * 0.5) / 4);
  };

  const calculateAMealProtein = () => {
    return Math.round((((amr - 500) / 3) * 0.3) / 4);
  };

  const calculateAMealFat = () => {
    return Math.round((((amr - 500) / 3) * 0.2) / 9);
  };

  let recommendedCarbohydrates = calculateAMealCarbs();
  let recommendedProteins = calculateAMealProtein();
  let recommendedFats = calculateAMealFat();

  // localStorage에 끼니당 섭취 목표 탄수, 단백질, 지방 저장하기
  localStorage.setItem("recommendedCarbohydrates", recommendedCarbohydrates);
  localStorage.setItem("recommendedProteins", recommendedProteins);
  localStorage.setItem("recommendedFats", recommendedFats);

  // 각 계산된 값을 HTML 요소에 할당
  document.getElementById("carbs-p").textContent =
    recommendedCarbohydrates + "g";
  document.getElementById("protein-p").textContent = recommendedProteins + "g";
  document.getElementById("fat-p").textContent = recommendedFats + "g";
});
