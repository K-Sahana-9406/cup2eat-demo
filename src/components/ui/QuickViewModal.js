// Quick View Product Modal for CUP2EAT
import { store } from '../../context/store.js';
import { Icons } from './Icons.js';
import { getWhatsAppUrl } from '../../data/config.js';

export function renderQuickViewModal() {
  const p = store.activeQuickViewProduct;
  if (!p) return '';

  return `
    <div class="modal-overlay open" id="quickViewOverlay">
      <div class="modal-content max-w-3xl p-6 sm:p-8" role="dialog" aria-modal="true" aria-label="${p.name} Quick View">
        <button onclick="store.setQuickViewProduct(null)" class="absolute top-4 right-4 p-2 text-[#5A4A42] hover:bg-[#3B1F1A]/10 rounded-full border-none bg-transparent cursor-pointer z-10">
          ${Icons.X("w-5 h-5")}
        </button>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div class="aspect-square rounded-2xl overflow-hidden bg-[#E5EAD9] relative">
            <img src="${p.fallbackImage || p.primaryImage}" alt="${p.name}" class="w-full h-full object-cover" onerror="this.src='/public/images/client/product_100ml_regular.jpg'">
            <span class="capacity-pill">${p.capacity}</span>
          </div>

          <div class="flex flex-col gap-4">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-[#0F5C47]">${p.suitableFor}</span>
              <h2 class="font-display text-2xl font-bold text-[#1F2A1A] mt-1">${p.name}</h2>
              <p class="text-xs text-[#5A4A42] mt-1">${p.packLabel}</p>
            </div>

            <div class="flex items-baseline gap-3">
              <span class="font-display text-2xl font-bold text-[#6B2F33]">₹${p.price.toLocaleString()}</span>
              <span class="text-xs text-[#82756E]">(${p.unitPriceDisplay})</span>
            </div>

            <p class="text-xs sm:text-sm text-[#5A4A42] leading-relaxed">
              ${p.description}
            </p>

            <!-- Flavours / Variants -->
            ${p.flavours && p.flavours.length > 1 ? `
              <div>
                <label class="block text-xs font-bold text-[#1F2A1A] mb-1.5">Select Flavour:</label>
                <div class="flex flex-wrap gap-2">
                  ${p.flavours.map((flv, idx) => `
                    <button class="quickview-flavour-btn text-xs px-3 py-1.5 rounded-full border ${idx === 0 ? 'border-[#0F5C47] bg-[#E5EAD9] font-bold text-[#0F5C47]' : 'border-[#3B1F1A]/20 bg-white text-[#1F2A1A]'} transition-all cursor-pointer" data-flavour="${flv}">
                      ${flv}
                    </button>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Actions -->
            <div class="flex flex-col gap-2.5 pt-2 border-t border-[#3B1F1A]/10">
              <button id="quickViewAddToCart" class="btn-primary w-full py-3 text-sm font-bold justify-center" data-id="${p.id}">
                ${Icons.ShoppingCart("w-4 h-4")} Add to Cart • ₹${p.price.toLocaleString()}
              </button>

              <div class="flex gap-2">
                <a href="#/product/${p.slug}" class="btn-secondary flex-1 py-2 text-xs text-center justify-center" onclick="store.setQuickViewProduct(null)">
                  View Full Details ${Icons.ArrowRight("w-3.5 h-3.5")}
                </a>
                <a href="${getWhatsAppUrl('product', p)}" target="_blank" rel="noopener noreferrer" class="btn-secondary py-2 px-3 text-xs flex items-center justify-center text-[#0F5C47]" title="Enquire on WhatsApp">
                  ${Icons.WhatsApp("w-4 h-4")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

