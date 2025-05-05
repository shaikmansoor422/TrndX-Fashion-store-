const apis = [
  'https://67a5d0e9c0ac39787a1f8c4d.mockapi.io/sliding_products/products_data',
  'https://67b1854d3fc4eef538e9fc4f.mockapi.io/men_products',
  'https://67b188773fc4eef538ea0385.mockapi.io/women_products',
  'https://67b1bd0e3fc4eef538ea8c01.mockapi.io/kids_products'
];

async function searchProducts() {
  const query = document.getElementById('search_input').value.toLowerCase();
  let allProducts = [];

  for (let url of apis) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      allProducts = allProducts.concat(data);
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
    }
  }

  const results = allProducts.filter(p =>
    (p.product_name && p.product_name.toLowerCase().includes(query)) ||
    (p.brand && p.brand.toLowerCase().includes(query))
  );

  const resultBox = document.getElementById('results');
  resultBox.innerHTML = '';

  if (results.length === 0) {
    alert('No products found!');
    return;
  }

  results.forEach(p => {
    resultBox.innerHTML += `
      <div style="margin: 10px 0;">
        <a href="product.html?id=${p.id}" style="text-decoration: none; color: inherit;">
          <img src="${p.image_url}" width="80" />
          <strong>${p.product_name.toLowerCase()}</strong> - ₹${p.price}
        </a>
      </div>`;
  });
}

// Trigger on button click
document.getElementById('searching_butt').addEventListener('click', searchProducts);

// Trigger on Enter key
document.getElementById('search_input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    searchProducts();
  }
});