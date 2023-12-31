// Function that allows users to post comments to book 
async function newCommentHandler(event) {
  event.preventDefault();

  console.log("clicked me");

  const comment_body = document.getElementById("comment").value.trim();

  // get post id from URL
  const url = window.location.toString().split("/");
  const book_id = url[url.length - 1];

  if (comment_body) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        book_id,
        comment_body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

// Function allows user to delete blog posts from the individual blog post
const deletePostHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comment/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload('/');
    } else {
    alert(response.statusText);
  }}
};

const deleteButton = document.querySelectorAll("#deleteBtn");

// Event Listener
// console.log("HERE!");
console.log(document.getElementById("comment-form"));
document
  .getElementById("comment-form")
  .addEventListener("submit", newCommentHandler);

document.querySelector('#comments-list').addEventListener('click', deletePostHandler);