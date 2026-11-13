// CUP2EAT — Contact & Inquiries Page (/contact)
import { store } from '../context/store.js';
import { Icons } from '../components/ui/Icons.js';
import { BRAND_CONFIG, getWhatsAppUrl } from '../data/config.js';

export function renderContactPage() {
  return `
    <div class="contact-view max-w-7xl mx-auto px-6 py-12 flex flex-col gap-16">
      
      <!-- Page Header -->
      <div class="max-w-2xl mx-auto text-center">
        <span class="text-xs font-bold uppercase tracking-widest text-[#0F5C47] block mb-2">Connect With Our Team</span>
        <h1 class="font-display text-4xl sm:text-5xl font-black text-[#1F2A1A]">
          LET'S START A CONVERSATION.
        </h1>
        <p class="text-xs sm:text-sm text-[#5A4A42] mt-2">
          Questions about our edible cups, retail orders, or commercial wholesale? We're here to help.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        <!-- Left: Contact Form -->
        <div class="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#3B1F1A]/10 shadow-sm flex flex-col gap-6">
          <h2 class="font-display text-2xl font-bold text-[#1F2A1A]">Send a Message</h2>

          <form id="publicContactForm" class="flex flex-col gap-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Your Name *</label>
                <input type="text" id="contactName" required placeholder="Aarav Sharma" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
              </div>

              <div>
                <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Email Address *</label>
                <input type="email" id="contactEmail" required placeholder="aarav@example.com" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Phone Number (WhatsApp) *</label>
                <input type="tel" id="contactPhone" required placeholder="+91 98765 43210" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
              </div>

              <div>
                <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Inquiry Type</label>
                <select id="contactType" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs font-medium focus:outline-none focus:border-[#0F5C47]">
                  <option>General Product Inquiry</option>
                  <option>Café / B2B Wholesale</option>
                  <option>Sample Tasting Box Request</option>
                  <option>Corporate Event Order</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Your Message *</label>
              <textarea id="contactMessage" rows="4" required placeholder="Tell us how we can help you..." class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]"></textarea>
            </div>

            <button type="submit" class="btn-primary py-3.5 px-8 text-sm font-bold justify-center mt-2">
              Send Message ${Icons.ArrowRight("w-4 h-4")}
            </button>
          </form>
        </div>

        <!-- Right: Direct Channels & Placeholders -->
        <div class="lg:col-span-5 flex flex-col gap-6">
          
          <!-- WhatsApp Quick Connect Card -->
          <div class="bg-[#1F2A1A] text-white p-8 rounded-3xl border border-[#C9A24B]/30 shadow-lg flex flex-col gap-4">
            <div class="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center">
              ${Icons.WhatsApp("w-6 h-6")}
            </div>
            <h3 class="font-display text-2xl font-bold">Fast WhatsApp Support</h3>
            <p class="text-xs text-[#E5EAD9]/80 leading-relaxed">
              Connect directly with our customer concierge for quick quotes, order tracking assistance, or beverage pairing advice.
            </p>
            <a href="${getWhatsAppUrl('general')}" target="_blank" rel="noopener noreferrer" class="btn-gold py-3 px-6 text-xs font-bold justify-center mt-2">
              Chat on WhatsApp Now ${Icons.ExternalLink("w-3.5 h-3.5")}
            </a>
          </div>

          <!-- Business Details Card with Configurable Placeholders -->
          <div class="bg-white p-6 rounded-3xl border border-[#3B1F1A]/10 shadow-sm flex flex-col gap-4 text-xs text-[#5A4A42]">
            <div class="flex items-center gap-3">
              <span class="text-[#0F5C47]">${Icons.Mail("w-5 h-5")}</span>
              <div>
                <span class="font-bold text-[#1F2A1A] block">Email Support</span>
                <span>${BRAND_CONFIG.contact.email} (Configurable)</span>
              </div>
            </div>

            <div class="flex items-center gap-3 pt-3 border-t border-[#3B1F1A]/8">
              <span class="text-[#0F5C47]">${Icons.Phone("w-5 h-5")}</span>
              <div>
                <span class="font-bold text-[#1F2A1A] block">Telephone Helpline</span>
                <span>${BRAND_CONFIG.contact.phoneDisplay} (Configurable)</span>
              </div>
            </div>

            <div class="flex items-center gap-3 pt-3 border-t border-[#3B1F1A]/8">
              <span class="text-[#0F5C47]">${Icons.MapPin("w-5 h-5")}</span>
              <div>
                <span class="font-bold text-[#1F2A1A] block">Corporate Experience Hub</span>
                <span>${BRAND_CONFIG.contact.address}</span>
              </div>
            </div>

            <div class="flex items-center gap-3 pt-3 border-t border-[#3B1F1A]/8">
              <span class="text-[#0F5C47]">${Icons.Clock("w-5 h-5")}</span>
              <div>
                <span class="font-bold text-[#1F2A1A] block">Operational Hours</span>
                <span>${BRAND_CONFIG.contact.businessHours}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <!-- FAQ Accordion Section -->
      <div class="bg-white p-8 sm:p-12 rounded-3xl border border-[#3B1F1A]/10 shadow-sm max-w-4xl mx-auto w-full flex flex-col gap-6">
        <div class="text-center">
          <span class="text-xs font-bold uppercase tracking-wider text-[#0F5C47] block mb-1">Frequently Asked Questions</span>
          <h3 class="font-display text-2xl font-bold text-[#1F2A1A]">Everything You Need to Know</h3>
        </div>

        <div class="divide-y divide-[#3B1F1A]/10 text-xs sm:text-sm">
          ${[
            { q: "How long can the edible cup hold hot tea or coffee?", a: "The 100 ML cup holds liquids up to 85°C for 35 to 40 minutes without structural breakdown or leakage, giving you ample time to finish your beverage." },
            { q: "Is the cup 100% pure vegetarian?", a: "Yes, our formulation is strictly vegetarian with zero animal derivatives. We also offer certified vegan production runs on custom wholesale request." },
            { q: "How are the cups shipped to prevent transit breakage?", a: "All CUP2EAT cups are packed in thermo-formed moisture-proof protective cell trays with silica food-safe desiccants to ensure 100% crisp arrival across India." },
            { q: "Can my café test sample boxes before committing to wholesale?", a: "Absolutely! We supply tasting sample boxes for cafés and restaurant chains. Use our B2B form or WhatsApp us directly to request a tasting kit." }
          ].map(faq => `
            <details class="py-4 group cursor-pointer">
              <summary class="font-bold text-[#1F2A1A] flex items-center justify-between list-none">
                <span>${faq.q}</span>
                <span class="group-open:rotate-180 transition-transform text-[#0F5C47]">${Icons.ChevronDown("w-4 h-4")}</span>
              </summary>
              <p class="pt-3 text-[#5A4A42] leading-relaxed text-xs">${faq.a}</p>
            </details>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}

