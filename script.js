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
