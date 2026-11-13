// CUP2EAT — Order Tracking Page (/track-order)
import { store } from '../context/store.js';
import { Icons } from '../components/ui/Icons.js';
import { getWhatsAppUrl } from '../data/config.js';

export function renderTrackOrderPage(orderIdQuery = null) {
  const allOrders = store.orders;
  // If specific ID is passed or take latest order
  let currentOrder = null;
  if (orderIdQuery) {
    currentOrder = store.getOrder(orderIdQuery);
  }
  if (!currentOrder && allOrders.length > 0) {
    currentOrder = allOrders[0];
  }

  return `
    <div class="track-order-view max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10">
      
      <!-- Page Header -->
      <div class="text-center max-w-xl mx-auto">
        <span class="text-xs font-bold uppercase tracking-widest text-[#0F5C47] block mb-2">Real-Time Logistics</span>
        <h1 class="font-display text-3xl sm:text-4xl font-black text-[#1F2A1A]">
          Track Your Edible Cup Shipment
        </h1>
        <p class="text-xs sm:text-sm text-[#5A4A42] mt-2">
          Enter your demo Order ID to view current dispatch status and estimated arrival.
        </p>

        <!-- Order Search Form -->
        <div class="mt-6 flex gap-2 max-w-md mx-auto">
          <input type="text" id="trackOrderIdInput" value="${currentOrder ? currentOrder.orderId : ''}" placeholder="Enter Order ID (e.g. C2E-892104)" class="flex-1 px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-white text-xs font-mono font-bold focus:outline-none focus:border-[#0F5C47]">
          <button id="searchOrderBtn" class="btn-primary py-2.5 px-5 text-xs font-bold">
            ${Icons.Search("w-4 h-4")} Track
          </button>
        </div>
      </div>

      ${currentOrder ? `
        <!-- Active Order Timeline Box -->
        <div class="bg-white p-6 sm:p-10 rounded-3xl border border-[#3B1F1A]/10 shadow-sm flex flex-col gap-8">
          
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#3B1F1A]/10">
            <div>
              <span class="text-[11px] font-bold text-[#82756E] uppercase tracking-wider block">Tracking Order:</span>
              <h2 class="font-mono text-2xl font-bold text-[#0F5C47]">${currentOrder.orderId}</h2>
              <div class="text-xs text-[#5A4A42] mt-0.5">Placed on: ${currentOrder.displayDate || new Date(currentOrder.date).toLocaleDateString()}</div>
            </div>

            <div class="sm:text-right">
              <span class="inline-block px-4 py-1.5 rounded-full bg-[#E5EAD9] text-[#0F5C47] text-xs font-bold uppercase tracking-wider mb-1">
                Current Status: ${currentOrder.status}
              </span>
              <div class="text-xs font-bold text-[#6B2F33]">Total: ₹${currentOrder.total.toLocaleString()}</div>
            </div>
          </div>

          <!-- Progress Stepper -->
          <div class="relative py-4">
            <div class="grid grid-cols-1 sm:grid-cols-5 gap-6">
              ${currentOrder.trackingSteps.map((step, idx) => `
                <div class="flex sm:flex-col items-start sm:items-center sm:text-center gap-4 sm:gap-2 relative">
                  <div class="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${step.completed ? 'bg-[#0F5C47] text-white shadow-md' : (step.current ? 'bg-[#C9A24B] text-[#1F2A1A] ring-4 ring-[#C9A24B]/30 font-black' : 'bg-[#E5EAD9] text-[#82756E]')}">
                    ${step.completed ? Icons.Check("w-6 h-6") : idx + 1}
                  </div>
                  <div>
                    <h3 class="font-display font-bold text-sm text-[#1F2A1A]">${step.title}</h3>
                    <p class="text-[11px] text-[#82756E] font-medium mt-0.5">${step.date}</p>
                    <p class="text-[11px] text-[#5A4A42] mt-1 leading-snug hidden sm:block">${step.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Shipping Destination & Courier -->
          <div class="p-4 sm:p-6 rounded-2xl bg-[#F8F8F2] border border-[#3B1F1A]/8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span class="font-bold text-[#82756E] uppercase tracking-wider block mb-1">Delivering To:</span>
              <p class="font-bold text-[#1F2A1A]">${currentOrder.customer.name}</p>
              <p class="text-[#5A4A42] leading-relaxed mt-0.5">${currentOrder.customer.address}</p>
              <p class="text-[#5A4A42] mt-1">Phone: ${currentOrder.customer.phone}</p>
            </div>

            <div class="sm:text-right">
              <span class="font-bold text-[#82756E] uppercase tracking-wider block mb-1">Logistics Partner:</span>
              <p class="font-semibold text-[#1F2A1A]">BlueDart Climate Express (Simulated)</p>
              <p class="text-[#5A4A42]">AWB: 98124910294</p>
              <p class="text-[#0F5C47] font-semibold mt-1">Temperature Seal: Intact</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#3B1F1A]/10">
            <button id="viewInvoiceBtn" class="btn-primary py-2.5 px-5 text-xs font-bold" data-id="${currentOrder.orderId}">
              ${Icons.Printer("w-4 h-4")} Print Official Invoice
            </button>

            <a href="${getWhatsAppUrl('bulk')}" target="_blank" rel="noopener noreferrer" class="btn-secondary py-2.5 px-5 text-xs font-bold text-[#0F5C47] border-[#0F5C47]/40">
              ${Icons.WhatsApp("w-4 h-4 text-[#25D366]")} Help with Shipment
            </a>
          </div>

        </div>
      ` : `
        <div class="text-center py-16 bg-white rounded-3xl p-8 border border-[#3B1F1A]/10">
          <p class="text-sm text-[#5A4A42]">No active orders found. Place a trial demo order to test live tracking!</p>
          <a href="#/shop" class="btn-primary mt-4 py-2.5 px-6 text-xs font-bold">Visit Shop</a>
        </div>
      `}

    </div>
  `;
}

