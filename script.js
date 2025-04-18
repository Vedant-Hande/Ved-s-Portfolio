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

// Ensure hamburger menu code runs after DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navDrawer = document.getElementById('nav-drawer');
  const navLinksDrawer = document.querySelectorAll('.nav-links-drawer a');

  if (hamburger && navDrawer) {
    hamburger.addEventListener('click', function () {
      const isOpen = navDrawer.classList.toggle('open');
      navDrawer.setAttribute('aria-hidden', !isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinksDrawer.forEach(link => {
      link.addEventListener('click', function () {
        navDrawer.classList.remove('open');
        navDrawer.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    // Close drawer on outside click or Escape
    document.addEventListener('click', function (e) {
      if (navDrawer.classList.contains('open') && !navDrawer.contains(e.target) && e.target !== hamburger) {
        navDrawer.classList.remove('open');
        navDrawer.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navDrawer.classList.contains('open')) {
        navDrawer.classList.remove('open');
        navDrawer.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
});

// Highlight active nav link (desktop & mobile)
function highlightNavLinks() {
  const sections = document.querySelectorAll('section');
  let scrollPos = window.scrollY || window.pageYOffset;
  sections.forEach(section => {
    const id = section.getAttribute('id');
    if (!id) return;
    const navLink = document.querySelector('.nav-links a[href="#' + id + '"]');
    const drawerLink = document.querySelector('.nav-links-drawer a[href="#' + id + '"]');
    if (
      section.offsetTop - 80 <= scrollPos &&
      section.offsetTop + section.offsetHeight - 80 > scrollPos
    ) {
      if (navLink) navLink.classList.add('active');
      if (drawerLink) drawerLink.classList.add('active');
    } else {
      if (navLink) navLink.classList.remove('active');
      if (drawerLink) drawerLink.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', highlightNavLinks);
window.addEventListener('load', highlightNavLinks);

// Button ripple effect
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = e.offsetX + 'px';
    ripple.style.top = e.offsetY + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
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
