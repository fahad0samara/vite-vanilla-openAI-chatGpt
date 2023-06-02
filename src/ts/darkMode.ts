export function darkMode() {
  // Get the dark mode button element
  const darkModeButton = document.getElementById("dark-mode-btn");

  // Get the body element
  const body = document.querySelector("body");

  // Check if darkModeButton and body are not null
  if (darkModeButton && body) {
    // Add click event listener to the dark mode button
    darkModeButton.addEventListener("click", function () {
      // Toggle the dark mode class on the body element
      body.classList.toggle("dark-mode");
    });
  }
}
