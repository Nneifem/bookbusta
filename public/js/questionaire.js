console.log("==============");
console.log("here");
console.log("==============");

const genreForm = document.querySelector('#genre-form');
const searchGenre = document.querySelector('#genre-questionaire');

genreForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchTerm = searchGenre.value.replace(" ", "+");

    window.location.href = `/questionaire/${searchTerm}`;
});