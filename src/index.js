const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

let thereAreProducts = true;

const getData = api => {
  localStorage.setItem("pagination", JSON.stringify(offset));
  const url = `${api}?offset=${offset}&limit=${limit}`
  fetch(url)
    .then(response => response.json())
    .then(response => {
      let products = response;
      if (products.length < 10) thereAreProducts = false;
      let output = products.map(product => {
        const article = document.createElement("article");
        article.classList.add("Card");

        const img = document.createElement("img");
        img.src = product.images[0];

        const title = document.createElement("h2");
        const textTitle = document.createTextNode(product.title);

        const small = document.createElement("small");
        small.innerHTML = `$ ${product.price}`;

        title.append(textTitle, small);
        article.append(img, title);
        return article;
      });
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.append(...output);
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
    offset += limit;
}

const loadData = async () => {
  await getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    if (thereAreProducts) {
      loadData();
    } else {
      alert("Todos los productos Obtenidos");
      intersectionObserver.unobserve($observe);
    }
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

let offset = 5;
const limit = 10;

intersectionObserver.observe($observe);
