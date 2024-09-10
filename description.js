const description = document.querySelector('.product-page');
const also_like_section = document.querySelector('.container');
const produc23 = document.querySelector('.products');

function getLastStoredItem(key) {
  const items = JSON.parse(localStorage.getItem(key)) || [];

  if (items.length === 0) {
    return null;
  }

  return items[items.length - 1];
}

const getimagedesc = getLastStoredItem('imagedata');

const markup = `
    <div class="product-page" data_id=${getimagedesc.id}>
      <div class="container2">
        <div class="sidebar2">
          <img
            alt="T-shirt front view"
            height="100"
            src="${getimagedesc.image}"
            width="100"
          />
          <img
            alt="T-shirt back view"
            height="100"
            src="${getimagedesc.image}"
            width="100"
          />
          <img
            alt="T-shirt side view"
            height="100"
            src="${getimagedesc.image}"
            width="100"
          />
        </div>
        <div class="main-image">
          <img
            alt="Main T-shirt image"
            height="300"
            src="${getimagedesc.image}"
            width="300"
          />
        </div>
      </div>
      <div class="product-details">
        <h1>${getimagedesc.title}</h1>
        <div class="rating">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star-half-alt"></i>
          <span>4.5/5</span>
        </div>
        <div class="price">
          <span class="current-price">${getimagedesc.price}</span>
          <span class="original-price">$300</span>
          <span class="discount">-40%</span>
        </div>
        <div class="description">
         ${getimagedesc.description || 'no dres avalibe'}
        </div>
        <div class="color-options">
          <div class="color" style="background-color: #4a4a4a"></div>
          <div class="color" style="background-color: #2a2a2a"></div>
          <div class="color" style="background-color: #1a1a1a"></div>
        </div>
        <div class="size-options">
          <div class="size">Small</div>
          <div class="size">Medium</div>
          <div class="size ">Large</div>
          <div class="size">X-Large</div>
        </div>
        <div class="quantity">
          <button class="decrease">-</button>
          <input type="text" value="1" />
          <button class="increase">+</button>
        </div>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    </div>
`;

description.insertAdjacentHTML('afterend', markup);

const getsize = document.querySelector('.size-options');
getsize.addEventListener('click', function (e) {
  if (e.target.classList.contains('size')) {
    const restelemnts = document.querySelectorAll('.size');
    restelemnts.forEach((ele) => {
      ele.style.backgroundColor = '';
      ele.style.color = '';
    });
    e.target.style.backgroundColor = 'black';
    e.target.style.color = 'white';
  }
});

const count = document.querySelector('.quantity');
count.addEventListener('click', function (e) {
  if (e.target.classList.contains('decrease')) {
    let inputElement = e.target.closest('.quantity').querySelector('input');
    if (inputElement) {
      let currentValue = parseInt(inputElement.value, 10);
      if (currentValue > 0) {
        // Optional: Prevents the value from going below 0
        inputElement.value = currentValue - 1;
      }
    }
  } else if (e.target.classList.contains('increase')) {
    let inputElement = e.target.closest('.quantity').querySelector('input');
    if (inputElement) {
      let currentValue = parseInt(inputElement.value, 10);
      inputElement.value = currentValue + 1;
    }
  }
});

