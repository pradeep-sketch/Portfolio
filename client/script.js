/** typing animation */
var typed = new Typed(".typing", {
    strings: ["Web Designer", "web Developer", "Graphic Designer", "Video Editor"], // Correct option name
    typeSpeed: 100,   // Speed for typing
    backSpeed: 60,    // Correct option name, speed for deleting
    loop: true        // Looping the animation
});

const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"), // Use querySelectorAll to select all li elements
    totalNavList = navList.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        for (let j = 0; j < totalNavList; j++) { // Initialize j with 0
            navList[j].querySelector("a").classList.remove("active"); // Remove 'active' class from all
        }
        this.classList.add("active"); // Add 'active' class to the clicked element
    });
}
