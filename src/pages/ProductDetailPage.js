// CUP2EAT — Product Detail Page
// Editorial split layout, variant/flavour selectors, quantity counter, Add to Cart, Buy Now,
// WhatsApp bulk enquiry, supplied ingredients disclosure, and related products.

import { store } from '../context/store.js';
import { Icons } from '../components/ui/Icons.js';
import { BRAND_CONFIG, getWhatsAppUrl } from '../data/config.js';

export function renderProductDetailPage(slug) {
  const product = store.getProductBySlug(slug);
  if (!product) {
    return `
      <div class="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 class="font-display text-3xl font-bold text-[#1F2A1A] mb-4">Product Not Found</h2>
        <p class="text-sm text-[#5A4A42] mb-6">The requested edible cup could not be located in our catalogue.</p>
        <a href="#/shop" class="btn-primary">Return to Shop</a>
      </div>
    `;
  }

  const related = store.getProducts().filter(p => p.id !== product.id).slice(0, 3);

  return `
    <div class="product-detail-view max-w-7xl mx-auto px-6 py-10 flex flex-col gap-16">
      
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-xs text-[#82756E]" aria-label="Breadcrumb">
        <a href="#/" class="hover:text-[#0F5C47]">Home</a>
        <span>/</span>
        <a href="#/shop" class="hover:text-[#0F5C47]">Shop</a>
        <span>/</span>
        <span class="text-[#1F2A1A] font-medium">${product.name} (${product.capacity})</span>
      </nav>

      <!-- Main Split Editorial Section -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        <!-- Left: Image Gallery Showcase -->
        <div class="lg:col-span-7 flex flex-col gap-4">
          <div class="relative rounded-3xl overflow-hidden aspect-square bg-[#E5EAD9] shadow-lg border border-[#3B1F1A]/10">
            <img id="detailMainImage" 
                 src="${product.fallbackImage || product.primaryImage}" 
                 alt="${product.name}" 
                 class="w-full h-full object-cover transition-all duration-500" 
                 onerror="this.src='/public/images/client/product_100ml_regular.jpg'">
            <span class="capacity-pill text-sm px-4 py-1.5">${product.capacity}</span>
            <span class="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[#1F2A1A] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              ${product.packLabel}
            </span>
          </div>

          <!-- Feature Highlights under Image -->
          <div class="grid grid-cols-3 gap-3">
            <div class="p-3.5 rounded-2xl bg-white border border-[#3B1F1A]/8 text-center flex flex-col items-center gap-1">
              <span class="text-[#0F5C47]">${Icons.Sparkles("w-5 h-5")}</span>
              <span class="text-[11px] font-bold text-[#1F2A1A]">100% Edible</span>
              <span class="text-[10px] text-[#82756E]">Zero single-use trash</span>
            </div>
            <div class="p-3.5 rounded-2xl bg-white border border-[#3B1F1A]/8 text-center flex flex-col items-center gap-1">
              <span class="text-[#0F5C47]">${Icons.ShieldCheck("w-5 h-5")}</span>
              <span class="text-[11px] font-bold text-[#1F2A1A]">Leak-Proof</span>
              <span class="text-[10px] text-[#82756E]">Up to 85°C liquids</span>
            </div>
            <div class="p-3.5 rounded-2xl bg-white border border-[#3B1F1A]/8 text-center flex flex-col items-center gap-1">
              <span class="text-[#0F5C47]">${Icons.Leaf("w-5 h-5")}</span>
              <span class="text-[11px] font-bold text-[#1F2A1A]">Pure Veg</span>
              <span class="text-[10px] text-[#82756E]">Vegan upon request</span>
            </div>
          </div>
        </div>

        <!-- Right: Purchasing & Specifications -->
        <div class="lg:col-span-5 flex flex-col gap-6">
          
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xs font-bold uppercase tracking-wider text-[#0F5C47]">${product.suitableFor}</span>
              <span class="text-xs text-[#82756E]">• ${product.temperatureType}</span>
            </div>
            
            <h1 class="font-display text-3xl sm:text-4xl font-black text-[#1F2A1A] leading-tight">
              ${product.name}
            </h1>
            
            <p class="text-xs text-[#82756E] mt-1">${product.packLabel}</p>
          </div>

          <!-- Price Block -->
          <div class="p-5 rounded-2xl bg-[#E5EAD9]/60 border border-[#C9A24B]/30 flex items-baseline justify-between">
            <div>
              <div class="font-display text-3xl sm:text-4xl font-black text-[#6B2F33]">₹${product.price.toLocaleString()}</div>
              <div class="text-xs text-[#5A4A42] font-medium mt-0.5">${product.unitPriceDisplay} (Incl. of GST)</div>
            </div>
            <span class="px-3 py-1 rounded-full bg-[#0F5C47] text-white text-xs font-bold">
              ${product.inStock ? 'In Stock' : 'Pre-order'}
            </span>
          </div>

          <p class="text-xs sm:text-sm text-[#5A4A42] leading-relaxed">
            ${product.detailedStory || product.description}
          </p>

          <!-- Flavour Selector -->
          ${product.flavours && product.flavours.length > 0 ? `
            <div>
              <label class="block text-xs font-bold text-[#1F2A1A] uppercase tracking-wider mb-2">
                Select Flavour: <span id="selectedFlavourLabel" class="text-[#0F5C47] font-semibold">${product.defaultFlavour || product.flavours[0]}</span>
              </label>
              <div class="flex flex-wrap gap-2" id="detailFlavourGroup">
                ${product.flavours.map((flv, idx) => `
                  <button class="detail-flavour-btn px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${idx === 0 ? 'border-[#0F5C47] bg-[#0F5C47] text-white shadow-sm' : 'border-[#3B1F1A]/20 bg-white text-[#1F2A1A] hover:bg-[#E5EAD9]'}" data-flavour="${flv}">
                    ${flv}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Variant Selector (for Product 02 etc.) -->
          ${product.variants && product.variants.length > 1 ? `
            <div>
              <label class="block text-xs font-bold text-[#1F2A1A] uppercase tracking-wider mb-2">
                Style Variant: <span id="selectedVariantLabel" class="text-[#0F5C47] font-semibold">${product.defaultVariant || product.variants[0]}</span>
              </label>
              <div class="flex flex-wrap gap-2" id="detailVariantGroup">
                ${product.variants.map((vrt, idx) => `
                  <button class="detail-variant-btn px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${idx === 0 ? 'border-[#0F5C47] bg-[#E5EAD9] text-[#0F5C47]' : 'border-[#3B1F1A]/20 bg-white text-[#1F2A1A] hover:bg-[#E5EAD9]'}" data-variant="${vrt}">
                    ${vrt}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Quantity Selector & Action Controls -->
          <div class="flex flex-col gap-3 pt-4 border-t border-[#3B1F1A]/10">
            <div class="flex items-center gap-4">
              <span class="text-xs font-bold uppercase tracking-wider text-[#1F2A1A]">Boxes:</span>
              <div class="flex items-center border border-[#3B1F1A]/20 rounded-xl bg-white px-3 py-1.5 shadow-sm">
                <button id="detailQtyMinus" class="text-[#5A4A42] hover:text-[#0F5C47] border-none bg-transparent cursor-pointer p-1">
                  ${Icons.Minus("w-4 h-4")}
                </button>
                <span id="detailQtyDisplay" class="font-bold text-sm px-4 text-[#1F2A1A]">1</span>
                <button id="detailQtyPlus" class="text-[#5A4A42] hover:text-[#0F5C47] border-none bg-transparent cursor-pointer p-1">
                  ${Icons.Plus("w-4 h-4")}
                </button>
              </div>
            </div>

            <!-- Primary Buttons -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <button id="detailAddToCartBtn" class="btn-primary w-full py-3.5 text-sm font-bold justify-center" data-id="${product.id}">
                ${Icons.ShoppingCart("w-4 h-4")} Add to Cart
              </button>
              <button id="detailBuyNowBtn" class="btn-gold w-full py-3.5 text-sm font-bold justify-center" data-id="${product.id}">
                Buy Now ${Icons.ArrowRight("w-4 h-4")}
              </button>
            </div>

            <!-- WhatsApp B2B Bulk Button -->
            <a href="${getWhatsAppUrl('product', product)}" target="_blank" rel="noopener noreferrer" class="btn-secondary w-full py-3 text-xs font-bold text-center justify-center text-[#0F5C47] border-[#0F5C47]/40">
              ${Icons.WhatsApp("w-4 h-4 text-[#25D366]")} WhatsApp Bulk Order Enquiry
            </a>
          </div>

          <!-- Expandable Supplied Ingredients Accordion -->
          <div class="border border-[#3B1F1A]/15 rounded-2xl overflow-hidden mt-2 bg-white">
            <details class="group p-4 cursor-pointer">
              <summary class="font-bold text-xs text-[#1F2A1A] flex items-center justify-between list-none">
                <span class="flex items-center gap-2">
                  ${Icons.Leaf("w-4 h-4 text-[#0F5C47]")} Supplied Ingredients & Formulation
                </span>
                <span class="group-open:rotate-180 transition-transform">
                  ${Icons.ChevronDown("w-4 h-4")}
                </span>
              </summary>
              <div class="pt-3 text-xs text-[#5A4A42] leading-relaxed border-t border-[#3B1F1A]/8 mt-3">
                <p class="mb-2"><strong>Composition:</strong> ${BRAND_CONFIG.ingredientsNotice.list}</p>
                <div class="p-3 bg-[#E5EAD9]/50 rounded-xl text-[11px] text-[#3B1F1A] border-l-2 border-[#C9A24B]">
                  <strong>Owner Verification Notice:</strong> ${BRAND_CONFIG.ingredientsNotice.disclaimer}
                </div>
              </div>
            </details>

            <details class="group p-4 border-t border-[#3B1F1A]/8 cursor-pointer">
              <summary class="font-bold text-xs text-[#1F2A1A] flex items-center justify-between list-none">
                <span class="flex items-center gap-2">
                  ${Icons.Clock("w-4 h-4 text-[#C9A24B]")} Holding Time & Storage Guidance
                </span>
                <span class="group-open:rotate-180 transition-transform">
                  ${Icons.ChevronDown("w-4 h-4")}
                </span>
              </summary>
              <div class="pt-3 text-xs text-[#5A4A42] leading-relaxed border-t border-[#3B1F1A]/8 mt-3">
                <p>• Holds hot beverages up to 85°C for 35 to 40 minutes without structural leakage.</p>
                <p class="mt-1">• Holds cold shakes, iced coffee and ice cream for 45+ minutes.</p>
                <p class="mt-1">• Store in a cool, dry ambient room away from direct humidity in original sealed moisture barrier liners.</p>
                <p class="mt-1">• Shelf life: 6 months from packaging date.</p>
              </div>
            </details>
          </div>

        </div>

      </div>

      <!-- Related Products -->
      <div class="border-t border-[#3B1F1A]/10 pt-12">
        <h3 class="font-display text-2xl font-bold text-[#1F2A1A] mb-6">You Might Also Like</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          ${related.map(r => `
            <div class="cup-product-card">
              <div class="card-img-wrap aspect-[4/3]">
                <img src="${r.fallbackImage || r.primaryImage}" alt="${r.name}" onerror="this.src='/public/images/client/product_100ml_regular.jpg'">
                <span class="capacity-pill">${r.capacity}</span>
              </div>
              <div class="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 class="font-display font-bold text-sm text-[#1F2A1A]">${r.name}</h4>
                  <div class="font-display font-bold text-sm text-[#6B2F33] mt-1">₹${r.price.toLocaleString()}</div>
                </div>
                <div class="mt-3 pt-2 border-t border-[#3B1F1A]/8 flex items-center justify-between">
                  <a href="#/product/${r.slug}" class="text-xs font-bold text-[#0F5C47] hover:underline">View Cup →</a>
                  <button class="add-to-cart-btn btn-primary py-1 px-3 text-xs" data-id="${r.id}">Add</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}

