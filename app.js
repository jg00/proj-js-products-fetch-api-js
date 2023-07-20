const url = `https://course-api.com/javascript-store-products`;

const productsDOM = document.querySelector(".products-center");

const fetchProducts = async () => {
  // loading state
  productsDOM.innerHTML = `<div class="loading"></div>`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
    // display state handled in displayProducts()
  } catch (error) {
    // error state
    productsDOM.innerHTML = `<p class="error">there was an error</p>`;
  }
};

const displayProducts = (list) => {
  const productList = list
    .map((product) => {
      const {
        id,
        fields: { name: title, price },
      } = product;
      const { url: img } = product.fields.image[0];
      const formatPrice = price / 100;
      return `<a href="product.html?id=${id}&name=john&age=30" class="single-product">
      <img class="single-product-img img" src="${img}" alt="${title}" />
      <footer>
        <h5 class="name">${title}</h5>
        <span class="price">$${formatPrice}</span>
      </footer>
    </a>`;
    })
    .join("");

  // display state
  productsDOM.innerHTML = `<div class="products-container">${productList}</div>`;
};

const start = async () => {
  const data = await fetchProducts();
  displayProducts(data);
};

start();
