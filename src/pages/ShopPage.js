// CUP2EAT — Shop & Catalogue Page
// Category filters (Hot/Cold/Specialty), Capacity filters, Price sorting, Quick View & Add to Cart.

import { store } from '../context/store.js';
import { Icons } from '../components/ui/Icons.js';

export function renderShopPage(filterState = {}) {
  const allProducts = store.getProducts();

  // Filter params
  const activeCategory = filterState.category || 'all';
  const activeCapacity = filterState.capacity || 'all';
  const sortBy = filterState.sort || 'featured';
  const searchQuery = (filterState.search || '').toLowerCase().trim();

  // Apply filters
  let filtered = allProducts.filter(p => {
    // Category match
    if (activeCategory === 'hot' && p.category !== 'hot') return false;
    if (activeCategory === 'cold' && p.category !== 'cold') return false;
    if (activeCategory === 'specialty' && p.category !== 'specialty') return false;

    // Capacity match
    if (activeCapacity !== 'all' && !p.capacity.includes(activeCapacity)) return false;

    // Search query
    if (searchQuery) {
      const match = `${p.name} ${p.capacity} ${p.suitableFor} ${p.description} ${p.flavours.join(' ')}`.toLowerCase();
      if (!match.includes(searchQuery)) return false;
    }

    return true;
  });

  // Sort
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'qty-high') {
    filtered.sort((a, b) => b.quantity - a.quantity);
  }

  return `
    <div class="shop-view max-w-7xl mx-auto px-6 py-12 flex flex-col gap-10">
      
      <!-- Page Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between border-b border-[#3B1F1A]/10 pb-8 gap-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-[#0F5C47] block mb-2">The Edible Collection</span>
          <h1 class="font-display text-4xl sm:text-5xl font-black text-[#1F2A1A]">
            FIND YOUR PERFECT CUP.
          </h1>
          <p class="text-sm text-[#5A4A42] mt-2">
            100% edible serving vessels for hot chai, cold coffee, milkshakes, and specialty dessert beverages.
          </p>
        </div>

        <div class="text-xs font-semibold text-[#82756E]">
          Showing <span class="font-bold text-[#1F2A1A]">${filtered.length}</span> of ${allProducts.length} Cups
        </div>
      </div>

      <!-- Filters & Controls Bar -->
      <div class="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#3B1F1A]/10 shadow-sm">
        
        <!-- Category Filter Tabs -->
        <div class="flex flex-wrap items-center gap-2">
          ${[
            { id: 'all', label: 'All Cups' },
            { id: 'hot', label: '100 ML Hot', icon: Icons.Flame },
            { id: 'cold', label: '150 ML Cold', icon: Icons.Snowflake },
            { id: 'specialty', label: 'Chocolate Coated', icon: Icons.Sparkles }
          ].map(tab => `
            <button class="shop-filter-tab px-4 py-2 rounded-full text-xs font-bold transition-all border-none cursor-pointer flex items-center gap-1.5 ${activeCategory === tab.id ? 'bg-[#0F5C47] text-white shadow-md' : 'bg-[#E5EAD9] text-[#1F2A1A] hover:bg-[#C9A24B] hover:text-black'}" data-category="${tab.id}">
              ${tab.icon ? tab.icon("w-3.5 h-3.5") : ''}
              ${tab.label}
            </button>
          `).join('')}
        </div>

        <!-- Dropdown Controls: Capacity & Sort -->
        <div class="flex flex-wrap items-center gap-3">
          <!-- Capacity Filter -->
          <div class="flex items-center gap-1.5 text-xs text-[#5A4A42]">
            <span>Size:</span>
            <select id="shopCapacitySelect" class="bg-[#F8F8F2] border border-[#3B1F1A]/20 rounded-xl px-3 py-1.5 font-medium text-xs text-[#1F2A1A] focus:outline-none focus:border-[#0F5C47]">
              <option value="all" ${activeCapacity === 'all' ? 'selected' : ''}>All Capacities</option>
              <option value="100" ${activeCapacity === '100' ? 'selected' : ''}>100 ML (Hot)</option>
              <option value="150" ${activeCapacity === '150' ? 'selected' : ''}>150 ML (Cold)</option>
            </select>
          </div>

          <!-- Sort Select -->
          <div class="flex items-center gap-1.5 text-xs text-[#5A4A42]">
            <span>Sort:</span>
            <select id="shopSortSelect" class="bg-[#F8F8F2] border border-[#3B1F1A]/20 rounded-xl px-3 py-1.5 font-medium text-xs text-[#1F2A1A] focus:outline-none focus:border-[#0F5C47]">
              <option value="featured" ${sortBy === 'featured' ? 'selected' : ''}>Featured</option>
              <option value="price-low" ${sortBy === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
              <option value="price-high" ${sortBy === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
              <option value="qty-high" ${sortBy === 'qty-high' ? 'selected' : ''}>Pack Size: High to Low</option>
            </select>
          </div>

          <!-- Clear Filters Button -->
          ${activeCategory !== 'all' || activeCapacity !== 'all' || searchQuery ? `
            <button id="clearShopFilters" class="text-xs text-[#6B2F33] hover:underline font-bold px-2 py-1 cursor-pointer border-none bg-transparent">
              Reset Filters
            </button>
          ` : ''}
        </div>

      </div>

      <!-- Product Grid -->
      ${filtered.length === 0 ? `
        <div class="text-center py-20 bg-white rounded-3xl p-8 border border-[#3B1F1A]/10">
          <div class="w-16 h-16 rounded-full bg-[#E5EAD9] flex items-center justify-center text-[#0F5C47] mx-auto mb-4">
            ${Icons.Search("w-8 h-8")}
          </div>
          <h3 class="font-display text-2xl font-bold text-[#1F2A1A] mb-2">No matching cups found</h3>
          <p class="text-sm text-[#5A4A42] max-w-sm mx-auto mb-6">Try adjusting your filters or search keywords.</p>
          <button id="resetAllFiltersBtn" class="btn-primary py-2.5 px-6 text-xs">
            Show All Cups
          </button>
        </div>
      ` : `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          ${filtered.map(p => `
            <div class="cup-product-card">
              <div class="card-img-wrap">
                <img src="${p.fallbackImage || p.primaryImage}" 
                     alt="${p.name}" 
                     loading="lazy" 
                     onerror="this.src='/public/images/client/product_100ml_regular.jpg'">
                <span class="capacity-pill">${p.capacity}</span>
                ${p.isBestseller ? `
                  <span class="absolute top-4 right-4 bg-[#C9A24B] text-[#1F2A1A] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                    Bestseller
                  </span>
                ` : ''}
              </div>

              <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between text-xs mb-1">
                    <span class="font-bold text-[#0F5C47] uppercase tracking-wider text-[11px]">${p.suitableFor}</span>
                    <span class="text-[#82756E]">${p.quantity} cups / box</span>
                  </div>

                  <a href="#/product/${p.slug}" class="no-underline block group">
                    <h3 class="font-display font-bold text-xl text-[#1F2A1A] group-hover:text-[#0F5C47] transition-colors">${p.name}</h3>
                  </a>

                  <p class="text-xs text-[#5A4A42] line-clamp-2 mt-2 leading-relaxed">${p.description}</p>

                  <div class="flex flex-wrap gap-1.5 mt-3">
                    ${p.flavours.map(f => `
                      <span class="text-[10px] font-semibold bg-[#E5EAD9] text-[#1F2A1A] px-2 py-0.5 rounded-md">
                        ${f}
                      </span>
                    `).join('')}
                  </div>
                </div>

                <div class="pt-5 mt-5 border-t border-[#3B1F1A]/8 flex items-center justify-between">
                  <div>
                    <div class="font-display font-black text-xl text-[#6B2F33]">₹${p.price.toLocaleString()}</div>
                    <div class="text-[11px] text-[#82756E]">${p.unitPriceDisplay}</div>
                  </div>

                  <div class="flex items-center gap-2">
                    <button class="quick-view-btn p-2 text-[#5A4A42] hover:text-[#0F5C47] border border-[#3B1F1A]/10 rounded-full hover:bg-white transition-all cursor-pointer" data-id="${p.id}" title="Quick View">
                      ${Icons.Eye("w-4 h-4")}
                    </button>
                    <button class="add-to-cart-btn btn-primary py-2 px-4 text-xs font-bold" data-id="${p.id}">
                      ${Icons.ShoppingCart("w-3.5 h-3.5")} Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `}

      <!-- Bottom B2B Wholesale Banner -->
      <div class="bg-[#1F2A1A] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 mt-8 border border-[#C9A24B]/30">
        <div class="max-w-xl">
          <span class="text-xs font-bold text-[#C9A24B] uppercase tracking-wider block mb-1">Commercial Purchasing</span>
          <h3 class="font-display text-2xl sm:text-3xl font-bold mb-2">Need 1,000+ Cups for Your Café or Chain?</h3>
          <p class="text-xs sm:text-sm text-[#E5EAD9]/80">
            We offer wholesale pricing, custom pallet delivery, and scheduled recurring shipments for food & beverage businesses.
          </p>
        </div>
        <a href="#/business" class="btn-gold py-3 px-6 text-sm font-bold flex-shrink-0">
          Enquire for B2B Pricing ${Icons.ArrowRight("w-4 h-4")}
        </a>
      </div>

    </div>
  `;
}

