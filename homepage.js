const newarrivalContainer = document.querySelector('.new-arrivals');
const topsellingSection = document.querySelector('.top-selling .products-grid');
const viewallButton1 = document.querySelector('.view-all-button');
const viewallButton2 = document.querySelector('.view-all-button2');
const cartNums = document.querySelector('.numsitems');

// Fetch and display products for a given id
const fetchProduct = async (id) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch product:', error);
  }
};

const generateStars = (rating) => '⭐'.repeat(Math.round(rating));

const createProductMarkup = (product) => `
  <div class="product-card" data_id=${product.id}>
    <div class="product-image">
      <a href="descriptionpage.html">
        <img src="${product.image}" height="150" width="200" alt="${
  product.title
}" />
      </a>
    </div>
    <div class="product-info">
      <h4>${product.title}</h4>
      <div class="product-price">
        <span class="current-price">$${product.price}</span>
        <span class="original-price">$150</span>
      </div>
      <div class="product-rating">
        <span>${generateStars(product.rating.rate)}</span>
        <span class="reviews">(${product.rating.count} Reviews)</span>
      </div>
      <button class="add-to-cart">Add to Cart</button>
    </div>
    <div class="desc">
      <a>${product.description}</a>
    </div>
  </div>
`;

// Insert product markup into container
const insertProducts = (container, products) => {
  container.innerHTML = products.map(createProductMarkup).join('');
};

// Fetch and display initial products in "New Arrivals"
const productIds = [1, 2, 3, 4];
productIds.forEach(async (id) => {
  const product = await fetchProduct(id);
  if (product && newarrivalContainer) {
    newarrivalContainer.insertAdjacentHTML(
      'beforeend',
      createProductMarkup(product)
    );
  }
});

// Toggle products visibility in "New Arrivals"
let isProductVisible = false;
viewallButton1.addEventListener('click', async () => {
  if (isProductVisible) {
    newarrivalContainer.innerHTML = '';
    productIds.forEach(async (id) => {
      const product = await fetchProduct(id);
      newarrivalContainer.insertAdjacentHTML(
        'beforeend',
        createProductMarkup(product)
      );
    });
    viewallButton1.textContent = 'View All';
  } else {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
    insertProducts(newarrivalContainer, products);
    viewallButton1.textContent = 'Hide All';
  }
  isProductVisible = !isProductVisible;
});

// Fetch and display top-selling products
const topselling = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();
  const topProducts = products.filter((p) => p.rating.rate > 4.5).slice(0, 4);
  insertProducts(topsellingSection, topProducts);
};

topselling(); // Call on page load
let isproductvisible2 = false;

let isTopSellingVisible = false;
viewallButton2.addEventListener('click', async () => {
  if (isTopSellingVisible) {
    topselling();
    viewallButton2.textContent = 'View All';
  } else {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
    const topProducts = products.filter((p) => p.rating.rate > 4.5);
    insertProducts(topsellingSection, topProducts);
    viewallButton2.textContent = 'Hide All';
  }
  isTopSellingVisible = !isTopSellingVisible;
});

window.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-cart')) {
    const clickbutton = e.target;
    const productcard = clickbutton.closest('.product-card');
    if (productcard) {
      const productid2 = productcard.getAttribute('data_id');

      const producttitle = productcard.querySelector('h4').textContent;
      const productimage = productcard.querySelector('.product-image img').src;
      const productprice =
        productcard.querySelector('.current-price').textContent;
      const productinfo = {
        id: productid2,
        title: producttitle,
        image: productimage,
        price: productprice,
      };
      let items = JSON.parse(this.localStorage.getItem('cartitems')) || [];
      items.push(productinfo);
      localStorage.setItem('cartitems', JSON.stringify(items));
      this.window.location.reload();
    }
  }
});

const descclass = document.querySelector('.desc');
window.addEventListener('click', function (e) {
  descclass.style.display = 'none';
  // Check if the clicked element is an image inside the product-image class
  if (e.target.closest('.product-image img')) {
    window.location.href = 'descriptionpage.html';
  }

  const clickbutton = e.target;
  const productcard = clickbutton.closest('.product-card');

  if (productcard) {
    const productdesc = productcard.querySelector('.desc')
      ? productcard.querySelector('.desc').textContent
      : 'No description available';
    const producttitle = productcard.querySelector('h4').textContent;
    const productid2 = productcard.getAttribute('data_id');
    const productimage = productcard.querySelector('.product-image img').src;
    const productprice =
      productcard.querySelector('.current-price').textContent;
    const imageinfo = {
      productid2,
      image: productimage,
      title: producttitle,
      price: productprice,
      description: productdesc,
    };
    console.log(imageinfo);

    let items = JSON.parse(localStorage.getItem('imagedata')) || [];

    items.push(imageinfo);

    // Save the updated array back to localStorage
    localStorage.setItem('imagedata', JSON.stringify(items));

    console.log('Data added:', imageinfo);
  }
});

const rightbtn = document.querySelector('.right-btn');
const leftbtn = document.querySelector('.left-btn');
const sliders = document.querySelectorAll('.review-card');
let curslide = 0;
const count = sliders.length;

// Set up each slider's initial position
sliders.forEach((s, i) => {
  s.style.transform = `translateX(${i * 10}%)`;
});

const gotoslide = function (slide) {
  sliders.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 15}%)`; // Move each review card to the left
  });
};
const nextslide = function () {
  if (curslide == count) {
    curslide = 0;
  } else {
    curslide++;
  }
  gotoslide(curslide);
};
const prevslide = function () {
  if (curslide === 0) {
    curslide == count - 1;
  } else curslide--;
  gotoslide(curslide);
};
rightbtn.addEventListener('click', nextslide);
leftbtn.addEventListener('click', prevslide);

// -----------------------------------------------
const cartnums = document.querySelector('.numsitems');
const numsofcart = JSON.parse(localStorage.getItem('cartitems')).length;
console.log((cartnums.textContent = numsofcart));
