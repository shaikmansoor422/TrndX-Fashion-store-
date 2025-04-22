function products_length() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    let wishlist_count = document.getElementById("fav_count")
    let cart_count = document.getElementById("cart_count")
    wishlist_count.innerHTML = wishlistItems.length
    cart_count.innerHTML = cartItems.length
}
products_length()