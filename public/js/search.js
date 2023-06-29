let bookList = document.querySelector(".book-list");


function googleapi(event) {
    event.preventDefault()
    const search = document.querySelector("#search").value.trim()
    console.log(search)
    const url = `https://www.googleapis.com/books/v1/volumes?q=${search}`
    fetch(url)
        .then((response) => {
            console.log(response)
            return response.json()

        }).then((data) => {
            bookList.innerHTML = "";
            for (let index = 0; index < data.items.length; index++) {
                console.log("HI");
                // bookList.innerHTML += `<li> ${data.items[index].volumeInfo.title} </li>`;


                bookList.innerHTML+= `<div class="card" style="width: 18rem;">
                    <img src="${data.items[index].volumeInfo.imageLinks.thumbnail}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${data.items[index].volumeInfo.title}</h5>
                            <p class="card-text">${data.items[index].volumeInfo.description}</p>
                            <a href="${data.items[index].volumeInfo.previewLink}" target="_blank" class="btn btn-primary">Go somewhere</a>
                        </div>
                </div>`
            }
            console.log(data)
        })
}


document.querySelector("#search-form").addEventListener("submit", googleapi)