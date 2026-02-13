// ============================================
// PRODUCT DATA - MUST BE DEFINED FIRST
// ============================================
const products = [
    {
        id: 1,
        name: "Cartoon Astronaut T-Shirts",
        brand: "adidas",
        price: 78,
        image: "img/products/f1.jpg",
        category: "tshirts"
    },
    {
        id: 2,
        name: "Floral Print T-Shirt",
        brand: "adidas",
        price: 87,
        image: "img/products/f2.jpg",
        category: "tshirts"
    },
    {
        id: 3,
        name: "Vintage Cartoon T-Shirt",
        brand: "adidas",
        price: 65,
        image: "img/products/f3.jpg",
        category: "tshirts"
    },
    {
        id: 4,
        name: "Floral Button Shirt",
        brand: "adidas",
        price: 92,
        image: "img/products/f4.jpg",
        category: "shirts"
    },
    {
        id: 5,
        name: "Hawaiian Shirt",
        brand: "adidas",
        price: 88,
        image: "img/products/f5.jpg",
        category: "shirts"
    },
    {
        id: 6,
        name: "Printed Casual Shirt",
        brand: "adidas",
        price: 95,
        image: "img/products/f6.jpg",
        category: "shirts"
    },
    {
        id: 7,
        name: "Women's Casual Pants",
        brand: "adidas",
        price: 75,
        image: "img/products/f7.jpg",
        category: "pants"
    },
    {
        id: 8,
        name: "Printed Cargo Pants",
        brand: "adidas",
        price: 82,
        image: "img/products/f8.jpg",
        category: "pants"
    },
    {
        id: 9,
        name: "Cartoon T-Shirt Blue",
        brand: "adidas",
        price: 78,
        image: "img/products/n1.jpg",
        category: "tshirts"
    },
    {
        id: 10,
        name: "Cartoon T-Shirt Gray",
        brand: "adidas",
        price: 78,
        image: "img/products/n2.jpg",
        category: "tshirts"
    },
    {
        id: 11,
        name: "Cartoon T-Shirt Beige",
        brand: "adidas",
        price: 78,
        image: "img/products/n3.jpg",
        category: "tshirts"
    },
    {
        id: 12,
        name: "Cartoon T-Shirt Navy",
        brand: "adidas",
        price: 78,
        image: "img/products/n4.jpg",
        category: "tshirts"
    },
    {
        id: 13,
        name: "Floral Shirt Green",
        brand: "adidas",
        price: 78,
        image: "img/products/n5.jpg",
        category: "shirts"
    },
    {
        id: 14,
        name: "Floral Shirt Black",
        brand: "adidas",
        price: 78,
        image: "img/products/n6.jpg",
        category: "shirts"
    },
    {
        id: 15,
        name: "Casual Pants Khaki",
        brand: "adidas",
        price: 78,
        image: "img/products/n7.jpg",
        category: "pants"
    },
    {
        id: 16,
        name: "Casual Pants Blue",
        brand: "adidas",
        price: 78,
        image: "img/products/n8.jpg",
        category: "pants"
    }
];

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', function() {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', function() {
        nav.classList.remove('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('#navbar li a');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 799) {
            nav.classList.remove('active');
        }
    });
});

// ============================================
// CART FUNCTIONALITY
// ============================================

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
    
    // Add animation to cart icon
    animateCartIcon();
}

// Update cart item quantity
function updateQuantity(id, newQuantity) {
    const item = cart.find(item => item.id === id);
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(id);
        } else {
            item.quantity = parseInt(newQuantity);
            saveCart();
            renderCart();
            updateCartCount();
        }
    }
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
    updateCartCount();
    showNotification('Item removed from cart');
}

// Clear entire cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveCart();
        renderCart();
        updateCartCount();
        showNotification('Cart cleared!');
    }
}

// Calculate cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get total items in cart
function getCartItemCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart count badge in navigation
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const itemCount = getCartItemCount();
    
    cartCountElements.forEach(element => {
        if (element) {
            element.textContent = itemCount;
            element.style.display = itemCount > 0 ? 'inline-block' : 'none';
        }
    });
}

