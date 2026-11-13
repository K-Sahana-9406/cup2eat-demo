// CUP2EAT — Customer Authentication (Login & Register)
import { store } from '../context/store.js';
import { Icons } from '../components/ui/Icons.js';
import { BRAND_CONFIG } from '../data/config.js';
import { ASSETS } from '../data/images.js';

export function renderLoginPage() {
  return `
    <div class="auth-view max-w-md mx-auto px-6 py-14 flex flex-col items-center">
      
      <!-- Brand Crest -->
      <a href="#/" class="mb-6 flex flex-col items-center gap-2">
        <img src="${ASSETS.logo}" alt="CUP2EAT" class="w-14 h-14 rounded-full border-2 border-[#C9A24B]">
        <span class="font-display font-black text-2xl text-[#1F2A1A] tracking-wider">CUP2EAT</span>
      </a>

      <div class="w-full bg-white p-8 rounded-3xl border border-[#3B1F1A]/10 shadow-sm flex flex-col gap-6">
        <div class="text-center">
          <h1 class="font-display text-2xl font-bold text-[#1F2A1A]">Customer Sign In</h1>
          <p class="text-xs text-[#5A4A42] mt-1">Access your saved orders, invoices and tracking history</p>
        </div>

        <!-- Demo Autofill Prompt -->
        <button id="autofillDemoCustomerBtn" class="p-3 rounded-2xl bg-[#E5EAD9] hover:bg-[#C9A24B] hover:text-black text-[#0F5C47] text-xs font-bold transition-all border-none cursor-pointer flex items-center justify-center gap-2">
          ${Icons.Sparkles("w-4 h-4")} Quick Login as Demo Customer (Aarav)
        </button>

        <!-- Login Form -->
        <form id="customerLoginForm" class="flex flex-col gap-4">
          <div>
            <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Email Address</label>
            <input type="email" id="loginEmail" required placeholder="aarav@cup2eat.demo" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="block text-xs font-bold text-[#1F2A1A]">Password</label>
              <a href="#/login" class="text-[11px] text-[#0F5C47] hover:underline" onclick="store.showToast('Demo account password can be any password')">Forgot?</a>
            </div>
            <div class="relative">
              <input type="password" id="loginPassword" required placeholder="••••••••" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
              <button type="button" id="togglePasswordVisibility" class="absolute right-3 top-1/2 -translate-y-1/2 text-[#82756E] border-none bg-transparent cursor-pointer p-1">
                ${Icons.Eye("w-4 h-4")}
              </button>
            </div>
          </div>

          <button type="submit" class="btn-primary w-full py-3.5 text-sm font-bold justify-center mt-2">
            Sign In ${Icons.ArrowRight("w-4 h-4")}
          </button>
        </form>

        <div class="text-center text-xs text-[#5A4A42] pt-2 border-t border-[#3B1F1A]/8">
          Don't have an account? 
          <a href="#/register" class="font-bold text-[#0F5C47] hover:underline">Register here</a>
        </div>

        <div class="p-3 rounded-xl bg-[#F8F8F2] text-[10px] text-[#82756E] leading-relaxed text-center">
          Demonstration authentication. Stored securely in your browser's localStorage for testing.
        </div>
      </div>

    </div>
  `;
}

export function renderRegisterPage() {
  return `
    <div class="auth-view max-w-md mx-auto px-6 py-14 flex flex-col items-center">
      
      <!-- Brand Crest -->
      <a href="#/" class="mb-6 flex flex-col items-center gap-2">
        <img src="${ASSETS.logo}" alt="CUP2EAT" class="w-14 h-14 rounded-full border-2 border-[#C9A24B]">
        <span class="font-display font-black text-2xl text-[#1F2A1A] tracking-wider">CUP2EAT</span>
      </a>

      <div class="w-full bg-white p-8 rounded-3xl border border-[#3B1F1A]/10 shadow-sm flex flex-col gap-6">
        <div class="text-center">
          <h1 class="font-display text-2xl font-bold text-[#1F2A1A]">Create Customer Account</h1>
          <p class="text-xs text-[#5A4A42] mt-1">Join CUP2EAT for easy reordering and tracking</p>
        </div>

        <form id="customerRegisterForm" class="flex flex-col gap-4">
          <div>
            <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Full Name *</label>
            <input type="text" id="regFullName" required placeholder="e.g. Meera Nair" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
          </div>

          <div>
            <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Email Address *</label>
            <input type="email" id="regEmail" required placeholder="meera@example.com" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
          </div>

          <div>
            <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Phone Number (WhatsApp) *</label>
            <input type="tel" id="regPhone" required placeholder="+91 98765 00000" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
          </div>

          <div>
            <label class="block text-xs font-bold text-[#1F2A1A] mb-1">Password *</label>
            <input type="password" id="regPassword" required placeholder="At least 6 characters" class="w-full px-4 py-2.5 rounded-xl border border-[#3B1F1A]/20 bg-[#F8F8F2] text-xs focus:outline-none focus:border-[#0F5C47]">
          </div>

          <button type="submit" class="btn-primary w-full py-3.5 text-sm font-bold justify-center mt-2">
            Create Account ${Icons.ArrowRight("w-4 h-4")}
          </button>
        </form>

        <div class="text-center text-xs text-[#5A4A42] pt-2 border-t border-[#3B1F1A]/8">
          Already have an account? 
          <a href="#/login" class="font-bold text-[#0F5C47] hover:underline">Sign in here</a>
        </div>
      </div>

    </div>
  `;
}

