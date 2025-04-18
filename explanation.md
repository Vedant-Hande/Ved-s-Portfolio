# JavaScript Explanation for `script.js`

This document explains the JavaScript code used in your portfolio project, detailing the purpose and logic of each major section.

---

## 1. Contact Form Submission (EmailJS)
Handles the contact form submission, sending the data to your email using EmailJS.
- Prevents the default form submission.
- Collects values from the name, email, and message fields.
- Sends the data using EmailJS's `send` method.
- Shows an alert on success or failure, and resets the form on success.

---

## 2. Loader Animation
Displays a loading animation when the site first loads.
- Fades out the loader after 1 second.
- Hides the loader element after the fade-out animation completes.

---

## 3. Section and Card Reveal Animations
Animates sections, portfolio items, and service cards as they enter the viewport.
- Checks if each element is in the viewport.
- Adds the `visible` class to trigger CSS animations when in view.
- Runs on initial load and on scroll.

---

## 4. Hamburger Menu & Mobile Navigation
Controls the hamburger menu and mobile nav drawer for responsive navigation.
- Waits for the DOM to be fully loaded before running.
- Toggles the nav drawer open/close when the hamburger button is clicked.
- Updates ARIA attributes for accessibility.
- Locks body scroll when the drawer is open.
- Closes the drawer when a nav link is clicked, clicking outside the drawer, or pressing Escape.

---

## 5. Active Section Highlighting
Highlights the current section in the navbar (both desktop and mobile) based on scroll position.
- Checks which section is currently in view.
- Adds the `active` class to the corresponding navbar and drawer links.
- Updates on scroll and on page load.

---

## 6. Button Ripple Effect
Adds a modern ripple animation when any `.btn` button is clicked.
- Creates a `span` element at the click position.
- Animates the ripple and removes it after 500ms.

---

## 7. Back to Top Button
Shows a back-to-top button when the user scrolls down the page.
- Displays the button if the scroll position is greater than 300px.
- Smoothly scrolls the user back to the top when clicked.

---

## General Notes
- The code uses modern JavaScript features and event listeners.
- Accessibility is considered for navigation controls.
- Animations and interactivity are handled with a combination of JavaScript and CSS classes.

---

Feel free to ask for a deeper explanation or code walkthrough for any specific part!
