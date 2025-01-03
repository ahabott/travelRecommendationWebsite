
// Fetch Data from JSON
async function fetchRecommendations() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
    }
}

// Perform Search
async function performSearch() {
    const keyword = document.getElementById('search').value.toLowerCase();
    const data = await fetchRecommendations();

    const results = data.countries.flatMap(country =>
        country.cities.filter(city =>
            city.name.toLowerCase().includes(keyword) || city.description.toLowerCase().includes(keyword)
        )
    );

    displayResults(results);
}

// Display Results
function displayResults(results) {
    const container = document.getElementById('recommendation-container');
    container.innerHTML = '';

    results.forEach(result => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${result.imageUrl}" alt="${result.name}">
            <h3>${result.name}</h3>
            <p>${result.description}</p>
        `;
        container.appendChild(card);
    });
}

// Clear Results
function clearResults() {
    document.getElementById('search').value = '';
    document.getElementById('recommendation-container').innerHTML = '';
}