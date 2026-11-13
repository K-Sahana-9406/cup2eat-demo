// CUP2EAT — Main Application Orchestrator
import { store } from './context/store.js';
import { renderSidebar } from './components/navigation/Sidebar.js';
import { renderMobileNav } from './components/navigation/MobileNav.js';
import { renderUtilityBar } from './components/navigation/UtilityBar.js';
import { renderCartDrawer } from './components/cart/CartDrawer.js';
import { renderSearchModal } from './components/ui/SearchModal.js';
import { renderQuickViewModal } from './components/ui/QuickViewModal.js';
import { renderInvoiceModal } from './components/ui/InvoiceModal.js';
import { getRouteInfo, renderCurrentRoute, routeTo } from './router.js';
import { BRAND_CONFIG } from './data/config.js';

class App {
  constructor() {
    this.selectedFlavour = null;
    this.selectedVariant = null;
    this.detailQty = 1;
  }

  init() {
    this.renderShell();
    this.attachEvents();
    renderCurrentRoute();

    // Re-render when route changes
    window.addEventListener('hashchange', () => {
      this.updateNavigationActiveStates();
      renderCurrentRoute();
    });

    // Re-render reactive UI components when store changes
    store.subscribe(() => {
      this.updateReactiveUI();
    });
  }

  renderShell() {
    const root = document.getElementById('app');
    const { path } = getRouteInfo();

    root.innerHTML = `
      <div class="min-h-screen relative paper-grain flex flex-col">
        <!-- Signature Floating Vertical Sidebar (Desktop) -->
        <div id="sidebarContainer">
          ${renderSidebar(path)}
        </div>

        <!-- Floating Utilities (Top Right) -->
        <div id="utilityContainer">
          ${renderUtilityBar()}
        </div>

        <!-- Main Page View Container with Desktop Left Offset -->
        <main class="page-container flex-1" id="appContent" role="main">
          <!-- Dynamic Route Content Mounts Here -->
        </main>

        <!-- Mobile Floating Bottom Nav -->
        <div id="mobileNavContainer">
          ${renderMobileNav(path)}
        </div>

        <!-- Modals & Drawers Mount Point -->
        <div id="cartDrawerMount">${renderCartDrawer()}</div>
        <div id="searchModalMount">${renderSearchModal()}</div>
        <div id="quickViewMount">${renderQuickViewModal()}</div>
        <div id="invoiceMount">${renderInvoiceModal()}</div>

        <!-- Toast Notifications Overlay -->
        <div class="toast-container" id="toastContainer"></div>
      </div>
    `;
  }

  updateNavigationActiveStates() {
    const { path } = getRouteInfo();
    const sidebar = document.getElementById('sidebarContainer');
    const mobileNav = document.getElementById('mobileNavContainer');

    if (sidebar) sidebar.innerHTML = renderSidebar(path);
    if (mobileNav) mobileNav.innerHTML = renderMobileNav(path);
  }

  updateReactiveUI() {
    const { path } = getRouteInfo();
    const sidebar = document.getElementById('sidebarContainer');
    const utility = document.getElementById('utilityContainer');
    const mobileNav = document.getElementById('mobileNavContainer');
    const cartMount = document.getElementById('cartDrawerMount');
    const searchMount = document.getElementById('searchModalMount');
    const quickViewMount = document.getElementById('quickViewMount');
    const invoiceMount = document.getElementById('invoiceMount');

    if (sidebar) sidebar.innerHTML = renderSidebar(path);
    if (utility) utility.innerHTML = renderUtilityBar();
    if (mobileNav) mobileNav.innerHTML = renderMobileNav(path);
    if (cartMount) cartMount.innerHTML = renderCartDrawer();
    if (searchMount) searchMount.innerHTML = renderSearchModal();
    if (quickViewMount) quickViewMount.innerHTML = renderQuickViewModal();
    if (invoiceMount) invoiceMount.innerHTML = renderInvoiceModal();

    this.renderToasts();
  }

  renderToasts() {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    container.innerHTML = store.toasts.map(t => `
      <div class="toast ${t.type === 'error' ? 'toast-error' : (t.type === 'info' ? 'toast-info' : '')}">
        <span>${t.message}</span>
      </div>
    `).join('');
  }

