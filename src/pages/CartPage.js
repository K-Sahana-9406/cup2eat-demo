// CUP2EAT — Dedicated Shopping Cart Page (/cart)
import { store } from '../context/store.js';
import { Icons } from '../components/ui/Icons.js';
import { BRAND_CONFIG } from '../data/config.js';

export function renderCartPage() {
  const items = store.cart;
  const subtotal = store.getCartSubtotal();
  const discount = store.discountAmount;
  const shipping = store.getShippingFee();
  const tax = store.getTaxAmount();
  const total = store.getCartTotal();

  const freeThreshold = BRAND_CONFIG.commerce.freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeThreshold - subtotal);
  const freeProgress = Math.min(100, Math.round((subtotal / freeThreshold) * 100));

  return `
    <div class="cart-page-view max-w-6xl mx-auto px-6 py-12 flex flex-col gap-10">
      
      <!-- Page Header -->
      <div class="border-b border-[#3B1F1A]/10 pb-6 flex items-center justify-between">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-[#0F5C47] block mb-1">Your Order Selection</span>
          <h1 class="font-display text-3xl sm:text-4xl font-black text-[#1F2A1A]">Shopping Cart</h1>
        </div>
        <a href="#/shop" class="text-xs font-semibold text-[#0F5C47] hover:underline flex items-center gap-1">
          ${Icons.ArrowLeft("w-4 h-4")} Continue Shopping
        </a>
      </div>

      ${items.length === 0 ? `
        <!-- Empty Cart State -->
        <div class="text-center py-20 bg-white rounded-3xl p-10 border border-[#3B1F1A]/10 shadow-sm max-w-xl mx-auto my-6">
          <div class="w-20 h-20 rounded-full bg-[#E5EAD9] flex items-center justify-center text-[#0F5C47] mx-auto mb-4">
            ${Icons.Coffee("w-10 h-10")}
          </div>
          <h2 class="font-display text-2xl font-bold text-[#1F2A1A] mb-2">Your cart is currently empty</h2>
          <p class="text-sm text-[#5A4A42] mb-8 leading-relaxed">
            Ready to explore? Add our 100 ML hot chai cups or 150 ML cold shake cups to get started.
          </p>
          <a href="#/shop" class="btn-primary py-3.5 px-8 font-bold">
            ${Icons.ShoppingBag("w-4 h-4")} Explore Our Collection
          </a>
        </div>
      ` : `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <!-- Left: Cart Items List -->
          <div class="lg:col-span-8 flex flex-col gap-4">
            
            <!-- Free Shipping Bar -->
            <div class="p-4 bg-[#E5EAD9] rounded-2xl border border-[#C9A24B]/30 text-xs">
              ${remainingForFreeShipping > 0 ? `
                <p class="font-medium text-[#1F2A1A] mb-2">
                  Add <strong class="text-[#0F5C47]">₹${remainingForFreeShipping.toLocaleString()}</strong> more to your cart to receive <strong>Free Climate-Controlled Delivery</strong>!
                </p>
              ` : `
                <p class="font-bold text-[#0F5C47] mb-2 flex items-center gap-1.5">
                  ${Icons.CheckCircle("w-4 h-4")} You qualify for Free Climate-Controlled Delivery!
                </p>
              `}
              <div class="w-full bg-[#1F2A1A]/10 h-2 rounded-full overflow-hidden">
                <div class="bg-[#0F5C47] h-full rounded-full transition-all duration-500" style="width: ${freeProgress}%"></div>
              </div>
            </div>

            <!-- Items Table/Card Stack -->
            <div class="bg-white rounded-3xl p-6 border border-[#3B1F1A]/10 shadow-sm flex flex-col divide-y divide-[#3B1F1A]/8">
              ${items.map(item => `
                <div class="py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 first:pt-0 last:pb-0">
                  <div class="flex items-center gap-4">
                    <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-2xl bg-[#E5EAD9] flex-shrink-0" onerror="this.src='/public/images/client/product_100ml_regular.jpg'">
                    <div>
                      <h3 class="font-display font-bold text-base text-[#1F2A1A]">${item.name}</h3>
                      <div class="flex flex-wrap gap-2 text-xs text-[#5A4A42] mt-1">
                        <span class="bg-[#E5EAD9] px-2 py-0.5 rounded text-[#1F2A1A] font-semibold">${item.capacity}</span>
                        <span>Flavour: <strong>${item.flavour}</strong></span>
                        ${item.variant && item.variant !== 'Standard Pack' && item.variant !== 'Standard' ? `<span>• Variant: <strong>${item.variant}</strong></span>` : ''}
                      </div>
                      <div class="text-[11px] text-[#82756E] mt-0.5">${item.packLabel}</div>
                    </div>
                  </div>

                  <div class="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <!-- Quantity controls -->
                    <div class="flex items-center border border-[#3B1F1A]/20 rounded-full bg-[#F8F8F2] px-3 py-1">
                      <button class="cart-qty-decrease text-[#5A4A42] hover:text-[#0F5C47] border-none bg-transparent cursor-pointer p-0.5" data-id="${item.cartItemId}">
                        ${Icons.Minus("w-3.5 h-3.5")}
                      </button>
                      <span class="text-xs font-bold px-3 text-[#1F2A1A]">${item.quantity}</span>
                      <button class="cart-qty-increase text-[#5A4A42] hover:text-[#0F5C47] border-none bg-transparent cursor-pointer p-0.5" data-id="${item.cartItemId}">
                        ${Icons.Plus("w-3.5 h-3.5")}
                      </button>
                    </div>

                    <!-- Item Subtotal -->
                    <div class="text-right min-w-[5rem]">
                      <div class="font-display font-bold text-base text-[#6B2F33]">₹${(item.price * item.quantity).toLocaleString()}</div>
                      <div class="text-[10px] text-[#82756E]">₹${item.price.toLocaleString()} / box</div>
                    </div>

                    <!-- Remove -->
                    <button class="cart-remove-item text-[#82756E] hover:text-[#6B2F33] border-none bg-transparent cursor-pointer p-1.5" data-id="${item.cartItemId}" title="Delete">
                      ${Icons.Trash("w-4 h-4")}
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Clear Cart -->
            <div class="flex justify-between items-center text-xs">
              <button id="clearCartBtn" class="text-[#6B2F33] hover:underline font-bold border-none bg-transparent cursor-pointer">
                Clear Shopping Cart
              </button>
              <span class="text-[#82756E]">Taxes & delivery calculated in order summary</span>
            </div>
          </div>

          <!-- Right: Order Summary Sidebar -->
          <div class="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#3B1F1A]/10 shadow-sm flex flex-col gap-6 sticky top-24">
            <h2 class="font-display text-xl font-bold text-[#1F2A1A] pb-3 border-b border-[#3B1F1A]/10">
              Order Summary
            </h2>

            <!-- Promo Input -->
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-bold text-[#5A4A42] uppercase tracking-wider">Have a Promo Code?</label>
              <div class="flex gap-2">
                <input type="text" id="pagePromoInput" placeholder="CUP2EAT10" value="${store.promoCode || ''}" class="flex-1 px-3 py-2 text-xs rounded-xl border border-[#3B1F1A]/20 uppercase focus:outline-none focus:border-[#0F5C47]">
                <button id="pageApplyPromoBtn" class="px-4 py-2 bg-[#1F2A1A] text-white text-xs font-bold rounded-xl hover:bg-[#0F5C47] transition-colors border-none cursor-pointer">
                  ${store.promoCode ? 'Applied' : 'Apply'}
                </button>
              </div>
              <p class="text-[10px] text-[#82756E]">Use code <strong class="text-[#0F5C47]">CUP2EAT10</strong> for 10% off trial orders above ₹2,000</p>
            </div>

            <!-- Breakdown -->
            <div class="flex flex-col gap-2.5 text-xs text-[#5A4A42] pt-4 border-t border-[#3B1F1A]/10">
              <div class="flex justify-between">
                <span>Items Subtotal</span>
                <span class="font-bold text-[#1F2A1A]">₹${subtotal.toLocaleString()}</span>
              </div>

              ${discount > 0 ? `
                <div class="flex justify-between text-[#0F5C47] font-bold">
                  <span>Discount (${store.promoCode})</span>
                  <span>-₹${discount.toLocaleString()}</span>
                </div>
              ` : ''}

              <div class="flex justify-between">
                <span>Shipping Fee</span>
                <span class="font-bold ${shipping === 0 ? 'text-[#0F5C47]' : 'text-[#1F2A1A]'}">
                  ${shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>

              <div class="flex justify-between">
                <span>Applicable GST (5%)</span>
                <span class="font-bold text-[#1F2A1A]">₹${tax.toLocaleString()}</span>
              </div>

              <div class="flex justify-between text-lg font-display font-black text-[#1F2A1A] pt-4 border-t border-[#3B1F1A]/10">
                <span>Estimated Total</span>
                <span class="text-[#6B2F33]">₹${total.toLocaleString()}</span>
              </div>
            </div>

            <a href="#/checkout" class="btn-primary w-full py-4 text-sm font-bold justify-center">
              Proceed to Checkout ${Icons.ArrowRight("w-4 h-4")}
            </a>

            <div class="flex items-center justify-center gap-2 text-[11px] text-[#82756E]">
              ${Icons.ShieldCheck("w-4 h-4 text-[#0F5C47]")}
              <span>Safe & Secure Simulated Commerce</span>
            </div>
          </div>

        </div>
      `}

    </div>
  `;
}

