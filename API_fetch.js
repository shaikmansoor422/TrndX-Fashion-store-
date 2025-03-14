let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let sliding_products = document.getElementById("sliding_products");
let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];


// Fetch products from API (combied product data)
fetch("https://67a5d0e9c0ac39787a1f8c4d.mockapi.io/sliding_products/products_data")
    .then((response) => response.json())
    .then((data) => {

        for (let product of data) {
            let cards = document.createElement("div");
            cards.style.height = "360px";
            cards.style.width = "230px";
            cards.style.flex = "0 0 auto";
            cards.style.boxShadow = "0px 0px 10px 5px grey";
            cards.style.borderRadius = "20px";
            cards.style.position = "relative";

            let p_name = document.createElement("p");
            p_name.innerHTML = product.product_name;
            p_name.style.fontWeight = "bold";
            p_name.style.fontSize = "16px";
            p_name.style.padding = "5px 0px 0px 10px";

            let p_image = document.createElement("img");
            p_image.style.height = "170px";
            p_image.style.width = "110px";
            p_image.style.margin = "0px";
            p_image.style.marginLeft = "70px";
            p_image.src = product.image_url;

            let p_brand = document.createElement("p");
            p_brand.innerHTML = `Brand : ${product.brand}`;
            p_brand.style.padding = "0px 0px 0px 10px";

            let p_price = document.createElement("p");
            p_price.innerHTML = `₹${product.price}`
            p_price.style.textAlign = "center";
            p_price.style.margin = "0px";
            p_price.style.fontSize = "20px";
            p_price.style.fontWeight = "bold";
            p_price.style.padding = "0px";

            let p_size = document.createElement("p");
            p_size.innerHTML = `<i>Size</i>: ${product.size}`;
            p_size.style.textAlign = "center";
            p_size.style.fontSize = "13px";
            p_size.style.margin = "0px";

            // Wishlist button
            let wishlist = document.createElement("div");
            wishlist.innerHTML = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
<g id="SVGRepo_iconCarrier"> 
    <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" 
    fill="#d2d0d0"></path> 
</g>
</svg>`;

            wishlist.style.textAlign = "center";
            wishlist.style.width = "25px";
            wishlist.style.height = "25px";
            wishlist.style.cursor = "pointer";
            wishlist.style.display = "inline-block";
            wishlist.style.position = "absolute";
            wishlist.style.right = "7px";
            wishlist.style.bottom = "17px";

            document.body.appendChild(wishlist);

            wishlist.onclick = function () {
                let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
                let isActive = wishlist.getAttribute("data-active") === "true";

                if (!isActive) {

                    if (wishlistItems.length >= 4) {
                        alert("Your wishlist is full! Remove an item before adding another.");
                        return;
                    }
                    wishlist.innerHTML = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> 
            <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" 
            fill="#f10404"></path> 
        </g>
    </svg>`;
                    wishlist.setAttribute("data-active", "true");
                    wishlistItems.push(product);
                } else {
                    wishlist.innerHTML = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> 
            <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" 
            fill="#d2d0d0"></path> 
        </g>
    </svg>`;
                    wishlist.setAttribute("data-active", "false");
                    wishlistItems = wishlistItems.filter(item => item.id !== product.id);

                }

                localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
            };

            // Cart button
            let add_to_cart = document.createElement("div");

            let isInCart = false; // Assume the product is not in the cart
            for (let item of cartItems) {
                if (item.id === product.id) {
                    isInCart = true; // If the product is found in the cart, set it to true
                    break;
                }
            }

            // Set button text
            if (isInCart) {
                add_to_cart.innerHTML = "✅ Added";
                add_to_cart.style.backgroundColor = "green"; // Green means already added
                add_to_cart.style.color = "white"; // White text on green
            } else {
                add_to_cart.innerHTML = "🛒 Add to cart";
                add_to_cart.style.backgroundColor = "white"; // White means not yet added
                add_to_cart.style.color = "black"; // Black text on white
            }
            add_to_cart.style.boxShadow = "0px 0px 5px 1px grey";
            add_to_cart.style.textAlign = "center";
            add_to_cart.style.width = "100px";
            add_to_cart.style.padding = "8px";
            add_to_cart.style.cursor = "pointer";
            add_to_cart.style.display = "inline-block";
            add_to_cart.style.margin = "10px 10px";
            add_to_cart.style.fontSize = "12px";
            add_to_cart.style.borderRadius = "8px";

            add_to_cart.onclick = function () {
                let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
                if (add_to_cart.innerHTML.includes("🛒")) {
                    if (cartItems.length >= 4) {
                        alert("Your cart is full! Remove an item before adding another.");
                        return;
                    }
                    add_to_cart.innerHTML = "✅ Added";
                    add_to_cart.style.backgroundColor = "green";
                    add_to_cart.style.color = "white";
                    cartItems.push(product);
                } else {
                    add_to_cart.innerHTML = "🛒 Add to cart";
                    add_to_cart.style.backgroundColor = "white";
                    add_to_cart.style.color = "black";
                    cartItems = cartItems.filter(item => item.id !== product.id);
                }
                localStorage.setItem("cart", JSON.stringify(cartItems));
            };

            sliding_products.append(cards);
            cards.append(p_name, p_image, p_brand, p_price, p_size, add_to_cart, wishlist);
        }
    })
    .catch(() => {
        sliding_products.innerHTML = "API data isn't fetched";
    });

//  // mockAPI fetching.....
// sliding products data for  MEN PRODUCTS
sliding_products_men = document.getElementById("sliding_products_men")
fetch("https://67b1854d3fc4eef538e9fc4f.mockapi.io/men_products")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        for (let product of data) {
            let cards = document.createElement("div")
            cards.style.height = "360px"
            cards.style.width = "230px"
            cards.style.flex = "0 0 auto"
            cards.style.boxShadow = "0px 0px 10px 5px grey"
            cards.style.borderRadius = "20px"
            cards.style.position = "relative";



            let p_name = document.createElement("p")
            p_name.innerHTML = product.product_name
            p_name.style.fontWeight = "bold"
            p_name.style.fontSize = "16px"
            p_name.style.padding = "5px 0px 0px 10px"

            let p_image = document.createElement("img")
            p_image.style.height = "170px"
            p_image.style.width = "110px"
            p_image.style.margin = "0px"
            p_image.style.marginLeft = "70px"
            p_image.src = product.image_url

            let p_brand = document.createElement("p")
            p_brand.innerHTML = product.brand
            p_brand.style.padding = "0px 0px 0px 10px"
            p_brand.innerHTML = `Brand : ${product.brand}`


            let p_price = document.createElement("p")
            p_price.innerHTML = `₹${product.price}`
            p_price.style.textAlign = "center"
            p_price.style.margin = "0px"
            p_price.style.fontSize = "20px"
            p_price.style.fontWeight = "bold"
            p_price.style.padding = "0px"

            let p_size = document.createElement("p")
            p_size.innerHTML = `<i>Size</i>: ${product.size}`
            p_size.style.textAlign = "center"
            p_size.style.fontSize = "13px"
            p_size.style.margin = "0px"


            // Wishlist button
            let wishlist = document.createElement("div");
            wishlist.innerHTML = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
<g id="SVGRepo_iconCarrier"> 
    <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" 
    fill="#d2d0d0"></path> 
</g>
</svg>`;

            wishlist.style.textAlign = "center";
            wishlist.style.width = "25px";
            wishlist.style.height = "25px";
            wishlist.style.cursor = "pointer";
            wishlist.style.display = "inline-block";
            wishlist.style.position = "absolute";
            wishlist.style.right = "7px";
            wishlist.style.bottom = "17px";

            document.body.appendChild(wishlist);

            wishlist.onclick = function () {
                let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
                let isActive = wishlist.getAttribute("data-active") === "true";

                if (!isActive) {
                    if (wishlistItems.length >= 4) {
                        alert("Your wishlist is full! Remove an item before adding another.");
                        return;
                    }
                    wishlist.innerHTML = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> 
            <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" 
            fill="#f10404"></path> 
        </g>
    </svg>`;
                    wishlist.setAttribute("data-active", "true");
                    wishlistItems.push(product);
                } else {
                    wishlist.innerHTML = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> 
            <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" 
            fill="#d2d0d0"></path> 
        </g>
    </svg>`;
                    wishlist.setAttribute("data-active", "false");
                    wishlistItems = wishlistItems.filter(item => item.id !== product.id);
                }

                localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
            };

            // Cart button
            let add_to_cart = document.createElement("div");

            let isInCart = false; // Assume the product is not in the cart
            for (let item of cartItems) {
                if (item.id === product.id) {
                    isInCart = true; // If the product is found in the cart, set it to true
                    break;
                }
            }

            // Set button text
            if (isInCart) {
                add_to_cart.innerHTML = "✅ Added";
                add_to_cart.style.backgroundColor = "green"; // Green means already added
                add_to_cart.style.color = "white"; // White text on green
            } else {
                add_to_cart.innerHTML = "🛒 Add to cart";
                add_to_cart.style.backgroundColor = "white"; // White means not yet added
                add_to_cart.style.color = "black"; // Black text on white
            }
            add_to_cart.style.boxShadow = "0px 0px 5px 1px grey";
            add_to_cart.style.textAlign = "center";
            add_to_cart.style.width = "100px";
            add_to_cart.style.padding = "8px";
            add_to_cart.style.cursor = "pointer";
            add_to_cart.style.display = "inline-block";
            add_to_cart.style.margin = "10px 10px";
            add_to_cart.style.fontSize = "12px";
            add_to_cart.style.borderRadius = "8px";

            add_to_cart.onclick = function () {
                if (add_to_cart.innerHTML.includes("🛒")) {
                    if (cartItems.length >= 4) {
                        alert("Your cart is full! Remove an item before adding another.");
                        return;
                    }
                    add_to_cart.innerHTML = "✅ Added";
                    add_to_cart.style.backgroundColor = "green";
                    add_to_cart.style.color = "white";
                    cartItems.push(product);
                } else {
                    add_to_cart.innerHTML = "🛒 Add to cart";
                    add_to_cart.style.backgroundColor = "white";
                    add_to_cart.style.color = "black";
                    cartItems = cartItems.filter(item => item.id !== product.id);
                }
                localStorage.setItem("cart", JSON.stringify(cartItems));
            };


            sliding_products_men.append(cards);
            cards.append(p_name, p_image, p_brand, p_price, p_size, add_to_cart, wishlist);

        }

    })
    .catch(() => {
        sliding_products_men.innerHTML = "api data isnt fetched"

    })

