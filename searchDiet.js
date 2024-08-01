
let api_key = "47c38c8018c0436f899b"; // 자신의 키값 입력하기!
let req_url = `http://openapi.foodsafetykorea.go.kr/api/${api_key}/I2790/json`;

function loadData() {
  let DESC_KOR = encodeURIComponent(document.forms["frm"]["DESC_KOR"].value);
  // let startIdx = document.forms['frm']['startIdx'].value.trim();
  // let endIdx = document.forms['frm']['endIdx'].value.trim();
  // let url = `${req_url}/${startIdx}/${endIdx}/DESC_KOR=${DESC_KOR}`;
  let startIdx = 1;
  let endIdx = 30;
  let url = `${req_url}/${startIdx}/${endIdx}/DESC_KOR=${DESC_KOR}`;

  fetch(url)
    .then((response) => response.json())
    .then((jsonObj) => parseJSON(jsonObj));
}

function parseJSON(jsonObj) {
  const table = [];
  table.push(`
          <tr>
              <th>식품이름</th>
              <th>총내용량</th>
              <th>열량(kcal)(1회제공량당)</th>
              <th>탄수화물(g)(1회제공량당)</th>
              <th>단백질(g)(1회제공량당)</th>
              <th>지방(g)(1회제공량당)</th>
              <th>Select</th>
          </tr>
      `);

  for (const food of jsonObj.I2790.row) {
    if (food.NUTR_CONT2 && food.NUTR_CONT3 && food.NUTR_CONT4) {
      const foodId = food.DESC_KOR.replace(/\s+/g, "_");
      table.push(`
                <tr>
                    <td>${food.DESC_KOR}</td>
                    <td>${food.SERVING_SIZE}</td>
                    <td>${food.NUTR_CONT1}</td>
                    <td>${food.NUTR_CONT2}</td>
                    <td>${food.NUTR_CONT3}</td>
                    <td>${food.NUTR_CONT4}</td>
                    <td><input type="checkbox" id="checkbox_${foodId}" onclick="toggleSelected('${foodId}', '${food.DESC_KOR}', '${food.SERVING_SIZE}', '${food.NUTR_CONT1}', '${food.NUTR_CONT2}', '${food.NUTR_CONT3}', '${food.NUTR_CONT4}')"></td>
                </tr>
            `);
    }
  }

  document.getElementById("demoJSON").innerHTML = table.join("\n");
}
function toggleSelected(
  foodId,
  name,
  servingSize,
  calorie,
  carbohydrate,
  protein,
  fat
) {
  const checkbox = document.getElementById(`checkbox_${foodId}`);
  if (checkbox.checked) {
    addToSelected(
      foodId,
      name,
      servingSize,
      calorie,
      carbohydrate,
      protein,
      fat
    );
  } else {
    removeFromSelected(foodId, calorie, carbohydrate, protein, fat);
  }
}

function addToSelected(
  foodId,
  name,
  servingSize,
  calorie,
  carbohydrate,
  protein,
  fat
) {
  let selectedTable = document.getElementById("selectedFoods");
  let row = `
              <tr id="row_${foodId}">
                  <td>${name}</td>
                  <td>${servingSize}</td>
                  <td>${calorie}</td>
                  <td>${carbohydrate}</td>
                  <td>${protein}</td>
                  <td>${fat}</td>
              </tr>
            `;
  selectedTable.innerHTML += row;

  updateTotals(
    parseFloat(calorie),
    parseFloat(carbohydrate),
    parseFloat(protein),
    parseFloat(fat)
  );
}

function removeFromSelected(foodId, calorie, carbohydrate, protein, fat) {
  let row = document.getElementById(`row_${foodId}`);
  row.parentNode.removeChild(row);

  updateTotals(
    -parseFloat(calorie),
    -parseFloat(carbohydrate),
    -parseFloat(protein),
    -parseFloat(fat)
  );
}

function updateTotals(calorie, carbohydrate, protein, fat) {
  let totalCalories =
    parseFloat(document.getElementById("totalCalories").textContent) + calorie;
  let totalCarbohydrates =
    parseFloat(document.getElementById("totalCarbohydrates").textContent) +
    carbohydrate;
  let totalProteins =
    parseFloat(document.getElementById("totalProteins").textContent) + protein;
  let totalFats =
    parseFloat(document.getElementById("totalFats").textContent) + fat;

  document.getElementById("totalCalories").textContent =
    Math.round(totalCalories);
  document.getElementById("totalCarbohydrates").textContent =
    totalCarbohydrates;
  document.getElementById("totalProteins").textContent = totalProteins;
  document.getElementById("totalFats").textContent = totalFats;

  // 반올림
  totalCarbohydrates = Math.round(totalCarbohydrates);
  totalProteins = Math.round(totalProteins);
  totalFats = Math.round(totalFats);

  // localStorage에 합계값(탄수화물, 단백질, 지방) 저장하기
  localStorage.setItem("totalCarbohydrates", totalCarbohydrates);
  localStorage.setItem("totalProteins", totalProteins);
  localStorage.setItem("totalFats", totalFats);
}
