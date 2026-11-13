// CUP2EAT — Order Confirmation & Immediate Tracking Screen
import { store } from '../context/store.js';
import { Icons } from '../components/ui/Icons.js';

export function renderOrderConfirmationPage(orderId) {
  const order = store.getOrder(orderId) || store.orders[0];

  if (!order) {
    return `
      <div class="max-w-xl mx-auto px-6 py-20 text-center">
        <h2 class="font-display text-3xl font-bold text-[#1F2A1A] mb-3">Order Not Found</h2>
        <a href="#/shop" class="btn-primary">Return to Shop</a>
      </div>
    `;
  }

  return `
    <div class="order-confirmation-view max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10">
      
      <!-- Success Header Card -->
      <div class="bg-white p-8 sm:p-12 rounded-3xl border border-[#3B1F1A]/10 shadow-sm text-center flex flex-col items-center">
        <div class="w-20 h-20 rounded-full bg-[#E5EAD9] flex items-center justify-center text-[#0F5C47] mb-6 shadow-sm border-2 border-[#0F5C47]">
          ${Icons.CheckCircle("w-10 h-10 text-[#0F5C47]")}
        </div>

        <span class="text-xs font-bold uppercase tracking-widest text-[#0F5C47] mb-2">Simulated Order Cleared</span>
        <h1 class="font-display text-3xl sm:text-5xl font-black text-[#1F2A1A] mb-3">
          Thank you for your order!
        </h1>
        <p class="text-sm text-[#5A4A42] max-w-lg mb-6 leading-relaxed">
          Your edible cups have been scheduled for baking and temperature-sealed dispatch. Order updates are saved in your account and admin management console.
        </p>

        <div class="inline-flex flex-wrap items-center justify-center gap-3 p-3 rounded-2xl bg-[#F8F8F2] border border-[#3B1F1A]/10 text-xs">
          <span>Order ID: <strong class="font-mono text-sm text-[#0F5C47]">${order.orderId}</strong></span>
          <span class="text-[#82756E]">•</span>
          <span>Payment: <strong>${order.paymentMethod}</strong></span>
          <span class="text-[#82756E]">•</span>
          <span>Total: <strong class="text-[#6B2F33] text-sm">₹${order.total.toLocaleString()}</strong></span>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button id="viewInvoiceBtn" class="btn-primary py-3 px-6 text-xs font-bold" data-id="${order.orderId}">
            ${Icons.Printer("w-4 h-4")} View / Print Tax Invoice
          </button>
          <a href="#/track-order?id=${order.orderId}" class="btn-secondary py-3 px-6 text-xs font-bold">
            ${Icons.Truck("w-4 h-4")} Live Shipment Tracking
          </a>
        </div>
      </div>

      <!-- Live Tracking Timeline -->
      <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#3B1F1A]/10 shadow-sm flex flex-col gap-6">
        <div class="flex items-center justify-between pb-4 border-b border-[#3B1F1A]/10">
          <div>
            <h2 class="font-display text-xl font-bold text-[#1F2A1A]">Shipment Progress</h2>
            <p class="text-xs text-[#5A4A42]">Climate-Controlled Logistics Courier</p>
          </div>
          <span class="px-3.5 py-1 rounded-full bg-[#E5EAD9] text-[#0F5C47] text-xs font-bold uppercase tracking-wider">
            Status: ${order.status}
          </span>
        </div>

        <!-- 5-Step Progress Steps -->
        <div class="relative py-4">
          <div class="grid grid-cols-1 sm:grid-cols-5 gap-4">
            ${order.trackingSteps.map((step, idx) => `
              <div class="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${step.completed ? 'bg-[#0F5C47] text-white shadow-md' : (step.current ? 'bg-[#C9A24B] text-[#1F2A1A] ring-4 ring-[#C9A24B]/30 font-black' : 'bg-[#E5EAD9] text-[#82756E]')}">
                  ${step.completed ? Icons.Check("w-5 h-5") : idx + 1}
                </div>
                <div>
                  <div class="font-display font-bold text-xs text-[#1F2A1A]">${step.title}</div>
                  <div class="text-[10px] text-[#82756E]">${step.date}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Purchased Items Summary Card -->
      <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#3B1F1A]/10 shadow-sm flex flex-col gap-4">
        <h3 class="font-display text-lg font-bold text-[#1F2A1A] pb-3 border-b border-[#3B1F1A]/8">
          Order Items (${order.items.length})
        </h3>
        <div class="divide-y divide-[#3B1F1A]/8">
          ${order.items.map(item => `
            <div class="py-3 flex items-center justify-between text-xs">
              <div class="flex items-center gap-3">
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded-xl bg-[#E5EAD9]" onerror="this.src='/public/images/client/product_100ml_regular.jpg'">
                <div>
                  <div class="font-bold text-[#1F2A1A]">${item.name}</div>
                  <div class="text-[11px] text-[#5A4A42]">${item.capacity} • Flavour: ${item.flavour} • Qty: ${item.quantity} box(es)</div>
                </div>
              </div>
              <div class="font-display font-bold text-sm text-[#6B2F33]">
                ₹${(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}

