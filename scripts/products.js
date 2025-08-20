document.addEventListener('DOMContentLoaded', async () => {
  try {
    const category = document.body.getAttribute('data-category') || 'men';

    const products = await apiGet(`/products?category=${category}`);

    const container = document.getElementById('product-grid');
    if (!container) return;

    container.innerHTML = products.map(p => `
      <div class="product-card">
        <img src="${p.image || 'default-image.jpg'}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.description || ''}</p>
        <p class="price">₹${p.price}</p>
        <button class="btn btn-blue add-to-cart-btn" data-id="${p._id}">Add to Cart</button>
      </div>
    `).join('');

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        addToCart(productId);
      });
    });

  } catch (error) {
    console.error('Failed to load products:', error);
  }
});

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart');
}
