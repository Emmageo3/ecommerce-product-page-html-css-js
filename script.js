$(document).ready(function () {
    // Toggle dropdown menu
    $(".dropdown-toggle").click(function (e) {
        e.stopPropagation(); 
        $(".dropdown-menu").toggle();
    });

    $(document).click(function () {
        $(".dropdown-menu").hide();
    });

    // Toggle header menu
    $(".header-toggle").click(function (e) {
        e.stopPropagation(); 
        $(".header-menu").toggle();
    });

    $(document).click(function () {
        $(".header-menu").hide();
    });

    // Lightbox functionality
    let images = $(".lightbox-thumbnail").map(function () {
        return $(this).attr("data-large");
    }).get();

    let currentIndex = 0;

    $("#largeImage").click(function () {
        let imgSrc = $(this).attr("src");
        currentIndex = images.indexOf(imgSrc);
        $("#lightboxImg").attr("src", imgSrc);
        $(".lightbox-thumbnail").removeClass("active");
        $(".lightbox-thumbnail").eq(currentIndex).addClass("active");
        $("#lightbox").fadeIn();
    });

    $(".thumbnail").click(function () {
        let newSrc = $(this).attr("data-large");
        currentIndex = images.indexOf(newSrc);
        $("#largeImage").attr("src", newSrc);
        $(".thumbnail").removeClass("active");
        $(".thumbnail").eq(currentIndex).addClass("active");
    });

    $(".lightbox-thumbnail").click(function () {
        let newSrc = $(this).attr("data-large");
        currentIndex = images.indexOf(newSrc);
        $("#lightboxImg").attr("src", newSrc);
        $(".lightbox-thumbnail").removeClass("active");
        $(this).addClass("active");
    });

    $(".main button:first-of-type").click(function () {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        $("#lightboxImg").attr("src", images[currentIndex]);
        $(".lightbox-thumbnail").removeClass("active");
        $(".lightbox-thumbnail").eq(currentIndex).addClass("active");
    });

    $(".main button:last-of-type").click(function () {
        currentIndex = (currentIndex + 1) % images.length;
        $("#lightboxImg").attr("src", images[currentIndex]);
        $(".lightbox-thumbnail").removeClass("active");
        $(".lightbox-thumbnail").eq(currentIndex).addClass("active");
    });

    $(".close").click(function () {
        $("#lightbox").fadeOut();
    });

    $(document).keyup(function (e) {
        if (e.key === "Escape") {
            $("#lightbox").fadeOut();
        }
    });

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
                    <img src="https://emmageo3.github.io/ecommerce-product-page-html-css-js/images/image-product-1-thumbnail.jpg" alt="">
                    <div class="details">
                        <p>Fall Limited Edition Sneakers</p>
                        <p>$125.00 x ${quantity}  &nbsp;&nbsp;<span>$${totalPrice}</span></p>
                    </div>
                    <a href="#" class="remove">
                        <img src="https://emmageo3.github.io/ecommerce-product-page-html-css-js/images/icon-delete.svg" alt="">
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

    $("#hamburger").click(function() {
        $("#overlay").fadeIn();
        $("#side-menu").css("left", "0");
    });

    $("#overlay").click(function() {
        $("#overlay").fadeOut();
        $("#side-menu").css("left", "-250px");
    });

    $(".close-menu").click(function() {
        console.log('ferme');
        $("#overlay").fadeOut();  // Masquer l'overlay
        $("#side-menu").css("left", "-250px");  // Faire glisser le menu à gauche pour le cacher
    });
});
