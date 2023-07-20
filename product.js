const productDOM = document.querySelector(".product");
const url = `https://course-api.com/javascript-store-single-product`;

const fetchProduct = async () => {
  try {
    // loading state
    productDOM.innerHTML = `<h4 class="product-loading">loading...</h4>`;

    // query params
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const response = await fetch(`${url}?id=${id}`);
    const data = await response.json();
    return data;
    // display state handled in displayProduct()
  } catch (error) {
    // error state
    productDOM.innerHTML = `<p class="error">There was a problem loading the product. Please try again later.</p>`;
  }
};

const displayProduct = (product) => {
  const {
    fields: { name: title, company, description, colors, price, image },
  } = product;
  const { url: img } = image[0];
  const formatPrice = price / 100;
  document.title = title.toUpperCase();

  // colors
  const colorsList = colors
    .map((color) => {
      return `<span class="product-color" style="background: ${color}"></span>`;
    })
    .join("");

  productDOM.innerHTML = `<div class="product-wrapper">
  <img src="${img}" alt="${title}" class="img" />
  <div class="product-info">
    <h3>${title}</h3>
    <h5>${company}</h5>
    <span>$${formatPrice}</span>
    <div class="colors">
      ${colorsList}
    </div>
    <p>${description}</p>
    <button type="button" class="btn">add to cart</button>
  </div>
</div>`;
};

const start = async () => {
  const data = await fetchProduct();
  displayProduct(data);
};

start();
