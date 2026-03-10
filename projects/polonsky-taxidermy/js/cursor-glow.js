const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", e => {

glow.style.left = e.clientX + "px";
glow.style.top = e.clientY + "px";

glow.style.transition = "all 0.08s ease";

if(window.innerWidth > 768) {

    const glow = document.querySelector(".cursor-glow");

    document.addEventListener("mousemove", e => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

    });

}

});

