const newarrivalContainer = document.querySelector('.new-arrivals');
const viewallbutton1 = document.querySelector('.view-all-button');
const viewallbutton2 = document.querySelector('.view-all-button2');
const topsellingSection = document.querySelector('.top-selling .products-grid');
const addtocartbtn = document.querySelector('.add-to-cart');

const products = async function (id) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    const data = await res.json();

    let stars = '';
    for (let i = 0; i < Math.round(data.rating.rate); i++) {
      stars += '⭐';
    }
    const markup = `
      <div class="product-card" data_id=${data.id}>
        <div class="product-image">
          <a href="descriptionpage.html">
            <img src="${data.image}" height="150" width="200" alt="${data.title}" />
          </a>
        </div>
        <div class="product-info">
          <h4>${data.title}</h4>
          <div class="product-price">
            <span class="current-price">$${data.price}</span>
            <span class="original-price">$150</span>
          </div>
          <div class="product-rating">
            <span>${stars}</span>
            <span class="reviews">(${data.rating.count} Reviews)</span>
          </div>
          <button class="add-to-cart">Add to Cart</button>
        </div>
        <div class="desc">
           <a>${data.description}</a>
        </div>
      </div>
    `;
    if (newarrivalContainer) {
      newarrivalContainer.insertAdjacentHTML('beforeend', markup);
    } else {
      console.error('Container does not exist');
    }
  } catch (error) {
    console.error('The error is', error);
  }
};

const productIds = [1, 2, 3, 4];
productIds.forEach((id) => products(id));
// --------------------------------------------->

let isproductvisible = false;
let initialProducts = newarrivalContainer.innerHTML;
viewallbutton1.addEventListener('click', function () {
  if (isproductvisible) {
    newarrivalContainer.innerHTML = '';
    isproductvisible = false;
    viewallbutton1.textContent = 'view all';
  } else {
    const fetchAllProducts = async function () {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();

        newarrivalContainer.innerHTML = '';

        data.forEach((product) => {
          let stars2 = '';
          for (let i = 0; i < Math.round(product.rating.rate); i++) {
            stars2 += '⭐';
          }

          const markup = `
            <div class="product-card" data-id=${product.id}>
              <div class="product-image">
                <a href="descriptionpage.html">
                  <img src="${product.image}" alt="${product.title}" />
                </a>
              </div>
              <div class="product-info">
                <h4>${product.title}</h4>
                <div class="product-price">
                  <span class="current-price">$${product.price}</span>
                  <span class="original-price">$150</span>
                </div>
                <div class="product-rating">
                  <span>${stars2}</span>
                  <span class="reviews">(${product.rating.count} Reviews)</span>
                </div>
                <button class="add-to-cart">Add to Cart</button>
              </div>
              <div class="desc">
                <a>${product.description}</a>
              </div>
            </div>
          `;

          // Append the product card to the container
          if (newarrivalContainer) {
            newarrivalContainer.insertAdjacentHTML('beforeend', markup);
          } else {
            console.error('Container does not exist');
          }
        });
      } catch (error) {
        console.error('The error is', error);
      }
    };

    isproductvisible = true;
    viewallbutton1.textContent = 'hide all';

    fetchAllProducts();
  }
});

viewallbutton1.addEventListener('click', function () {
  if ((viewallbutton1.textContent = 'hide all')) {
    const productIds = [1, 2, 3, 4];
    productIds.forEach((id) => products(id));
    viewallbutton1.textContent = 'hide all';
  }
});
viewallbutton1.textContent = 'view all';

const topselling = async function () {
  try {
    const res = await fetch(`https://fakestoreapi.com/products`);
    const data = await res.json();
    let i = 0;
    let count = 0;
    data.forEach((product) => {
      if (product.rating.rate > 4.5 && count < 4) {
        let markup2 = `
          <div class="product-card" data_id=${product.id}>
            <div class="product-image">
              <a href="descriptionpage.html">
                <img src="${product.image}" height="200" width="200" alt="${
          product.title
        }" data_id=${i}/>
              </a>
            </div>
            <div class="product-info">
              <h4>${product.title}</h4>
              <div class="product-price">
                <span class="current-price">$${product.price}</span>
                <span>${product.rating.rate}</span>
                <span class="original-price">$250</span>
              </div>
              <div class="product-rating">
                <span>${'⭐'.repeat(Math.round(product.rating.rate))}</span>
                <span class="reviews">(${product.rating.count} Reviews)</span>
              </div>
              <button class="add-to-cart">Add to Cart</button>
            </div>
            <div class="desc">
              <a>${product.description}</a>
            </div>
          </div>
        `;
        if (topsellingSection) {
          topsellingSection.insertAdjacentHTML('beforeend', markup2);
          count++;
          i++;
        } else {
          console.error('Top Selling section does not exist');
        }
      }
    });
  } catch (error) {
    console.error('The error is', error);
  }
};

// Fetch and display top-selling products on page load
topselling();
let isproductvisible2 = false;

viewallbutton2.addEventListener('click', function () {
  if (isproductvisible) {
    topsellingSection.innerHTML = '';
    isproductvisible = false;
    viewallbutton2.textContent = 'view all';
  } else {
    const getallseling = async function () {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();

        // Clear previous products if needed
        topsellingSection.innerHTML = '';

        data.forEach((product) => {
          let stars = '';
          for (let i = 0; i < Math.round(product.rating.rate); i++) {
            stars += '⭐';
          }
          if (product.rating.rate > 4 && product.rating.count >= 400) {
            const markup3 = `
            <div class="product-card" data_id=${data.id}>
              <div class="product-image">
                <img src="${product.image}" height="200" width="200"   alt="${
              product.title
            }" />
              </div>
              <div class="product-info">
                <h4>${product.title}</h4>
                <div class="product-price">
                  <span class="current-price">$${product.price}</span>
                  <span> ${product.title}</span>
                  <span class="original-price">$150</span>
                </div>
                <div class="product-rating">
                  <span>${'⭐'.repeat(Math.ceil(product.rating.rate))}</span>
                  <span class="reviews">(${product.rating.count} Reviews)</span>
                </div>
                <button class="add-to-cart">Add to Cart</button>
              </div>
              <div class="desc">
                <a>${product.description}</a>
              </div>
            
            </div>
          `;

            if (topsellingSection) {
              topsellingSection.insertAdjacentHTML('afterbegin', markup3);
            } else {
              console.error('Container does not exist');
            }
          }
        });
        isproductvisible = true;
        viewallbutton2.textContent = 'hide all';
      } catch (error) {
        console.error('The error is', error);
      }
    };

    getallseling();
  }
});
viewallbutton2.addEventListener('click', function () {
  if ((viewallbutton1.textContent = 'hide all')) {
    topselling();

    viewallbutton1.textContent = 'hide all';
  }
});
viewallbutton1.textContent = 'view all';

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
