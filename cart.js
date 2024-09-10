const cart_section = document.querySelector('.cart-items');
const order_summary = document.querySelector('.order-summary');
const remove1 = document.querySelector('.cart-item-remove img');

function allcart(key) {
  const items = JSON.parse(localStorage.getItem(key));
  if (items.length === 0) {
    return null;
  }
  console.log(items);
  return items;
}
let [getall_cart] = allcart('cartitems');
let stordeitems = JSON.parse(localStorage.getItem('cartitems')) || [];
let numberitems = stordeitems.length;
for (let i = 0; i < numberitems; i++) {
  let getall_cart = stordeitems[i];
  const markup = ` 
      <div class="cart-item" data_id=${getall_cart.id}>
         <img src="${getall_cart.image}" alt="Gradient Graphic T-shirt" />
         <div class="cart-item-details">
           <p class="title">${getall_cart.title}</p>
           <p>Size: Large</p>
           <p>Color: White</p>
         </div>
         <div class="cart-item-price">${getall_cart.price}</div>
         <div class="cart-item-quantity">
           <button class="decrease">-</button>
           <span id="number-span">1</span>
           <button class="increase">+</button>
         </div>
         <div class="cart-item-remove">
           <img src="pics/Frame.png" alt="Remove item" class="remove1" />
         </div>
      </div>
      
    `;
  cart_section.insertAdjacentHTML('beforeend', markup);
}

const spanElement = document.querySelector('#number-span');

const textContent = spanElement.textContent;

const numberValue = parseInt(textContent, 10);
console.log(numberValue);

function totolprice() {
  let Subtotal = 0;
  let total = 0;

  for (let i = 0; i < numberitems; i++) {
    let getall_cart = stordeitems[i];
    let result = /\d+/g;
    Subtotal += parseInt(getall_cart.price.match(result)) * numberValue;
  }
  let discout = Subtotal * (25 / 100);
  total = Subtotal + (-discout + 15);
  const markup2 = ` 
       <h2>Order Summary</h2>
        <p>Subtotal <span>${Subtotal}</span></p>
        <p>Discount (-25%) <span>-$${discout}</span></p>
        <p>Delivery Fee <span>$15</span></p>
        <p class="total">Total <span>$${total}</span></p>
        <div class="promo-code">
          <input type="text" placeholder="Add promo code" />
          <button>Apply</button>
        </div>
        <button class="checkout-button">
          Go to Checkout <i class="fas fa-arrow-right"></i>
        </button>
      
    `;
  order_summary.insertAdjacentHTML('beforeend', markup2);
}
totolprice();

document.querySelectorAll('.cart-item-remove img').forEach((removeBtn) => {
  removeBtn.addEventListener('click', function (e) {
    const cartItem = e.target.closest('.cart-item');
    if (cartItem) {
      let cartid = cartItem.getAttribute('data_id');
      cartItem.remove();
      updatedlocalstorage(cartid);
    }
  });
});

function updatedlocalstorage(cartid) {
  let storeditems = JSON.parse(localStorage.getItem('cartitems')) || [];

  storeditems = storeditems.filter((item) => item.id !== cartid);

  localStorage.setItem('cartitems', JSON.stringify(storeditems));

  console.log('Updated stored items:', storeditems);
}
document.querySelectorAll('.cart-item-quantity').forEach((count) => {
  count.addEventListener('click', function (e) {
    if (e.target.classList.contains('decrease')) {
      // e.preventDefault();
      let spanElement = e.target
        .closest('.cart-item-quantity')
        .querySelector('span');

      if (spanElement) {
        let currentValue = parseInt(spanElement.textContent, 10);
        if (currentValue > 1) {
          spanElement.textContent = currentValue - 1;
        } else if (currentValue >= 0) {
          // Remove the cart item if the quantity is zero
          const item = e.target.closest('.cart-item');
          let cartItemTitle = item.querySelector('.title').textContent;
          item.remove();

          let storeditems = JSON.parse(localStorage.getItem('cartitems')) || [];
          storeditems = storeditems.filter(
            (cartItem) => cartItem.title !== cartItemTitle
          );
          localStorage.setItem('cartitems', JSON.stringify(storeditems));
        }
      }
    } else if (e.target.classList.contains('increase')) {
      let spanElement = e.target
        .closest('.cart-item-quantity')
        .querySelector('span');

      if (spanElement) {
        let currentValue = parseInt(spanElement.textContent, 10);
        spanElement.textContent = currentValue + 1;
      }
    }
  });
});