  attachEvents() {
    document.addEventListener('click', (e) => this.handleClick(e));
    document.addEventListener('input', (e) => this.handleInput(e));
    document.addEventListener('submit', (e) => this.handleSubmit(e));
    document.addEventListener('change', (e) => this.handleChange(e));
  }

  handleClick(e) {
    // 1. Cart Drawer Triggers
    if (e.target.closest('#quickCartBtn') || e.target.closest('#mobileCartBtn') || e.target.closest('.cart-nav-trigger')) {
      e.preventDefault();
      store.openCart();
      return;
    }

    if (e.target.closest('#closeCartBtn') || e.target.closest('#continueShoppingBtn') || e.target.id === 'cartDrawerOverlay') {
      store.closeCart();
      return;
    }

    // 2. Add To Cart Buttons (from cards, search, quickview)
    const addBtn = e.target.closest('.add-to-cart-btn') || e.target.closest('.quick-add-btn');
    if (addBtn) {
      e.preventDefault();
      const id = addBtn.dataset.id;
      const product = store.products.find(p => p.id === id);
      if (product) {
        store.addToCart(product, 1);
      }
      return;
    }

    // 3. Cart Drawer / Cart Page Item Actions
    const removeBtn = e.target.closest('.cart-remove-item');
    if (removeBtn) {
      e.preventDefault();
      store.removeFromCart(removeBtn.dataset.id);
      return;
    }

    const qtyPlus = e.target.closest('.cart-qty-increase');
    if (qtyPlus) {
      e.preventDefault();
      store.updateCartQuantity(qtyPlus.dataset.id, 1);
      return;
    }

    const qtyMinus = e.target.closest('.cart-qty-decrease');
    if (qtyMinus) {
      e.preventDefault();
      store.updateCartQuantity(qtyMinus.dataset.id, -1);
      return;
    }

    if (e.target.closest('#clearCartBtn')) {
      e.preventDefault();
      if (confirm("Are you sure you want to empty your cart?")) {
        store.clearCart();
      }
      return;
    }

    // 4. Promo Code Buttons
    if (e.target.closest('#applyPromoBtn')) {
      e.preventDefault();
      const input = document.getElementById('cartPromoInput');
      if (input) store.applyPromoCode(input.value);
      return;
    }

    if (e.target.closest('#pageApplyPromoBtn')) {
      e.preventDefault();
      const input = document.getElementById('pagePromoInput');
      if (input) store.applyPromoCode(input.value);
      return;
    }

    // 5. Search Modal Triggers
    if (e.target.closest('#searchTriggerBtn')) {
      e.preventDefault();
      store.openSearch();
      return;
    }

    if (e.target.closest('#closeSearchModalBtn') || e.target.id === 'searchModalOverlay') {
      store.closeSearch();
      return;
    }

    const searchTag = e.target.closest('.search-tag-btn');
    if (searchTag) {
      const input = document.getElementById('liveSearchInput');
      if (input) {
        input.value = searchTag.dataset.tag;
        this.filterSearchResults(searchTag.dataset.tag);
      }
      return;
    }

    // 6. Quick View Trigger
    const quickViewBtn = e.target.closest('.quick-view-btn');
    if (quickViewBtn) {
      e.preventDefault();
      const id = quickViewBtn.dataset.id;
      const product = store.products.find(p => p.id === id);
      if (product) store.setQuickViewProduct(product);
      return;
    }

    if (e.target.closest('#quickViewAddToCart')) {
      e.preventDefault();
      const id = e.target.closest('#quickViewAddToCart').dataset.id;
      const product = store.products.find(p => p.id === id);
      if (product) {
        store.addToCart(product, 1, this.selectedFlavour);
        store.setQuickViewProduct(null);
      }
      return;
    }

    const qvFlvBtn = e.target.closest('.quickview-flavour-btn');
    if (qvFlvBtn) {
      this.selectedFlavour = qvFlvBtn.dataset.flavour;
      document.querySelectorAll('.quickview-flavour-btn').forEach(b => {
        b.className = 'quickview-flavour-btn text-xs px-3 py-1.5 rounded-full border border-[#3B1F1A]/20 bg-white text-[#1F2A1A] cursor-pointer';
      });
      qvFlvBtn.className = 'quickview-flavour-btn text-xs px-3 py-1.5 rounded-full border border-[#0F5C47] bg-[#E5EAD9] font-bold text-[#0F5C47] cursor-pointer';
      return;
    }

    // 7. Product Detail Page Controls
    if (e.target.closest('#detailQtyPlus')) {
      e.preventDefault();
      this.detailQty += 1;
      const display = document.getElementById('detailQtyDisplay');
      if (display) display.textContent = this.detailQty;
      return;
    }

    if (e.target.closest('#detailQtyMinus')) {
      e.preventDefault();
      if (this.detailQty > 1) {
        this.detailQty -= 1;
        const display = document.getElementById('detailQtyDisplay');
        if (display) display.textContent = this.detailQty;
      }
      return;
    }

    const detailFlvBtn = e.target.closest('.detail-flavour-btn');
    if (detailFlvBtn) {
      this.selectedFlavour = detailFlvBtn.dataset.flavour;
      document.querySelectorAll('.detail-flavour-btn').forEach(b => {
        b.className = 'detail-flavour-btn px-4 py-2 rounded-xl text-xs font-bold border border-[#3B1F1A]/20 bg-white text-[#1F2A1A] hover:bg-[#E5EAD9] transition-all cursor-pointer';
      });
      detailFlvBtn.className = 'detail-flavour-btn px-4 py-2 rounded-xl text-xs font-bold border border-[#0F5C47] bg-[#0F5C47] text-white shadow-sm transition-all cursor-pointer';
      const label = document.getElementById('selectedFlavourLabel');
      if (label) label.textContent = this.selectedFlavour;
      return;
    }

    const detailVrtBtn = e.target.closest('.detail-variant-btn');
    if (detailVrtBtn) {
      this.selectedVariant = detailVrtBtn.dataset.variant;
      document.querySelectorAll('.detail-variant-btn').forEach(b => {
        b.className = 'detail-variant-btn px-4 py-2 rounded-xl text-xs font-bold border border-[#3B1F1A]/20 bg-white text-[#1F2A1A] hover:bg-[#E5EAD9] transition-all cursor-pointer';
      });
      detailVrtBtn.className = 'detail-variant-btn px-4 py-2 rounded-xl text-xs font-bold border border-[#0F5C47] bg-[#E5EAD9] text-[#0F5C47] transition-all cursor-pointer';
      const label = document.getElementById('selectedVariantLabel');
      if (label) label.textContent = this.selectedVariant;
      return;
    }

    const detailAddBtn = e.target.closest('#detailAddToCartBtn');
    if (detailAddBtn) {
      e.preventDefault();
      const id = detailAddBtn.dataset.id;
      const product = store.products.find(p => p.id === id);
      if (product) {
        store.addToCart(product, this.detailQty, this.selectedFlavour, this.selectedVariant);
      }
      return;
    }

    const detailBuyNowBtn = e.target.closest('#detailBuyNowBtn');
    if (detailBuyNowBtn) {
      e.preventDefault();
      const id = detailBuyNowBtn.dataset.id;
      const product = store.products.find(p => p.id === id);
      if (product) {
        store.addToCart(product, this.detailQty, this.selectedFlavour, this.selectedVariant);
        routeTo('/checkout');
      }
      return;
    }

    // 8. Mobile Menu Sheet Toggle
    if (e.target.closest('#mobileMenuTrigger')) {
      const sheet = document.getElementById('mobileMenuSheet');
      if (sheet) {
        sheet.classList.remove('opacity-0', 'pointer-events-none');
        sheet.querySelector('div').classList.remove('translate-y-full');
      }
      return;
    }

    if (e.target.closest('#closeMobileMenu') || e.target.closest('.mobile-sheet-link') || e.target.id === 'mobileMenuSheet') {
      const sheet = document.getElementById('mobileMenuSheet');
      if (sheet) {
        sheet.classList.add('opacity-0', 'pointer-events-none');
        sheet.querySelector('div').classList.add('translate-y-full');
      }
      return;
    }

    // 9. Autofill Buttons for Testing
    if (e.target.closest('#autofillDemoCheckoutBtn')) {
      e.preventDefault();
      document.getElementById('chkFullName').value = BRAND_CONFIG.demoCustomer.name;
      document.getElementById('chkEmail').value = BRAND_CONFIG.demoCustomer.email;
      document.getElementById('chkPhone').value = BRAND_CONFIG.demoCustomer.phone;
      document.getElementById('chkAddress').value = BRAND_CONFIG.demoCustomer.address.street;
      document.getElementById('chkCity').value = BRAND_CONFIG.demoCustomer.address.city;
      document.getElementById('chkState').value = BRAND_CONFIG.demoCustomer.address.state;
      document.getElementById('chkPincode').value = BRAND_CONFIG.demoCustomer.address.pincode;
      store.showToast("Autofilled demo customer delivery details.");
      return;
    }

    if (e.target.closest('#autofillDemoCustomerBtn')) {
      e.preventDefault();
      document.getElementById('loginEmail').value = BRAND_CONFIG.demoCustomer.email;
      document.getElementById('loginPassword').value = BRAND_CONFIG.demoCustomer.password;
      store.showToast("Autofilled customer demo credentials.");
      return;
    }

    if (e.target.closest('#autofillAdminBtn')) {
      e.preventDefault();
      document.getElementById('adminEmail').value = BRAND_CONFIG.adminAuth.email;
      document.getElementById('adminPassword').value = BRAND_CONFIG.adminAuth.password;
      store.showToast("Autofilled administrator demo credentials.");
      return;
    }

    // 10. Invoice Modal Triggers
    const invoiceBtn = e.target.closest('.account-invoice-btn') || e.target.closest('#viewInvoiceBtn');
    if (invoiceBtn) {
      e.preventDefault();
      const orderId = invoiceBtn.dataset.id;
      const order = store.getOrder(orderId);
      if (order) store.setInvoiceOrder(order);
      return;
    }

    if (e.target.id === 'invoiceModalOverlay') {
      store.setInvoiceOrder(null);
      return;
    }

    // 11. Customer Logout
    if (e.target.closest('#customerLogoutBtn')) {
      e.preventDefault();
      store.logoutCustomer();
      routeTo('/login');
      return;
    }

    // 12. Admin Logout
    if (e.target.closest('#adminLogoutBtn')) {
      e.preventDefault();
      store.logoutAdmin();
      routeTo('/admin/login');
      return;
    }

    // 13. Admin Reset Products
    if (e.target.closest('#adminResetProductsBtn')) {
      e.preventDefault();
      if (confirm("Reset product catalogue and prices to initial business specifications?")) {
        store.resetProductsToDefault();
        renderCurrentRoute();
      }
      return;
    }

    // 14. Admin Save Product Changes
    const adminSaveBtn = e.target.closest('.admin-save-product-btn');
    if (adminSaveBtn) {
      e.preventDefault();
      const id = adminSaveBtn.dataset.id;
      const priceInput = document.querySelector(`.admin-price-input[data-id="${id}"]`);
      const stockInput = document.querySelector(`.admin-stock-input[data-id="${id}"]`);

      if (priceInput) store.updateProductPrice(id, priceInput.value);
      if (stockInput) store.updateProductStock(id, stockInput.value);
      return;
    }

    // 15. Inventory Quick Adjust
    const invAdjBtn = e.target.closest('.inventory-quick-adj');
    if (invAdjBtn) {
      e.preventDefault();
      const id = invAdjBtn.dataset.id;
      const delta = Number(invAdjBtn.dataset.delta);
      const product = store.products.find(p => p.id === id);
      if (product) {
        store.updateProductStock(id, product.stockCount + delta);
        renderCurrentRoute();
      }
      return;
    }

    // 16. Shop Filter Tabs
    const shopTab = e.target.closest('.shop-filter-tab');
    if (shopTab) {
      const category = shopTab.dataset.category;
      routeTo(`/shop?category=${category}`);
      return;
    }

    if (e.target.closest('#clearShopFilters') || e.target.closest('#resetAllFiltersBtn')) {
      routeTo('/shop');
      return;
    }

    // 17. Track Order Search Button
    if (e.target.closest('#searchOrderBtn')) {
      e.preventDefault();
      const input = document.getElementById('trackOrderIdInput');
      if (input && input.value.trim()) {
        routeTo(`/track-order?id=${input.value.trim()}`);
      }
      return;
    }

    // Password visibility toggle
    if (e.target.closest('#togglePasswordVisibility')) {
      const input = document.getElementById('loginPassword');
      if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
      }
      return;
    }
  }

  handleInput(e) {
    if (e.target.id === 'liveSearchInput') {
      this.filterSearchResults(e.target.value);
    }
  }

  filterSearchResults(query) {
    const term = query.toLowerCase().trim();
    const items = document.querySelectorAll('.search-result-item');
    items.forEach(item => {
      const searchTarget = (item.dataset.search || '').toLowerCase();
      if (!term || searchTarget.includes(term)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  handleChange(e) {
    // Shop dropdowns
    if (e.target.id === 'shopCapacitySelect') {
      const capacity = e.target.value;
      const { queryParams } = getRouteInfo();
      queryParams.set('capacity', capacity);
      routeTo(`/shop?${queryParams.toString()}`);
      return;
    }

    if (e.target.id === 'shopSortSelect') {
      const sort = e.target.value;
      const { queryParams } = getRouteInfo();
      queryParams.set('sort', sort);
      routeTo(`/shop?${queryParams.toString()}`);
      return;
    }

    // Admin order status update dropdown
    if (e.target.classList.contains('admin-status-select')) {
      const orderId = e.target.dataset.id;
      const newStatus = e.target.value;
      store.updateOrderStatus(orderId, newStatus);
      return;
    }
  }

  handleSubmit(e) {
    // 1. Checkout Form Submission
    if (e.target.id === 'checkoutForm') {
      e.preventDefault();
      const form = e.target;
      const orderPayload = {
        fullName: form.fullName.value,
        email: form.email.value,
        phone: form.phone.value,
        address: form.address.value,
        city: form.city.value,
        state: form.state.value,
        pincode: form.pincode.value,
        paymentMethod: form.paymentMethod.value
      };

      const newOrder = store.createOrder(orderPayload);
      routeTo(`/order-confirmation/${newOrder.orderId}`);
      return;
    }

    // 2. Customer Login Form
    if (e.target.id === 'customerLoginForm') {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      if (store.loginCustomer(email, password)) {
        routeTo('/account');
      }
      return;
    }

    // 3. Customer Register Form
    if (e.target.id === 'customerRegisterForm') {
      e.preventDefault();
      const name = document.getElementById('regFullName').value;
      const email = document.getElementById('regEmail').value;
      const phone = document.getElementById('regPhone').value;
      if (store.registerCustomer({ name, email, phone })) {
        routeTo('/account');
      }
      return;
    }

    // 4. Admin Login Form
    if (e.target.id === 'adminLoginForm') {
      e.preventDefault();
      const email = document.getElementById('adminEmail').value;
      const password = document.getElementById('adminPassword').value;
      if (store.loginAdmin(email, password)) {
        routeTo('/admin');
      }
      return;
    }

    // 5. B2B Wholesale Form
    if (e.target.id === 'b2bEnquiryForm') {
      e.preventDefault();
      const brand = document.getElementById('b2bBrand').value;
      const contact = document.getElementById('b2bContact').value;
      const volume = document.querySelector('input[name="b2bVolume"]:checked')?.value || 'Wholesale';
      store.showToast(`Thank you ${contact}! Wholesale enquiry for "${brand}" (${volume}) received.`);
      e.target.reset();
      return;
    }

    // 6. Public Contact Form
    if (e.target.id === 'publicContactForm') {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      store.showToast(`Thank you ${name}! Your message has been sent to our customer care team.`);
      e.target.reset();
      return;
    }
  }
}

// Boot application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});

