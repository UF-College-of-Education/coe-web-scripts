// DEFINE HANDLER FUNCTION
// Functionality based on class names. CSS in page level styles.
const blogCardFilterHandler = (e)=>{
    let currentSelectedFilters = document.querySelectorAll('.filterBtn.selected');
    let newFilter = e.target;
    let filterClass = newFilter.dataset.filterClass;

    // Handle old selection
    if ( currentSelectedFilters.length > 0 ) {
        // Hide articles from old filter class
        removeActiveClasses();
        // Deselect old filter button
        currentSelectedFilters[0].classList.remove('selected');
    } 

    // Highlight new filter button
    newFilter.classList.add('selected');

    // Add active class to the appropriate blog card
    setActiveBlogCard(filterClass);
}

// DEFINE HELPER FUNCTIONS
function removeActiveClasses() {
    let activeCards = document.querySelectorAll('.blog-card.active');
    if (activeCards.length > 0) {
        for (let i = 0; i < activeCards.length; i++) {
            let currentActiveCard = activeCards[i];
            currentActiveCard.classList.remove('active');
        }
    }
}
function setActiveBlogCard(activeClass) {
    let blogCard = document.getElementById(activeClass);
    if (blogCard) {
        blogCard.classList.add('active');
    }
}

// SET EVENT LISTENERS
let blogFilterBtns = document.getElementsByClassName('filterBtn');

for (let i = 0; i < blogFilterBtns.length; i++) {
    const currentBtn = blogFilterBtns[i];
    currentBtn.addEventListener('click', blogCardFilterHandler);
}
