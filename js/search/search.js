let currentPage = 1;
let query = '';

// Function to get the 'q' parameter from the URL
function getQueryFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('q'); // Extract the 'q' parameter
}

// Function to fetch data from the API
async function fetchData(query, page) {
    const response = await fetch(`${cors_any}/${base_domain}/provide/vod?ac=detail&wd=${query}&pg=${page}`);
    const data = await response.json();
    return data;
}

// Function to display the data
function displayData(data) {
    const searchContainer = $('#search-container');
    searchContainer.empty(); // Clear previous results

     $('#countid').text(data.total);

    // Loop through the data and create cards
    data.list.forEach(item => {
        const truncatedTitle = item.name.length > 40 ? item.name.substring(0, 37) + '...' : item.name;

        const card = `
            <div class="col s12 m3 l3">
            <a href="/p.html?id=${item.id}">
                <div class="card">
                    <div class="card-image">
                        <span class="title-badge">${item.type_name}</span>
                        <img src="${item.poster_url}">
                        <span class="time-badge">${item.time}</span>
                    </div>
                    <div style="padding:2px">
                        <a href="/p.html?id=${item.id}" class="bold-text titleselect">${truncatedTitle}</a>
                    </div>
                </div>
                </a>
            </div>
        `;
        searchContainer.append(card);
    });

    // Display pagination
    displayPagination(data.page, data.pagecount);
}

// Function to display pagination
function displayPagination(currentPage, totalPages) {
    const paginationContainer = $('#pagination');
    paginationContainer.empty(); // Clear previous pagination

    const pagination = `
        <ul class="pagination">
            <li class="${currentPage === 1 ? 'disabled' : 'waves-effect'}"><a href="#!" data-page="${currentPage - 1}"><i class="material-icons">chevron_left</i></a></li>
            ${Array.from({ length: totalPages }, (_, i) => `
                <li class="${currentPage === i + 1 ? 'active' : 'waves-effect'}"><a href="#!" data-page="${i + 1}">${i + 1}</a></li>
            `).join('')}
            <li class="${currentPage === totalPages ? 'disabled' : 'waves-effect'}"><a href="#!" data-page="${currentPage + 1}"><i class="material-icons">chevron_right</i></a></li>
        </ul>
    `;
    paginationContainer.append(pagination);

    // Add event listener for pagination links
    paginationContainer.on('click', 'a', function(e) {
        e.preventDefault();
        const page = $(this).data('page');
        if (page && page !== currentPage) {
            currentPage = page;
            search(query, currentPage);
        }
    });
}

// Function to perform search
async function search(query, page) {
    const searchContainer = $('#search-container');
    const preloader = searchContainer.find('.preloader-wrapper');
    preloader.show();

    const data = await fetchData(query, page);
    displayData(data);

    preloader.hide();
}

// Main function to run on page load
$(document).ready(function() {
    query = getQueryFromUrl();
    if (query) {
        search(query, currentPage);
         $('#resultid').text(query);

    } else {
        alert('No query found in the URL.');
    }
});