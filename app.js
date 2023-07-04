/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll('section'); // Get all the sections
const navList = document.getElementById('navbar__list'); // Get the <ul> element

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

// Function to remove the active state from all sections and navigation elements
function removeActiveState() {
  sections.forEach(function(section) {
    section.classList.remove('your-active-class');
  });
  const navLinks = navList.querySelectorAll('a');
  navLinks.forEach(function(link) {
    link.classList.remove('active');
  });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build the navigation menu
function buildNav() {
  // Loop through each section and create navigation items
  sections.forEach(function(section) {
    const sectionId = section.id;
    const sectionName = section.getAttribute('data-nav');

    // Create the <li> and <a> elements
    const listItem = document.createElement('li');
    const link = document.createElement('a');

    // Set the attributes and text content for the link
    link.setAttribute('href', `#${sectionId}`);
    link.textContent = sectionName;
    listItem.classList.add('menu-item'); // Add spacing class

    // Append the link to the list item, and list item to the navigation menu
    listItem.appendChild(link);
    navList.appendChild(listItem);
  });
}

// Add class 'active' to section and corresponding navigation element when in viewport
function setActiveSection() {
  removeActiveState(); // Remove active state from all sections and navigation elements

  // Loop through each section and check if it's in the viewport
  sections.forEach(function(section) {
    if (isInViewport(section)) {
      section.classList.add('your-active-class');
      const navLink = navList.querySelector(`a[href="#${section.id}"]`);
      navLink.classList.add('active');
    }
  });
}

// Scroll to anchor ID using scrollIntoView event
function scrollToSection(event) {
  event.preventDefault(); // Stop the default anchor link behavior

  // Check if the clicked element is a navigation item
  if (event.target.nodeName === 'A') {
    const targetSectionId = event.target.getAttribute('href'); // Get the section ID to scroll to
    const targetSection = document.querySelector(targetSectionId); // Select the target section

    // Scroll to the target section smoothly
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
document.addEventListener('DOMContentLoaded', buildNav);

// Scroll to section on link click
navList.addEventListener('click', scrollToSection);

// Set sections as active on scroll
document.addEventListener('scroll', setActiveSection);
