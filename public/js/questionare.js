const questionareForm = async (event) => {
    event.preventDefault();

    const userGenre = document.querySelector('#genre-questionare').value.trim();

    if (userGenre) {
        const response = await fetch('')
    }
};

document
    .querySelector('.submit-form')
    .addEventListener('submit', questionareForm)