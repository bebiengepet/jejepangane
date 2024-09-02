$(document).ready(function() {
    // Get the limit from the 'card-container' element attribute
    const cardContainer = $('#random-container');
    const limit = parseInt(cardContainer.attr('limit'), 10) || 0; // Default to 0 if 'limit' is not specified
    const randomPage = Math.floor(Math.random() * max_random_page) + 1;
    const apiUrl = `${cors_any}/${base_domain}/provide/vod?ac=detail&pg=${randomPage}`;

    // Show the preloader before fetching data
    const preloader = cardContainer.find('.preloader-wrapper');
    preloader.show();

    // Fetch data from API
    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function(response) {
            let data = response.list;

            // Limit the data if 'limit' is specified
            if (limit > 0) {
                data = data.slice(0, limit);
            }

            // Hide the preloader after data is loaded
            preloader.hide();

            // Loop through the data and create cards
            data.forEach(item => {
                const truncatedTitle = item.name.length > 40 ? item.name.substring(0, 37) + '...' : item.name;

                const card = `
                    <div class="col s12 m6 l6">
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
                cardContainer.append(card);
            });
        },
        error: function(error) {
            // Hide the preloader in case of an error
            preloader.hide();
            console.error('Error fetching data:', error);
        }
    });
});