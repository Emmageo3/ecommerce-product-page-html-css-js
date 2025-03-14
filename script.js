// Toggle dropdown menu
    document.querySelector(".dropdown-toggle").addEventListener("click", function(e) {
        e.stopPropagation(); 
        var dropdownMenu = document.querySelector(".dropdown-menu");
        dropdownMenu.style.display = (dropdownMenu.style.display === "none" || dropdownMenu.style.display === "") ? "block" : "none";
    });

    // Close dropdown menu when clicking outside
    document.addEventListener("click", function() {
        var dropdownMenu = document.querySelector(".dropdown-menu");
        dropdownMenu.style.display = "none";
    });

    // Prevent closing the menu when clicking inside the dropdown
    document.querySelector(".dropdown-toggle").addEventListener("click", function(e) {
        e.stopPropagation();
    });
// end 



// Lightbox functionality
let images = [];
let thumbnails = document.querySelectorAll('.lightbox-thumbnail');

thumbnails.forEach(function (thumbnail) {
    images.push(thumbnail.getAttribute('data-large'));
});

let currentIndex = 0;

document.getElementById('largeImage').addEventListener('click', function () {
    let imgSrc = this.getAttribute('src');
    currentIndex = images.indexOf(imgSrc);
    document.getElementById('lightboxImg').setAttribute('src', imgSrc);
    document.querySelectorAll('.lightbox-thumbnail').forEach(function (el) {
        el.classList.remove('active');
    });
    document.querySelectorAll('.lightbox-thumbnail')[currentIndex].classList.add('active');
    document.getElementById('lightbox').style.display = 'block';
});

document.querySelectorAll('.thumbnail').forEach(function (thumbnail) {
    thumbnail.addEventListener('click', function () {
        let newSrc = this.getAttribute('data-large');
        currentIndex = images.indexOf(newSrc);
        document.getElementById('largeImage').setAttribute('src', newSrc);
        document.querySelectorAll('.thumbnail').forEach(function (el) {
            el.classList.remove('active');
        });
        document.querySelectorAll('.thumbnail')[currentIndex].classList.add('active');
    });
});

document.querySelectorAll('.lightbox-thumbnail').forEach(function (thumbnail) {
    thumbnail.addEventListener('click', function () {
        let newSrc = this.getAttribute('data-large');
        currentIndex = images.indexOf(newSrc);
        document.getElementById('lightboxImg').setAttribute('src', newSrc);
        document.querySelectorAll('.lightbox-thumbnail').forEach(function (el) {
            el.classList.remove('active');
        });
        this.classList.add('active');
    });
});

document.querySelector('.main button:first-of-type').addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    document.getElementById('lightboxImg').setAttribute('src', images[currentIndex]);
    document.querySelectorAll('.lightbox-thumbnail').forEach(function (el) {
        el.classList.remove('active');
    });
    document.querySelectorAll('.lightbox-thumbnail')[currentIndex].classList.add('active');
});

document.querySelector('.main button:last-of-type').addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % images.length;
    document.getElementById('lightboxImg').setAttribute('src', images[currentIndex]);
    document.querySelectorAll('.lightbox-thumbnail').forEach(function (el) {
        el.classList.remove('active');
    });
    document.querySelectorAll('.lightbox-thumbnail')[currentIndex].classList.add('active');
});

document.querySelector('.close').addEventListener('click', function () {
    document.getElementById('lightbox').style.display = 'none';
});

document.addEventListener('keyup', function (e) {
    if (e.key === 'Escape') {
        document.getElementById('lightbox').style.display = 'none';
    }
});



$(document).ready(function () {
    

    

    // Cart functionality
    let quantity = 0;
    let pricePerProduct = 125;
    let totalPrice = 0;

    // Update quantity on plus and minus clicks
    $(".increase").click(function() {
        quantity++;
        if (quantity > 10) quantity = 10; // Max limit
        updateQuantity();
    });

    $(".decrease").click(function() {
        quantity--;
        if (quantity < 0) quantity = 0; // Min limit
        updateQuantity();
    });

    // Function to update quantity in the product section
    function updateQuantity() {
        $("#quantity").text(quantity);
    }

    // Add to cart functionality
    $("#add-to-cart").click(function() {
        if (quantity > 0) {
            // Update the cart with the product and quantity
            totalPrice = pricePerProduct * quantity;
            $(".count").text(quantity).show();  // Show the count and update the quantity
            $(".checkout").show(); // Show the Checkout button

            let cartProductHtml = `
                <div class="product">
                    <img src="/images/image-product-1-thumbnail.jpg" alt="">
                    <div class="details">
                        <p>Fall Limited Edition Sneakers</p>
                        <p>$125.00 x ${quantity}  &nbsp;&nbsp;<span>$${totalPrice}</span></p>
                    </div>
                    <a href="#" class="remove">
                        <img src="/images/icon-delete.svg" alt="">
                    </a>
                </div>
            `;

            // Show product in the dropdown
            $("#cart-product").html(cartProductHtml);
        }
    });

    // Handle item removal from cart
    $(document).on("click", ".remove", function() {
        $(".count").hide(); // Hide the count if cart is empty
        $("#cart-product").empty();  // Empty the cart
        quantity = 0;
        updateQuantity();

        // If cart is empty, show the empty message and hide Checkout
        if (quantity === 0) {
            $(".checkout").hide();  // Hide the Checkout button
            $("#cart-product").html('<p class="empty">Your cart is empty.</p>'); // Show the empty cart message
        }
    });

    // Initial check to show the empty message if no product is in the cart
    if (quantity === 0) {
        $(".checkout").hide();
        $("#cart-product").html('<p class="empty">Your cart is empty.</p>');
    }
});
