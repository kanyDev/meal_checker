
function redirect() {

    // 유효성검사
    // 성별
    let gender =$('input[name="gender"]:checked').val();
    if (!gender) {
        alert('성별을 선택해주세요.');
        return; 
    }

    // 출생년도
    let birthYear = parseInt(document.getElementById("born-year-input").value);
    if(!validateYear(birthYear)){
        alert('1960~2010년 사이로 입력해주세요.');
        $('input[name="born-year-input"]').focus(); 
        return false;
    }

    // 키
    let height = parseFloat(document.getElementById("height-input").value);
    if(!height){
        alert('키를 입력해주세요');
        $('input[name="height-input"]').focus(); 
        return;
    }

    // 몸무게
    let weight = parseFloat(document.getElementById("weight-input").value);
    if(!weight){
        alert('몸무게를 입력해주세요');
        $('input[name="weight-input"]').focus(); 
        return;
    }

    // 활동계수
    let activityLevel = document.querySelector('input[name="radio-group"]:checked');
    if(!activityLevel){
        alert('얼마나 활동하시는지 선택해주세요.');
        return;
    }

    let bmr = calculateBMR(gender, birthYear, height, weight);
    if (!bmr) {
        // bmr이 null인 경우 처리
        return;
    }

    let amr = calculateAMR(activityLevel, bmr);
    if (!amr) {
        // amr가  null인 경우 처리
        return;
    }

    // 페이지 이동
    window.location.href = "guideDiet.html?bmr=" + bmr + "&amr=" + amr;

}
// AMR : Activity Metabolic Rate(활동 대사량)
function calculateAMR(activityLevel, bmr) {

    // checked된 id값에서 -1 ex) radio2 => index = 1
    let index = parseInt(activityLevel.id.slice(-1)) - 1;

    let activityLevels = [1.2, 1.675, 1.55, 1.725, 1.9];
    let amr = bmr * activityLevels[index];

    amr = Math.round(amr);
    return amr;
}

function calculateBMR(gender, birthYear, height, weight) {
    let currentYear = new Date().getFullYear();
    let age = currentYear - birthYear;

    let bmr;
    if (gender === "male") {
        bmr = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age);
    } else if (gender === "female") {
        bmr = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
    }

    bmr = Math.round(bmr);
    return bmr;
}


// 출생년도 유효성검사
function validateYear(birthYear) {
    let pattern = /^\d{4}$/;
    
    return pattern.test(birthYear) && parseInt(birthYear) <= 2010 && parseInt(birthYear) >= 1960;
}
