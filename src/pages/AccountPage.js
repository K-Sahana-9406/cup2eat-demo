// CUP2EAT — Customer Dashboard (/account & /orders)
import { store } from '../context/store.js';
import { Icons } from '../components/ui/Icons.js';

export function renderAccountPage() {
  const user = store.currentUser;
  if (!user) {
    window.location.hash = '#/login';
    return '';
  }

  const allOrders = store.orders;

  return `
    <div class="account-view max-w-6xl mx-auto px-6 py-12 flex flex-col gap-10">
      
      <!-- Welcome Header -->
      <div class="bg-gradient-to-r from-[#1F2A1A] to-[#0F5C47] text-white p-8 sm:p-10 rounded-3xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-full bg-[#C9A24B] text-[#1F2A1A] font-display font-black text-2xl flex items-center justify-center shadow-md">
            ${user.name.charAt(0)}
          </div>
          <div>
            <span class="text-xs text-[#C9A24B] font-bold uppercase tracking-wider">CUP2EAT Patron</span>
            <h1 class="font-display text-2xl sm:text-3xl font-bold">${user.name}</h1>
            <p class="text-xs text-[#E5EAD9]/80 mt-0.5">${user.email} • ${user.phone}</p>
          </div>
        </div>

        <button id="customerLogoutBtn" class="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-2 cursor-pointer">
          ${Icons.LogOut("w-4 h-4")} Sign Out
        </button>
      </div>

      <!-- Account Tabs Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left: Saved Profile Details -->
        <div class="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#3B1F1A]/10 shadow-sm flex flex-col gap-4">
          <h2 class="font-display text-lg font-bold text-[#1F2A1A] pb-3 border-b border-[#3B1F1A]/8">
            Delivery Profile
          </h2>

          <div class="text-xs text-[#5A4A42] flex flex-col gap-2">
            <div>
              <span class="font-bold text-[#82756E] block mb-0.5">Primary Contact:</span>
              <p class="font-semibold text-[#1F2A1A]">${user.name}</p>
              <p>${user.phone}</p>
              <p>${user.email}</p>
            </div>

            <div class="pt-2 border-t border-[#3B1F1A]/8">
              <span class="font-bold text-[#82756E] block mb-0.5">Default Delivery Address:</span>
              <p class="leading-relaxed">
                ${user.address?.street || '42, Brigade Road, Ashok Nagar'}<br>
                ${user.address?.city || 'Bengaluru'}, ${user.address?.state || 'Karnataka'} - ${user.address?.pincode || '560025'}
              </p>
            </div>
          </div>

          <div class="pt-3 border-t border-[#3B1F1A]/8">
            <a href="#/shop" class="btn-primary w-full py-2.5 text-xs font-bold justify-center">
              ${Icons.ShoppingBag("w-4 h-4")} Order More Cups
            </a>
          </div>
        </div>

        <!-- Right: Order History Cards -->
        <div class="lg:col-span-8 flex flex-col gap-6">
          <div class="flex items-center justify-between">
            <h2 class="font-display text-2xl font-bold text-[#1F2A1A]">Your Orders (${allOrders.length})</h2>
            <a href="#/track-order" class="text-xs font-bold text-[#0F5C47] hover:underline flex items-center gap-1">
              ${Icons.Truck("w-4 h-4")} Track By Order ID
            </a>
          </div>

          ${allOrders.length === 0 ? `
            <div class="bg-white p-10 rounded-3xl border border-[#3B1F1A]/10 text-center">
              <p class="text-sm text-[#5A4A42] mb-4">You have not placed any orders yet.</p>
              <a href="#/shop" class="btn-primary py-2.5 px-6 text-xs">Browse Cups</a>
            </div>
          ` : `
            <div class="flex flex-col gap-4">
              ${allOrders.map(order => `
                <div class="bg-white p-6 rounded-3xl border border-[#3B1F1A]/10 shadow-sm flex flex-col gap-4 hover:border-[#C9A24B]/40 transition-colors">
                  
                  <!-- Order Card Header -->
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#3B1F1A]/8 gap-2">
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="font-mono font-bold text-sm text-[#0F5C47]">${order.orderId}</span>
                        <span class="text-xs text-[#82756E]">• ${order.displayDate || new Date(order.date).toLocaleDateString()}</span>
                      </div>
                      <div class="text-[11px] text-[#5A4A42] mt-0.5">${order.items.length} item(s) • ${order.paymentMethod}</div>
                    </div>

                    <div class="flex items-center gap-3">
                      <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === 'Delivered' ? 'bg-[#E5EAD9] text-[#0F5C47]' : 'bg-[#C9A24B]/20 text-[#3B1F1A]'}">
                        ${order.status}
                      </span>
                      <span class="font-display font-bold text-base text-[#6B2F33]">₹${order.total.toLocaleString()}</span>
                    </div>
                  </div>

                  <!-- Items Preview -->
                  <div class="flex flex-col gap-2">
                    ${order.items.map(item => `
                      <div class="flex items-center justify-between text-xs py-1">
                        <div class="flex items-center gap-3">
                          <img src="${item.image}" alt="${item.name}" class="w-10 h-10 object-cover rounded-lg bg-[#E5EAD9]" onerror="this.src='/public/images/client/product_100ml_regular.jpg'">
                          <div>
                            <span class="font-bold text-[#1F2A1A]">${item.name}</span>
                            <span class="text-[11px] text-[#82756E] ml-2">${item.capacity} • Qty: ${item.quantity}</span>
                          </div>
                        </div>
                        <span class="font-semibold text-[#1F2A1A]">₹${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    `).join('')}
                  </div>

                  <!-- Actions -->
                  <div class="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-[#3B1F1A]/8">
                    <button class="account-invoice-btn btn-secondary py-1.5 px-4 text-xs font-semibold" data-id="${order.orderId}">
                      ${Icons.Printer("w-3.5 h-3.5")} Invoice
                    </button>
                    <a href="#/track-order?id=${order.orderId}" class="btn-primary py-1.5 px-4 text-xs font-semibold">
                      ${Icons.Truck("w-3.5 h-3.5")} Track Order
                    </a>
                  </div>

                </div>
              `).join('')}
            </div>
          `}

        </div>

      </div>

    </div>
  `;
}

