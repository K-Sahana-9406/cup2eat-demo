// CUP2EAT — Client-Side Hash Router with Dynamic SEO
// Supports all 19+ routes, scroll-to-top, and canonical metadata updates.

import { renderHomePage } from './pages/HomePage.js';
import { renderShopPage } from './pages/ShopPage.js';
import { renderProductDetailPage } from './pages/ProductDetailPage.js';
import { renderAboutPage } from './pages/AboutPage.js';
import { renderBusinessPage } from './pages/BusinessPage.js';
import { renderContactPage } from './pages/ContactPage.js';
import { renderCartPage } from './pages/CartPage.js';
import { renderCheckoutPage } from './pages/CheckoutPage.js';
import { renderOrderConfirmationPage } from './pages/OrderConfirmationPage.js';
import { renderTrackOrderPage } from './pages/TrackOrderPage.js';
import { renderLoginPage, renderRegisterPage } from './pages/AuthPages.js';
import { renderAccountPage } from './pages/AccountPage.js';
import { renderAdminLoginPage, renderAdminDashboard } from './pages/AdminPages.js';
import { BRAND_CONFIG } from './data/config.js';
import { store } from './context/store.js';

export function getRouteInfo() {
  const hash = window.location.hash.slice(1) || '/';
  const [pathWithQuery, queryString] = hash.split('?');
  const path = pathWithQuery.startsWith('/') ? pathWithQuery : `/${pathWithQuery}`;
  
  // Parse query params
  const queryParams = new URLSearchParams(queryString || '');
  return { path, queryParams };
}

export function routeTo(path) {
  window.location.hash = path.startsWith('#') ? path : `#${path}`;
}

export function renderCurrentRoute() {
  const { path, queryParams } = getRouteInfo();
  const container = document.getElementById('appContent');
  if (!container) return;

  // Window scroll to top on page navigation
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // 1. Home
  if (path === '/' || path === '') {
    updateSEO("CUP2EAT — EAT YOUR DRINK | Premium Edible Cups for Cafés & Events", 
              "CUP2EAT creates edible cups for beverages. The cup you can eat — pure veg, leak-proof, and designed for hot chai, coffee, and cold shakes.");
    container.innerHTML = renderHomePage();
    return;
  }

  // 2. Shop
  if (path === '/shop') {
    const category = queryParams.get('category') || 'all';
    const capacity = queryParams.get('capacity') || 'all';
    const sort = queryParams.get('sort') || 'featured';
    const search = queryParams.get('search') || '';
    updateSEO("Shop Edible Cups | 100 ML Hot & 150 ML Cold Range — CUP2EAT", 
              "Explore our complete range of edible cups: 100 ML for tea and coffee, 150 ML for cold coffee and shakes, chocolate-coated and chocolate-rim editions.");
    container.innerHTML = renderShopPage({ category, capacity, sort, search });
    return;
  }

  // 3. Product Details
  if (path.startsWith('/product/')) {
    const slug = path.replace('/product/', '');
    const product = store.getProductBySlug(slug);
    const title = product ? `${product.name} (${product.capacity}) — CUP2EAT` : "Product Details — CUP2EAT";
    const desc = product ? product.description : "CUP2EAT edible cup details.";
    updateSEO(title, desc);
    container.innerHTML = renderProductDetailPage(slug);
    return;
  }

  // 4. About / Our Story
  if (path === '/about') {
    updateSEO("Our Story — Why Throw Away The Cup When You Can Eat It? | CUP2EAT", 
              "Learn about CUP2EAT's edible cup innovation, our pure vegetarian craft, and why every sip becomes part of the dessert experience.");
    container.innerHTML = renderAboutPage();
    return;
  }

  // 5. For Businesses (B2B)
  if (path === '/business') {
    updateSEO("CUP2EAT For Businesses — Wholesale Edible Cups for Cafés & Restaurants", 
              "Partner with CUP2EAT for B2B wholesale edible cups. Boost café social media virality, eliminate paper cup waste, and increase beverage margins.");
    container.innerHTML = renderBusinessPage();
    return;
  }

  // 6. Contact & Enquiries
  if (path === '/contact') {
    updateSEO("Contact CUP2EAT | Sample Boxes, Wholesale & Customer Support", 
              "Connect with the CUP2EAT team for wholesale pricing, sample tasting boxes, and nationwide delivery support.");
    container.innerHTML = renderContactPage();
    return;
  }

  // 7. Cart
  if (path === '/cart') {
    updateSEO("Your Shopping Cart — CUP2EAT", "Review your selected edible cup cartons, apply discount codes, and proceed to checkout.");
    container.innerHTML = renderCartPage();
    return;
  }

  // 8. Checkout
  if (path === '/checkout') {
    updateSEO("Simulated Checkout — CUP2EAT", "Safe and secure demonstration checkout. Complete test order simulation with instant invoice generation.");
    container.innerHTML = renderCheckoutPage();
    return;
  }

  // 9. Order Confirmation
  if (path.startsWith('/order-confirmation/')) {
    const orderId = path.replace('/order-confirmation/', '');
    updateSEO("Order Confirmed! — CUP2EAT", "Your simulated order has been recorded.");
    container.innerHTML = renderOrderConfirmationPage(orderId);
    return;
  }

  // 10. Track Order
  if (path === '/track-order') {
    const orderId = queryParams.get('id');
    updateSEO("Track Edible Cup Shipment — CUP2EAT", "Live logistics timeline for your CUP2EAT delivery.");
    container.innerHTML = renderTrackOrderPage(orderId);
    return;
  }

  // 11. Customer Login & Register
  if (path === '/login') {
    updateSEO("Customer Sign In — CUP2EAT", "Sign in to your CUP2EAT customer dashboard to view orders and invoices.");
    container.innerHTML = renderLoginPage();
    return;
  }

  if (path === '/register') {
    updateSEO("Create Customer Account — CUP2EAT", "Register for easy reordering and tracking.");
    container.innerHTML = renderRegisterPage();
    return;
  }

  // 12. Customer Account Dashboard
  if (path === '/account' || path === '/orders') {
    updateSEO("Customer Dashboard & Orders — CUP2EAT", "Manage your profile, view recent orders, and download official invoices.");
    container.innerHTML = renderAccountPage();
    return;
  }

  // 13. Admin Suite
  if (path === '/admin/login') {
    updateSEO("Admin Portal Login — CUP2EAT", "Executive administrator sign in.");
    container.innerHTML = renderAdminLoginPage();
    return;
  }

  if (path.startsWith('/admin')) {
    const tab = queryParams.get('tab') || 'dashboard';
    updateSEO("Executive Admin Console — CUP2EAT", "Manage inventory, catalogue pricing, customer pipeline and orders.");
    container.innerHTML = renderAdminDashboard(tab);
    return;
  }

  // Fallback 404
  container.innerHTML = `
    <div class="max-w-md mx-auto px-6 py-20 text-center">
      <h2 class="font-display text-4xl font-bold text-[#1F2A1A] mb-3">404</h2>
      <p class="text-sm text-[#5A4A42] mb-6">The page you requested could not be found.</p>
      <a href="#/" class="btn-primary">Return to Homepage</a>
    </div>
  `;
}

function updateSEO(title, description) {
  document.title = title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);
}