// Animate cart icon when item added
function animateCartIcon() {
    const cartIcons = document.querySelectorAll('#lg-bag a, #mobile a');
    cartIcons.forEach(icon => {
        icon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
        }, 300);
    });
}

// ============================================
// RENDER CART PAGE
// ============================================
function renderCart() {
    const cartBody = document.getElementById('cart-body');
    const totalElement = document.getElementById('total');
    const subtotalTable = document.querySelector('#subtotal table');
    
    if (!cartBody) return;
    
    cartBody.innerHTML = '';
    
    if (cart.length === 0) {
        cartBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 50px;">
                    <h3>Your cart is empty</h3>
                    <p>Add some products to get started!</p>
                    <a href="shop.html"><button class="normal" style="margin-top: 20px;">Continue Shopping</button></a>
                </td>
            </tr>
        `;
        if (totalElement) totalElement.textContent = '';
        if (subtotalTable) {
            subtotalTable.innerHTML = `
                <tr>
                    <td>Cart Subtotal</td>
                    <td>$0</td>
                </tr>
                <tr>
                    <td>Shipping</td>
                    <td>Free</td>
                </tr>
                <tr>
                    <td><strong>Total</strong></td>
                    <td><strong>$0</strong></td>
                </tr>
            `;
        }
        return;
    }
    
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <button onclick="removeFromCart(${item.id})" class="remove-btn" style="background: none; border: none; cursor: pointer; font-size: 20px; color: #ff0000;">
                    <i class="fa-regular fa-circle-xmark"></i>
                </button>
            </td>
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" 
                       onchange="updateQuantity(${item.id}, this.value)">
            </td>
            <td>$${subtotal.toFixed(2)}</td>
        `;
        cartBody.appendChild(row);
    });
    
    const total = getCartTotal();
    if (totalElement) {
        totalElement.textContent = `Cart Total: $${total.toFixed(2)}`;
        totalElement.style.paddingTop = "20px"
        totalElement.style.fontSize = "32px"
    }
    
    if (subtotalTable) {
        subtotalTable.innerHTML = `
            <tr>
                <td>Cart Subtotal</td>
                <td>$${total.toFixed(2)}</td>
            </tr>
            <tr>
                <td>Shipping</td>
                <td>Free</td>
            </tr>
            <tr>
                <td><strong>Total</strong></td>
                <td><strong>$${total.toFixed(2)}</strong></td>
            </tr>
        `;
    }
}

// ============================================
// RENDER PRODUCTS ON SHOP PAGE
// ============================================
function renderProducts() {
    const productList = document.getElementById('product-list');
    
    if (!productList) return;
    
    productList.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'pro';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="des">
                <span>${product.brand}</span>
                <h5>${product.name}</h5>
                <div class="star">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
                <h4>$${product.price}</h4>
            </div>
            <a href="#" onclick="addToCart(${product.id}); return false;">
                <i class="fa-solid fa-cart-shopping cart"></i>
            </a>
        `;
        productList.appendChild(productCard);
    });
}

// ============================================
// PRODUCT DETAIL PAGE - IMAGE GALLERY
// ============================================
function initProductGallery() {
    const mainImg = document.getElementById('mainImg');
    const smallImgs = document.getElementsByClassName('small-img');
    
    if (!mainImg || !smallImgs.length) return;
    
    Array.from(smallImgs).forEach((img, index) => {
        img.addEventListener('click', function() {
            mainImg.src = this.src;
            
            // Add active class to clicked thumbnail
            Array.from(smallImgs).forEach(img => img.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });
}

// ============================================
// NOTIFICATIONS
// ============================================
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#088178' : '#ff0000'};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-size: 14px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    #lg-bag a, #mobile a {
        transition: transform 0.3s ease;
        position: relative;
    }
    
    #cart-count {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #ff0000;
        color: white;
        font-size: 11px;
        padding: 2px 6px;
        border-radius: 50%;
        font-weight: 700;
        min-width: 18px;
        text-align: center;
    }
    
    .small-img-col.active {
        border: 2px solid #088178;
        border-radius: 5px;
    }
`;
document.head.appendChild(style);

// ============================================
// CONTACT FORM VALIDATION
// ============================================
function validateContactForm(event) {
    if (event) event.preventDefault();
    
    const form = document.querySelector('#form-details form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input[type="text"], textarea');
    let isValid = true;
    let errorMessage = '';
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.border = '1px solid red';
            errorMessage = 'Please fill in all fields';
        } else {
            input.style.border = '1px solid #e1e1e1';
        }
    });
    
    // Email validation
    const emailInput = inputs[1]; // Second input is email
    if (emailInput && emailInput.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            isValid = false;
            emailInput.style.border = '1px solid red';
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    if (isValid) {
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        form.reset();
    } else {
        showNotification(errorMessage, 'error');
    }
}

