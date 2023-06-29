
function googleapi(event){
    event.preventDefault()
    const search = document.querySelector("#search").value.trim()
    console.log(search)
    const url = `https://www.googleapis.com/books/v1/volumes?q=${search}`
    fetch (url)
    .then((response)=>{
        console.log(response)
        return response.json()

    }).then((data)=>{
        console.log(data)
    })
}


document.querySelector("#search-form").addEventListener("submit", googleapi)