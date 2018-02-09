"use strict";
$(document).ready(function() {
    $('.goods').on('click', function(evt) {
        var elem = evt.target;
        var container = evt.currentTarget;
        var input = container.getElementsByClassName('counter')[0];
        var sum = document.getElementsByClassName('sum')[0];
        var count = parseInt(input.getAttribute('data-count'), 10);
        var price = parseInt(input.getAttribute('data-price'), 10);
        
    	if (elem.classList.contains('down')) {
        	count = count == 1 ? count : (count - 1);
        } else if (elem.classList.contains('up')){
        	count += 1;
        }
        console.log(count)
        input.value = count;
        sum.innerHTML = price * count;
        input.setAttribute('data-count', count);
    });

    $('.goods2').on('click', function(evt) {
        var elem = evt.target;
        var container = evt.currentTarget;
        var input = container.getElementsByClassName('counter2')[0];
        var sum = document.getElementsByClassName('sum2')[0];
        var count = parseInt(input.getAttribute('data-count'), 10);
        var price = parseInt(input.getAttribute('data-price'), 10);
        
        if (elem.classList.contains('down')) {
            count = count == 1 ? count : (count - 1);
        } else if (elem.classList.contains('up')){
            count += 1;
        }
        console.log(count)
        input.value = count;
        sum.innerHTML = price * count;
        input.setAttribute('data-count', count);
    });

    $('.goods3').on('click', function(evt) {
        var elem = evt.target;
        var container = evt.currentTarget;
        var input = container.getElementsByClassName('counter3')[0];
        var sum = document.getElementsByClassName('sum3')[0];
        var count = parseInt(input.getAttribute('data-count'), 10);
        var price = parseInt(input.getAttribute('data-price'), 10);
        
        if (elem.classList.contains('down')) {
            count = count == 1 ? count : (count - 1);
        } else if (elem.classList.contains('up')){
            count += 1;
        }
        console.log(count)
        input.value = count;
        sum.innerHTML = price * count;
        input.setAttribute('data-count', count);
    });
});

var deleteItem = document.getElementsByClassName('delete');
    for (var i = 0; i < deleteItem.length; i++) {
        deleteItem[i].addEventListener("click", function (event) {
            event.preventDefault();
            this.parentNode.remove();
        })
}

function resultTotal() {
    var suma = parseInt(document.getElementsByClassName('sum').innerHTML);
    console.log(suma);
    var suma2 = parseInt(document.getElementsByClassName('sum2').innerHTML);
    console.log(suma2);
    var suma3 = parseInt(document.getElementsByClassName('sum3').innerHTML);
    console.log(suma3);

    var toPay = suma + suma2 + suma3;
    console.log(toPay);
    document.getElementById('total').innerHTML = toPay;
    document.getElementById('subtotal').innerHTML = toPay;
}

var checkout = document.getElementById("basket");
    checkout.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("form worked");
        resultTotal();
});