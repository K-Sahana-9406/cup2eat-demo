// Floating Utility Controls (Top Right)
// Search, WhatsApp support, Quick Cart trigger

import { store } from '../../context/store.js';
import { Icons } from '../ui/Icons.js';
import { getWhatsAppUrl } from '../../data/config.js';

export function renderUtilityBar() {
  const cartCount = store.getCartCount();

  return `
    <div class="floating-utilities" role="region" aria-label="Utility Controls">
      <!-- Search Button -->
      <button id="searchTriggerBtn" class="utility-btn" title="Search CUP2EAT Cups" aria-label="Search">
        ${Icons.Search("w-4 h-4 text-[#0F5C47]")}
        <span class="hidden sm:inline text-xs font-semibold">Search</span>
      </button>

      <!-- Cart Trigger Button -->
      <button id="quickCartBtn" class="utility-btn relative" title="View Cart" aria-label="Cart">
        ${Icons.ShoppingCart("w-4 h-4 text-[#3B1F1A]")}
        <span class="hidden sm:inline text-xs font-semibold">Cart</span>
        ${cartCount > 0 ? `<span class="cart-badge" style="position:static; margin-left:0.25rem;">${cartCount}</span>` : ''}
      </button>

      <!-- WhatsApp Direct Connect -->
      <a href="${getWhatsAppUrl('general')}" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="utility-btn whatsapp-float" 
         title="Chat with CUP2EAT on WhatsApp" 
         aria-label="WhatsApp Support">
        ${Icons.WhatsApp("w-4 h-4")}
        <span class="hidden md:inline text-xs font-bold">WhatsApp</span>
      </a>
    </div>
  `;
}

