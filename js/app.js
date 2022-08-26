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

//*************************************************************************************
//Build the navigation menu ****************

//Select All sections
const sections = document.querySelectorAll("section");
//Select ul element to add li element
const navBarList = document.querySelector("#navbar__list");
//create a fragment to improve the performance of the code
const fragment = document.createDocumentFragment();

/*Create a function to add the number of li elements with the same number of sections
 and link each li element with its section*/

sections.forEach(function (section) {
  //create Constant holds the ID and the title of the section
  const sectionId = section.id;
  const sectionTitle = section.dataset.nav;
  //Making li element and The Anchor element
  const li = document.createElement("li");
  const link = document.createElement("a");
  //Connect the Anchor element with the ID of the section and give it the same page title
  link.href = `#${sectionId}`;
  link.textContent = sectionTitle;
  //give Anchor element Class name "menu__link" to apply CSS code to them
  link.classList.add("menu__link");
  /*Adding an event to a li element when clicked
   will move the screen to the Saction it is attached to*/
  link.addEventListener("click", (ele) => {
    ele.preventDefault();
    //We give the order to move to the section of the ID and it should be smooth
    section.scrollIntoView({
      behavior: "smooth",
    });
  });
  //add anchor element to li element
  li.appendChild(link);
  //add li element to fragment
  fragment.appendChild(li);
});
//now add fragment to navigation Bar
navBarList.appendChild(fragment);

//*************************************************************************************

//Add an active state to your navigation items when a section is in the viewport.

//We are calling The IntersectionObserver interface
const observer = new IntersectionObserver(
  //start the intersection callback function
  (entries) => {
    //We use forEach() method to pass through all sections
    entries.forEach((entry) => {
      /*We use The toggle() method to add a class name to the section 
      that appears on the screen and define the section 
      and we know it appears on the screen via the isIntersecting property
      and also to add a class name to the ID*/
      entry.target.classList.toggle("your-active-class", entry.isIntersecting);
      let activeLink = navBarList.querySelector(
        `a[href="#${entry.target.id}"]`
      );
      activeLink.classList.toggle("active", entry.isIntersecting);
    });
  },
  /*
  Set options for calling The IntersectionObserver interface
  The section is activated when only half of it appears
  */
  {
    root: null,
    threshold: 0.5,
  }
);
/*
Adding an event to the window when scrolling. 
The IntersectionObserver is called and applied to all sections
*/
window.addEventListener("scroll", function () {
  sections.forEach((sec) => {
    observer.observe(sec);
  });
});

//**************************************************************************************

//Add a scroll to the top button on the page

//We decide which element we will work on
let span = document.querySelector(".up");
//Adding an event to the window when scrolling does the following function
window.addEventListener("scroll", function () {
  /*
    We use the if statement and put the following condition, 
    which means that the window is at 2500 from the y axis or more than 2500
    And when the condition is fulfilled, a class name with the title "show" is added to the button
    And we modified the code in css to execute js code
*/
  if (this.scrollY >= 2500) {
    span.classList.add("show");
  } else {
    span.classList.remove("show");
  }
});
/*
 An event is added to the button when it is clicked. 
 It performs the function that takes us to the top of the page at the point (0,0)
 and moves smoothly to the top.
 */
span.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

//Hide fixed navigation bar while scrolling down

//select page header and navigation bar
let hideNavBar = document.querySelector(".page__header");
//Create a variable to determine the last point where the screen stopped on the y axis
let lastScroll = window.scrollY;
//Adding an event to the window when scrolling will perform the following function
window.addEventListener("scroll", function () {
  /*
WWe use the if statement and we put the following condition, 
which means when the lastScroll is less than the y-axis point we are currently standing on, 
this means that we move to the bottom and we give the navigation bar the name of the class "hide", 
which we gave the hide settings in the CSS file 
  */
  if (lastScroll < window.scrollY) {
    hideNavBar.classList.add("hide");
  } else {
    hideNavBar.classList.remove("hide");
  }
  //Here we adjust the value of the lastScroll to a new point on the y-axis
  lastScroll = window.scrollY;
});