window.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-cart')) {
    const clickbutton = e.target;
    const productcard = clickbutton.closest('.product-page');
    if (productcard) {
      const producttitle = productcard.querySelector('h1').textContent;
      const productid2 = productcard.getAttribute('data_id');
      const productimage = productcard.querySelector('.sidebar2 img').src;
      const productprice =
        productcard.querySelector('.current-price').textContent;
      const productinfo = {
        title: producttitle,
        image: productimage,
        price: productprice,
        id: productid2,
      };
      console.log(productinfo);
      let items = JSON.parse(this.localStorage.getItem('cartitems')) || [];
      items.push(productinfo);
      localStorage.setItem('cartitems', JSON.stringify(items));
      this.window.location.reload();
    }
  }
});
const selectsection = document.querySelector('.tabs');
selectsection.addEventListener('click', function (e) {
  if (e.target.classList.contains('tab')) {
    const restelemnts = document.querySelectorAll('.tab');
    restelemnts.forEach((ele) => {
      ele.style.backgroundColor = '';
      ele.style.color = '';
    });
    e.target.style.backgroundColor = 'black';
    e.target.style.color = 'white';
  }
});
const mightalsosec = document.querySelector('.products');
const products = async function (id) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);

    const data = await res.json();

    let stars = '';
    for (let i = 0; i < Math.round(data.rating.rate); i++) {
      stars += '⭐';
    }

    const markup = `
          <div class="product2" data_id=${data.id}>
            <a>
            <img
              class="alsoimg"
              alt="Polo with Contrast Trims"
              height="200"
              src="${data.image}"
              width="200"
            />
            </a>
            <div class="product-title">${data.title}</div>
            <div class="product-rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star-half-alt"></i>${data.rating.rate}</div>
            <div class="product-price">
            <a class="curr-price">${data.price}</a>
              <span class="product-old-price">$279</span>
              <span class="product-discount">30% OFF</span>
            </div>
            <button class="add-to-cart2">Add to Cart</button>
            <div class="desc" style="display: none;">${data.description}</div>
          </div>
    `;
    if (mightalsosec) {
      mightalsosec.insertAdjacentHTML('beforeend', markup);
    } else {
      console.error('Container does not exist');
    }
  } catch (error) {
    console.error('The error is', error);
  }
};

const productIds = [1, 2, 3, 4];
productIds.forEach((id) => products(id));

window.addEventListener('click', function (e) {
  if (e.target.closest('.product2 img')) {
    console.log('Image clicked');

    const clickbutton = e.target;
    const productcard = clickbutton.closest('.product2');

    if (productcard) {
      const productdesc = productcard.querySelector('.desc')
        ? productcard.querySelector('.desc').textContent.trim()
        : 'No description available';
      const producttitle = productcard
        .querySelector('.product-title')
        .textContent.trim();
      const productimage = productcard.querySelector('img').src;
      const productprice = productcard
        .querySelector('.curr-price')
        .textContent.trim();

      // Create an object to store in localStorage
      const imageinfo = {
        image: productimage,
        title: producttitle,
        price: productprice,
        description: productdesc,
      };
      console.log(imageinfo);

      let productsArray = JSON.parse(localStorage.getItem('imagedata'));

      // Push the new product object into the array
      productsArray.push(imageinfo);
      localStorage.setItem('imagedata', JSON.stringify(productsArray));

      console.log('Product added:', productsArray);
    }
  }
});
function getFirstStoredItem(key) {
  const items2 = JSON.parse(localStorage.getItem(key)) || [];

  if (items2.length === 0) {
    return null;
  }

  return items2[items2.length - 1];
}
window.addEventListener('click', function (e) {
  if (e.target.closest('img')) {
    console.log('Image clicked');

    const datafor_decription = getFirstStoredItem('imagedata');
    console.log('Last stored item:', datafor_decription);
    window.location.reload();
  }
});

const datafor_decription = getFirstStoredItem('imagedata');
console.log('Last stored item:', datafor_decription);

const cartnums = document.querySelector('.numsitems');
const numsofcart = JSON.parse(localStorage.getItem('cartitems')).length;
console.log((cartnums.textContent = numsofcart));

window.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-cart2')) {
    const clickbutton = e.target;
    const productcard = clickbutton.closest('.product2');
    if (productcard) {
      const producttitle =
        productcard.querySelector('.product-title').textContent;
      const productimage = productcard.querySelector('img').src;
      const productid = productcard.getAttribute('data_id');
      const productprice = productcard.querySelector('.curr-price').textContent;
      const productinfo = {
        title: producttitle,
        image: productimage,
        price: productprice,
        id: productid,
      };
      console.log(productinfo);
      let items = JSON.parse(this.localStorage.getItem('cartitems')) || [];
      items.push(productinfo);
      localStorage.setItem('cartitems', JSON.stringify(items));
      this.window.location.reload();
    }
  }
});
const select_section = document.getElementById('review1');
const btn_view_review = document.querySelector('.btnnreview');

btn_view_review.addEventListener('click', function () {
  if (select_section.style.display === 'none') {
    select_section.style.display = 'block';
    btn_view_review.textContent = 'hide review';
  } else {
    select_section.style.display = 'none';
    btn_view_review.textContent = 'view more comments ';
  }
});
