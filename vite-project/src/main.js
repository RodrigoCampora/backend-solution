window.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'http://localhost:8080/api/products';

  async function loadProducts() {
    const res = await fetch(apiUrl);
    const products = await res.json();
    const list = document.getElementById('products-list');
    list.innerHTML = '';
    products.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.title} - $${p.price} - Stock: ${p.stock}`;
      list.appendChild(li);
    });
  }

  document.getElementById('product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Formulario enviado'); // Para test

    const newProduct = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      code: document.getElementById('code').value,
      price: Number(document.getElementById('price').value),
      status: document.getElementById('status').checked,
      stock: Number(document.getElementById('stock').value),
      category: document.getElementById('category').value,
      thumbnails: document.getElementById('thumbnails').value
        ? document.getElementById('thumbnails').value.split(',').map(s => s.trim())
        : []
    };

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al agregar producto');
      }

      alert('Producto agregado');
      e.target.reset();
      loadProducts();
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error(error);
    }
  });

  loadProducts();
});
