// Signature Floating Vertical Navigation for CUP2EAT
// Inspired by the provided Instagram reference reel. Deep Forest background, Sage Cream icons,
// Antique Gold active indicator, smooth expansion, keyboard accessibility.

import { store } from '../../context/store.js';
import { Icons } from '../ui/Icons.js';
import { ASSETS } from '../../data/images.js';

export function renderSidebar(currentPath) {
  const cartCount = store.getCartCount();
  const isLoggedIn = !!store.currentUser;

  const navItems = [
    { label: "Home", path: "#/", icon: Icons.Home },
    { label: "Shop", path: "#/shop", icon: Icons.ShoppingBag },
    { label: "Our Story", path: "#/about", icon: Icons.BookOpen },
    { label: "For Businesses", path: "#/business", icon: Icons.Building },
    { label: isLoggedIn ? "My Account" : "Account", path: isLoggedIn ? "#/account" : "#/login", icon: Icons.User },
    { 
      label: "Cart", 
      path: "#/cart", 
      icon: Icons.ShoppingCart,
      badge: cartCount > 0 ? cartCount : null,
      isCart: true
    },
    { label: "Contact", path: "#/contact", icon: Icons.MessageCircle }
  ];

  return `
    <aside class="cup-sidebar" id="mainSidebar" aria-label="Main Navigation">
      <!-- Top Brand Logo -->
      <a href="#/" class="sidebar-logo-link flex flex-col items-center justify-center p-2 rounded-2xl hover:bg-white/10 transition-colors w-full" title="CUP2EAT Home">
        <img src="${ASSETS.logo}" alt="CUP2EAT Logo" class="w-10 h-10 object-contain rounded-full shadow-md border border-[#C9A24B]/30" onerror="this.src='${ASSETS.logoFallback}'">
        <span class="sidebar-label font-display text-[#E5EAD9] font-bold text-sm tracking-widest mt-1">CUP2EAT</span>
      </a>

      <!-- Middle Navigation Links -->
      <nav class="flex flex-col gap-2 w-full my-auto" role="navigation">
        ${navItems.map(item => {
          const isActive = currentPath === item.path.replace('#', '') || 
                           (item.path === '#/' && currentPath === '') ||
                           (item.path === '#/shop' && currentPath.startsWith('/product'));
          return `
            <a href="${item.path}" 
               class="sidebar-link ${isActive ? 'active' : ''} ${item.isCart ? 'cart-nav-trigger' : ''}" 
               data-path="${item.path}"
               title="${item.label}">
              <span class="sidebar-icon">
                ${item.icon("w-5 h-5")}
              </span>
              <span class="sidebar-label font-body">${item.label}</span>
              ${item.badge ? `<span class="cart-badge">${item.badge}</span>` : ''}
            </a>
          `;
        }).join('')}
      </nav>

      <!-- Bottom Admin & Help Shortcut -->
      <div class="w-full flex flex-col items-center gap-2 pt-2 border-t border-[#C9A24B]/20">
        <a href="#/admin" class="sidebar-link ${currentPath.startsWith('/admin') ? 'active' : ''}" title="Admin Console">
          <span class="sidebar-icon text-[#C9A24B]">
            ${Icons.ShieldCheck("w-5 h-5")}
          </span>
          <span class="sidebar-label text-xs text-[#C9A24B]">Admin Suite</span>
        </a>
      </div>
    </aside>
  `;
}

