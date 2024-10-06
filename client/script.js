/** Typing animation */
var typed = new Typed(".typing", {
    strings: ["Web Designer", "Web Developer", "Graphic Designer", "Video Editor"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    sections = document.querySelectorAll("section");

// Track the current active section
let currentSectionIndex = 0;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");

    a.addEventListener("click", function (event) {
        event.preventDefault();

        // Remove 'active' class from the current nav link
        navList[currentSectionIndex].querySelector("a").classList.remove("active");

        // Mark the current section with 'back-section'
        sections[currentSectionIndex].classList.add("back-section");

        // Remove 'back-section' from all other sections except the current one
        sections.forEach((section, index) => {
            if (index !== currentSectionIndex) {
                section.classList.remove("back-section");
            }
        });

        // Update the current active section index
        currentSectionIndex = i;

        // Add 'active' class to the clicked link and the new section
        this.classList.add("active");
        showSection(this);

        // Auto-close the aside on mobile screens
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    });
}

function showSection(element) {
    const target = element.getAttribute("href").split("#")[1];
    const targetSection = document.querySelector("#" + target);

    // Remove 'active' class from all sections
    sections.forEach((section) => {
        section.classList.remove("active");
    });

    // Add 'active' class to the target section
    targetSection.classList.add("active");
}

function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

document.querySelector(".hire-me").addEventListener("click", function () {
    const sectionIndex = this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    if (window.innerWidth < 1200) {
        asideSectionTogglerBtn();
    }
});

/** Toggle button functionality for aside and sections */
const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside"),
    totalSection = sections.length;

navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");

    // Toggle 'open' class for all sections
    for (let i = 0; i < totalSection; i++) {
        sections[i].classList.toggle("open");
    }
}

/** Contact form */
const form = document.querySelector('form');

// Function to send email using SMTP.js
function sendEmail() {
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "rpr@gmail.com",  // Your ElasticEmail Username
        Password: "your_api_key",  // Your ElasticEmail API Key (not your account password)
        To: 'rpr@gmail.com',  // Your recipient email
        From: "rpr@gmail.com",  // Sender's email
        Subject: "New Contact Form Submission",
        Body: `
            Name: ${document.getElementById('name').value} <br>
            Email: ${document.getElementById('email').value} <br>
            Message: ${document.getElementById('message').value}
        `,
        SecureToken: "your_secure_token_if_applicable",  // Optional if required
        Port: 2525,  // Use TLS port for secure connection
        UseSSL: false  // Set this to true if you're using port 465 (SSL)
    })
    .then((message) => {
        console.log('Email sent:', message);
        showToast("Email sent successfully!");
    })
    .catch((error) => {
        console.error('Error sending email:', error);
        showToast("Error sending email. Please try again later.");
    });
}

// Add form validation before submission
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        sendEmail(); // Send email if all fields are filled
        form.reset(); // Clear the form after submission
    } else {
        showToast('Please fill out all fields before submitting.');
    }
});

// Toast Notification Function
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message; // Set the message
    toast.style.display = 'block'; // Show the toast

    // Set a timeout to hide the toast after 3 seconds
    setTimeout(() => {
        toast.style.display = 'none'; // Hide the toast after 3 seconds
    }, 3000);
}
