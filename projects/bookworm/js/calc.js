"use strict";

var calcForm = document.getElementById("form-calc");

calcForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var bedrooms = document.getElementsByName("bedrooms");
    var bathrooms = document.getElementsByName("bathrooms");
    var pollution = document.getElementsByName("pollution");
    var cleaning = document.getElementsByName("cleaning");


    if(checkRadioBtn(bedrooms) == false){
        document.getElementById('error-calc').innerHTML = "Выберите количество спален комнат";
        return false;
    } else {
        // document.getElementById('error-calc').innerHTML = "Количество спален выбрано";
    }

    if(checkRadioBtn(bathrooms) == false){
        document.getElementById('error-calc').innerHTML = "Выберите количество ванных комнат";
        return false;
    }
    if(checkRadioBtn(pollution) == false){
        document.getElementById('error-calc').innerHTML = "Выберите степень загрязнения";
        return false;
    }
    if(checkRadioBtn(cleaning) == false){
        document.getElementById('error-calc').innerHTML = "Выберите тип очистки";
        return false;
    }
    document.getElementById('error-calc').innerHTML = "";
    console.log("форма отработала");
    calculate();
});

function  checkRadioBtn(arrInp) {
    var checkResult = false;
    arrInp.forEach(function(item, index){
        if(item.checked)
        {
            checkResult = true;
        }
    });

    return checkResult;
}

function calculate () {
    var bedrooms = calcForm.querySelector('[name="bedrooms"]:checked').value;
    console.log(bedrooms);
    var bathrooms = calcForm.querySelector('[name=bathrooms]:checked').value;
    console.log(bathrooms);
    var pollution = calcForm.querySelector('[name=pollution]:checked').dataset.rate;
    console.log(pollution);
    var price = calcForm.querySelector('[name=pollution]:checked').dataset.price;
    console.log(price);
    var timeBedrooms = calcForm.querySelector('[name=pollution]:checked').dataset.timeBedrooms;
    console.log(timeBedrooms);
    var timeBathrooms = calcForm.querySelector('[name=pollution]:checked').dataset.timeBathrooms;
    console.log(timeBathrooms);
    var result = Math.round( (bedrooms * timeBedrooms) + (bathrooms * timeBathrooms) * pollution);
    var cleaning_time = Math.round(result) / 60;
    cleaning_time = Math.round(cleaning_time);
    document.getElementById('cleaning_time').innerHTML = cleaning_time;
    var sum_cleaning = (result / 60) * price;
    sum_cleaning = Math.round(sum_cleaning);
    document.getElementById('sum_cleaning').innerHTML = sum_cleaning;
}