document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    const sjs = SimpleJekyllSearch({
        searchInput: document.getElementById('search-input'),
        resultsContainer: document.getElementById('results-container'),
        json: '/search.json',
        searchResultTemplate: '<div class="search-result"><a href="{url}"><h3>{title}</h3></a><p>{content}</p></div>',
        noResultsText: 'No results found',
        limit: 10,
        fuzzy: false
    });

    if (query) {
        document.getElementById('search-input').value = query;
        sjs.search(query);
    }
});