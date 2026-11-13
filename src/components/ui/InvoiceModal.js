// Printable Demo Invoice Generator for CUP2EAT
import { store } from '../../context/store.js';
import { Icons } from './Icons.js';
import { BRAND_CONFIG } from '../../data/config.js';
import { ASSETS } from '../../data/images.js';

export function renderInvoiceModal() {
  const order = store.activeInvoiceOrder;
  if (!order) return '';

  return `
    <div class="modal-overlay open" id="invoiceModalOverlay">
      <div class="modal-content max-w-3xl p-6 sm:p-10 bg-white" role="dialog" aria-modal="true" aria-label="Order Invoice">
        
        <!-- Controls Bar (Hidden during print) -->
        <div class="no-print flex items-center justify-between pb-6 mb-6 border-b border-[#3B1F1A]/10">
          <div class="flex items-center gap-2">
            <span class="text-[#0F5C47]">${Icons.Printer("w-5 h-5")}</span>
            <span class="font-bold text-sm text-[#1F2A1A]">Official Demo Tax Invoice</span>
          </div>
          <div class="flex items-center gap-3">
            <button onclick="window.print()" class="btn-primary py-2 px-4 text-xs font-semibold cursor-pointer">
              ${Icons.Printer("w-4 h-4")} Print / Save as PDF
            </button>
            <button onclick="store.setInvoiceOrder(null)" class="p-2 text-[#5A4A42] hover:bg-[#3B1F1A]/10 rounded-full border-none bg-transparent cursor-pointer">
              ${Icons.X("w-5 h-5")}
            </button>
          </div>
        </div>

        <!-- Printable Document Canvas -->
        <div class="printable-invoice text-[#1F2A1A]">
          <!-- Invoice Header -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-8 border-b-2 border-[#1F2A1A]/10 gap-4">
            <div class="flex items-center gap-3">
              <img src="${ASSETS.logo}" alt="CUP2EAT" class="w-14 h-14 rounded-full border border-[#C9A24B]">
              <div>
                <h1 class="font-display text-2xl font-black text-[#0F5C47] tracking-wider">CUP2EAT</h1>
                <p class="text-xs font-semibold text-[#82756E] uppercase tracking-widest">${BRAND_CONFIG.primaryTagline}</p>
                <p class="text-[11px] text-[#5A4A42] mt-0.5">${BRAND_CONFIG.contact.address}</p>
              </div>
            </div>

            <div class="sm:text-right">
              <span class="inline-block px-3 py-1 bg-[#E5EAD9] text-[#0F5C47] font-bold text-xs rounded-full uppercase tracking-wider mb-1">
                ${order.paymentStatus || 'PAID DEMO'}
              </span>
              <h2 class="font-display text-lg font-bold">INVOICE: ${order.orderId}</h2>
              <p class="text-xs text-[#5A4A42]">Date: ${order.displayDate || new Date(order.date).toLocaleDateString()}</p>
              <p class="text-[11px] text-[#82756E]">GSTIN: ${BRAND_CONFIG.contact.gstin}</p>
            </div>
          </div>

          <!-- Customer & Shipping Info -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-[#3B1F1A]/10 text-xs">
            <div>
              <span class="font-bold text-[#82756E] uppercase tracking-wider block mb-1">Billed & Shipped To:</span>
              <p class="font-bold text-sm text-[#1F2A1A]">${order.customer.name}</p>
              <p class="text-[#5A4A42] leading-relaxed mt-0.5">${order.customer.address}</p>
              <p class="text-[#5A4A42] mt-1">Phone: ${order.customer.phone}</p>
              <p class="text-[#5A4A42]">Email: ${order.customer.email}</p>
            </div>

            <div class="sm:text-right">
              <span class="font-bold text-[#82756E] uppercase tracking-wider block mb-1">Payment & Logistics:</span>
              <p class="text-[#1F2A1A] font-semibold">Payment Method: ${order.paymentMethod}</p>
              <p class="text-[#1F2A1A] font-semibold">Current Status: <span class="text-[#0F5C47]">${order.status}</span></p>
              <p class="text-[#5A4A42] mt-1">Climate Courier: Express Temperature Sealed</p>
            </div>
          </div>

          <!-- Itemized Table -->
          <div class="py-6">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="border-b-2 border-[#1F2A1A]/10 text-[#82756E] uppercase">
                  <th class="py-2.5 font-bold">Item Description</th>
                  <th class="py-2.5 font-bold text-center">Pack Info</th>
                  <th class="py-2.5 font-bold text-center">Qty</th>
                  <th class="py-2.5 font-bold text-right">Unit Price</th>
                  <th class="py-2.5 font-bold text-right">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#3B1F1A]/8">
                ${order.items.map(item => `
                  <tr>
                    <td class="py-3">
                      <div class="font-bold text-sm text-[#1F2A1A]">${item.name}</div>
                      <div class="text-[11px] text-[#5A4A42]">Capacity: ${item.capacity} | Flavour: ${item.flavour || 'Standard'} ${item.variant && item.variant !== 'Standard Pack' ? `| Variant: ${item.variant}` : ''}</div>
                    </td>
                    <td class="py-3 text-center text-[#5A4A42]">${item.packLabel || 'Master Box'}</td>
                    <td class="py-3 text-center font-bold">${item.quantity}</td>
                    <td class="py-3 text-right text-[#5A4A42]">₹${item.price.toLocaleString()}</td>
                    <td class="py-3 text-right font-bold text-[#1F2A1A]">₹${(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Totals Calculation -->
          <div class="flex justify-end pt-4 border-t-2 border-[#1F2A1A]/10">
            <div class="w-full sm:w-64 flex flex-col gap-2 text-xs">
              <div class="flex justify-between text-[#5A4A42]">
                <span>Item Subtotal:</span>
                <span class="font-semibold text-[#1F2A1A]">₹${order.subtotal.toLocaleString()}</span>
              </div>

              ${order.discount > 0 ? `
                <div class="flex justify-between text-[#0F5C47] font-semibold">
                  <span>Discount (${order.promoCode || 'PROMO'}):</span>
                  <span>-₹${order.discount.toLocaleString()}</span>
                </div>
              ` : ''}

              <div class="flex justify-between text-[#5A4A42]">
                <span>Climate-Safe Shipping:</span>
                <span class="font-semibold text-[#1F2A1A]">${order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span>
              </div>

              <div class="flex justify-between text-[#5A4A42]">
                <span>GST (5% Packaged Food):</span>
                <span class="font-semibold text-[#1F2A1A]">₹${order.tax.toLocaleString()}</span>
              </div>

              <div class="flex justify-between text-base font-display font-bold text-[#6B2F33] pt-2 border-t border-[#3B1F1A]/10">
                <span>Grand Total:</span>
                <span>₹${order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <!-- Bottom Notice -->
          <div class="mt-8 pt-4 border-t border-[#3B1F1A]/10 text-[11px] text-[#82756E] text-center">
            <p class="font-semibold text-[#1F2A1A]">Thank you for partnering with CUP2EAT — EAT YOUR DRINK.</p>
            <p class="mt-0.5">Demonstration e-commerce invoice generated for proposal demonstration. FSSAI & GST Compliant.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

