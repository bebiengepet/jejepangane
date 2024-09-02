   // Function to get the 'id' parameter from the URL
        function getIdFromUrl() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('id'); // Extract the 'id' parameter
        }

        // Function to fetch data from the API
        async function fetchData(id) {
            const response = await fetch(`${cors_any}/${base_domain}/provide/vod?ac=detail&ids=${id}`);
            const data = await response.json();
            return data.list[0]; // Assuming the API always returns a list with one item
        }


        function decodeAndCleanString(str) {
        // Decode HTML entities
        const txt = document.createElement('textarea');
        txt.innerHTML = str;
        let decodedStr = txt.value;

        // Replace special characters with spaces
        decodedStr = decodedStr.replace(/[^a-zA-Z0-9\s]/g, ' '); // Keep only letters, numbers, and spaces
        decodedStr = decodedStr.replace(/\s+/g, ' ').trim(); // Replace multiple spaces with a single space

        return decodedStr;
    }


        // Function to display the data
        function displayData(data) {
            const videoContainer = document.getElementById('video-container');
            const infoContainer = document.getElementById('info-container');

            // Create iframe for the video
            const iframe = document.createElement('iframe');
            iframe.src = data.episodes.server_data.Full.link_embed;
            iframe.width = "100%";
            iframe.height = "500";
            iframe.frameBorder = "0";
             iframe.allowFullscreen = true; // Allow fullscreen mode
              iframe.scrolling = "no"; // Disable scrolling
            videoContainer.appendChild(iframe);


            // Display other information
            infoContainer.innerHTML = `
                <div class="card"
                 style="padding:3px;
                 border-top:10px solid #f72565;
                 ">
                <h6 class="bold-text pink-text">${data.name}</h6>
                <p><strong>Movie Code:</strong> ${data.movie_code}</p>
                <p><strong>Category:</strong> ${data.category.join(', ')}</p>
                <p><strong>Year:</strong> ${data.year}</p>
                <p><strong>Quality:</strong> ${data.quality}</p>
                <p><strong>Time:</strong> ${data.time}</p>

                </div>
            `;

     // Decode the data.name to handle HTML entities
    const decodedName = decodeAndCleanString(data.name);

    // Update the document title
    document.title = `${decodedName} - JavMom Jav Hd Streaming`;


    // Update meta description with SEO-friendly content
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', `Watch ${data.name} online . Enjoy ${data.name}, a Jav Videos top-rated movie, with the best quality available.`);
    } else {
        const newMetaDescription = document.createElement('meta');
        newMetaDescription.name = 'description';
        newMetaDescription.content = `Watch ${data.name} Jav online in high definition. Enjoy ${data.name}, a Jav Videos top-rated movie, with the best quality available.`;
        document.head.appendChild(newMetaDescription);
    }
        }


        // Main function to run on page load
        async function main() {
            const id = getIdFromUrl();
            if (id) {
                const data = await fetchData(id);
                displayData(data);
            } else {
                alert('No ID found in the URL.');
            }
        }

        window.onload = main;