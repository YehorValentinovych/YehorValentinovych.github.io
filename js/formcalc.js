"use strict";
var calcForm = document.getElementById("form-calc");

calcForm.addEventListener("submit", function (event) {
    event.preventDefault();

var bedrooms = document.getElementsByName("bedrooms");
var bathrooms = document.getElementsByName("bathrooms");
var pollutionLevel = document.getElementsByName("pollution");
var cleaningType = document.getElementsByName("cleaning");

if(checkRadioBtn(bedrooms) == false){
    document.getElementById('error').innerHTML = "Выберите количество спальных комнат";
    return false; }
if(checkRadioBtn(bathrooms) == false){
    document.getElementById('error').innerHTML = "Выберите количество ванных комнат";
    return false; }
if(checkRadioBtn(pollutionLevel) == false){
    document.getElementById('error').innerHTML = "Выберите степень загрязнения";
    return false; }
if(checkRadioBtn(cleaningType) == false){
    document.getElementById('error').innerHTML = "Выберите тип очистки";
    return false; }
    calculate();
});

function calculate() {
    var bedr = calcForm.querySelector('[name="bedrooms"]:checked').value;
    console.log(bedr);
    var bathr = calcForm.querySelector('[name=bathrooms]:checked').value;
    console.log(bathr);
    var pollution = calcForm.querySelector('[name=pollution]:checked').dataset.percent;
    console.log(pollution);
    var timebedr = calcForm.querySelector('[name=cleaning]:checked').dataset.timeBedrooms;
    console.log(timebedr);
    var timebathr = calcForm.querySelector('[name=cleaning]:checked').dataset.timeBathrooms;
    console.log(timebathr);
    var price = calcForm.querySelector('[name=cleaning]:checked').dataset.price;
    console.log(price);
    var count = Math.round((bedr * timebedr) + (bathr * timebathr) * pollution);
    var cleaningTime = Math.round(count) / 60;
    cleaningTime = Math.round(cleaningTime);
    document.getElementById('cleaningTime').innerHTML = cleaningTime;
    var cleaningСost = (count / 60) * price;
    cleaningСost = Math.round(cleaningСost);
    document.getElementById('cleaningСost').innerHTML = cleaningСost;
}

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