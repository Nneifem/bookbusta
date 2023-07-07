// Search bar
// const searchForm = document.querySelector("#pf-search-form");
// const searchInput = document.querySelector("#pf-search");

// searchForm.addEventListener('submit', (event) => {
//   event.preventDefault();

//   const searchTerm = searchInput.value.replace(" ", "+");

//   window.location.href = `/profile/${searchTerm}`;
// });

// Removes books from favorites
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/book/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to remove book from favorites');
    }
  }
};

document.querySelector('#book-list').addEventListener('click', delButtonHandler);