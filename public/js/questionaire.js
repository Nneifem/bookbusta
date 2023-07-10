let genreResults = document.querySelector(".genre-results");

// displaying the results of the search 
function genre(event) {
    event.preventDefault()
    const genreSearch = document.querySelector("#genre-questionaire").value.trim()

    const genreURL = `https://www.googleapis.com/books/v1/volumes?q=subject:${genreSearch}`
    fetch(genreURL)
        .then((response) => {
            console.log(response)
            return response.json()
        }).then((data) => {
            genreResults.innerHTML = "";
            for (let index = 0; index < data.items.length; index++){
                genreResults.innerHTML+= `<div class="card" style="width: 20rem; margin-right: 15px; min-width: 30%; background-color: #1a1a1a;">
                    <div class="search-card-body bg-dark text-center" style="padding: 1em;"> 
                        <h5 class="card-title text-light">${data.items[index].volumeInfo.title}</h5>
                        <p class="card-authors text-light">By: ${data.items[index].volumeInfo.authors}</p>
                        <img src="${data.items[index].volumeInfo.imageLinks.thumbnail}" class="card-img-top" alt="...">
                        <p class="card-text text-light">${data.items[index].volumeInfo.description}</p>
                        <div class="btn-box" style="text-align: center;">
                            <a id="card-link" href="${data.items[index].volumeInfo.previewLink}" target="_blank" class="btn btn-primary">View Book</a>
                            <a class="btn btn-primary save" type="submit">Add to Favorites</a> 
                        </div>
                    </div>
                </div>`
            }
            console.log(data);
        })
};

// saving the book to the favorites section
const saveBooks = async (event) => {
    event.preventDefault()

    const card = event.target.closest('.card');
    const title = card.querySelector('.card-title').textContent.trim();
    const author = card.querySelector('.card-authors').textContent.trim();
    const description = card.querySelector('.card-text').textContent.trim();
    const buyLink = card.querySelector('#card-link').getAttribute('href').trim();
    const thumbnail = card.querySelector('.card-img-top').getAttribute('src').trim();

    if (title && author && description && buyLink && thumbnail) {
        const response = await fetch(`/api/book`, {
            method: 'POST',
            body: JSON.stringify({ title, author, description, buyLink, thumbnail }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            alert('Added to favorites');
        } else {
            alert('Failed to add to favorites');
        }
    }
};

document
    .querySelector("#search-form")
    .addEventListener("submit", genre)

document
    .addEventListener('click', function (event) {
        if(event.target.matches('.save')) {
            saveBooks(event);
        }
    });