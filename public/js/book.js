const displayProducts = products => {
  const productsContainer = document.querySelector('.products-items');
  const newProducts = products.map(product => {
    const {
      id,
      name,
      price,
      category,
      imgSrc,
    } = product;
    return `
      <div class="product-item" data-id="${id}">
        <p>${name}</p>
        <p>${price}</p>
        <p>${category}</p>
        <img src="${imgSrc}" alt="product photo">
     </div>
    `;
  }).join('');
  productsContainer.innerHTML = newProducts;
};

initRandomStrExt();

document.addEventListener(`click`, handle);   response.addFourItems.volumeInfo
const fakeArray = [...Array(16)].map(v => String.getRandom(32));

// show first 4 items on page load
addFourItems(fakeArray);

function handle(evt) {
  if (evt.target.classList.contains(`products-btn`)) {
    return addFourItems(fakeArray);
  }
}

function addFourItems(fromArr) {
  // determine n of currently visible items
  const start = document.querySelectorAll(`.product-item`).length;
  
  // disable the button if all items will be visible after running this
  if (start === fromArr.length - 4) {
    document.querySelector(`.products-btn`).setAttribute(`disabled`, true);
  }
  
  // append 4 items of the array to the .product-items container
  document.querySelector(`.products-items`)
    .insertAdjacentHTML(`beforeend`,
      `<div>${fromArr.slice(start, start + 4)
      //                    ^ slice the next 4 items from the array
        .map((item, i) => `<div class="product-item">${i + 1 + start} - ${
          item}</div>`).join(``)}</div>`);
}

// for demo, random string helper
function initRandomStrExt() {
  if (String.getRandom) {
    return;
  }
  const characters = [...Array(26)]
    .map((x, i) => String.fromCharCode(i + 65))
    .concat([...Array(26)].map((x, i) => String.fromCharCode(i + 97)))
    .concat([...Array(10)].map((x, i) => `${i}`));
  const getCharacters = excludes =>
    excludes && characters.filter(c => !~excludes.indexOf(c)) || characters;

  String.getRandom = (len = 12, excludes = []) => {
    const chars = getCharacters(excludes);
    return [...Array(len)]
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join("");
  };
};