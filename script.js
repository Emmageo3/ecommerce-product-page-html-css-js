$(document).ready(function () {
    $(".dropdown-toggle").click(function (e) {
        e.stopPropagation(); 
        $(".dropdown-menu").toggle();
    });

    $(document).click(function () {
        $(".dropdown-menu").hide();
    });
});

$(document).ready(function () {
    $(".header-toggle").click(function (e) {
        e.stopPropagation(); 
        $(".header-menu").toggle();
    });

    $(document).click(function () {
        $(".header-menu").hide();
    });
});

$(document).ready(function () {
    let images = $(".lightbox-thumbnail").map(function () {
        return $(this).attr("data-large");
    }).get();

    let currentIndex = 0;

    // Ouvrir la lightbox en cliquant sur #largeImage
    $("#largeImage").click(function () {
        let imgSrc = $(this).attr("src");
        currentIndex = images.indexOf(imgSrc);
        $("#lightboxImg").attr("src", imgSrc);
        $(".lightbox-thumbnail").removeClass("active");  // Retirer la classe active des miniatures
        $(".lightbox-thumbnail").eq(currentIndex).addClass("active");  // Ajouter la classe active à la miniature correspondante
        $("#lightbox").fadeIn();
    });

    // Ouvrir la lightbox en cliquant sur une miniature
    $(".thumbnail").click(function () {
        let newSrc = $(this).attr("data-large");
        currentIndex = images.indexOf(newSrc);
        $("#largeImage").attr("src", newSrc);
        $(".thumbnail").removeClass("active");  // Retirer la classe active des miniatures
        $(".thumbnail").eq(currentIndex).addClass("active");  // Ajouter la classe active à la miniature correspondante
    });

    // Changer l'image en cliquant sur une miniature dans la lightbox
    $(".lightbox-thumbnail").click(function () {
        let newSrc = $(this).attr("data-large");
        currentIndex = images.indexOf(newSrc);
        $("#lightboxImg").attr("src", newSrc);
        $(".lightbox-thumbnail").removeClass("active");  // Retirer la classe active de toutes les miniatures
        $(this).addClass("active");  // Ajouter la classe active à la miniature cliquée
    });

    // Bouton Précédent
    $(".main button:first-of-type").click(function () {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        $("#lightboxImg").attr("src", images[currentIndex]);
        $(".lightbox-thumbnail").removeClass("active");  // Retirer la classe active des miniatures
        $(".lightbox-thumbnail").eq(currentIndex).addClass("active");  // Ajouter la classe active à la miniature correspondante
    });

    // Bouton Suivant
    $(".main button:last-of-type").click(function () {
        currentIndex = (currentIndex + 1) % images.length;
        $("#lightboxImg").attr("src", images[currentIndex]);
        $(".lightbox-thumbnail").removeClass("active");  // Retirer la classe active des miniatures
        $(".lightbox-thumbnail").eq(currentIndex).addClass("active");  // Ajouter la classe active à la miniature correspondante
    });

    // Fermer la lightbox en cliquant sur le bouton close
    $(".close").click(function () {
        $("#lightbox").fadeOut();
    });

    // Fermer la lightbox avec la touche ESC
    $(document).keyup(function (e) {
        if (e.key === "Escape") {
            $("#lightbox").fadeOut();
        }
    });
});

$(document).ready(function() {
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
        $(".count").text(quantity).show();  // Afficher le compteur et mettre à jour la quantité
        $(".checkout").show(); // Afficher le bouton Checkout
  
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
      $(".count").hide(); // Cacher le compteur si le panier est vide
      $("#cart-product").empty();  // Vider le panier
      quantity = 0;
      updateQuantity();
  
      // If the cart is empty, show the empty cart message and hide Checkout
      if (quantity === 0) {
        $(".checkout").hide();  // Cacher le bouton Checkout
        $("#cart-product").html('<p class="empty">Your cart is empty.</p>'); // Afficher le message vide
      }
    });
  
    // Initial check to show the empty message if no product is in the cart
    if (quantity === 0) {
      $(".checkout").hide();
      $("#cart-product").html('<p class="empty">Your cart is empty.</p>');
    }
  });


  
  
  
