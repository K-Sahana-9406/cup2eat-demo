// CUP2EAT — B2B For Businesses Landing Page (/business)
// High-converting commercial portal for Cafés, Restaurants, Hotels, Caterers & Events.

import { store } from '../context/store.js';
import { Icons } from '../components/ui/Icons.js';
import { ASSETS } from '../data/images.js';
import { BRAND_CONFIG, getWhatsAppUrl } from '../data/config.js';

export function renderBusinessPage() {
  return `
    <div class="business-view flex flex-col gap-20 pb-20">
      
      <!-- B2B Hero Section -->
      <section class="relative min-h-[75vh] flex items-center justify-center rounded-3xl sm:rounded-[3rem] overflow-hidden mx-3 sm:mx-6 mt-3 sm:mt-6 shadow-2xl border border-[#C9A24B]/30 bg-[#1F2A1A] text-white">
        <div class="absolute inset-0 z-0 opacity-40">
          <img src="${ASSETS.businessVenues.cafes.image}" alt="Modern cafe serving edible cups" class="w-full h-full object-cover">
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#1F2A1A] via-[#1F2A1A]/80 to-[#1F2A1A]/50 z-0"></div>

        <div class="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5EAD9]/15 border border-[#C9A24B]/40 text-[#C9A24B] text-xs font-bold tracking-widest uppercase mb-6">
            ${Icons.Building("w-3.5 h-3.5")} Commercial B2B Solutions
          </span>

          <h1 class="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-tight mb-6">
            MAKE EVERY SERVING <span class="italic text-[#C9A24B] font-normal">A TALKING POINT.</span>
          </h1>

          <p class="text-base sm:text-xl text-[#E5EAD9] font-light max-w-2xl leading-relaxed mb-8">
            From cafés and tea shops to restaurants and events, give your customers something they will remember, photograph, and talk about.
          </p>

          <div class="flex flex-col sm:flex-row items-center gap-4">
            <a href="#businessEnquiryForm" class="btn-gold py-4 px-8 text-sm font-bold">
              LET'S TALK BUSINESS ${Icons.ArrowRight("w-4 h-4")}
            </a>
            <a href="${getWhatsAppUrl('b2b')}" target="_blank" rel="noopener noreferrer" class="btn-secondary py-4 px-8 text-sm font-bold text-white border-white/30 hover:bg-white hover:text-[#1F2A1A]">
              ${Icons.WhatsApp("w-4 h-4 text-[#25D366]")} WhatsApp Wholesale Desk
            </a>
          </div>
        </div>
      </section>

      <!-- Section: Why Businesses Choose CUP2EAT -->
      <section class="max-w-7xl mx-auto px-6 w-full">
        <div class="text-center max-w-2xl mx-auto mb-14">
          <span class="text-xs font-bold uppercase tracking-widest text-[#0F5C47] block mb-2">Hospitality Advantage</span>
          <h2 class="font-display text-3xl sm:text-4xl font-bold text-[#1F2A1A]">
            WHY TOP CAFÉS & BRANDS PARTNER WITH US
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          ${[
            { title: "Organic Social Media Buzz", desc: "Every customer who orders an edible cup pulls out their phone. Free viral organic Instagram Reels and TikTok promotion for your brand.", icon: Icons.Sparkles },
            { title: "Higher Profit Margin", desc: "Cafés easily command a ₹25–₹40 premium per beverage when served in an edible biscuit cup, turning a disposable cost into a high-margin dessert.", icon: Icons.TrendingUp },
            { title: "Zero Paper Waste", desc: "Say goodbye to overflowing trash bins and single-use plastic/wax cup waste at your counter. Customers eat the vessel.", icon: Icons.Leaf },
            { title: "Reliable Quality & Texture", desc: "Formulated specifically for high-temperature commercial beverage service. Doesn't melt, leak, or turn soggy during normal drinking times.", icon: Icons.ShieldCheck }
          ].map(item => `
            <div class="p-6 rounded-3xl bg-white border border-[#3B1F1A]/8 shadow-sm flex flex-col justify-between">
              <div>
                <div class="w-12 h-12 rounded-2xl bg-[#E5EAD9] text-[#0F5C47] flex items-center justify-center mb-4">
                  ${item.icon("w-6 h-6")}
                </div>
                <h3 class="font-display font-bold text-lg text-[#1F2A1A] mb-2">${item.title}</h3>
                <p class="text-xs text-[#5A4A42] leading-relaxed">${item.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Section: Application Sectors (All 8 Cards) -->
      <section class="max-w-7xl mx-auto px-6 w-full">
        <div class="mb-10">
          <span class="text-xs font-bold uppercase tracking-widest text-[#0F5C47] block mb-2">Tailored Hospitality Formats</span>
          <h2 class="font-display text-3xl sm:text-4xl font-bold text-[#1F2A1A]">
            ENGINEERED FOR EVERY BEVERAGE VENUE
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${Object.values(ASSETS.businessVenues).map(venue => `
            <div class="rounded-2xl overflow-hidden bg-white border border-[#3B1F1A]/8 shadow-sm hover:shadow-lg transition-all group flex flex-col">
              <div class="aspect-[16/10] overflow-hidden bg-[#E5EAD9]">
                <img src="${venue.image}" alt="${venue.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              </div>
              <div class="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 class="font-display font-bold text-base text-[#1F2A1A] mb-1">${venue.title}</h4>
                  <p class="text-xs text-[#5A4A42] leading-relaxed">${venue.desc}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Section: Bulk Wholesale Enquiry Form -->
      <section id="businessEnquiryForm" class="max-w-4xl mx-auto px-6 w-full">
        <div class="bg-white p-8 sm:p-12 rounded-3xl border border-[#3B1F1A]/10 shadow-xl flex flex-col gap-6">
          
          <div class="text-center max-w-xl mx-auto mb-2">
            <span class="text-xs font-bold uppercase tracking-widest text-[#0F5C47] block mb-1">Direct Commercial Inquiries</span>
            <h2 class="font-display text-3xl sm:text-4xl font-black text-[#1F2A1A]">LET'S TALK BUSINESS.</h2>
            <p class="text-xs sm:text-sm text-[#5A4A42] mt-1">
              Submit your venue requirements below. Our B2B partnership manager will respond within 24 hours with custom tiered pricing and tasting sample boxes.
            </p>
          </div>

          <form id="b2bEnquiryForm" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Business / Brand Name *</label>
              <input type="text" id="b2bBrand" required placeholder="e.g. Blue Tokai / Chai Point Franchise" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
            </div>

            <div>
              <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Contact Person Name *</label>
              <input type="text" id="b2bContact" required placeholder="e.g. Vikram Malhotra (F&B Director)" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
            </div>

            <div>
              <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Contact Phone (WhatsApp) *</label>
              <input type="tel" id="b2bPhone" required placeholder="+91 98765 43210" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
            </div>

            <div>
              <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Official Work Email *</label>
              <input type="email" id="b2bEmail" required placeholder="procurement@cafename.com" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
            </div>

            <div>
              <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Business Type *</label>
              <select id="b2bType" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs font-medium focus:outline-none focus:border-[#0F5C47]">
                <option>Specialty Café / Coffee Shop</option>
                <option>Tea / Chai Stall Chain</option>
                <option>Restaurant / Bistro</option>
                <option>Luxury Hotel / Resort</option>
                <option>Dessert Parlour / Ice Cream</option>
                <option>Corporate Catering / Events</option>
                <option>Wholesale Distributor</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Primary Product Interest *</label>
              <select id="b2bProductInterest" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs font-medium focus:outline-none focus:border-[#0F5C47]">
                <option>100 ML Regular Hot Cups (Chai / Coffee)</option>
                <option>150 ML Cold Cups (Cold Coffee / Shakes)</option>
                <option>100 ML Chocolate Coated / Rim Cups</option>
                <option>Full Mixed Assortment (All Variants)</option>
              </select>
            </div>

            <div class="sm:col-span-2">
              <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Estimated Monthly Volume *</label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label class="p-3 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] flex items-center gap-2 cursor-pointer text-xs">
                  <input type="radio" name="b2bVolume" value="1,000 - 5,000 cups" checked class="accent-[#0F5C47]">
                  <span>1,000 – 5,000 cups / mo</span>
                </label>
                <label class="p-3 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] flex items-center gap-2 cursor-pointer text-xs">
                  <input type="radio" name="b2bVolume" value="5,000 - 20,000 cups" class="accent-[#0F5C47]">
                  <span>5,000 – 20,000 cups / mo</span>
                </label>
                <label class="p-3 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] flex items-center gap-2 cursor-pointer text-xs">
                  <input type="radio" name="b2bVolume" value="20,000+ cups" class="accent-[#0F5C47]">
                  <span>20,000+ cups (Pallet Rate)</span>
                </label>
              </div>
            </div>

            <div class="sm:col-span-2">
              <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Message & Delivery Locations</label>
              <textarea id="b2bNotes" rows="3" placeholder="Tell us about your menu, city locations, or custom flavour requests..." class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]"></textarea>
            </div>

            <div class="sm:col-span-2 flex flex-col sm:flex-row items-center gap-4 mt-2">
              <button type="submit" class="btn-primary w-full sm:w-auto py-3.5 px-8 text-sm font-bold justify-center">
                Submit Wholesale Enquiry ${Icons.ArrowRight("w-4 h-4")}
              </button>
              <a href="${getWhatsAppUrl('b2b')}" target="_blank" rel="noopener noreferrer" class="btn-secondary w-full sm:w-auto py-3.5 px-6 text-xs font-bold text-center justify-center text-[#0F5C47] border-[#0F5C47]/40">
                ${Icons.WhatsApp("w-4 h-4 text-[#25D366]")} Connect Instantly on WhatsApp
              </a>
            </div>
          </form>

        </div>
      </section>

    </div>
  `;
}

