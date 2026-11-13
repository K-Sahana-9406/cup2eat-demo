// CUP2EAT — About & Brand Story Page (/about)
// Editorial storytelling, product philosophy, sensory craft & ethical mission.

import { store } from '../context/store.js';
import { Icons } from '../components/ui/Icons.js';
import { ASSETS } from '../data/images.js';
import { BRAND_CONFIG } from '../data/config.js';

export function renderAboutPage() {
  return `
    <div class="about-view max-w-7xl mx-auto px-6 py-12 flex flex-col gap-20">
      
      <!-- Editorial Header -->
      <div class="max-w-4xl mx-auto text-center flex flex-col items-center">
        <span class="text-xs font-bold uppercase tracking-widest text-[#0F5C47] block mb-3">Our Philosophy & Craft</span>
        <h1 class="font-display text-4xl sm:text-6xl md:text-7xl font-black text-[#1F2A1A] leading-tight mb-6">
          AN IDEA THAT MAKES <span class="italic text-[#C9A24B] font-normal">EVERY SIP DIFFERENT.</span>
        </h1>
        <p class="text-base sm:text-xl text-[#5A4A42] font-light leading-relaxed max-w-2xl">
          Why should the cup be something you throw away when it can become part of the experience?
        </p>
      </div>

      <!-- Feature Split Section -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-6 rounded-3xl overflow-hidden aspect-[4/3] bg-[#E5EAD9] shadow-xl border border-[#3B1F1A]/10">
          <img src="${ASSETS.brandStory.primary}" alt="Guest tasting edible cup in café" class="w-full h-full object-cover" onerror="this.src='${ASSETS.brandStory.fallback}'">
        </div>

        <div class="lg:col-span-6 flex flex-col gap-5 text-sm sm:text-base text-[#5A4A42] leading-relaxed">
          <h2 class="font-display text-3xl font-bold text-[#1F2A1A]">
            MORE THAN JUST A CUP.
          </h2>
          <p class="font-medium text-[#1F2A1A]">
            CUP2EAT creates edible cups for beverages, bringing a unique serving experience to cafés, restaurants, tea shops, events and businesses.
          </p>
          <p>
            Traditional disposable cups were invented solely to carry liquid from the barista to the bin. In contrast, CUP2EAT reimagines the container as a food pairing. From the initial aromatic warmth of cardamom or chocolate to the satisfying biscuit crunch at the end, every single part of your drink is enjoyed.
          </p>
          <p>
            Whether serving an authentic Mumbai cutting chai, an artisanal flat white, or a double chocolate milkshake, our edible cups are engineered with food science precision to prevent soggy bases while maintaining authentic biscuit taste.
          </p>
        </div>
      </div>

      <!-- Hot vs Cold Engineering Breakdown -->
      <div class="bg-white p-8 sm:p-14 rounded-3xl border border-[#3B1F1A]/10 shadow-sm flex flex-col gap-10">
        <div class="text-center max-w-2xl mx-auto">
          <span class="text-xs font-bold uppercase tracking-widest text-[#0F5C47] block mb-2">Dual Serving Capabilities</span>
          <h2 class="font-display text-3xl sm:text-4xl font-bold text-[#1F2A1A]">
            BAKED FOR HOT. ENGINEERED FOR COLD.
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="p-6 rounded-2xl bg-[#E5EAD9]/40 border border-[#C9A24B]/30 flex flex-col gap-3">
            <div class="flex items-center gap-2 text-[#6B2F33] font-bold text-sm">
              ${Icons.Flame("w-5 h-5")} 100 ML Hot Formulation
            </div>
            <p class="text-xs sm:text-sm text-[#5A4A42] leading-relaxed">
              Designed to withstand boiling tea and hot espresso up to 85°C for 35 to 40 minutes. The exterior remains comfortably warm to hold without burning fingertips, and subtle vanilla or elaichi spices gently harmonize with hot beverages.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-[#E5EAD9]/40 border border-[#0F5C47]/30 flex flex-col gap-3">
            <div class="flex items-center gap-2 text-[#0F5C47] font-bold text-sm">
              ${Icons.Snowflake("w-5 h-5")} 150 ML Cold Formulation
            </div>
            <p class="text-xs sm:text-sm text-[#5A4A42] leading-relaxed">
              Built with a higher structural density and moisture-resistant wafer walls to support ice cubes, condensation, and thick milkshakes for 45+ minutes without leakage.
            </p>
          </div>
        </div>
      </div>

      <!-- Supplied Ingredients Note -->
      <div class="p-8 rounded-3xl bg-[#E5EAD9]/50 border border-[#C9A24B]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="max-w-2xl">
          <span class="text-xs font-bold uppercase tracking-wider text-[#0F5C47] block mb-1">Pure Vegetarian & Natural Ingredients</span>
          <h3 class="font-display text-2xl font-bold text-[#1F2A1A] mb-2">Thoughtfully Sourced & Pure Veg</h3>
          <p class="text-xs text-[#5A4A42] leading-relaxed">
            Our products are formulated with wheat flour, pulses, corn flour, and vegetable oils with zero animal derivatives. Dedicated vegan batches are available for commercial hospitality partners upon request.
          </p>
        </div>
        <a href="#/shop" class="btn-primary flex-shrink-0 font-bold">
          Explore The Catalogue ${Icons.ArrowRight("w-4 h-4")}
        </a>
      </div>

    </div>
  `;
}

