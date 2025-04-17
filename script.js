document
  .querySelector(".contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // EmailJS parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_email: "vedantcoder5@gmail.com",
    };

    // Send email using EmailJS
    emailjs.send("service_jeeqyib", "template_9ttsuju", templateParams).then(
      function (response) {
        alert("Message sent successfully! I will get back to you soon.");
        // Clear the form
        document.querySelector(".contact-form").reset();
      },
      function (error) {
        alert("Failed to send message. Please try again later.");
        console.error("Error:", error);
      }
    );
  });

// Loading Animation
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  setTimeout(() => {
    loader.classList.add("fade-out");
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 1000); // Reduced from 1500ms to 1000ms for faster loading

  // Content Animation
  const sections = document.querySelectorAll("section");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const serviceCards = document.querySelectorAll(".service-card");

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  // Function to handle scroll animations
  function handleScroll() {
    sections.forEach((section) => {
      if (isInViewport(section)) {
        section.classList.add("visible");
      }
    });

    portfolioItems.forEach((item) => {
      if (isInViewport(item)) {
        item.classList.add("visible");
      }
    });

    serviceCards.forEach((card) => {
      if (isInViewport(card)) {
        card.classList.add("visible");
      }
    });
  }

  // Initial check
  handleScroll();

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);
});

// Back to Top Button
const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