// Attach form validation to contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#form-details form');
    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
    }
});

// ============================================
// NEWSLETTER SUBSCRIPTION
// ============================================
function handleNewsletterSubmit(event) {
    if (event) event.preventDefault();
    
    const emailInput = this.querySelector('input[type="text"]');
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    emailInput.value = '';
}

// Attach newsletter handlers
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('#newsletter .form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSubmit);
        const button = form.querySelector('button');
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                handleNewsletterSubmit.call(form, e);
            });
        }
    });
});

// ============================================
// CHECKOUT FUNCTIONALITY
// ============================================
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const total = getCartTotal();
    const itemCount = getCartItemCount();
    
    if (confirm(`Proceed to checkout?\n\nTotal Items: ${itemCount}\nTotal Amount: $${total.toFixed(2)}`)) {
        showNotification('Redirecting to checkout...', 'success');
        // Here you would typically redirect to a checkout page
        // For demo purposes, we'll just show a success message
        setTimeout(() => {
            showNotification('Order placed successfully!', 'success');
            cart = [];
            saveCart();
            renderCart();
            updateCartCount();
        }, 1500);
    }
}

// Attach checkout button
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.querySelector('#subtotal button');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', proceedToCheckout);
    }
});

// ============================================
// COUPON CODE FUNCTIONALITY
// ============================================
function applyCoupon() {
    const couponInput = document.querySelector('#coupon input');
    if (!couponInput) return;
    
    const couponCode = couponInput.value.trim().toUpperCase();
    
    if (!couponCode) {
        showNotification('Please enter a coupon code', 'error');
        return;
    }
    
    // Sample coupon codes
    const validCoupons = {
        'SAVE10': 10,
        'SAVE20': 20,
        'WELCOME': 15
    };
    
    if (validCoupons[couponCode]) {
        const discount = validCoupons[couponCode];
        showNotification(`Coupon applied! You saved ${discount}%`, 'success');
        couponInput.value = '';
        // Here you would apply the discount to the total
    } else {
        showNotification('Invalid coupon code', 'error');
    }
}

// Attach coupon button
document.addEventListener('DOMContentLoaded', function() {
    const couponBtn = document.querySelector('#coupon button');
    if (couponBtn) {
        couponBtn.addEventListener('click', applyCoupon);
    }
});

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#close') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    renderCart();
    renderProducts();
    initProductGallery();
    
    // Add to cart buttons on index page
    const addToCartButtons = document.querySelectorAll('.pro a');
    addToCartButtons.forEach((button, index) => {
        if (!button.getAttribute('onclick')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                // For index page, use the index + 1 as product ID
                addToCart(index + 1);
            });
        }
    });
    
    console.log('E-Commerce Website JavaScript Loaded Successfully!');
    console.log(`Cart contains ${getCartItemCount()} items`);
});

// ============================================
// SCROLL TO TOP BUTTON (BONUS FEATURE)
// ============================================
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #088178;
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    document.body.appendChild(scrollBtn);
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);