// mockAPI fetching.....
// sliding products data for  WOMEN PRODUCTS
sliding_products_women = document.getElementById("sliding_products_women")
fetch("https://67b188773fc4eef538ea0385.mockapi.io/women_products")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        for (let product of data) {
            let cards = document.createElement("div")
            cards.style.height = "360px"
            cards.style.width = "230px"
            cards.style.flex = "0 0 auto"
            cards.style.boxShadow = "0px 0px 10px 5px grey"
            cards.style.borderRadius = "20px"
            cards.style.position = "relative";

            let p_name = document.createElement("p")
            p_name.innerHTML = product.product_name
            p_name.style.fontWeight = "bold"
            p_name.style.fontSize = "16px"
            p_name.style.padding = "5px 0px 0px 10px"

            let p_image = document.createElement("img")
            p_image.style.height = "170px"
            p_image.style.width = "110px"
            p_image.style.margin = "0px"
            p_image.style.marginLeft = "70px"
            p_image.src = product.image_url

            let p_brand = document.createElement("p")
            p_brand.innerHTML = product.brand
            p_brand.style.padding = "0px 0px 0px 10px"
            p_brand.innerHTML = `Brand : ${product.brand}`


            let p_price = document.createElement("p")
            p_price.innerHTML = `₹${product.price}`
            p_price.style.textAlign = "center"
            p_price.style.margin = "0px"
            p_price.style.fontSize = "20px"
            p_price.style.fontWeight = "bold"
            p_price.style.padding = "0px"

            let p_size = document.createElement("p")
            p_size.innerHTML = `<i>Size</i>: ${product.size}`
            p_size.style.textAlign = "center"
            p_size.style.fontSize = "13px"
            p_size.style.margin = "0px"


            // Wishlist button
            let wishlist = document.createElement("div");
            wishlist.innerHTML = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
<g id="SVGRepo_iconCarrier"> 
    <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" 
    fill="#d2d0d0"></path> 
</g>
</svg>`;

            wishlist.style.textAlign = "center";
            wishlist.style.width = "25px";
            wishlist.style.height = "25px";
            wishlist.style.cursor = "pointer";
            wishlist.style.display = "inline-block";
            wishlist.style.position = "absolute";
            wishlist.style.right = "7px";
            wishlist.style.bottom = "17px";

            document.body.appendChild(wishlist);

            wishlist.onclick = function () {
                let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
                let isActive = wishlist.getAttribute("data-active") === "true";

                if (!isActive) {

                    if (wishlistItems.length >= 4) {
                        alert("Your wishlist is full! Remove an item before adding another.");
                        return;
                    }
                    wishlist.innerHTML = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> 
            <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" 
            fill="#f10404"></path> 
        </g>
    </svg>`;
                    wishlist.setAttribute("data-active", "true");
                    wishlistItems.push(product);
                } else {
                    wishlist.innerHTML = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> 
            <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" 
            fill="#d2d0d0"></path> 
        </g>
    </svg>`;
                    wishlist.setAttribute("data-active", "false");
                    wishlistItems = wishlistItems.filter(item => item.id !== product.id);

                }

                localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
            };

            // Cart button
            let add_to_cart = document.createElement("div");

            let isInCart = false; 
            for (let item of cartItems) {
                if (item.id === product.id) {
                    isInCart = true; // If the product is found in the cart, set it to true
                    break;
                }
            }

            // Set button text
            if (isInCart) {
                add_to_cart.innerHTML = "✅ Added";
                add_to_cart.style.backgroundColor = "green"; // Green means already added
                add_to_cart.style.color = "white"; // White text on green
            } else {
                add_to_cart.innerHTML = "🛒 Add to cart";
                add_to_cart.style.backgroundColor = "white"; // White means not yet added
                add_to_cart.style.color = "black"; // Black text on white
            }
            add_to_cart.style.boxShadow = "0px 0px 5px 1px grey";
            add_to_cart.style.textAlign = "center";
            add_to_cart.style.width = "100px";
            add_to_cart.style.padding = "8px";
            add_to_cart.style.cursor = "pointer";
            add_to_cart.style.display = "inline-block";
            add_to_cart.style.margin = "10px 10px";
            add_to_cart.style.fontSize = "12px";
            add_to_cart.style.borderRadius = "8px";

            add_to_cart.onclick = function () {
                let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
                if (add_to_cart.innerHTML.includes("🛒")) {
                    if (cartItems.length >= 4) {
                        alert("Your cart is full! Remove an item before adding another.");
                        return;
                    }
                    add_to_cart.innerHTML = "✅ Added";
                    add_to_cart.style.backgroundColor = "green";
                    add_to_cart.style.color = "white";
                    cartItems.push(product);
                } else {
                    add_to_cart.innerHTML = "🛒 Add to cart";
                    add_to_cart.style.backgroundColor = "white";
                    add_to_cart.style.color = "black";
                    cartItems = cartItems.filter(item => item.id !== product.id);
                }
                localStorage.setItem("cart", JSON.stringify(cartItems));
            };

            sliding_products_women.append(cards);
            cards.append(p_name, p_image, p_brand, p_price, p_size, add_to_cart, wishlist);
        }
    })
    .catch(() => {
        sliding_products_women.innerHTML = "api data isnt fetched"

    })