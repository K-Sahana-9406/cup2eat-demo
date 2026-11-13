// CUP2EAT — Simulated Checkout Demonstration
// Multi-step customer info, order review, UPI QR / Card simulation, order creation.

import { store } from '../context/store.js';
import { Icons } from '../components/ui/Icons.js';
import { BRAND_CONFIG } from '../data/config.js';

export function renderCheckoutPage() {
  const items = store.cart;
  const subtotal = store.getCartSubtotal();
  const discount = store.discountAmount;
  const shipping = store.getShippingFee();
  const tax = store.getTaxAmount();
  const total = store.getCartTotal();

  if (items.length === 0) {
    return `
      <div class="max-w-2xl mx-auto px-6 py-20 text-center">
        <h2 class="font-display text-3xl font-bold text-[#1F2A1A] mb-3">Your cart is empty</h2>
        <p class="text-sm text-[#5A4A42] mb-6">Please add edible cups to your cart before proceeding to checkout.</p>
        <a href="#/shop" class="btn-primary">Return to Shop</a>
      </div>
    `;
  }

  const demoUser = store.currentUser || BRAND_CONFIG.demoCustomer;

  return `
    <div class="checkout-view max-w-6xl mx-auto px-6 py-12 flex flex-col gap-10">
      
      <!-- Checkout Header -->
      <div class="border-b border-[#3B1F1A]/10 pb-6 flex items-center justify-between">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-[#0F5C47] block mb-1">Simulated E-Commerce Demo</span>
          <h1 class="font-display text-3xl sm:text-4xl font-black text-[#1F2A1A]">Checkout</h1>
        </div>

        <button id="autofillDemoCheckoutBtn" class="text-xs font-bold text-[#0F5C47] bg-[#E5EAD9] hover:bg-[#C9A24B] hover:text-black px-4 py-2 rounded-full transition-colors cursor-pointer border-none flex items-center gap-1.5 shadow-sm">
          ${Icons.Sparkles("w-3.5 h-3.5")} Autofill Demo Info
        </button>
      </div>

      <!-- Demo Security Notice -->
      <div class="p-4 rounded-2xl bg-[#C9A24B]/15 border border-[#C9A24B]/40 text-xs text-[#3B1F1A] flex items-start gap-3">
        <span class="text-[#0F5C47] flex-shrink-0 mt-0.5">${Icons.ShieldCheck("w-5 h-5")}</span>
        <p class="leading-relaxed">
          <strong>Demonstration Mode:</strong> This checkout processes test orders within your browser. No real banking credentials or credit cards are collected. Completing this flow simulates inventory deduction, invoice generation, customer tracking, and admin dashboard updates.
        </p>
      </div>

      <form id="checkoutForm" class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        <!-- Left 8 Cols: Customer Information & Payment -->
        <div class="lg:col-span-7 flex flex-col gap-8">
          
          <!-- Step 1: Customer Contact -->
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#3B1F1A]/10 shadow-sm flex flex-col gap-5">
            <div class="flex items-center gap-3 pb-3 border-b border-[#3B1F1A]/8">
              <span class="w-7 h-7 rounded-full bg-[#0F5C47] text-white flex items-center justify-center text-xs font-bold">1</span>
              <h2 class="font-display text-lg font-bold text-[#1F2A1A]">Customer & Business Details</h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="sm:col-span-2">
                <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Full Name / Business Name *</label>
                <input type="text" name="fullName" id="chkFullName" required value="${demoUser.name || ''}" placeholder="e.g. Aarav Sharma / The Bean Bistro" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
              </div>

              <div>
                <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Email Address *</label>
                <input type="email" name="email" id="chkEmail" required value="${demoUser.email || ''}" placeholder="aarav@cup2eat.demo" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
              </div>

              <div>
                <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Phone Number (with WhatsApp) *</label>
                <input type="tel" name="phone" id="chkPhone" required value="${demoUser.phone || '+91 98765 00000'}" placeholder="+91 98765 43210" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
              </div>
            </div>
          </div>

          <!-- Step 2: Shipping Destination -->
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#3B1F1A]/10 shadow-sm flex flex-col gap-5">
            <div class="flex items-center gap-3 pb-3 border-b border-[#3B1F1A]/8">
              <span class="w-7 h-7 rounded-full bg-[#0F5C47] text-white flex items-center justify-center text-xs font-bold">2</span>
              <h2 class="font-display text-lg font-bold text-[#1F2A1A]">Delivery Address (Temperature Controlled)</h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="sm:col-span-2">
                <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Street Address / Landmark *</label>
                <input type="text" name="address" id="chkAddress" required value="${demoUser.address?.street || '42, Brigade Road, Ashok Nagar'}" placeholder="Building name, street, locality" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
              </div>

              <div>
                <label class="block text-xs font-bold text-[#1F2A1A] mb-1">City *</label>
                <input type="text" name="city" id="chkCity" required value="${demoUser.address?.city || 'Bengaluru'}" placeholder="Bengaluru" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
              </div>

              <div>
                <label class="block text-xs font-bold text-[#1F2A1A] mb-1">State *</label>
                <input type="text" name="state" id="chkState" required value="${demoUser.address?.state || 'Karnataka'}" placeholder="Karnataka" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
              </div>

              <div>
                <label class="block text-xs font-bold text-[#1F2A1A] mb-1">PIN Code *</label>
                <input type="text" name="pincode" id="chkPincode" required value="${demoUser.address?.pincode || '560025'}" placeholder="560025" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
              </div>

              <div>
                <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Delivery Priority</label>
                <select class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs font-medium focus:outline-none focus:border-[#0F5C47]">
                  <option>Standard Express (2–4 Business Days)</option>
                  <option>Next-Day Air Dispatch (+₹150)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Step 3: Payment Method Simulation -->
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#3B1F1A]/10 shadow-sm flex flex-col gap-5">
            <div class="flex items-center gap-3 pb-3 border-b border-[#3B1F1A]/8">
              <span class="w-7 h-7 rounded-full bg-[#0F5C47] text-white flex items-center justify-center text-xs font-bold">3</span>
              <h2 class="font-display text-lg font-bold text-[#1F2A1A]">Payment Method (Simulated)</h2>
            </div>

            <!-- Payment Radio Options -->
            <div class="flex flex-col gap-3">
              <!-- UPI Option -->
              <label class="p-4 rounded-2xl border-2 border-[#0F5C47] bg-[#E5EAD9]/40 flex items-center justify-between cursor-pointer">
                <div class="flex items-center gap-3">
                  <input type="radio" name="paymentMethod" value="UPI (Demo QR)" checked class="accent-[#0F5C47]">
                  <div>
                    <div class="font-bold text-xs text-[#1F2A1A]">Instant UPI (Google Pay, PhonePe, Paytm, BHIM)</div>
                    <div class="text-[11px] text-[#5A4A42]">Scan simulated QR or enter VPA ID</div>
                  </div>
                </div>
                <span class="text-xs font-bold text-[#0F5C47]">Zero Fee</span>
              </label>

              <!-- Credit/Debit Card Option -->
              <label class="p-4 rounded-2xl border border-[#3B1F1A]/15 bg-white hover:bg-[#F8F8F2] flex items-center justify-between cursor-pointer">
                <div class="flex items-center gap-3">
                  <input type="radio" name="paymentMethod" value="Card (Simulated Visa/MC)" class="accent-[#0F5C47]">
                  <div>
                    <div class="font-bold text-xs text-[#1F2A1A]">Credit / Debit Card (Visa, MasterCard, RuPay)</div>
                    <div class="text-[11px] text-[#5A4A42]">Razorpay gateway ready architecture</div>
                  </div>
                </div>
                <span class="text-xs text-[#82756E]">Demo Safe</span>
              </label>

              <!-- Corporate NetBanking -->
              <label class="p-4 rounded-2xl border border-[#3B1F1A]/15 bg-white hover:bg-[#F8F8F2] flex items-center justify-between cursor-pointer">
                <div class="flex items-center gap-3">
                  <input type="radio" name="paymentMethod" value="Corporate NetBanking" class="accent-[#0F5C47]">
                  <div>
                    <div class="font-bold text-xs text-[#1F2A1A]">Corporate NetBanking / B2B NEFT</div>
                    <div class="text-[11px] text-[#5A4A42]">For café & restaurant company accounts</div>
                  </div>
                </div>
              </label>

              <!-- Cash On Delivery -->
              <label class="p-4 rounded-2xl border border-[#3B1F1A]/15 bg-white hover:bg-[#F8F8F2] flex items-center justify-between cursor-pointer">
                <div class="flex items-center gap-3">
                  <input type="radio" name="paymentMethod" value="Cash On Delivery" class="accent-[#0F5C47]">
                  <div>
                    <div class="font-bold text-xs text-[#1F2A1A]">Cash / UPI on Delivery</div>
                    <div class="text-[11px] text-[#5A4A42]">Pay when the edible cup shipment arrives</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

        </div>

        <!-- Right 4 Cols: Order Summary & Place Order -->
        <div class="lg:col-span-5 flex flex-col gap-6 sticky top-24">
          
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#3B1F1A]/10 shadow-sm flex flex-col gap-5">
            <h2 class="font-display text-xl font-bold text-[#1F2A1A] pb-3 border-b border-[#3B1F1A]/10">
              Order Review (${items.length} Items)
            </h2>

            <!-- Items list preview -->
            <div class="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
              ${items.map(item => `
                <div class="flex items-center justify-between text-xs py-2 border-b border-[#3B1F1A]/5">
                  <div class="flex items-center gap-3">
                    <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded-xl bg-[#E5EAD9] flex-shrink-0" onerror="this.src='/public/images/client/product_100ml_regular.jpg'">
                    <div>
                      <h4 class="font-bold text-[#1F2A1A] truncate max-w-[140px]">${item.name}</h4>
                      <div class="text-[10px] text-[#5A4A42]">${item.capacity} • ${item.quantity} box(es)</div>
                    </div>
                  </div>
                  <div class="font-display font-bold text-sm text-[#6B2F33]">
                    ₹${(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Price Breakdown -->
            <div class="flex flex-col gap-2 text-xs text-[#5A4A42] pt-3 border-t border-[#3B1F1A]/10">
              <div class="flex justify-between">
                <span>Subtotal:</span>
                <span class="font-semibold text-[#1F2A1A]">₹${subtotal.toLocaleString()}</span>
              </div>

              ${discount > 0 ? `
                <div class="flex justify-between text-[#0F5C47] font-bold">
                  <span>Discount (${store.promoCode}):</span>
                  <span>-₹${discount.toLocaleString()}</span>
                </div>
              ` : ''}

              <div class="flex justify-between">
                <span>Shipping:</span>
                <span class="font-semibold ${shipping === 0 ? 'text-[#0F5C47]' : 'text-[#1F2A1A]'}">
                  ${shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>

              <div class="flex justify-between">
                <span>GST (5% Bakery):</span>
                <span class="font-semibold text-[#1F2A1A]">₹${tax.toLocaleString()}</span>
              </div>

              <div class="flex justify-between text-xl font-display font-black text-[#1F2A1A] pt-3 border-t border-[#3B1F1A]/10">
                <span>Total Amount:</span>
                <span class="text-[#6B2F33]">₹${total.toLocaleString()}</span>
              </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" id="placeOrderBtn" class="btn-primary w-full py-4 text-base font-bold justify-center bg-[#0F5C47] hover:bg-[#0c4d3b]">
              ${Icons.ShieldCheck("w-5 h-5")} Place Simulated Order
            </button>

            <p class="text-[10px] text-[#82756E] text-center leading-relaxed">
              By placing this order you simulate an e-commerce transaction. Order updates will immediately reflect in your account tracking and the admin portal.
            </p>
          </div>

        </div>

      </form>

    </div>
  `;
}

