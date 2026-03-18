        const products = [
            {
                id: 1,
                title: "SoundWave Pro X1",
                price: 1999.99,
                oldPrice: 2499.99,
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                images: [
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                    "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                    "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                ],
                description: "Experience unparalleled sound quality with active noise cancellation, 30-hour battery life, and premium comfort.",
                badge: "Best Seller"
            },
            {
                id: 2,
                title: "SoundWave Sport",
                price: 1499.99,
                oldPrice: 1799.99,
                image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                images: [
                    "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                    "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                ],
                description: "Sweat-resistant wireless headphones designed for athletes. Perfect for workouts and outdoor activities.",
                badge: "New"
            },
            {
                id: 3,
                title: "SoundWave Studio",
                price: 2999.99,
                oldPrice: 3499.99,
                image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                images: [
                    "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                    "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                ],
                description: "Professional-grade headphones for music producers and audiophiles. Studio-quality sound reproduction.",
                badge: "Pro"
            }
        ];

        let cart = [];
        let currentProduct = null;
        let authMode = 'login';

        
        function initProducts() {
            const grid = document.getElementById('products-grid');
            grid.innerHTML = '';
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.onclick = () => openProductModal(product);
                productCard.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.title}">
                        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.title}</h3>
                        <div class="product-price">₹${product.price.toFixed(2)} ${product.oldPrice ? `<span class="product-old-price">₹${product.oldPrice.toFixed(2)}</span>` : ''}</div>
                        <div class="product-rating">
                            <div class="stars">★★★★★</div>
                            <span>(4.8)</span>
                        </div>
                    </div>
                    
                `;
                grid.appendChild(productCard);
            });
        }

        // Modal functions
        function openProductModal(product) {
            currentProduct = product;
            document.getElementById('main-image').src = product.images[0];
            document.getElementById('detail-title').textContent = product.title;
            document.getElementById('detail-price').textContent = `₹${product.price.toFixed(2)}`;
            document.getElementById('detail-description').textContent = product.description;
            document.getElementById('quantity').textContent = '1';
            
            const thumbnails = document.querySelectorAll('.thumbnail');
            thumbnails.forEach((thumb, index) => {
                thumb.src = product.images[index] || product.image;
                thumb.classList.toggle('active', index === 0);
            });
            
            document.getElementById('product-modal').style.display = 'block';
        }

        function openCartModal() {
            updateCartDisplay();
            document.getElementById('cart-modal').style.display = 'block';
        }

        function openAuthModal(mode) {
            authMode = mode;
            document.getElementById('auth-title').textContent = mode === 'login' ? 'Login' : 'Sign Up';
            document.getElementById('confirm-password-group').style.display = mode === 'signup' ? 'block' : 'none';
            document.getElementById('auth-modal').style.display = 'block';
        }

        function closeModal() {
            document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
        }

        function toggleMobileMenu() {
            document.querySelector('.nav-menu').classList.toggle('active');
        }

        function changeImage(thumb) {
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            document.getElementById('main-image').src = thumb.src;
        }

        function updateQuantity(change) {
            const quantityEl = document.getElementById('quantity');
            let quantity = parseInt(quantityEl.textContent) + change;
            if (quantity > 0) {
                quantityEl.textContent = quantity;
            }
        }

        function addToCart() {
            const quantity = parseInt(document.getElementById('quantity').textContent);
            const existingItem = cart.find(item => item.id === currentProduct.id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ ...currentProduct, quantity });
            }
            
            updateCartCount();
            closeModal();
            alert('Added to cart!');
        }

        function updateCartCount() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('cart-count').textContent = totalItems;
        }

        function updateCartDisplay() {
            const cartItems = document.getElementById('cart-items');
            const cartTotal = document.getElementById('cart-total');
            
            cartItems.innerHTML = '';
            let total = 0;
            
            cart.forEach(item => {
                total += item.price * item.quantity;
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                    <div class="cart-item-info">
                        <h4>${item.title}</h4>
                        <div class="cart-item-price">₹${item.price.toFixed(2)} x ${item.quantity}</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                `;
                cartItems.appendChild(itemEl);
            });
            
            cartTotal.textContent = `Total: ₹${total.toFixed(2)}`;
        }

        function removeFromCart(id) {
            cart = cart.filter(item => item.id !== id);
            updateCartCount();
            updateCartDisplay();
        }

        function proceedToCheckout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            closeModal();
            document.getElementById('checkout-page').style.display = 'block';
            document.querySelector('.hero').style.display = 'none';
            document.querySelector('#products').style.display = 'none';
        }

        function toggleAuthMode() {
            authMode = authMode === 'login' ? 'signup' : 'login';
            openAuthModal(authMode);
        }

        function goHome() {
            document.getElementById('success-page').style.display = 'none';
            document.querySelector('.hero').style.display = 'flex';
            document.querySelector('#products').style.display = 'block';
        }

        // Event listeners
        document.getElementById('checkout-form').addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulate payment processing
            setTimeout(() => {
                document.getElementById('checkout-page').style.display = 'none';
                document.getElementById('success-page').style.display = 'block';
                cart = [];
                updateCartCount();
            }, 2000);
        });

        document.getElementById('auth-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert(`${authMode === 'login' ? 'Logged in' : 'Signed up'} successfully!`);
            closeModal();
        });

        // Close modals when clicking outside
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                closeModal();
            }
        };

        // Initialize
        initProducts();