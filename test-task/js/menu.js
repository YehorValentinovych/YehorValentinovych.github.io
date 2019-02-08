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