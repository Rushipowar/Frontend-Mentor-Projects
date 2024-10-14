function openNav(){
    const sideBar = document.querySelector('.sidebar');
    const overlay = document.getElementById('overlay');
    const body = document.body; // Reference to the body element

    sideBar.style.display = "flex";
    overlay.classList.add('show');
    body.classList.add('no-scroll'); 

    
     
}
function closeNav(){
    const sideBar = document.querySelector('.sidebar');
    const overlay = document.getElementById('overlay');
    const body = document.body;

    sideBar.style.display = "none";
    overlay.classList.remove('show');
    body.classList.remove('no-scroll');
    
}


window.addEventListener('resize', function() {
    const sideBar = document.querySelector('.sidebar');
    const overlay = document.getElementById('overlay');
    const body = document.body;

    if (window.innerWidth > 700) {  // Adjust this value based on your breakpoint
        sideBar.style.display = "none";     // Hide sidebar
        overlay.classList.remove('show');   // Hide overlay
        body.classList.remove('no-scroll'); // Enable body scrolling
    }
});



document.addEventListener('DOMContentLoaded', function() {
    // Array of large image URLs
    const largeImages = [
        'images/image-product-1.jpg',
        'images/image-product-2.jpg',
        'images/image-product-3.jpg',
        'images/image-product-4.jpg'
    ];

    // Preload all images
    largeImages.forEach(imageUrl => {
        const img = new Image();
        img.src = imageUrl;
    });

    // Track the current image index
    let currentIndex = 0;

    // Select the main large image and the arrow buttons
    const largeImage = document.getElementById('mainImage');
    const prevArrow = document.getElementById('prevArrow');
    const nextArrow = document.getElementById('nextArrow');

    // Function to update the main image
    function updateMainImage() {
        largeImage.src = largeImages[currentIndex];
    }

    // Debounce function to limit rapid clicking
    let isThrottled = false;
    function debounce(func, delay) {
        return function() {
            if (isThrottled) return;  // Ignore the function call if throttled
            isThrottled = true;
            func();  // Execute the function
            setTimeout(() => isThrottled = false, delay);  // Reset throttle after delay
        }
    }

    // Add event listener to the next arrow with debounce
    nextArrow.addEventListener('click', debounce(function() {
        // Increment the index and loop back if at the end
        currentIndex = (currentIndex + 1) % largeImages.length;
        updateMainImage();
    }, 300));  // 300ms debounce delay

    // Add event listener to the previous arrow with debounce
    prevArrow.addEventListener('click', debounce(function() {
        // Decrement the index and loop back if at the beginning
        currentIndex = (currentIndex - 1 + largeImages.length) % largeImages.length;
        updateMainImage();
    }, 300));  // 300ms debounce delay
});








// For toggling the images
const thumbImg = document.querySelectorAll('.thumb-img');

// Select the main large image
const mainImage = document.getElementById('mainImage');

// Loop through thumbnails and add click event listener
thumbImg.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        // Update the large image source based on clicked thumbnail
        const largeImageSrc = this.getAttribute('data-large');
        mainImage.src = largeImageSrc;

        // Remove 'active' class from all thumbnails
        thumbImg.forEach(thumb => thumb.classList.remove('active'));

        // Add 'active' class to the clicked thumbnail
        this.classList.add('active');
    });
});



// Updates the cart
let quantity = 0;
let cartQuantity = 0;


function changeQuantity(value) {
    // Update quantity, ensuring it does not go below 0
    quantity = Math.max(0, quantity + value);
    document.getElementById('quantity').textContent = quantity;
}

function addToCart() {
    // Only update the cart quantity if the user has selected more than 0 items
    if (quantity > 0) {
        // Show the cart quantity badge and update the number
        cartQuantity += quantity;
        document.getElementById('cart-quantity').textContent = cartQuantity;
        document.getElementById('cart-quantity').style.display = 'inline'; // Show badge

        // Reset the quantity after adding to cart
        quantity = 0;
        document.getElementById('quantity').textContent = quantity;
    }
}



//Shows the cart basket
function showBasket(){
    const showBasket = document.getElementById('cart-basket');
    showBasket.style.display = 'block';
    if(cartQuantity === 0){
    showBasket.innerHTML = `
    <h2 class="basket-header">Cart</h2>
    <p class="empty-text animate__animated animate__headShake">Your cart is empty.</p>
    `
    }else{
         let totalPrice = cartQuantity * 125.00;
         showBasket.innerHTML = `
    <h2 class="basket-header">Cart</h2>
    <div class="basket-filled">
    <img src="./images/image-product-1-thumbnail.jpg" class="img-basket">
    <img src="./images/icon-delete.svg" class="icon-delete" onclick="deleteBasket()"> <p class="basket-para">Fall Limited Edition Sneakers</p>  
    <span class="basket-price">$125.00  &times; ${cartQuantity} <span class="total-price">$${totalPrice}.00</span></span>
    
    <button class="btn-checkout" onclick="checkBasket()">Checkout</button>
    </div>
    `
    }

    document.addEventListener('click', closeBasket, true);
    // document.addEventListener('click', deleteBasket, true);
}

function deleteBasket(){
    
    const showBasket = document.getElementById('cart-basket');
    showBasket.innerHTML = `
    <h2 class="basket-header">Cart</h2>
    <p class="empty-text animate__animated animate__headShake">Your cart is empty.</p>
    `
    cartQuantity = 0;
    document.getElementById('cart-quantity').style.display = 'none';
}

function checkBasket(){
    const showBasket = document.getElementById('cart-basket');
    showBasket.innerHTML = `
    <h2 class="basket-header">Cart</h2>
    <p class="checkout animate__animated animate__swing">Thank you for shopping with us.</p>
    `

    cartQuantity = 0;
    document.getElementById('cart-quantity').style.display = 'none';
    
}

//Closes the basket
function closeBasket(event) {
 const showBasket = document.getElementById('cart-basket');
 const button = document.querySelector('button');

 // If the clicked element is outside the component and the button
 if (!showBasket.contains(event.target) && event.target !== button) {
   showBasket.style.display = 'none';
   // Remove this event listener after the component is hidden
   document.removeEventListener('click', closeBasket, true);
 }
}