// Premium Real-Time Product Search Overlay for CUP2EAT
import { store } from '../../context/store.js';
import { Icons } from './Icons.js';

export function renderSearchModal() {
  const isOpen = store.isSearchOpen;
  const products = store.getProducts();

  return `
    <div class="modal-overlay ${isOpen ? 'open' : ''}" id="searchModalOverlay">
      <div class="modal-content max-w-2xl p-6 sm:p-8" role="dialog" aria-modal="true" aria-label="Search Cups">
        <div class="flex items-center justify-between pb-4 border-b border-[#3B1F1A]/10">
          <div class="flex items-center gap-2 text-[#0F5C47]">
            ${Icons.Search("w-5 h-5")}
            <h3 class="font-display text-lg font-bold text-[#1F2A1A]">Search CUP2EAT Collection</h3>
          </div>
          <button id="closeSearchModalBtn" class="p-2 text-[#5A4A42] hover:bg-[#3B1F1A]/10 rounded-full border-none bg-transparent cursor-pointer">
            ${Icons.X("w-5 h-5")}
          </button>
        </div>

        <!-- Search Input Field -->
        <div class="relative my-6">
          <input type="text" 
                 id="liveSearchInput" 
                 placeholder="Search by cup name, 100 ML, 150 ML, chai, chocolate, elaichi..." 
                 class="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-[#C9A24B]/30 focus:border-[#0F5C47] focus:outline-none bg-[#F8F8F2] text-[#1F2A1A] font-medium text-sm transition-all"
                 autofocus>
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A4A42]">
            ${Icons.Search("w-5 h-5")}
          </span>
        </div>

        <!-- Popular Tags -->
        <div class="flex flex-wrap items-center gap-2 mb-6">
          <span class="text-xs font-semibold text-[#82756E]">Quick Picks:</span>
          ${['100 ML Hot', '150 ML Cold', 'Chocolate Coated', 'Elaichi', 'Chai', 'Shake'].map(tag => `
            <button class="search-tag-btn text-xs px-3 py-1 rounded-full bg-[#E5EAD9] hover:bg-[#C9A24B] hover:text-black text-[#1F2A1A] font-medium transition-colors border-none cursor-pointer" data-tag="${tag}">
              ${tag}
            </button>
          `).join('')}
        </div>

        <!-- Live Search Results Container -->
        <div id="searchResultsList" class="max-h-80 overflow-y-auto flex flex-col gap-3">
          ${products.map(p => `
            <div class="search-result-item flex items-center justify-between p-3 rounded-xl bg-[#F8F8F2] hover:bg-[#E5EAD9] transition-colors border border-[#3B1F1A]/5" data-search="${p.name} ${p.capacity} ${p.suitableFor} ${p.flavours.join(' ')}">
              <div class="flex items-center gap-3">
                <img src="${p.fallbackImage || p.primaryImage}" alt="${p.name}" class="w-14 h-14 object-cover rounded-lg bg-white flex-shrink-0" onerror="this.src='/public/images/client/product_100ml_regular.jpg'">
                <div>
                  <h4 class="font-display font-semibold text-sm text-[#1F2A1A]">${p.name}</h4>
                  <div class="flex items-center gap-2 text-xs text-[#5A4A42]">
                    <span class="font-bold text-[#0F5C47]">${p.capacity}</span>
                    <span>• ${p.quantity} cups</span>
                    <span class="text-[#6B2F33] font-bold">₹${p.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <a href="#/product/${p.slug}" class="btn-secondary px-3 py-1.5 text-xs" onclick="store.closeSearch()">
                  Details
                </a>
                <button class="quick-add-btn btn-primary px-3 py-1.5 text-xs" data-id="${p.id}" onclick="store.closeSearch()">
                  ${Icons.Plus("w-3 h-3")} Add
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

