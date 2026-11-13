// Mobile Floating Bottom Navigation & Expandable Menu Sheet for CUP2EAT
import { store } from '../../context/store.js';
import { Icons } from '../ui/Icons.js';
import { ASSETS } from '../../data/images.js';

export function renderMobileNav(currentPath) {
  const cartCount = store.getCartCount();
  const isLoggedIn = !!store.currentUser;

  return `
    <!-- Floating Bottom Bar for Mobile -->
    <nav class="mobile-bottom-nav md:hidden" aria-label="Mobile Navigation">
      <a href="#/" class="mobile-nav-link ${currentPath === '/' || currentPath === '' ? 'active' : ''}">
        ${Icons.Home("w-5 h-5")}
        <span>Home</span>
      </a>

      <a href="#/shop" class="mobile-nav-link ${currentPath === '/shop' || currentPath.startsWith('/product') ? 'active' : ''}">
        ${Icons.ShoppingBag("w-5 h-5")}
        <span>Shop</span>
      </a>

      <button id="mobileCartBtn" class="mobile-nav-link relative border-none bg-transparent cursor-pointer">
        ${Icons.ShoppingCart("w-5 h-5")}
        <span>Cart</span>
        ${cartCount > 0 ? `<span class="cart-badge" style="top:-2px; right:6px;">${cartCount}</span>` : ''}
      </button>

      <a href="${isLoggedIn ? '#/account' : '#/login'}" class="mobile-nav-link ${currentPath.startsWith('/account') || currentPath.startsWith('/login') ? 'active' : ''}">
        ${Icons.User("w-5 h-5")}
        <span>Account</span>
      </a>

      <button id="mobileMenuTrigger" class="mobile-nav-link border-none bg-transparent cursor-pointer">
        ${Icons.Sliders("w-5 h-5")}
        <span>More</span>
      </button>
    </nav>

    <!-- Expandable Mobile Menu Sheet -->
    <div id="mobileMenuSheet" class="fixed inset-0 bg-[#1F2A1A]/70 backdrop-blur-sm z-[1100] opacity-0 pointer-events-none transition-opacity duration-300">
      <div class="absolute bottom-0 left-0 right-0 bg-[#F8F8F2] rounded-t-3xl p-6 shadow-2xl transform translate-y-full transition-transform duration-300 flex flex-col gap-4 border-t-2 border-[#C9A24B]/30 max-h-[80vh] overflow-y-auto">
        
        <div class="flex items-center justify-between pb-3 border-b border-[#3B1F1A]/10">
          <div class="flex items-center gap-3">
            <img src="${ASSETS.logo}" alt="CUP2EAT" class="w-8 h-8 rounded-full border border-[#C9A24B]">
            <span class="font-display font-bold text-[#1F2A1A] text-lg">CUP2EAT</span>
          </div>
          <button id="closeMobileMenu" class="p-2 text-[#3B1F1A] hover:bg-black/5 rounded-full">
            ${Icons.X("w-6 h-6")}
          </button>
        </div>

        <div class="flex flex-col gap-2">
          <a href="#/about" class="mobile-sheet-link flex items-center gap-3 p-3 rounded-xl hover:bg-[#E5EAD9] text-[#1F2A1A] font-medium">
            <span class="text-[#0F5C47]">${Icons.BookOpen("w-5 h-5")}</span>
            <div>
              <div class="font-semibold text-sm">Our Story</div>
              <div class="text-xs text-[#5A4A42]">Why throw away the cup when you can eat it?</div>
            </div>
          </a>

          <a href="#/business" class="mobile-sheet-link flex items-center gap-3 p-3 rounded-xl hover:bg-[#E5EAD9] text-[#1F2A1A] font-medium">
            <span class="text-[#C9A24B]">${Icons.Building("w-5 h-5")}</span>
            <div>
              <div class="font-semibold text-sm">For Businesses</div>
              <div class="text-xs text-[#5A4A42]">Café, Restaurant & Event Wholesale</div>
            </div>
          </a>

          <a href="#/contact" class="mobile-sheet-link flex items-center gap-3 p-3 rounded-xl hover:bg-[#E5EAD9] text-[#1F2A1A] font-medium">
            <span class="text-[#6B2F33]">${Icons.MessageCircle("w-5 h-5")}</span>
            <div>
              <div class="font-semibold text-sm">Contact & Enquiries</div>
              <div class="text-xs text-[#5A4A42]">Get in touch with our team</div>
            </div>
          </a>

          <a href="#/track-order" class="mobile-sheet-link flex items-center gap-3 p-3 rounded-xl hover:bg-[#E5EAD9] text-[#1F2A1A] font-medium">
            <span class="text-[#0F5C47]">${Icons.Truck("w-5 h-5")}</span>
            <div>
              <div class="font-semibold text-sm">Track Order</div>
              <div class="text-xs text-[#5A4A42]">Live simulated delivery status</div>
            </div>
          </a>

          <div class="my-2 border-t border-[#3B1F1A]/10"></div>

          <a href="#/admin" class="mobile-sheet-link flex items-center gap-3 p-3 rounded-xl bg-[#1F2A1A] text-[#E5EAD9] font-medium">
            <span class="text-[#C9A24B]">${Icons.ShieldCheck("w-5 h-5")}</span>
            <div>
              <div class="font-semibold text-sm text-[#C9A24B]">Admin Dashboard</div>
              <div class="text-xs text-[#E5EAD9]/80">Manage products, orders & stock</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  `;
}

