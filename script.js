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

// Add subtle parallax effect
function setupParallaxEffect() {
  window.addEventListener("scroll", function () {
    const scrollPosition = window.pageYOffset;

    // Parallax for Hero section
    const heroImage = document.querySelector(".hero-image img");
    if (heroImage) {
      heroImage.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    }

    // Parallax for about section
    const aboutImage = document.querySelector(".about-image img");
    if (aboutImage) {
      aboutImage.style.transform = `translateY(${scrollPosition * 0.05}px)`;
    }
  });
}

// Create animated background particles
function createParticles() {
  const particlesContainer = document.createElement("div");
  particlesContainer.className = "particles-background";
  document.body.prepend(particlesContainer);

  // Create particles
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random properties for each particle
    const size = Math.random() * 5 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    // Set CSS properties
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}vw`;
    particle.style.top = `${posY}vh`;
    particle.style.animation = `float-particle ${duration}s infinite linear`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.opacity = Math.random() * 0.5;

    // Add to container
    particlesContainer.appendChild(particle);
  }
}

// Enhanced scroll animations with varying delays
function setupEnhancedScrollAnimations() {
  const animateElements = document.querySelectorAll(
    ".service-card, .portfolio-item, .resume-card"
  );

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
      rect.bottom >= 0
    );
  }

  // Set initial states for animation
  animateElements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
    element.style.transitionDelay = `${index * 0.1}s`;
  });

  // Function to handle scroll animations
  function handleScrollAnimations() {
    animateElements.forEach((element) => {
      if (isInViewport(element)) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Initial check and scroll listener
  handleScrollAnimations();
  window.addEventListener("scroll", handleScrollAnimations);
}

// Add 3D effect to About image that follows mouse movement
function setupAboutImage3DEffect() {
  const aboutImage = document.querySelector("#about .about-image");
  const img = aboutImage ? aboutImage.querySelector("img") : null;

  if (!aboutImage || !img) return;

  aboutImage.addEventListener("mousemove", function (e) {
    // Get position of mouse relative to the container
    const rect = aboutImage.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element

    // Calculate rotation based on mouse position
    // When mouse is at center, rotation should be 0
    // Max rotation of 15 degrees
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 10; // -10 to +10 degrees
    const rotateX = ((centerY - y) / centerY) * 10; // -10 to +10 degrees

    // Apply transform to img
    img.style.transform = `
      translateZ(30px) 
      rotateY(${rotateY}deg) 
      rotateX(${rotateX}deg)
    `;

    // Add a slight parallax effect to accent dots
    const dots = aboutImage.querySelectorAll(".accent-dot");
    dots.forEach((dot, index) => {
      // Each dot moves slightly differently
      const factor = (index + 1) * 0.05;
      const dotX = (x - centerX) * factor;
      const dotY = (y - centerY) * factor;

      dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    });
  });

  // Reset on mouse leave
  aboutImage.addEventListener("mouseleave", function () {
    img.style.transform = "translateZ(0) rotateY(0) rotateX(0)";

    // Reset dots position
    const dots = aboutImage.querySelectorAll(".accent-dot");
    dots.forEach((dot) => {
      dot.style.transform = "translate(0, 0)";
    });
  });

  // Add an intersection observer to trigger animation when scrolled into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutImage.classList.add("in-view");
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(aboutImage);
}

// Global device detection
const isMobile = () => window.innerWidth <= 600;
const isTablet = () => window.innerWidth > 600 && window.innerWidth <= 900;

// Optimize background effects for mobile
function setupInteractiveBackground() {
  const canvas = document.getElementById("background-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = window.innerWidth;
  let height = window.innerHeight;
  let particles = [];
  let mousePosition = { x: width / 2, y: height / 2 };

  // Reduced particle count for mobile
  const particleCount = isMobile() ? 20 : isTablet() ? 40 : 80;
  let animationFrameId;

  // Resize canvas
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Recreate particles when resizing
    initParticles();
  }

  // Create particles
  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random() * 0.2 - 0.1,
        vy: Math.random() * 0.2 - 0.1,
        size: Math.random() * (isMobile() ? 2 : 3) + 1,
        color: `rgba(169, 183, 15, ${Math.random() * 0.3 + 0.1})`,
      });
    }
  }

  // Draw particles and connections - optimize for mobile
  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    // Draw particles
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Boundary check with loop around
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Only do connections on non-mobile to improve performance
      if (!isMobile()) {
        // Draw connections between close particles - limited for better performance
        const maxConnections = isMobile() ? 2 : isTablet() ? 3 : 5;
        let connections = 0;

        particles.forEach((p2) => {
          if (p === p2 || connections >= maxConnections) return;

          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const connectionDistance = isMobile() ? 100 : 150;

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(169, 183, 15, ${
              0.1 * (1 - distance / connectionDistance)
            })`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            connections++;
          }
        });

        // Draw connection to mouse when close
        const dx = p.x - mousePosition.x;
        const dy = p.y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(224, 231, 34, ${
            0.3 * (1 - distance / connectionDistance)
          })`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mousePosition.x, mousePosition.y);
          ctx.stroke();

          // Add slight attraction to mouse
          const attractionFactor = isMobile() ? 0.01 : 0.02;
          p.vx += dx > 0 ? -attractionFactor : attractionFactor;
          p.vy += dy > 0 ? -attractionFactor : attractionFactor;

          // Limit velocity
          const maxVelocity = isMobile() ? 0.3 : 0.5;
          p.vx = Math.max(-maxVelocity, Math.min(maxVelocity, p.vx));
          p.vy = Math.max(-maxVelocity, Math.min(maxVelocity, p.vy));
        }
      }
    });

    animationFrameId = requestAnimationFrame(drawParticles);
  }

  // Track mouse position
  document.addEventListener("mousemove", (e) => {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
  });

  // Also track touch for mobile
  document.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length > 0) {
        mousePosition.x = e.touches[0].clientX;
        mousePosition.y = e.touches[0].clientY;
      }
      e.preventDefault();
    },
    { passive: false }
  );

  // Initialize
  canvas.width = width;
  canvas.height = height;
  initParticles();
  drawParticles();

  // Handle resize
  window.addEventListener("resize", () => {
    // Update device detection
    const wasMobile = isMobile();
    const wasTablet = isTablet();

    isMobile = () => window.innerWidth <= 600;
    isTablet = () => window.innerWidth > 600 && window.innerWidth <= 900;

    // Only rebuild particles if device type changed
    if (wasMobile !== isMobile() || wasTablet !== isTablet()) {
      resizeCanvas();
    } else {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
  });

  // Cleanup function
  return function cleanup() {
    window.removeEventListener("resize", resizeCanvas);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("touchmove", handleTouchMove);
    cancelAnimationFrame(animationFrameId);
  };
}

// Create floating geometric elements - optimized for mobile
function createFloatingElements() {
  const container = document.getElementById("geometric-background");
  if (!container) return;

  // Reduce elements on mobile
  const elementCount = isMobile() ? 5 : isTablet() ? 10 : 15;

  // Clear existing elements
  container.innerHTML = "";

  // Create new elements
  for (let i = 0; i < elementCount; i++) {
    const element = document.createElement("div");
    element.className = "floating-element";

    // Random properties - smaller on mobile
    const sizeFactor = isMobile() ? 0.7 : 1;
    const size = sizeFactor * (Math.random() * 80 + 20);
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const rotateZ = Math.random() * 360;
    const delay = Math.random() * 5;

    // Shorter durations on mobile for better performance
    const durationFactor = isMobile() ? 0.7 : 1;
    const duration = durationFactor * (Math.random() * 20 + 15);

    // Apply styles
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.left = `${posX}%`;
    element.style.top = `${posY}%`;
    element.style.transform = `rotateZ(${rotateZ}deg)`;
    element.style.setProperty("--delay", `${delay}s`);

    // Simpler animation for mobile
    if (isMobile()) {
      element.animate(
        [
          { transform: `translate(0, 0) rotateZ(${rotateZ}deg)` },
          {
            transform: `translate(0, ${Math.random() * 30 - 15}px) rotateZ(${
              rotateZ + 30
            }deg)`,
          },
          { transform: `translate(0, 0) rotateZ(${rotateZ + 60}deg)` },
        ],
        {
          duration: duration * 1000,
          iterations: Infinity,
          direction: "alternate",
          easing: "ease-in-out",
        }
      );
    } else {
      element.animate(
        [
          { transform: `translate(0, 0) rotateZ(${rotateZ}deg)` },
          {
            transform: `translate(${Math.random() * 50 - 25}px, ${
              Math.random() * 50 - 25
            }px) rotateZ(${rotateZ + 20}deg)`,
          },
          {
            transform: `translate(${Math.random() * 30 - 15}px, ${
              Math.random() * 30 - 15
            }px) rotateZ(${rotateZ + 40}deg)`,
          },
          { transform: `translate(0, 0) rotateZ(${rotateZ + 60}deg)` },
        ],
        {
          duration: duration * 1000,
          iterations: Infinity,
          direction: "alternate",
          easing: "ease-in-out",
        }
      );
    }

    container.appendChild(element);
  }
}

// Create interactive geometric shapes on click
function createGeometricShapes() {
  document.addEventListener("click", (e) => {
    const container = document.getElementById("geometric-background");
    if (!container) return;

    // Create shape
    const shape = document.createElement("div");
    shape.className = "geometric-shape";

    // Set position at click
    shape.style.left = `${e.clientX}px`;
    shape.style.top = `${e.clientY}px`;

    // Random size between 50-200px
    const size = Math.random() * 150 + 50;
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;

    // Add to container
    container.appendChild(shape);

    // Make visible with slight delay for transition effect
    setTimeout(() => {
      shape.classList.add("visible");
    }, 10);

    // Remove after animation
    setTimeout(() => {
      shape.classList.remove("visible");
      setTimeout(() => {
        container.removeChild(shape);
      }, 500);
    }, 2000);
  });
}

// Add cursor trail effect (desktop only)
function createCursorTrails() {
  // Skip on mobile
  if (isMobile() || isTablet()) return;

  const trailCount = 10;
  const trails = [];

  // Create trail elements
  for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement("div");
    trail.className = "cursor-trail";
    trail.style.opacity = (1 - i / trailCount) * 0.8;
    document.body.appendChild(trail);
    trails.push({
      element: trail,
      x: 0,
      y: 0,
    });
  }

  // Update trail positions on mouse move
  window.addEventListener("mousemove", (e) => {
    // Update first trail to cursor position
    if (trails.length > 0) {
      trails[0].x = e.clientX;
      trails[0].y = e.clientY;
      trails[0].element.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }

    // Update subsequent trails to follow previous trail with delay
    requestAnimationFrame(() => {
      for (let i = trails.length - 1; i > 0; i--) {
        trails[i].x = trails[i - 1].x;
        trails[i].y = trails[i - 1].y;
        trails[i].element.style.transform = `translate(${trails[i].x}px, ${
          trails[i].y
        }px) scale(${1 - i / (trailCount * 2)})`;
      }
    });
  });

  // Hide trails when mouse leaves window
  window.addEventListener("mouseout", (e) => {
    if (e.relatedTarget === null) {
      trails.forEach((trail) => {
        trail.element.style.opacity = "0";
      });
    }
  });

  // Show trails when mouse enters window
  window.addEventListener("mouseover", () => {
    trails.forEach((trail, i) => {
      trail.element.style.opacity = (1 - i / trailCount) * 0.8;
    });
  });
}

// Lazy loading for images
function setupLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            imageObserver.unobserve(img);
          }
        }
      });
    });

    // Find all images with data-src attribute
    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    document.querySelectorAll("img[data-src]").forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    });
  }
}

// Optimize scroll handlers
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Setup responsive navigation
function setupResponsiveNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navDrawer = document.getElementById("nav-drawer");
  const navLinks = document.querySelectorAll(".nav-links-drawer a");

  if (hamburger && navDrawer) {
    // Toggle nav drawer
    hamburger.addEventListener("click", () => {
      const isOpen = navDrawer.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen);
      navDrawer.setAttribute("aria-hidden", !isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";

      // Animate hamburger
      hamburger.classList.toggle("open");
    });

    // Close drawer when link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navDrawer.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        navDrawer.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      });
    });
  }
}

// Enhanced Loading Animation
window.addEventListener("load", function () {
  // Setup responsive navigation
  setupResponsiveNavigation();

  // Setup lazy loading
  setupLazyLoading();

  const loader = document.querySelector(".loader");
  const progressBar = document.querySelector(".spinner-progress-bar");
  const loaderLogo = document.querySelector(".loader-logo");
  const loaderMessage = document.querySelector(".loader-message");

  // Array of loading messages
  const loadingMessages = [
    "Preparing your experience...",
    "Loading projects...",
    "Setting up portfolio...",
    "Almost ready...",
  ];

  // Simulate loading progress - faster on mobile
  const progressSpeed = isMobile() ? 15 : 10;
  let progress = 0;
  const progressInterval = setInterval(
    () => {
      if (progress >= 100) {
        clearInterval(progressInterval);
        return;
      }

      progress += Math.random() * progressSpeed;
      if (progress > 100) progress = 100;

      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }

      // Update loading message at certain progress points
      if (progress > 25 && progress < 30 && loaderMessage) {
        loaderMessage.style.opacity = 0;
        setTimeout(() => {
          loaderMessage.textContent = loadingMessages[1];
          loaderMessage.style.opacity = 1;
        }, 300);
      } else if (progress > 50 && progress < 55 && loaderMessage) {
        loaderMessage.style.opacity = 0;
        setTimeout(() => {
          loaderMessage.textContent = loadingMessages[2];
          loaderMessage.style.opacity = 1;
        }, 300);
      } else if (progress > 80 && progress < 85 && loaderMessage) {
        loaderMessage.style.opacity = 0;
        setTimeout(() => {
          loaderMessage.textContent = loadingMessages[3];
          loaderMessage.style.opacity = 1;
        }, 300);
      }
    },
    isMobile() ? 100 : 150
  );

  // Add subtle animation to logo
  if (loaderLogo) {
    loaderLogo.addEventListener("mouseenter", function () {
      loaderLogo.style.transform = "scale(1.1)";
    });

    loaderLogo.addEventListener("mouseleave", function () {
      loaderLogo.style.transform = "scale(1)";
    });
  }

  // Fade out loader after content is loaded - faster on mobile
  const loaderDuration = isMobile() ? 1800 : 2500;

  setTimeout(() => {
    if (progressBar) {
      progressBar.style.width = "100%";
    }

    setTimeout(() => {
      loader.classList.add("fade-out");
      setTimeout(() => {
        loader.style.display = "none";

        // Start page animations after loader disappears
        setupParallaxEffect();
        setupEnhancedScrollAnimations();
        setupAboutImage3DEffect();
        // Defer heavy effects:
        setTimeout(() => {
          createParticles();
          setupInteractiveBackground();
          createFloatingElements();
          // Only create cursor trails on desktop
          if (!isMobile() && !isTablet()) {
            createGeometricShapes();
            createCursorTrails();
          }
        }, 300);
      }, 600);
    }, 500);
  }, loaderDuration);

  // Content Animation with throttled scroll for better performance
  const sections = document.querySelectorAll("section");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const serviceCards = document.querySelectorAll(".service-card");
  const skillBars = document.querySelectorAll(".skill-progress");

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  // Function to animate skill bars
  function animateSkillBars() {
    skillBars.forEach((bar) => {
      if (isInViewport(bar)) {
        const width = bar.style.width;
        // Reset width to 0 then animate to target width
        bar.style.width = "0";
        setTimeout(() => {
          bar.style.width = width;
        }, 200);
      }
    });
  }

  // Function to handle scroll animations
  function handleScroll() {
    sections.forEach((section) => {
      if (isInViewport(section)) {
        section.classList.add("visible");

        // If this is the resume section, animate skill bars
        if (section.id === "resume") {
          animateSkillBars();
        }
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

  // Add throttled scroll event listener for better performance
  window.addEventListener("scroll", throttle(handleScroll, 100));
});

// Ensure hamburger menu code runs after DOM is fully loaded
window.addEventListener("DOMContentLoaded", () => {
  setupResponsiveNavigation();
});

// Highlight active nav link
function highlightNavLinks() {
  const sections = document.querySelectorAll("section");
  let scrollPos = window.scrollY || window.pageYOffset;
  sections.forEach((section) => {
    const id = section.getAttribute("id");
    if (!id) return;
    const navLink = document.querySelector('.nav-links a[href="#' + id + '"]');
    const drawerLink = document.querySelector(
      '.nav-links-drawer a[href="#' + id + '"]'
    );
    if (
      section.offsetTop - 80 <= scrollPos &&
      section.offsetTop + section.offsetHeight - 80 > scrollPos
    ) {
      if (navLink) navLink.classList.add("active");
      if (drawerLink) drawerLink.classList.add("active");
    } else {
      if (navLink) navLink.classList.remove("active");
      if (drawerLink) drawerLink.classList.remove("active");
    }
  });
}
window.addEventListener("scroll", highlightNavLinks);
window.addEventListener("load", highlightNavLinks);

// Button ripple effect
const buttons = document.querySelectorAll(".btn");
buttons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = e.offsetX + "px";
    ripple.style.top = e.offsetY + "px";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
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

// Enhance responsive functionality
function enhanceResponsiveness() {
  // Set up responsive navigation
  setupResponsiveNavigation();
  // Set up responsive background
  setupResponsiveBackground();
  // Set up lazy loading images
  setupLazyLoading();
  // Add throttled resize handler
  window.addEventListener(
    "resize",
    throttle(() => {
      // Adjust UI elements on resize
      adjustResponsiveElements();
    }, 200)
  );
}

// Setup responsive background effects
function setupResponsiveBackground() {
  const bgEffects = document.querySelectorAll(".bg-effect");

  // Adjust background effects based on device
  if (isMobile()) {
    // Reduce or disable complex animations for mobile
    bgEffects.forEach((effect) => {
      effect.style.opacity = "0.3";
      effect.style.animationDuration = "30s";
    });
  } else {
    // Full effects for desktop
    bgEffects.forEach((effect) => {
      effect.style.opacity = "0.5";
      effect.style.animationDuration = "20s";
    });

    // Add parallax effect for desktop only
    let parallaxItems = document.querySelectorAll(".parallax");
    window.addEventListener(
      "scroll",
      throttle(() => {
        const scrollY = window.pageYOffset;
        parallaxItems.forEach((item) => {
          const speed = item.dataset.speed || 0.1;
          item.style.transform = `translateY(${scrollY * speed}px)`;
        });
      }, 50)
    );
  }
}

// Adjust UI elements based on device type
function adjustResponsiveElements() {
  const projectCards = document.querySelectorAll(".project-card");
  const buttons = document.querySelectorAll("button, .btn");

  if (isMobile()) {
    // Adjust card sizes for mobile
    projectCards.forEach((card) => {
      card.classList.add("mobile-card");
    });

    // Make buttons larger for touch targets
    buttons.forEach((btn) => {
      btn.classList.add("touch-target");
    });

    // Adjust font sizes for readability
    document.body.classList.add("mobile-typography");
  } else if (isTablet()) {
    // Tablet-specific adjustments
    projectCards.forEach((card) => {
      card.classList.add("tablet-card");
    });

    // Medium-sized touch targets
    buttons.forEach((btn) => {
      btn.classList.add("medium-touch");
    });
  }

  // Handle hover effects appropriately
  document.querySelectorAll(".hover-effect").forEach((element) => {
    if (isMobile() || isTablet()) {
      // Replace hover with touch events on mobile/tablet
      element.addEventListener("touchstart", () => {
        element.classList.add("active");
      });
      element.addEventListener("touchend", () => {
        setTimeout(() => element.classList.remove("active"), 300);
      });
    }
  });
}

// Setup optimized scroll animations
function setupOptimizedScrollAnimations() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  // Use IntersectionObserver for better performance
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Stop observing once animation is triggered
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    elements.forEach((el) => {
      el.classList.add("visible");
    });
  }
}

// Initialize and animate GitHub calendar section
function setupGitHubCalendar() {
  const githubSection = document.getElementById("github-contributions");
  if (!githubSection) return;

  const calendarWrapper = document.querySelector(".github-calendar-wrapper");
  const loadingElement = document.querySelector(".github-calendar-loading");

  // Create observer for animation when scrolled into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          calendarWrapper.style.opacity = "1";
          calendarWrapper.style.transform = "translateY(0)";

          // Hide loading message after calendar appears
          setTimeout(() => {
            if (loadingElement) {
              loadingElement.style.display = "none";
            }
          }, 1500);

          // Once animated, no need to observe anymore
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  // Set initial state for animation
  calendarWrapper.style.opacity = "0";
  calendarWrapper.style.transform = "translateY(30px)";
  calendarWrapper.style.transition = "opacity 0.8s ease, transform 0.8s ease";

  // Start observing
  observer.observe(githubSection);

  // Handle GitHub API rate limit issues
  window.addEventListener(
    "error",
    function (e) {
      if (
        e.target.tagName.toLowerCase() === "img" &&
        e.target.src.includes("github-calendar")
      ) {
        loadingElement.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i> 
        Could not load GitHub contributions. Please try again later.
      `;
        loadingElement.style.color = "var(--primary-color)";
        loadingElement.style.display = "block";
      }
    },
    true
  );
}

// Call all setup functions when document is ready
document.addEventListener("DOMContentLoaded", function () {
  setupParallaxEffect();
  setupEnhancedScrollAnimations();
  setupAboutImage3DEffect();
  setupInteractiveBackground();
  createFloatingElements();
  createGeometricShapes();
  createCursorTrails();
  setupLazyLoading();
  setupResponsiveNavigation();
  highlightNavLinks();
  enhanceResponsiveness();
  setupResponsiveBackground();
  adjustResponsiveElements();
  setupOptimizedScrollAnimations();
  setupGitHubCalendar(); // Add GitHub calendar setup
});

// Navbar scroll effect for interactivity
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
