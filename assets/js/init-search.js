document.addEventListener('DOMContentLoaded', function() {

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const isSearchPage = window.location.pathname.includes('/search/');

    // Get baseurl
    const baseurl = document.body.getAttribute('data-baseurl') || '';

    // Handle search input functionality
    const searchInput = document.getElementById('search-input');

    if (searchInput) {
        // Add event listener for Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });

        // Only initialize search on the search page
        if (isSearchPage) {
            const resultsContainer = document.getElementById('page-search-results');

            if (resultsContainer) {
                if (query) {
                    performManualSearch(query, resultsContainer, baseurl);
                }
            } else {
                console.error("Could not find results container #page-search-results");
            }
        }
    }
});

function performSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();

    if (query) {
        // Get the baseurl
        const searchButton = document.querySelector('button[onclick="performSearch()"]');
        const baseurl = searchButton ? searchButton.getAttribute('data-baseurl') : null ||
            document.body.getAttribute('data-baseurl') || '';

        // Redirect to the search page with the query parameter
        window.location.href = `${window.location.origin}${baseurl}/search/?query=${encodeURIComponent(query)}`;
    }
}

function performManualSearch(query, resultsContainer, baseurl) {
    // Show loading indicator
    resultsContainer.innerHTML = '<p>Searching...</p>';

    fetch(window.location.origin + baseurl + '/search.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok, could not find search.json');
            }
            return response.json();
        })
        .then(data => {
            // Filter results by query
            const results = data.filter(item =>
                (item.title && item.title.toLowerCase().includes(query.toLowerCase())) ||
                (item.content && item.content.toLowerCase().includes(query.toLowerCase()))
            );

            // Render results
            resultsContainer.innerHTML = '';

            if (results.length > 0) {
                results.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'search-result';

                    // Create a snippet from content (first 200 characters)
                    const snippet = item.content
                        ? item.content.substring(0, 200) + (item.content.length > 200 ? '...' : '')
                        : 'No content';

                    div.innerHTML = `
                        <a href="${item.url}"><h5>${item.title || 'Untitled'}</h5></a>
                        <p>${snippet}</p>
                    `;
                    resultsContainer.appendChild(div);
                });
            } else {
                resultsContainer.innerHTML = '<p class="no-results">No results found for "' + query + '"</p>';
            }
        })
        .catch(error => {
            console.error("Error searching:", error);
            resultsContainer.innerHTML = `<p class="error">Error searching: ${error.message}</p>`;
        });
}