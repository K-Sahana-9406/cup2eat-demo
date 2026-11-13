// CUP2EAT — Homepage Implementation
// Complete 11 sections matching the exact brand identity & editorial aesthetic.

import { store } from '../context/store.js';
import { Icons } from '../components/ui/Icons.js';
import { ASSETS } from '../data/images.js';
import { BRAND_CONFIG, getWhatsAppUrl } from '../data/config.js';

export function renderHomePage() {
  const products = store.getProducts();
  const featuredProduct = products.find(p => p.id === 'p1') || products[0];
  const otherProducts = products.filter(p => p.id !== 'p1');

  return `
    <div class="homepage-view flex flex-col gap-20 sm:gap-28 pb-16">
      
      <!-- ==============================================
           SECTION A — IMMERSIVE HERO
           ============================================== -->
      <section class="relative min-h-[92vh] flex items-center justify-center rounded-3xl sm:rounded-[3rem] overflow-hidden mx-3 sm:mx-6 mt-3 sm:mt-6 shadow-2xl border border-[#C9A24B]/20">
        <!-- Background Immersive Image -->
        <div class="absolute inset-0 z-0">
          <img src="${ASSETS.hero.primary}" 
               alt="${ASSETS.hero.alt}" 
               class="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out" 
               onerror="this.src='${ASSETS.hero.fallback}'">
          <!-- Multi-stop Luxury Vignette Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-[#1F2A1A] via-[#1F2A1A]/75 to-[#1F2A1A]/40"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-[#1F2A1A]/90 via-transparent to-[#1F2A1A]/60"></div>
        </div>

        <!-- Hero Content Overlay -->
        <div class="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center flex flex-col items-center">
          
          <!-- Small Brand Pill -->
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5EAD9]/15 backdrop-blur-md border border-[#C9A24B]/40 text-[#E5EAD9] text-xs font-bold tracking-widest uppercase mb-6 animate-pulse">
            <span class="w-2 h-2 rounded-full bg-[#C9A24B]"></span>
            ${BRAND_CONFIG.primaryTagline}
          </div>

          <!-- Oversized Fraunces Editorial Headline -->
          <h1 class="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#F8F8F2] tracking-tight leading-[1.05] mb-6 max-w-4xl drop-shadow-md">
            WHAT IF YOUR CUP <span class="italic text-[#C9A24B] font-normal">WAS THE DESSERT?</span>
          </h1>

          <!-- Supporting Editorial Copy -->
          <p class="text-base sm:text-xl text-[#E5EAD9] max-w-2xl font-light leading-relaxed mb-3">
            Meet the cup that doesn't end up as just another disposable.
          </p>
          <p class="text-xs sm:text-sm text-[#E5EAD9]/80 max-w-xl font-light mb-10">
            From your first sip to your final bite, experience beverages in a completely different way.
          </p>

          <!-- Call to Action Buttons -->
          <div class="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a href="#/shop" class="btn-primary w-full sm:w-auto text-base py-4 px-8 font-bold">
              ${Icons.ShoppingBag("w-5 h-5")} EXPLORE OUR CUPS
            </a>
            <a href="#/about" class="btn-secondary w-full sm:w-auto text-base py-4 px-8 bg-white/10 text-white backdrop-blur-md border-[#E5EAD9]/40 hover:bg-[#E5EAD9] hover:text-[#1F2A1A]">
              DISCOVER THE EXPERIENCE ${Icons.ArrowRight("w-4 h-4")}
            </a>
          </div>

          <!-- Scroll Indicator -->
          <div class="mt-14 flex flex-col items-center text-[#E5EAD9]/70 text-xs gap-2">
            <span class="tracking-widest uppercase text-[10px] font-semibold">Scroll to Taste</span>
            <div class="w-5 h-9 rounded-full border-2 border-[#C9A24B]/40 flex items-start justify-center p-1">
              <span class="w-1.5 h-2 bg-[#C9A24B] rounded-full animate-bounce"></span>
            </div>
          </div>
        </div>
      </section>


      <!-- ==============================================
           SECTION B — BRAND STORY (Asymmetric Split)
           ============================================== -->
      <section class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          <!-- Image Side -->
          <div class="lg:col-span-6 relative">
            <div class="relative rounded-3xl overflow-hidden shadow-2xl bg-[#E5EAD9] aspect-[4/3] border border-[#3B1F1A]/10">
              <img src="${ASSETS.brandStory.primary}" 
                   alt="${ASSETS.brandStory.alt}" 
                   class="w-full h-full object-cover" 
                   onerror="this.src='${ASSETS.brandStory.fallback}'">
            </div>
            <!-- Decorative Floating Tag -->
            <div class="absolute -bottom-6 -right-6 sm:bottom-6 sm:-right-8 bg-[#1F2A1A] text-[#F8F8F2] p-5 rounded-2xl shadow-xl border border-[#C9A24B]/30 max-w-xs hidden sm:block">
              <div class="flex items-center gap-2 text-[#C9A24B] text-xs font-bold uppercase tracking-wider mb-1">
                ${Icons.Sparkles("w-4 h-4")} Sensory Innovation
              </div>
              <p class="text-xs text-[#E5EAD9] leading-relaxed">
                "An edible way to make every sip more memorable."
              </p>
            </div>
          </div>

          <!-- Text Side -->
          <div class="lg:col-span-6 flex flex-col gap-6">
            <div class="inline-flex items-center gap-2 text-[#0F5C47] text-xs font-bold tracking-widest uppercase">
              <span class="w-8 h-[2px] bg-[#0F5C47]"></span>
              THE CUP YOU CAN EAT
            </div>

            <h2 class="font-display text-3xl sm:text-5xl font-black text-[#1F2A1A] leading-tight">
              MORE THAN JUST A CUP.
            </h2>

            <div class="flex flex-col gap-4 text-[#5A4A42] text-sm sm:text-base leading-relaxed">
              <p class="font-medium text-[#1F2A1A] text-lg">
                CUP2EAT is built around a simple idea — why should the cup be something you throw away when it can become part of the experience?
              </p>
              <p>
                We bring edible cups to cafés, restaurants, events and businesses looking for a unique, memorable and more sustainable way to serve beverages.
              </p>
              <p>
                From everyday chai and coffee to cold coffee and shakes, CUP2EAT turns an ordinary beverage into an experience customers remember and share.
              </p>
            </div>

            <div class="pt-4 flex items-center gap-4">
              <a href="#/about" class="btn-primary py-3 px-6 text-sm">
                GET TO KNOW US ${Icons.ArrowRight("w-4 h-4")}
              </a>
              <a href="#/business" class="btn-secondary py-3 px-6 text-sm">
                For Businesses
              </a>
            </div>
          </div>

        </div>
      </section>


      <!-- ==============================================
           SECTION C — THE CUP2EAT DIFFERENCE (6 Benefits)
           ============================================== -->
      <section class="max-w-7xl mx-auto px-6 w-full">
        <div class="text-center max-w-2xl mx-auto mb-14">
          <span class="text-xs font-bold uppercase tracking-widest text-[#0F5C47] block mb-2">Core Foundations</span>
          <h2 class="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2A1A]">
            NOT JUST SERVING. CREATING AN EXPERIENCE.
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${[
            { num: "01", title: "100% Edible", desc: "The cup becomes part of the beverage experience. Eat it as a dessert after finishing your drink.", icon: Icons.Sparkles },
            { num: "02", title: "Pure Veg", desc: "Crafted with pure vegetarian ingredients, strictly compliant for cafés catering to vegetarian customers.", icon: Icons.Leaf },
            { num: "03", title: "Vegan Option Available", desc: "We provide dedicated vegan formulation batches for businesses offering plant-based menus upon request.", icon: Icons.CheckCircle },
            { num: "04", title: "Leak-Proof", desc: "Specially formulated structural density to hold hot liquids up to 85°C and cold frappes with zero leaks.", icon: Icons.ShieldCheck },
            { num: "05", title: "Unique Customer Experience", desc: "Something customers remember, photograph, and talk about. Instant word-of-mouth branding for cafés.", icon: Icons.Coffee },
            { num: "06", title: "Sustainable Alternative", desc: "A creative approach to conventional single-use disposable cups. You eat the container, creating zero trash.", icon: Icons.Flame }
          ].map(card => `
            <div class="p-8 rounded-3xl bg-[#E5EAD9]/50 border border-[#3B1F1A]/8 hover:border-[#C9A24B] hover:bg-[#E5EAD9] transition-all hover:-translate-y-1 group">
              <div class="flex items-center justify-between mb-6">
                <span class="font-display font-black text-2xl text-[#C9A24B]">${card.num}</span>
                <span class="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#0F5C47] group-hover:scale-110 transition-transform">
                  ${card.icon("w-6 h-6")}
                </span>
              </div>
              <h3 class="font-display text-xl font-bold text-[#1F2A1A] mb-2">${card.title}</h3>
              <p class="text-xs sm:text-sm text-[#5A4A42] leading-relaxed">${card.desc}</p>
            </div>
          `).join('')}
        </div>
      </section>


      <!-- ==============================================
           SECTION D — SIGNATURE PRODUCT SHOWCASE (All 5 Products)
           ============================================== -->
      <section class="max-w-7xl mx-auto px-6 w-full">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span class="text-xs font-bold uppercase tracking-widest text-[#0F5C47] block mb-2">Our Signature Range</span>
            <h2 class="font-display text-3xl sm:text-5xl font-bold text-[#1F2A1A]">
              MEET YOUR NEW FAVOURITE CUP.
            </h2>
            <p class="text-sm text-[#5A4A42] mt-2">One collection. Different ways to enjoy.</p>
          </div>
          <a href="#/shop" class="btn-secondary self-start md:self-auto py-2.5 px-5 text-sm">
            View All 5 Cups ${Icons.ArrowRight("w-4 h-4")}
          </a>
        </div>

        <!-- Asymmetric Layout: Large Featured + 4 Grid Cards -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <!-- Hero Product Card (Featured) -->
          <div class="lg:col-span-5 flex">
            <div class="cup-product-card w-full flex flex-col justify-between p-6 sm:p-8 bg-[#1F2A1A] text-[#F8F8F2] border-[#C9A24B]/30">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <span class="px-3.5 py-1 rounded-full bg-[#C9A24B] text-[#1F2A1A] font-bold text-xs uppercase tracking-wider">
                    ★ Most Popular
                  </span>
                  <span class="text-xs text-[#E5EAD9]/80 font-bold tracking-widest uppercase">${featuredProduct.capacity} HOT</span>
                </div>

                <div class="rounded-2xl overflow-hidden aspect-[4/3] mb-6 bg-white/10 relative">
                  <img src="${featuredProduct.fallbackImage || featuredProduct.primaryImage}" 
                       alt="${featuredProduct.name}" 
                       class="w-full h-full object-cover" 
                       onerror="this.src='/public/images/client/product_100ml_regular.jpg'">
                </div>

                <h3 class="font-display text-2xl sm:text-3xl font-bold text-white mb-2">${featuredProduct.name}</h3>
                <p class="text-xs sm:text-sm text-[#E5EAD9]/80 leading-relaxed mb-4">${featuredProduct.description}</p>
                
                <div class="flex items-center gap-2 text-xs text-[#C9A24B] mb-6">
                  <span>Flavours: ${featuredProduct.flavours.join(' • ')}</span>
                </div>
              </div>

              <div class="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div class="font-display text-3xl font-black text-[#C9A24B]">₹${featuredProduct.price.toLocaleString()}</div>
                  <div class="text-[11px] text-[#E5EAD9]/70">${featuredProduct.quantity} cups (${featuredProduct.unitPriceDisplay})</div>
                </div>

                <div class="flex items-center gap-2">
                  <button class="quick-view-btn px-3 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer border-none" data-id="${featuredProduct.id}">
                    Quick View
                  </button>
                  <button class="add-to-cart-btn btn-gold py-2.5 px-4 text-xs font-bold" data-id="${featuredProduct.id}">
                    ${Icons.ShoppingCart("w-4 h-4")} Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 4 Supporting Product Cards -->
          <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            ${otherProducts.map(p => `
              <div class="cup-product-card">
                <div class="card-img-wrap">
                  <img src="${p.fallbackImage || p.primaryImage}" 
                       alt="${p.name}" 
                       onerror="this.src='/public/images/client/product_100ml_regular.jpg'">
                  <span class="capacity-pill">${p.capacity}</span>
                </div>

                <div class="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span class="text-[11px] font-bold uppercase tracking-wider text-[#0F5C47]">${p.suitableFor}</span>
                    <h4 class="font-display font-bold text-base text-[#1F2A1A] mt-1">${p.name}</h4>
                    <p class="text-xs text-[#5A4A42] line-clamp-2 mt-1">${p.description}</p>
                  </div>

                  <div class="mt-4 pt-3 border-t border-[#3B1F1A]/8 flex items-center justify-between">
                    <div>
                      <div class="font-display font-bold text-base text-[#6B2F33]">₹${p.price.toLocaleString()}</div>
                      <div class="text-[10px] text-[#82756E]">${p.quantity} cups</div>
                    </div>

                    <div class="flex items-center gap-1.5">
                      <button class="quick-view-btn p-2 text-[#5A4A42] hover:text-[#0F5C47] border-none bg-transparent cursor-pointer" data-id="${p.id}" title="Quick View">
                        ${Icons.Eye("w-4 h-4")}
                      </button>
                      <button class="add-to-cart-btn btn-primary py-1.5 px-3 text-xs" data-id="${p.id}">
                        ${Icons.Plus("w-3.5 h-3.5")} Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

        </div>
      </section>


      <!-- ==============================================
           SECTION E — HOW IT WORKS (3 Step Immersion)
           ============================================== -->
      <section class="max-w-7xl mx-auto px-6 w-full">
        <div class="rounded-3xl sm:rounded-[3rem] bg-[#1F2A1A] text-[#F8F8F2] p-8 sm:p-16 border border-[#C9A24B]/30 relative overflow-hidden">
          
          <div class="text-center max-w-2xl mx-auto mb-14 relative z-10">
            <span class="text-xs font-bold uppercase tracking-widest text-[#C9A24B] block mb-2">The Experience Ritual</span>
            <h2 class="font-display text-3xl sm:text-5xl font-black text-white">
              SIP IT. ENJOY IT. EAT IT.
            </h2>
            <p class="text-sm text-[#E5EAD9]/80 mt-2">Three simple steps to transform your daily beverage.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <!-- Step 1: POUR -->
            <div class="flex flex-col bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-[#C9A24B]/60 transition-colors">
              <div class="aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-white/10">
                <img src="${ASSETS.howItWorks.step1.primary}" 
                     alt="${ASSETS.howItWorks.step1.alt}" 
                     class="w-full h-full object-cover" 
                     onerror="this.src='${ASSETS.howItWorks.step1.fallback}'">
              </div>
              <div class="flex items-center gap-3 mb-2">
                <span class="font-display font-black text-2xl text-[#C9A24B]">01</span>
                <h3 class="font-display text-xl font-bold text-white">POUR</h3>
              </div>
              <p class="text-xs sm:text-sm text-[#E5EAD9]/80 leading-relaxed">
                Pour your favourite beverage into the edible cup. Holds hot coffee, chai, or chilled frappes effortlessly.
              </p>
            </div>

            <!-- Step 2: SIP -->
            <div class="flex flex-col bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-[#C9A24B]/60 transition-colors">
              <div class="aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-white/10">
                <img src="${ASSETS.howItWorks.step2.primary}" 
                     alt="${ASSETS.howItWorks.step2.alt}" 
                     class="w-full h-full object-cover" 
                     onerror="this.src='${ASSETS.howItWorks.step2.fallback}'">
              </div>
              <div class="flex items-center gap-3 mb-2">
                <span class="font-display font-black text-2xl text-[#C9A24B]">02</span>
                <h3 class="font-display text-xl font-bold text-white">SIP</h3>
              </div>
              <p class="text-xs sm:text-sm text-[#E5EAD9]/80 leading-relaxed">
                Enjoy your tea, coffee, cold coffee or shake. The cup maintains temperature and preserves pristine liquid flavor.
              </p>
            </div>

            <!-- Step 3: EAT -->
            <div class="flex flex-col bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-[#C9A24B]/60 transition-colors">
              <div class="aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-white/10">
                <img src="${ASSETS.howItWorks.step3.primary}" 
                     alt="${ASSETS.howItWorks.step3.alt}" 
                     class="w-full h-full object-cover" 
                     onerror="this.src='${ASSETS.howItWorks.step3.fallback}'">
              </div>
              <div class="flex items-center gap-3 mb-2">
                <span class="font-display font-black text-2xl text-[#C9A24B]">03</span>
                <h3 class="font-display text-xl font-bold text-white">EAT</h3>
              </div>
              <p class="text-xs sm:text-sm text-[#E5EAD9]/80 leading-relaxed">
                Enjoy the edible cup after your beverage. A crisp, golden biscuit dessert that completes the serving.
              </p>
            </div>
          </div>

        </div>
      </section>


      <!-- ==============================================
           SECTION F — HOT AND COLD COLLECTION (Split Screen)
           ============================================== -->
      <section class="max-w-7xl mx-auto px-6 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <!-- HOT COLLECTION (100 ML) -->
          <div class="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#3B1F1A] to-[#6B2F33] text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div>
              <div class="flex items-center justify-between mb-6">
                <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D9A56B]/25 text-[#D9A56B] text-xs font-bold uppercase tracking-wider">
                  ${Icons.Flame("w-4 h-4 text-[#D9A56B]")} 100 ML Capacity
                </span>
                <span class="text-xs text-[#D9A56B] font-semibold">Hot Range</span>
              </div>

              <h3 class="font-display text-3xl sm:text-4xl font-black mb-3">HOT COLLECTION</h3>
              <p class="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                Specifically baked with balanced biscuit density for hot tea, aromatic elaichi chai, and espresso.
              </p>

              <div class="rounded-2xl overflow-hidden aspect-[16/9] mb-6 bg-black/20">
                <img src="${ASSETS.collections.hot.primary}" alt="Hot tea in edible cup" class="w-full h-full object-cover">
              </div>

              <div class="flex flex-wrap gap-2 text-xs mb-8">
                <span class="px-3 py-1 rounded-full bg-white/10 font-medium">Masala Chai</span>
                <span class="px-3 py-1 rounded-full bg-white/10 font-medium">Filter Coffee</span>
                <span class="px-3 py-1 rounded-full bg-white/10 font-medium">Hot Chocolate</span>
                <span class="px-3 py-1 rounded-full bg-white/10 font-medium">Espresso Cortado</span>
              </div>
            </div>

            <a href="#/shop" class="btn-primary bg-[#D9A56B] text-[#1F2A1A] hover:bg-white font-bold w-full justify-center">
              Explore 100 ML Hot Cups ${Icons.ArrowRight("w-4 h-4")}
            </a>
          </div>

          <!-- COLD COLLECTION (150 ML) -->
          <div class="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#1F2A1A] to-[#0F5C47] text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div>
              <div class="flex items-center justify-between mb-6">
                <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E5EAD9]/25 text-[#E5EAD9] text-xs font-bold uppercase tracking-wider">
                  ${Icons.Snowflake("w-4 h-4 text-[#E5EAD9]")} 150 ML Capacity
                </span>
                <span class="text-xs text-[#E5EAD9] font-semibold">Cold Range</span>
              </div>

              <h3 class="font-display text-3xl sm:text-4xl font-black mb-3">COLD COLLECTION</h3>
              <p class="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                A larger serving volume engineered for iced coffees, thick milkshakes, and cold blended beverages.
              </p>

              <div class="rounded-2xl overflow-hidden aspect-[16/9] mb-6 bg-black/20">
                <img src="${ASSETS.collections.cold.primary}" alt="Cold coffee in edible cup" class="w-full h-full object-cover">
              </div>

              <div class="flex flex-wrap gap-2 text-xs mb-8">
                <span class="px-3 py-1 rounded-full bg-white/10 font-medium">Iced Americano</span>
                <span class="px-3 py-1 rounded-full bg-white/10 font-medium">Cold Brew Shake</span>
                <span class="px-3 py-1 rounded-full bg-white/10 font-medium">Chocolate Frappe</span>
                <span class="px-3 py-1 rounded-full bg-white/10 font-medium">Matcha Latte</span>
              </div>
            </div>

            <a href="#/shop" class="btn-primary bg-[#E5EAD9] text-[#0F5C47] hover:bg-white font-bold w-full justify-center">
              Explore 150 ML Cold Cups ${Icons.ArrowRight("w-4 h-4")}
            </a>
          </div>

        </div>
      </section>


      <!-- ==============================================
           SECTION G — PRODUCT COMPARISON TABLE
           ============================================== -->
      <section class="max-w-7xl mx-auto px-6 w-full">
        <div class="text-center max-w-2xl mx-auto mb-10">
          <span class="text-xs font-bold uppercase tracking-widest text-[#0F5C47] block mb-2">Comparison Matrix</span>
          <h2 class="font-display text-3xl sm:text-4xl font-bold text-[#1F2A1A]">
            ONE RANGE. CLEAR CHOICES.
          </h2>
          <p class="text-xs sm:text-sm text-[#5A4A42] mt-2">100 ML & 150 ML specifications side-by-side.</p>
        </div>

        <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#3B1F1A]/10 overflow-x-auto">
          <table class="w-full text-left text-xs sm:text-sm border-collapse min-w-[620px]">
            <thead>
              <tr class="border-b-2 border-[#1F2A1A]/10 text-[#82756E] uppercase tracking-wider text-xs">
                <th class="py-4 font-bold">Product</th>
                <th class="py-4 font-bold">Size</th>
                <th class="py-4 font-bold">Best For</th>
                <th class="py-4 font-bold">Quantity</th>
                <th class="py-4 font-bold text-right">Price</th>
                <th class="py-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#3B1F1A]/8">
              ${products.map(p => `
                <tr class="hover:bg-[#F8F8F2] transition-colors">
                  <td class="py-4">
                    <div class="flex items-center gap-3">
                      <img src="${p.fallbackImage || p.primaryImage}" alt="${p.name}" class="w-12 h-12 object-cover rounded-xl bg-[#E5EAD9]" onerror="this.src='/public/images/client/product_100ml_regular.jpg'">
                      <div>
                        <div class="font-bold text-[#1F2A1A]">${p.name}</div>
                        <div class="text-[11px] text-[#5A4A42]">${p.defaultFlavour || p.flavours[0]}</div>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 font-bold text-[#0F5C47]">${p.capacity}</td>
                  <td class="py-4 text-[#5A4A42]">${p.suitableFor}</td>
                  <td class="py-4 font-medium text-[#1F2A1A]">${p.quantity} cups</td>
                  <td class="py-4 text-right">
                    <span class="price-pill">₹${p.price.toLocaleString()}</span>
                  </td>
                  <td class="py-4 text-center">
                    <button class="add-to-cart-btn btn-primary py-1.5 px-3 text-xs" data-id="${p.id}">
                      Add to Cart
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>


      <!-- ==============================================
           SECTION H — BUSINESS SOLUTIONS (B2B Showcase)
           ============================================== -->
      <section class="max-w-7xl mx-auto px-6 w-full">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span class="text-xs font-bold uppercase tracking-widest text-[#0F5C47] block mb-2">Hospitality & Commercial</span>
            <h2 class="font-display text-3xl sm:text-5xl font-bold text-[#1F2A1A]">
              BUILT FOR BUSINESSES.
            </h2>
            <p class="text-xs sm:text-sm text-[#5A4A42] mt-2 max-w-xl">
              Whether you run a café, restaurant, tea shop, catering business or event, CUP2EAT brings something memorable to every serving.
            </p>
          </div>

          <a href="#/business" class="btn-primary py-3 px-6 text-sm font-bold">
            BRING CUP2EAT TO YOUR BUSINESS ${Icons.ArrowRight("w-4 h-4")}
          </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${Object.values(ASSETS.businessVenues).map(venue => `
            <div class="rounded-2xl overflow-hidden bg-white border border-[#3B1F1A]/8 shadow-sm hover:shadow-xl transition-all group">
              <div class="aspect-[16/10] overflow-hidden bg-[#E5EAD9]">
                <img src="${venue.image}" alt="${venue.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              </div>
              <div class="p-5">
                <h4 class="font-display font-bold text-base text-[#1F2A1A] mb-1">${venue.title}</h4>
                <p class="text-xs text-[#5A4A42] leading-relaxed">${venue.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>


      <!-- ==============================================
           SECTION I — EXPERIENCE COMPARISON
           ============================================== -->
      <section class="max-w-5xl mx-auto px-6 w-full">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <span class="text-xs font-bold uppercase tracking-widest text-[#0F5C47] block mb-2">Editorial Perspective</span>
          <h2 class="font-display text-3xl sm:text-5xl font-bold text-[#1F2A1A]">
            WHY SERVE ORDINARY?
          </h2>
          <p class="text-xs sm:text-sm text-[#5A4A42] mt-2">How CUP2EAT transforms the traditional takeaway cup into a culinary highlight.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Conventional Disposable -->
          <div class="p-8 rounded-3xl bg-white border border-[#3B1F1A]/10 flex flex-col justify-between">
            <div>
              <span class="text-xs font-bold text-[#82756E] uppercase tracking-wider block mb-2">Conventional Serving</span>
              <h3 class="font-display text-2xl font-bold text-[#5A4A42] mb-4">Standard Disposable Cup</h3>
              
              <ul class="flex flex-col gap-3 text-xs sm:text-sm text-[#82756E]">
                <li class="flex items-center gap-2">
                  <span class="text-red-500 font-bold">✕</span> Thrown into trash immediately after drinking
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-red-500 font-bold">✕</span> Neutral, paper or plastic taste
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-red-500 font-bold">✕</span> Zero photo or social sharing excitement
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-red-500 font-bold">✕</span> Single-use waste accumulation
                </li>
              </ul>
            </div>
          </div>

          <!-- CUP2EAT Edible Cup -->
          <div class="p-8 rounded-3xl bg-[#1F2A1A] text-white border-2 border-[#C9A24B] shadow-2xl flex flex-col justify-between relative">
            <span class="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[#C9A24B] text-[#1F2A1A] text-[10px] font-black uppercase tracking-widest">
              Signature Innovation
            </span>
            <div>
              <span class="text-xs font-bold text-[#C9A24B] uppercase tracking-wider block mb-2">CUP2EAT Experience</span>
              <h3 class="font-display text-2xl font-bold text-white mb-4">The Edible Luxury Cup</h3>
              
              <ul class="flex flex-col gap-3 text-xs sm:text-sm text-[#E5EAD9]">
                <li class="flex items-center gap-2">
                  <span class="text-[#C9A24B] font-bold">✓</span> Eaten as a crisp biscuit dessert — zero trash
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-[#C9A24B] font-bold">✓</span> Natural vanilla, elaichi & chocolate aroma
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-[#C9A24B] font-bold">✓</span> High customer intrigue & organic viral reels
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-[#C9A24B] font-bold">✓</span> Distinctive brand premium for café menus
                </li>
              </ul>
            </div>

            <div class="pt-6 border-t border-white/10 mt-6">
              <a href="#/shop" class="btn-primary w-full justify-center bg-[#C9A24B] text-[#1F2A1A] font-bold hover:bg-white">
                Taste the Difference ${Icons.ArrowRight("w-4 h-4")}
              </a>
            </div>
          </div>
        </div>
      </section>


      <!-- ==============================================
           SECTION J — FINAL BRAND CTA
           ============================================== -->
      <section class="max-w-7xl mx-auto px-6 w-full">
        <div class="relative rounded-3xl sm:rounded-[3rem] overflow-hidden bg-[#1F2A1A] text-white p-10 sm:p-20 text-center shadow-2xl border border-[#C9A24B]/30">
          <div class="absolute inset-0 z-0 opacity-30">
            <img src="${ASSETS.finalCta.primary}" alt="${ASSETS.finalCta.alt}" class="w-full h-full object-cover">
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-[#1F2A1A] via-[#1F2A1A]/80 to-[#1F2A1A]/60 z-0"></div>

          <div class="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <span class="text-xs font-bold uppercase tracking-widest text-[#C9A24B] mb-4">Ready to Serve Differently?</span>
            <h2 class="font-display text-3xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
              YOUR NEXT SERVING DESERVES SOMETHING DIFFERENT.
            </h2>
            <p class="text-sm sm:text-base text-[#E5EAD9] font-light max-w-xl mb-10">
              Make every sip a little more memorable with CUP2EAT. Available for retail packs and commercial bulk orders across India.
            </p>

            <div class="flex flex-col sm:flex-row items-center gap-4">
              <a href="#/shop" class="btn-primary py-4 px-8 text-base font-bold bg-[#0F5C47] text-white">
                SHOP NOW ${Icons.ShoppingBag("w-5 h-5")}
              </a>
              <a href="#/business" class="btn-secondary py-4 px-8 text-base font-bold text-white border-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#1F2A1A]">
                BUSINESS ENQUIRY ${Icons.Building("w-5 h-5")}
              </a>
            </div>
          </div>
        </div>
      </section>


      <!-- ==============================================
           SECTION K — PREMIUM FOOTER
           ============================================== -->
      <footer class="bg-[#1F2A1A] text-[#E5EAD9] rounded-t-3xl sm:rounded-t-[3rem] px-6 sm:px-12 pt-16 pb-12 border-t-2 border-[#C9A24B]/30">
        <div class="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            <!-- Col 1: Brand Info -->
            <div class="lg:col-span-2 flex flex-col gap-4">
              <div class="flex items-center gap-3">
                <img src="${ASSETS.logo}" alt="CUP2EAT Logo" class="w-12 h-12 rounded-full border border-[#C9A24B]" onerror="this.src='${ASSETS.logoFallback}'">
                <div>
                  <span class="font-display font-black text-2xl text-white tracking-wider">CUP2EAT</span>
                  <p class="text-[10px] text-[#C9A24B] font-bold tracking-widest uppercase">${BRAND_CONFIG.primaryTagline}</p>
                </div>
              </div>
              <p class="text-xs text-[#E5EAD9]/80 leading-relaxed max-w-sm">
                ${BRAND_CONFIG.concept}
              </p>
              <div class="flex items-center gap-3 pt-2">
                <a href="${getWhatsAppUrl('general')}" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform" title="WhatsApp Support">
                  ${Icons.WhatsApp("w-5 h-5")}
                </a>
                <a href="${BRAND_CONFIG.socials.instagram}" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white/10 text-[#C9A24B] flex items-center justify-center hover:bg-[#C9A24B] hover:text-[#1F2A1A] transition-colors" title="Instagram">
                  ${Icons.Share("w-4 h-4")}
                </a>
              </div>
            </div>

            <!-- Col 2: Navigation Links -->
            <div class="flex flex-col gap-3 text-xs">
              <span class="font-display font-bold text-sm text-[#C9A24B] uppercase tracking-wider">Navigation</span>
              <a href="#/" class="text-[#E5EAD9]/80 hover:text-[#C9A24B] transition-colors">Home</a>
              <a href="#/shop" class="text-[#E5EAD9]/80 hover:text-[#C9A24B] transition-colors">Shop All Cups</a>
              <a href="#/about" class="text-[#E5EAD9]/80 hover:text-[#C9A24B] transition-colors">Our Story</a>
              <a href="#/business" class="text-[#E5EAD9]/80 hover:text-[#C9A24B] transition-colors">For Businesses</a>
              <a href="#/track-order" class="text-[#E5EAD9]/80 hover:text-[#C9A24B] transition-colors">Track Your Order</a>
            </div>

            <!-- Col 3: Products -->
            <div class="flex flex-col gap-3 text-xs">
              <span class="font-display font-bold text-sm text-[#C9A24B] uppercase tracking-wider">Products</span>
              <a href="#/product/regular-edible-cup-100ml" class="text-[#E5EAD9]/80 hover:text-[#C9A24B] transition-colors">100 ML Regular Hot Cup</a>
              <a href="#/product/regular-edible-cup-150ml-432" class="text-[#E5EAD9]/80 hover:text-[#C9A24B] transition-colors">150 ML Cold Cup (432 Pk)</a>
              <a href="#/product/regular-edible-cup-150ml-125" class="text-[#E5EAD9]/80 hover:text-[#C9A24B] transition-colors">150 ML Cold Cup (125 Pk)</a>
              <a href="#/product/chocolate-coated-edible-cup-100ml" class="text-[#E5EAD9]/80 hover:text-[#C9A24B] transition-colors">Chocolate-Coated Cup</a>
              <a href="#/product/chocolate-rim-edible-cup-100ml" class="text-[#E5EAD9]/80 hover:text-[#C9A24B] transition-colors">Chocolate Rim Cup</a>
            </div>

            <!-- Col 4: Business & Admin -->
            <div class="flex flex-col gap-3 text-xs">
              <span class="font-display font-bold text-sm text-[#C9A24B] uppercase tracking-wider">Commercial</span>
              <a href="#/business" class="text-[#E5EAD9]/80 hover:text-[#C9A24B] transition-colors">Café Wholesale</a>
              <a href="#/business" class="text-[#E5EAD9]/80 hover:text-[#C9A24B] transition-colors">Bulk Event Orders</a>
              <a href="#/contact" class="text-[#E5EAD9]/80 hover:text-[#C9A24B] transition-colors">Sample Requests</a>
              <a href="#/admin" class="text-[#C9A24B] font-bold hover:underline transition-colors flex items-center gap-1">
                ${Icons.Lock("w-3.5 h-3.5")} Admin Portal
              </a>
            </div>

          </div>

          <!-- Bottom Divider & Copyright -->
          <div class="pt-8 border-t border-[#C9A24B]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E5EAD9]/60 gap-4">
            <p>© ${new Date().getFullYear()} CUP2EAT. EAT YOUR DRINK. All rights reserved.</p>
            <div class="flex items-center gap-6">
              <a href="#/contact" class="hover:text-[#C9A24B]">Privacy Policy</a>
              <a href="#/contact" class="hover:text-[#C9A24B]">Terms of Service</a>
              <a href="#/contact" class="hover:text-[#C9A24B]">FSSAI Declaration</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  `;
}

