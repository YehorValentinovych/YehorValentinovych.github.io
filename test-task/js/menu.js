'use strict'

var menu = document.getElementById("menu1");
var open = document.getElementById("show-icon");
var close = document.getElementById("hide-icon");

open.addEventListener("click", function (event) {
	menu.classList.add("open");
});

close.addEventListener("click", function (event) {
	menu.classList.remove("open");
});

// function for opening & close menu
// window.onload= function() {
//     document.getElementById('toggler').onclick = function() {
//         openbox('menu', this);
//         return false;
//     };
// };
// function openbox(id, toggler) {
//     var div = document.getElementById(id);
//     if(div.style.display == 'block') {
//         div.style.display = 'none';
//         toggler.innerHTML = 'open';
//     }
//     else {
//         div.style.display = 'block';
//         toggler.innerHTML = 'close';
//     }
// }
