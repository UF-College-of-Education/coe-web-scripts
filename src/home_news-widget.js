function fetchFeaturedNews() {
const apiUrl = 'https://education.ufl.edu/news/wp-json/wp/v2/posts?categories=1518&per_page=3&_embed';

return fetch(apiUrl)
    .then(response => {
        // Handle HTTP Errors 
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(posts => {
        // Creates the news items
        processPosts(posts);
        return posts;
    })
    .catch(error => {
        // Handle other errors and print message on front end
        console.error('Error fetching posts:', error);
        const newsFeedContainer = document.getElementById('coe-news-feed');
        if (newsFeedContainer) {
            newsFeedContainer.innerHTML = `<p>Unable to load news. Please try again later.</p>`;
        }
    });
}

function processPosts(posts) {
const newsFeedContainer = document.getElementById('coe-news-feed');
if (!newsFeedContainer) {
    console.error('News feed container not found');
    return;
}

let newsEntriesHtml = '';

posts.forEach(post => {
    const title = post.title.rendered;
    const postLink = post.link;
    const featuredMedia = post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0];
    
    // Get the medium size image URL if available, otherwise fall back to full size or default
    const featuredImageUrl = featuredMedia?.media_details?.sizes?.medium?.source_url || 
                            featuredMedia?.source_url || 
                            'https://education.ufl.edu/wp-content/uploads/2023/04/NormanTree-scaled.jpg';
    
    const featuredImageAltText = featuredMedia?.alt_text || 'UF College of Education Courtyard';
    
    // Get excerpt and limit to 120 characters
    let excerpt = post.excerpt?.rendered || '';
    
    // Remove HTML tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = excerpt;
    excerpt = tempDiv.textContent || tempDiv.innerText || '';
    
    // Trim to 120 chars and add ellipsis if needed
    if (excerpt.length > 160) {
    excerpt = excerpt.substring(0, 160).trim() + '...';
    }
    
    const newsEntry = `
    <article class="news-item">
        <div class="image-wrapper">
        <img class="image-direct" src="${featuredImageUrl}" alt="${featuredImageAltText}" />
        </div>
        <div class="news-content">
        <h4><a href="${postLink}" class="news-title">${title}</a></h4>
        <div class="news-excerpt">${excerpt}</div>
        <p><a href="${postLink}" class="read-more">Read More</a></p>
        </div>
    </article>
    `;
    
    newsEntriesHtml += newsEntry;
});

newsFeedContainer.innerHTML = newsEntriesHtml;
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', fetchFeaturedNews);