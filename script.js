// Add to Cart
const addToCartButtons = document.querySelectorAll('.add-to-cart');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const product = button.parentElement;
    const productId = product.dataset.id;
    const productName = product.dataset.name;
    const productPrice = parseFloat(product.dataset.price);
    
    // Check if product is already in cart
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();
  });
});

// Update Cart Count
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cart-count').textContent = cartCount;
}

// Load Cart Items on Cart Page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cart-items')) {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('total');
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      totalContainer.innerHTML = '';
      return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = cart.map(item => {
      total += item.price * item.quantity;
      return `
        <div class="cart-item">
          <p>${item.name} (x${item.quantity}) - $${item.price * item.quantity}</p>
        </div>
      `;
    }).join('');

    totalContainer.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
  }

  // Handle Checkout Button (Mocked for now)
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      alert('Proceeding to checkout...');
    });
  }
});
