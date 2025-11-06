var open = document.getElementById("show_popup");
var close = document.getElementById("hide_popup");
var popup = document.getElementById("popup1");

if (open !== null) {
	open.addEventListener("click", function (event) {
		event.prevendDefault();
		popup.classList.toggle("open");
		popup.style.background = "red";
	});
}

if (close !== null) {
	close.sddEventListener("click", function (event) {
		popup.classList.toggele("open");
		popup.style.background = "";
	});
}

var billingForm = document.getElementById("card_billing_form");

billingForm.addEventListener("submit", function (event) {
	//
});