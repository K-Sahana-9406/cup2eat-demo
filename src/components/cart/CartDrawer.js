// Premium Slide-Out Cart Drawer for CUP2EAT
import { store } from '../../context/store.js';
import { Icons } from '../ui/Icons.js';
import { BRAND_CONFIG } from '../../data/config.js';

export function renderCartDrawer() {
  const items = store.cart;
  const count = store.getCartCount();
  const subtotal = store.getCartSubtotal();
  const discount = store.discountAmount;
  const shipping = store.getShippingFee();
  const tax = store.getTaxAmount();
  const total = store.getCartTotal();
  const isOpen = store.isCartOpen;

  const freeThreshold = BRAND_CONFIG.commerce.freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeThreshold - subtotal);
  const freeProgress = Math.min(100, Math.round((subtotal / freeThreshold) * 100));

  return `
    <div class="cart-drawer-overlay ${isOpen ? 'open' : ''}" id="cartDrawerOverlay">
      <div class="cart-drawer" id="cartDrawer" role="dialog" aria-modal="true" aria-label="Your Shopping Cart">
        <!-- Header -->
        <div class="p-6 border-b border-[#3B1F1A]/10 flex items-center justify-between bg-[#F8F8F2]">
          <div class="flex items-center gap-2">
            <span class="text-[#0F5C47]">${Icons.ShoppingBag("w-6 h-6")}</span>
            <h2 class="font-display text-xl font-bold text-[#1F2A1A]">Your Cart (${count})</h2>
          </div>
          <button id="closeCartBtn" class="p-2 text-[#5A4A42] hover:bg-[#3B1F1A]/10 rounded-full transition-colors cursor-pointer border-none bg-transparent" aria-label="Close cart">
            ${Icons.X("w-5 h-5")}
          </button>
        </div>

        <!-- Free Delivery Progress Bar -->
        <div class="px-6 py-3 bg-[#E5EAD9]/60 border-b border-[#C9A24B]/20 text-xs">
          ${remainingForFreeShipping > 0 
            ? `<p class="font-medium text-[#1F2A1A] mb-1.5">Add <strong class="text-[#0F5C47]">₹${remainingForFreeShipping.toLocaleString()}</strong> more to unlock <strong class="text-[#C9A24B]">Free Shipping!</strong></p>` 
            : `<p class="font-bold text-[#0F5C47] mb-1.5 flex items-center gap-1">${Icons.CheckCircle("w-4 h-4 text-[#0F5C47]")} You've unlocked Free Climate-Controlled Delivery!</p>`
          }
          <div class="w-full bg-[#1F2A1A]/10 h-2 rounded-full overflow-hidden">
            <div class="bg-[#0F5C47] h-full transition-all duration-500 rounded-full" style="width: ${freeProgress}%"></div>
          </div>
        </div>

        <!-- Items Container -->
        <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          ${items.length === 0 ? `
            <div class="flex flex-col items-center justify-center text-center py-16 my-auto">
              <div class="w-20 h-20 rounded-full bg-[#E5EAD9] flex items-center justify-center text-[#0F5C47] mb-4">
                ${Icons.Coffee("w-10 h-10")}
              </div>
              <h3 class="font-display text-2xl font-bold text-[#1F2A1A] mb-2">Your cup is empty</h3>
              <p class="text-sm text-[#5A4A42] max-w-xs mb-6">Discover our hot and cold collections. Experience beverages you can sip and eat.</p>
              <a href="#/shop" class="btn-primary" onclick="store.closeCart()">
                ${Icons.ShoppingBag("w-4 h-4")} Explore Our Cups
              </a>
            </div>
          ` : `
            <div class="flex flex-col gap-4">
              ${items.map(item => `
                <div class="flex gap-4 p-4 rounded-2xl bg-[#F8F8F2] border border-[#3B1F1A]/8 hover:border-[#C9A24B]/40 transition-colors">
                  <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-xl bg-[#E5EAD9] flex-shrink-0" onerror="this.src='/public/images/client/product_100ml_regular.jpg'">
                  
                  <div class="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div class="flex items-start justify-between gap-2">
                        <h4 class="font-display font-semibold text-sm text-[#1F2A1A] truncate">${item.name}</h4>
                        <button class="cart-remove-item text-[#5A4A42] hover:text-[#6B2F33] border-none bg-transparent cursor-pointer p-1" data-id="${item.cartItemId}" title="Remove item">
                          ${Icons.Trash("w-4 h-4")}
                        </button>
                      </div>
                      <div class="flex flex-wrap gap-2 text-xs text-[#5A4A42] mt-0.5">
                        <span class="bg-[#E5EAD9] px-2 py-0.5 rounded-md font-medium text-[#1F2A1A]">${item.capacity}</span>
                        <span>${item.flavour}</span>
                        ${item.variant !== 'Standard Pack' && item.variant !== 'Standard' ? `<span>• ${item.variant}</span>` : ''}
                      </div>
                    </div>

                    <div class="flex items-center justify-between mt-3">
                      <!-- Quantity Counter -->
                      <div class="flex items-center border border-[#3B1F1A]/20 rounded-full bg-white px-2 py-1">
                        <button class="cart-qty-decrease text-[#3B1F1A] hover:text-[#0F5C47] border-none bg-transparent cursor-pointer p-0.5" data-id="${item.cartItemId}">
                          ${Icons.Minus("w-3.5 h-3.5")}
                        </button>
                        <span class="text-xs font-bold px-2.5 text-[#1F2A1A]">${item.quantity}</span>
                        <button class="cart-qty-increase text-[#3B1F1A] hover:text-[#0F5C47] border-none bg-transparent cursor-pointer p-0.5" data-id="${item.cartItemId}">
                          ${Icons.Plus("w-3.5 h-3.5")}
                        </button>
                      </div>

                      <div class="text-right">
                        <div class="font-display font-bold text-sm text-[#6B2F33]">₹${(item.price * item.quantity).toLocaleString()}</div>
                        <div class="text-[10px] text-[#82756E]">₹${item.price.toLocaleString()} each</div>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        ${items.length > 0 ? `
          <!-- Footer / Totals -->
          <div class="p-6 border-t border-[#3B1F1A]/10 bg-[#F8F8F2] flex flex-col gap-3">
            <!-- Promo Code Input -->
            <div class="flex gap-2">
              <input type="text" id="cartPromoInput" placeholder="Promo code (e.g. CUP2EAT10)" value="${store.promoCode || ''}" class="flex-1 px-3 py-2 text-xs rounded-xl border border-[#3B1F1A]/20 bg-white uppercase tracking-wider focus:outline-none focus:border-[#0F5C47]">
              <button id="applyPromoBtn" class="px-4 py-2 bg-[#1F2A1A] text-white text-xs font-semibold rounded-xl hover:bg-[#0F5C47] transition-colors border-none cursor-pointer">
                ${store.promoCode ? 'Applied' : 'Apply'}
              </button>
            </div>

            <!-- Price Breakdown -->
            <div class="flex flex-col gap-1.5 text-xs text-[#5A4A42] pt-2 border-t border-[#3B1F1A]/10">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span class="font-medium text-[#1F2A1A]">₹${subtotal.toLocaleString()}</span>
              </div>

              ${discount > 0 ? `
                <div class="flex justify-between text-[#0F5C47] font-medium">
                  <span>Discount (${store.promoCode})</span>
                  <span>-₹${discount.toLocaleString()}</span>
                </div>
              ` : ''}

              <div class="flex justify-between">
                <span>Shipping</span>
                <span class="font-medium ${shipping === 0 ? 'text-[#0F5C47]' : 'text-[#1F2A1A]'}">
                  ${shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>

              <div class="flex justify-between">
                <span>GST (5% Bakery)</span>
                <span class="font-medium text-[#1F2A1A]">₹${tax.toLocaleString()}</span>
              </div>

              <div class="flex justify-between text-base font-display font-bold text-[#1F2A1A] pt-2 border-t border-[#3B1F1A]/10">
                <span>Estimated Total</span>
                <span class="text-[#6B2F33]">₹${total.toLocaleString()}</span>
              </div>
            </div>

            <!-- Checkout Action -->
            <div class="flex flex-col gap-2 mt-2">
              <a href="#/checkout" class="btn-primary w-full py-3.5 text-sm font-bold justify-center" onclick="store.closeCart()">
                Proceed to Checkout ${Icons.ArrowRight("w-4 h-4")}
              </a>
              <button id="continueShoppingBtn" class="text-xs font-semibold text-[#5A4A42] hover:text-[#0F5C47] text-center border-none bg-transparent cursor-pointer py-1">
                Continue Exploring Cups
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

