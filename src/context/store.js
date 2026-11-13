// Centralized Reactive Application Store for CUP2EAT
// Handles Cart, Products, Orders, Auth, Inventory, Toasts and localStorage persistence.

import { INITIAL_PRODUCTS } from '../data/products.js';
import { BRAND_CONFIG } from '../data/config.js';

class Store {
  constructor() {
    this.listeners = new Set();

    // 1. Load Products (with local persistence so admin changes reflect everywhere)
    const savedProducts = localStorage.getItem('cup2eat_products');
    this.products = savedProducts ? JSON.parse(savedProducts) : [...INITIAL_PRODUCTS];

    // 2. Load Cart
    const savedCart = localStorage.getItem('cup2eat_cart');
    this.cart = savedCart ? JSON.parse(savedCart) : [];

    // 3. Applied Promo Code
    this.promoCode = null;
    this.discountAmount = 0;

    // 4. Cart Drawer & Search Modal UI States
    this.isCartOpen = false;
    this.isSearchOpen = false;
    this.activeQuickViewProduct = null;
    this.activeInvoiceOrder = null;

    // 5. Auth State (Demo)
    const savedUser = localStorage.getItem('cup2eat_user');
    this.currentUser = savedUser ? JSON.parse(savedUser) : null;

    const savedAdmin = sessionStorage.getItem('cup2eat_admin');
    this.isAdminLoggedIn = savedAdmin === 'true';

    // 6. Orders History (Demo initial orders + created orders)
    const savedOrders = localStorage.getItem('cup2eat_orders');
    this.orders = savedOrders ? JSON.parse(savedOrders) : this.getInitialSampleOrders();

    // 7. Toast Queue
    this.toasts = [];
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn(this));
  }

  // --- PRODUCTS & ADMIN CRUD ---
  getProducts() {
    return this.products;
  }

  getProductBySlug(slug) {
    return this.products.find(p => p.slug === slug || p.id === slug);
  }

  saveProducts() {
    localStorage.setItem('cup2eat_products', JSON.stringify(this.products));
    this.notify();
  }

  updateProductPrice(productId, newPrice) {
    const p = this.products.find(item => item.id === productId);
    if (p) {
      p.price = Number(newPrice);
      p.unitPrice = Number((p.price / p.quantity).toFixed(2));
      p.unitPriceDisplay = `₹${p.unitPrice} per cup`;
      this.saveProducts();
      this.showToast(`Updated price for ${p.name} to ₹${newPrice.toLocaleString()}`);
    }
  }

  updateProductStock(productId, newStock) {
    const p = this.products.find(item => item.id === productId);
    if (p) {
      p.stockCount = Math.max(0, Number(newStock));
      p.inStock = p.stockCount > 0;
      this.saveProducts();
      this.showToast(`Inventory updated: ${p.name} (${p.stockCount} boxes)`);
    }
  }

  saveProductDetails(productData) {
    const index = this.products.findIndex(p => p.id === productData.id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...productData };
      this.showToast(`Product "${productData.name}" updated successfully.`);
    } else {
      const newProduct = {
        id: `p_${Date.now()}`,
        slug: productData.slug || `cup-${Date.now()}`,
        rating: 5.0,
        reviewsCount: 1,
        inStock: true,
        isFeatured: false,
        ...productData
      };
      this.products.unshift(newProduct);
      this.showToast(`Added new product "${newProduct.name}".`);
    }
    this.saveProducts();
  }

  deleteProduct(productId) {
    const p = this.products.find(item => item.id === productId);
    if (p) {
      this.products = this.products.filter(item => item.id !== productId);
      this.saveProducts();
      this.showToast(`Removed product "${p.name}".`, 'info');
    }
  }

  resetProductsToDefault() {
    this.products = [...INITIAL_PRODUCTS];
    this.saveProducts();
    this.showToast("Product catalogue reset to official specifications.");
  }

  // --- CART OPERATIONS ---
  saveCart() {
    localStorage.setItem('cup2eat_cart', JSON.stringify(this.cart));
    this.notify();
  }

  addToCart(product, quantity = 1, flavour = null, variant = null) {
    const selectedFlavour = flavour || product.defaultFlavour || (product.flavours && product.flavours[0]) || "Standard";
    const selectedVariant = variant || product.defaultVariant || (product.variants && product.variants[0]) || "Standard";
    
    // Unique cart item identifier based on product + flavour + variant
    const cartItemId = `${product.id}_${selectedFlavour}_${selectedVariant}`;
    const existing = this.cart.find(item => item.cartItemId === cartItemId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({
        cartItemId,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        capacity: product.capacity,
        packLabel: product.packLabel,
        price: product.price,
        unitPrice: product.unitPrice,
        flavour: selectedFlavour,
        variant: selectedVariant,
        image: product.fallbackImage || product.primaryImage,
        quantity: quantity
      });
    }

    this.saveCart();
    this.showToast(`Added ${quantity} × ${product.name} to cart`);
    this.openCart();
  }

  removeFromCart(cartItemId) {
    const item = this.cart.find(i => i.cartItemId === cartItemId);
    this.cart = this.cart.filter(i => i.cartItemId !== cartItemId);
    this.saveCart();
    if (item) {
      this.showToast(`Removed ${item.name} from cart`, 'info');
    }
  }

  updateCartQuantity(cartItemId, delta) {
    const item = this.cart.find(i => i.cartItemId === cartItemId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeFromCart(cartItemId);
    } else {
      this.saveCart();
    }
  }

  clearCart() {
    this.cart = [];
    this.promoCode = null;
    this.discountAmount = 0;
    this.saveCart();
  }

  applyPromoCode(code) {
    const clean = code.trim().toUpperCase();
    const promo = BRAND_CONFIG.commerce.promoCodes.find(p => p.code === clean);
    
    if (!promo) {
      this.showToast("Invalid promo code. Try CUP2EAT10 or FIRSTSIP", "error");
      return false;
    }

    const subtotal = this.getCartSubtotal();
    if (promo.minSpend && subtotal < promo.minSpend) {
      this.showToast(`Code ${clean} requires a minimum order of ₹${promo.minSpend.toLocaleString()}`, "error");
      return false;
    }

    this.promoCode = clean;
    if (promo.discountPercent) {
      this.discountAmount = Math.round((subtotal * promo.discountPercent) / 100);
    } else if (promo.discountFixed) {
      this.discountAmount = promo.discountFixed;
    }

    this.showToast(`Promo code applied: ${clean}! Saved ₹${this.discountAmount.toLocaleString()}`);
    this.notify();
    return true;
  }

  removePromoCode() {
    this.promoCode = null;
    this.discountAmount = 0;
    this.notify();
    this.showToast("Promo code removed", "info");
  }

  getCartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getCartSubtotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getShippingFee() {
    const subtotal = this.getCartSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= BRAND_CONFIG.commerce.freeShippingThreshold ? 0 : BRAND_CONFIG.commerce.standardShippingFee;
  }

  getTaxAmount() {
    const taxable = Math.max(0, this.getCartSubtotal() - this.discountAmount);
    return Math.round(taxable * BRAND_CONFIG.commerce.taxRate);
  }

  getCartTotal() {
    const subtotal = this.getCartSubtotal();
    if (subtotal === 0) return 0;
    const shipping = this.getShippingFee();
    const tax = this.getTaxAmount();
    return Math.max(0, subtotal - this.discountAmount + shipping + tax);
  }

  // --- UI CONTROLS ---
  openCart() {
    this.isCartOpen = true;
    this.notify();
  }

  closeCart() {
    this.isCartOpen = false;
    this.notify();
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
    this.notify();
  }

  openSearch() {
    this.isSearchOpen = true;
    this.notify();
  }

  closeSearch() {
    this.isSearchOpen = false;
    this.notify();
  }

  setQuickViewProduct(product) {
    this.activeQuickViewProduct = product;
    this.notify();
  }

  setInvoiceOrder(order) {
    this.activeInvoiceOrder = order;
    this.notify();
  }

  // --- AUTHENTICATION (DEMO) ---
  loginCustomer(email, password) {
    if (email === BRAND_CONFIG.demoCustomer.email) {
      this.currentUser = {
        name: BRAND_CONFIG.demoCustomer.name,
        email: BRAND_CONFIG.demoCustomer.email,
        phone: BRAND_CONFIG.demoCustomer.phone,
        address: BRAND_CONFIG.demoCustomer.address,
        isDemo: true
      };
      localStorage.setItem('cup2eat_user', JSON.stringify(this.currentUser));
      this.showToast(`Welcome back, ${this.currentUser.name}!`);
      this.notify();
      return true;
    }

    // Generic registration/login for testing
    this.currentUser = {
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: email,
      phone: "+91 98000 12345",
      address: {
        street: "10, MG Road",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560001"
      },
      isDemo: true
    };
    localStorage.setItem('cup2eat_user', JSON.stringify(this.currentUser));
    this.showToast(`Logged in as ${this.currentUser.name}`);
    this.notify();
    return true;
  }

  registerCustomer(userData) {
    this.currentUser = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone || "+91 98000 12345",
      address: userData.address || {
        street: "42 Indiranagar 100ft Rd",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560038"
      },
      isDemo: true
    };
    localStorage.setItem('cup2eat_user', JSON.stringify(this.currentUser));
    this.showToast(`Welcome to CUP2EAT, ${this.currentUser.name}!`);
    this.notify();
    return true;
  }

  logoutCustomer() {
    this.currentUser = null;
    localStorage.removeItem('cup2eat_user');
    this.showToast("You have been signed out.");
    this.notify();
  }

  // --- ADMIN AUTH (DEMO) ---
  loginAdmin(email, password) {
    if (email.trim() === BRAND_CONFIG.adminAuth.email && password === BRAND_CONFIG.adminAuth.password) {
      this.isAdminLoggedIn = true;
      sessionStorage.setItem('cup2eat_admin', 'true');
      this.showToast("Admin credentials verified. Welcome to Executive Suite.");
      this.notify();
      return true;
    }
    this.showToast("Invalid admin credentials. Use admin@cup2eat.demo / Cup2Eat@123", "error");
    return false;
  }

  logoutAdmin() {
    this.isAdminLoggedIn = false;
    sessionStorage.removeItem('cup2eat_admin');
    this.showToast("Admin session ended.");
    this.notify();
  }

  // --- ORDERS & CHECKOUT SIMULATION ---
  createOrder(orderPayload) {
    const orderId = `C2E-${Date.now().toString().slice(-6)}`;
    const newOrder = {
      orderId,
      date: new Date().toISOString(),
      displayDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      customer: {
        name: orderPayload.fullName,
        email: orderPayload.email,
        phone: orderPayload.phone,
        address: `${orderPayload.address}, ${orderPayload.city}, ${orderPayload.state} - ${orderPayload.pincode}`
      },
      items: [...this.cart],
      subtotal: this.getCartSubtotal(),
      discount: this.discountAmount,
      promoCode: this.promoCode,
      shippingFee: this.getShippingFee(),
      tax: this.getTaxAmount(),
      total: this.getCartTotal(),
      paymentMethod: orderPayload.paymentMethod || "UPI (Simulated)",
      paymentStatus: "Paid (Demo Verification)",
      status: "Order Placed", // Order Placed -> Confirmed -> Processing -> Shipped -> Delivered
      trackingSteps: [
        { title: "Order Placed", date: "Just now", completed: true, current: true, desc: "Your order has been recorded." },
        { title: "Confirmed", date: "Pending", completed: false, current: false, desc: "Order details reviewed and confirmed." },
        { title: "Processing", date: "Pending", completed: false, current: false, desc: "Bakery packing and quality seal check." },
        { title: "Shipped", date: "Pending", completed: false, current: false, desc: "Dispatched with climate-controlled courier." },
        { title: "Delivered", date: "Estimated 2-4 business days", completed: false, current: false, desc: "Safely delivered to your address." }
      ]
    };

    // Deduct stock
    newOrder.items.forEach(cartItem => {
      const p = this.products.find(prod => prod.id === cartItem.productId);
      if (p) {
        p.stockCount = Math.max(0, p.stockCount - cartItem.quantity);
        p.inStock = p.stockCount > 0;
      }
    });
    this.saveProducts();

    // Add to orders
    this.orders.unshift(newOrder);
    localStorage.setItem('cup2eat_orders', JSON.stringify(this.orders));

    // Clear cart
    this.clearCart();
    this.showToast(`Order #${orderId} confirmed successfully!`);
    this.notify();
    return newOrder;
  }

  updateOrderStatus(orderId, nextStatus) {
    const order = this.orders.find(o => o.orderId === orderId);
    if (!order) return;

    const statuses = ["Order Placed", "Confirmed", "Processing", "Shipped", "Delivered"];
    const targetIndex = statuses.indexOf(nextStatus);
    if (targetIndex === -1) return;

    order.status = nextStatus;
    order.trackingSteps = order.trackingSteps.map((step, idx) => ({
      ...step,
      completed: idx <= targetIndex,
      current: idx === targetIndex,
      date: idx <= targetIndex ? (step.date === 'Pending' ? 'Updated' : step.date) : 'Pending'
    }));

    localStorage.setItem('cup2eat_orders', JSON.stringify(this.orders));
    this.showToast(`Order #${orderId} status set to: ${nextStatus}`);
    this.notify();
  }

  getOrder(orderId) {
    return this.orders.find(o => o.orderId === orderId);
  }

  getInitialSampleOrders() {
    return [
      {
        orderId: "C2E-892104",
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        displayDate: "2 days ago",
        customer: {
          name: "Aarav Sharma",
          email: "aarav@cup2eat.demo",
          phone: "+91 98765 00000",
          address: "42, Brigade Road, Ashok Nagar, Bengaluru, Karnataka - 560025"
        },
        items: [
          {
            name: "Regular Edible Cup",
            capacity: "100 ML",
            packLabel: "396 cups / box",
            quantity: 1,
            price: 3960,
            flavour: "Elaichi",
            variant: "Standard Pack",
            image: "/public/images/client/product_100ml_regular.jpg"
          },
          {
            name: "Chocolate Rim Edible Cup",
            capacity: "100 ML",
            packLabel: "396 cups / box",
            quantity: 1,
            price: 5500,
            flavour: "Chocolate Rim",
            variant: "Rim Coating",
            image: "/public/images/client/product_100ml_chocolate_rim.jpg"
          }
        ],
        subtotal: 9460,
        discount: 946,
        promoCode: "CUP2EAT10",
        shippingFee: 0,
        tax: 425,
        total: 8939,
        paymentMethod: "UPI (Google Pay)",
        paymentStatus: "Paid (Simulated)",
        status: "Shipped",
        trackingSteps: [
          { title: "Order Placed", date: "2 days ago", completed: true, current: false, desc: "Order recorded & verified." },
          { title: "Confirmed", date: "2 days ago", completed: true, current: false, desc: "Payment confirmed." },
          { title: "Processing", date: "Yesterday", completed: true, current: false, desc: "Baked & quality inspected." },
          { title: "Shipped", date: "Today, 10:30 AM", completed: true, current: true, desc: "In transit with BlueDart Express." },
          { title: "Delivered", date: "Expected Tomorrow", completed: false, current: false, desc: "Out for delivery." }
        ]
      },
      {
        orderId: "C2E-841029",
        date: new Date(Date.now() - 86400000 * 6).toISOString(),
        displayDate: "6 days ago",
        customer: {
          name: "The Roastery Café (B2B Sample)",
          email: "manager@roasterycafe.in",
          phone: "+91 98450 99881",
          address: "Plot 12, Koramangala 4th Block, Bengaluru - 560034"
        },
        items: [
          {
            name: "Regular Edible Cup (432 Pack)",
            capacity: "150 ML",
            packLabel: "432 cups / master carton",
            quantity: 2,
            price: 6500,
            flavour: "Original Biscuit",
            variant: "Classy",
            image: "/public/images/client/product_150ml_cold_pair.jpg"
          }
        ],
        subtotal: 13000,
        discount: 0,
        promoCode: null,
        shippingFee: 0,
        tax: 650,
        total: 13650,
        paymentMethod: "Corporate NetBanking",
        paymentStatus: "Paid (Simulated)",
        status: "Delivered",
        trackingSteps: [
          { title: "Order Placed", date: "6 days ago", completed: true, current: false, desc: "Bulk order submitted." },
          { title: "Confirmed", date: "6 days ago", completed: true, current: false, desc: "Invoice generated & cleared." },
          { title: "Processing", date: "5 days ago", completed: true, current: false, desc: "Packaging & tamper sealing." },
          { title: "Shipped", date: "4 days ago", completed: true, current: false, desc: "Dispatched on logistics truck." },
          { title: "Delivered", date: "3 days ago", completed: true, current: true, desc: "Signed by cafe manager." }
        ]
      }
    ];
  }

  // --- TOAST NOTIFICATIONS ---
  showToast(message, type = "success") {
    const id = Date.now() + Math.random();
    this.toasts.push({ id, message, type });
    this.notify();

    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
      this.notify();
    }, 3500);
  }

  dismissToast(id) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.notify();
  }
}

export const store = new Store();

