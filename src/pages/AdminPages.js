// CUP2EAT — Executive Admin Management Suite
// Recharts-style SVG Analytics, Product CRUD, Order Status Management, Inventory Controls & Customer CRM.

import { store } from '../context/store.js';
import { Icons } from '../components/ui/Icons.js';
import { BRAND_CONFIG } from '../data/config.js';
import { ASSETS } from '../data/images.js';

export function renderAdminLoginPage() {
  return `
    <div class="admin-login-view min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div class="max-w-md w-full bg-[#1F2A1A] text-white p-8 sm:p-10 rounded-3xl border-2 border-[#C9A24B]/40 shadow-2xl flex flex-col gap-6">
        
        <div class="text-center flex flex-col items-center">
          <img src="${ASSETS.logo}" alt="CUP2EAT" class="w-16 h-16 rounded-full border-2 border-[#C9A24B] mb-3">
          <span class="text-xs font-bold uppercase tracking-widest text-[#C9A24B]">Management Console</span>
          <h1 class="font-display text-2xl font-bold mt-1">CUP2EAT Admin Suite</h1>
          <p class="text-xs text-[#E5EAD9]/70 mt-1">Internal portal for inventory, orders & catalogue pricing</p>
        </div>

        <!-- Demonstration Credentials Banner -->
        <div class="p-3.5 rounded-2xl bg-white/10 border border-[#C9A24B]/30 text-xs text-[#E5EAD9] flex flex-col gap-1.5">
          <div class="flex items-center gap-1.5 text-[#C9A24B] font-bold">
            ${Icons.Lock("w-3.5 h-3.5")} Demonstration Credentials:
          </div>
          <div class="font-mono text-[11px] bg-black/30 p-2 rounded-lg flex flex-col gap-1">
            <span>Email: <strong class="text-white">${BRAND_CONFIG.adminAuth.email}</strong></span>
            <span>Password: <strong class="text-white">${BRAND_CONFIG.adminAuth.password}</strong></span>
          </div>
          <button id="autofillAdminBtn" class="mt-1 text-[11px] font-bold text-[#C9A24B] hover:underline text-left cursor-pointer border-none bg-transparent">
            → Click to autofill credentials
          </button>
        </div>

        <!-- Login Form -->
        <form id="adminLoginForm" class="flex flex-col gap-4">
          <div>
            <label class="block text-xs font-bold text-[#E5EAD9] mb-1">Admin Email</label>
            <input type="email" id="adminEmail" required placeholder="admin@cup2eat.demo" class="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white text-xs focus:outline-none focus:border-[#C9A24B]">
          </div>

          <div>
            <label class="block text-xs font-bold text-[#E5EAD9] mb-1">Security Password</label>
            <input type="password" id="adminPassword" required placeholder="••••••••" class="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white text-xs focus:outline-none focus:border-[#C9A24B]">
          </div>

          <button type="submit" class="btn-gold w-full py-3 text-xs font-bold justify-center mt-2">
            ${Icons.ShieldCheck("w-4 h-4")} Enter Executive Console
          </button>
        </form>

        <a href="#/" class="text-center text-xs text-[#E5EAD9]/60 hover:text-[#C9A24B]">
          ← Return to Public Storefront
        </a>
      </div>
    </div>
  `;
}

export function renderAdminDashboard(activeTab = 'dashboard') {
  if (!store.isAdminLoggedIn) {
    window.location.hash = '#/admin/login';
    return '';
  }

  const products = store.getProducts();
  const orders = store.orders;

  // Compute metrics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalProductsCount = products.length;
  const lowStockProducts = products.filter(p => p.stockCount <= p.lowStockThreshold);

  return `
    <div class="admin-dashboard-view min-h-screen bg-[#F8F8F2] -ml-6 md:-ml-0">
      
      <!-- Top Admin Header -->
      <header class="bg-[#1F2A1A] text-white px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#C9A24B]/30 gap-4 sticky top-0 z-40">
        <div class="flex items-center gap-3">
          <img src="${ASSETS.logo}" alt="CUP2EAT" class="w-9 h-9 rounded-full border border-[#C9A24B]">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-display font-bold text-lg text-white">CUP2EAT Executive Portal</span>
              <span class="px-2 py-0.5 rounded-full bg-[#C9A24B] text-[#1F2A1A] font-bold text-[10px] uppercase">Demo</span>
            </div>
            <p class="text-[11px] text-[#E5EAD9]/70">Logged in as Executive Administrator</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <a href="#/shop" class="btn-secondary py-1.5 px-3 text-xs text-white border-white/20 hover:bg-white/10" target="_blank">
            ${Icons.ExternalLink("w-3.5 h-3.5")} View Store
          </a>
          <button id="adminLogoutBtn" class="px-3 py-1.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold transition-all border-none cursor-pointer flex items-center gap-1.5">
            ${Icons.LogOut("w-3.5 h-3.5")} Logout
          </button>
        </div>
      </header>

      <!-- Main Layout: Navigation Tabs & Canvas -->
      <div class="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8">
        
        <!-- Navigation Tabs -->
        <nav class="flex flex-wrap items-center gap-2 border-b border-[#3B1F1A]/10 pb-4" role="tablist">
          ${[
            { id: 'dashboard', label: 'Overview & Analytics', icon: Icons.TrendingUp },
            { id: 'products', label: 'Product Catalogue', icon: Icons.Coffee },
            { id: 'orders', label: 'Order Pipeline', icon: Icons.ShoppingCart, badge: totalOrders },
            { id: 'inventory', label: 'Stock & Inventory', icon: Icons.Box, badge: lowStockProducts.length ? `${lowStockProducts.length} Low` : null },
            { id: 'customers', label: 'Customer Accounts', icon: Icons.Users }
          ].map(tab => `
            <a href="#/admin?tab=${tab.id}" class="px-4 py-2.5 rounded-2xl text-xs font-bold transition-all no-underline flex items-center gap-2 ${activeTab === tab.id ? 'bg-[#1F2A1A] text-white shadow-md border border-[#C9A24B]/40' : 'bg-white text-[#5A4A42] hover:bg-[#E5EAD9] border border-[#3B1F1A]/8'}">
              ${tab.icon("w-4 h-4 text-[#C9A24B]")}
              ${tab.label}
              ${tab.badge ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-black ${tab.id === 'inventory' ? 'bg-red-500 text-white' : 'bg-[#0F5C47] text-white'}">${tab.badge}</span>` : ''}
            </a>
          `).join('')}
        </nav>

        <!-- Active View Canvas -->
        ${activeTab === 'dashboard' ? renderOverviewTab(totalOrders, totalRevenue, totalProductsCount, lowStockProducts, orders, products) : ''}
        ${activeTab === 'products' ? renderProductsTab(products) : ''}
        ${activeTab === 'orders' ? renderOrdersTab(orders) : ''}
        ${activeTab === 'inventory' ? renderInventoryTab(products) : ''}
        ${activeTab === 'customers' ? renderCustomersTab(orders) : ''}

      </div>

    </div>
  `;
}

// 1. Overview Tab with Interactive Charts
function renderOverviewTab(totalOrders, totalRevenue, totalProductsCount, lowStockProducts, orders, products) {
  return `
    <div class="flex flex-col gap-8">
      
      <!-- Metric KPI Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="p-6 rounded-3xl bg-white border border-[#3B1F1A]/8 shadow-sm flex flex-col justify-between">
          <div class="flex items-center justify-between text-xs font-bold text-[#82756E] uppercase tracking-wider mb-2">
            <span>Total Revenue</span>
            <span class="w-8 h-8 rounded-xl bg-[#0F5C47]/10 text-[#0F5C47] flex items-center justify-center">${Icons.DollarSign("w-4 h-4")}</span>
          </div>
          <div class="font-display font-black text-3xl text-[#1F2A1A]">₹${totalRevenue.toLocaleString()}</div>
          <div class="text-[11px] text-[#0F5C47] font-semibold mt-2 flex items-center gap-1">
            ${Icons.TrendingUp("w-3.5 h-3.5")} +18.4% from last week
          </div>
        </div>

        <div class="p-6 rounded-3xl bg-white border border-[#3B1F1A]/8 shadow-sm flex flex-col justify-between">
          <div class="flex items-center justify-between text-xs font-bold text-[#82756E] uppercase tracking-wider mb-2">
            <span>Total Orders</span>
            <span class="w-8 h-8 rounded-xl bg-[#C9A24B]/20 text-[#C9A24B] flex items-center justify-center">${Icons.ShoppingCart("w-4 h-4")}</span>
          </div>
          <div class="font-display font-black text-3xl text-[#1F2A1A]">${totalOrders}</div>
          <div class="text-[11px] text-[#0F5C47] font-semibold mt-2 flex items-center gap-1">
            ${Icons.Check("w-3.5 h-3.5")} 100% fulfillment rate
          </div>
        </div>

        <div class="p-6 rounded-3xl bg-white border border-[#3B1F1A]/8 shadow-sm flex flex-col justify-between">
          <div class="flex items-center justify-between text-xs font-bold text-[#82756E] uppercase tracking-wider mb-2">
            <span>Active SKUs</span>
            <span class="w-8 h-8 rounded-xl bg-[#6B2F33]/15 text-[#6B2F33] flex items-center justify-center">${Icons.Coffee("w-4 h-4")}</span>
          </div>
          <div class="font-display font-black text-3xl text-[#1F2A1A]">${totalProductsCount}</div>
          <div class="text-[11px] text-[#5A4A42] mt-2">100 ML & 150 ML lines</div>
        </div>

        <div class="p-6 rounded-3xl bg-white border border-[#3B1F1A]/8 shadow-sm flex flex-col justify-between">
          <div class="flex items-center justify-between text-xs font-bold text-[#82756E] uppercase tracking-wider mb-2">
            <span>Low Stock Items</span>
            <span class="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">${Icons.AlertCircle("w-4 h-4")}</span>
          </div>
          <div class="font-display font-black text-3xl text-red-600">${lowStockProducts.length}</div>
          <div class="text-[11px] text-red-600 font-semibold mt-2">Requires bakery restock</div>
        </div>
      </div>

      <!-- Analytics Charts (SVG Recharts-style Visualizations) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Sales Overview SVG Line Chart -->
        <div class="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#3B1F1A]/8 shadow-sm flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-display font-bold text-lg text-[#1F2A1A]">Sales Performance Trend</h3>
              <p class="text-xs text-[#82756E]">Weekly gross revenue simulation</p>
            </div>
            <span class="text-xs font-bold text-[#0F5C47] bg-[#E5EAD9] px-3 py-1 rounded-full">2026 Q4</span>
          </div>

          <!-- Custom SVG Chart Canvas -->
          <div class="w-full h-64 pt-4">
            <svg viewBox="0 0 500 200" class="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#0F5C47" stop-opacity="0.35"/>
                  <stop offset="100%" stop-color="#0F5C47" stop-opacity="0.0"/>
                </linearGradient>
              </defs>

              <!-- Grid Lines -->
              <line x1="0" y1="40" x2="500" y2="40" stroke="#f0f0f0" stroke-dasharray="4"/>
              <line x1="0" y1="90" x2="500" y2="90" stroke="#f0f0f0" stroke-dasharray="4"/>
              <line x1="0" y1="140" x2="500" y2="140" stroke="#f0f0f0" stroke-dasharray="4"/>
              <line x1="0" y1="180" x2="500" y2="180" stroke="#e5e5e5"/>

              <!-- Filled Area -->
              <path d="M 20 170 Q 100 130 180 145 T 320 80 T 480 45 L 480 180 L 20 180 Z" fill="url(#salesGrad)"/>

              <!-- Main Stroke Line -->
              <path d="M 20 170 Q 100 130 180 145 T 320 80 T 480 45" fill="none" stroke="#0F5C47" stroke-width="3.5" stroke-linecap="round"/>

              <!-- Data Points -->
              <circle cx="20" cy="170" r="4.5" fill="#C9A24B"/>
              <circle cx="140" cy="135" r="4.5" fill="#C9A24B"/>
              <circle cx="250" cy="115" r="4.5" fill="#C9A24B"/>
              <circle cx="360" cy="70" r="4.5" fill="#C9A24B"/>
              <circle cx="480" cy="45" r="5" fill="#0F5C47" stroke="#ffffff" stroke-width="2"/>

              <!-- Axis Labels -->
              <text x="20" y="195" font-size="10" fill="#888">W1</text>
              <text x="140" y="195" font-size="10" fill="#888">W2</text>
              <text x="250" y="195" font-size="10" fill="#888">W3</text>
              <text x="360" y="195" font-size="10" fill="#888">W4</text>
              <text x="470" y="195" font-size="10" fill="#0F5C47" font-weight="bold">Today</text>
            </svg>
          </div>
        </div>

        <!-- Order Status Breakdown Donut -->
        <div class="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#3B1F1A]/8 shadow-sm flex flex-col justify-between gap-4">
          <div>
            <h3 class="font-display font-bold text-lg text-[#1F2A1A]">Order Status</h3>
            <p class="text-xs text-[#82756E]">Distribution of active orders</p>
          </div>

          <div class="flex items-center justify-center py-4">
            <svg viewBox="0 0 100 100" class="w-40 h-40 transform -rotate-90">
              <circle cx="50" cy="50" r="38" stroke="#E5EAD9" stroke-width="12" fill="none"/>
              <circle cx="50" cy="50" r="38" stroke="#0F5C47" stroke-width="12" fill="none" stroke-dasharray="238" stroke-dashoffset="80"/>
              <circle cx="50" cy="50" r="38" stroke="#C9A24B" stroke-width="12" fill="none" stroke-dasharray="238" stroke-dashoffset="180"/>
            </svg>
          </div>

          <div class="flex flex-col gap-2 text-xs">
            <div class="flex items-center justify-between">
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#0F5C47]"></span> Shipped & Delivered</span>
              <span class="font-bold">65%</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#C9A24B]"></span> Processing & Confirmed</span>
              <span class="font-bold">25%</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-[#E5EAD9]"></span> Order Placed</span>
              <span class="font-bold">10%</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Recent Orders Table -->
      <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#3B1F1A]/8 shadow-sm flex flex-col gap-4">
        <div class="flex items-center justify-between pb-3 border-b border-[#3B1F1A]/8">
          <h3 class="font-display font-bold text-lg text-[#1F2A1A]">Recent Orders</h3>
          <a href="#/admin?tab=orders" class="text-xs font-bold text-[#0F5C47] hover:underline">View All Orders →</a>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse min-w-[600px]">
            <thead>
              <tr class="border-b border-[#3B1F1A]/8 text-[#82756E] uppercase">
                <th class="py-3 font-bold">Order ID</th>
                <th class="py-3 font-bold">Customer</th>
                <th class="py-3 font-bold">Items</th>
                <th class="py-3 font-bold">Total</th>
                <th class="py-3 font-bold">Status</th>
                <th class="py-3 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#3B1F1A]/5">
              ${orders.slice(0, 5).map(o => `
                <tr class="hover:bg-[#F8F8F2]">
                  <td class="py-3.5 font-mono font-bold text-[#0F5C47]">${o.orderId}</td>
                  <td class="py-3.5 font-medium text-[#1F2A1A]">${o.customer.name}</td>
                  <td class="py-3.5 text-[#5A4A42]">${o.items.length} item(s)</td>
                  <td class="py-3.5 font-bold text-[#6B2F33]">₹${o.total.toLocaleString()}</td>
                  <td class="py-3.5">
                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${o.status === 'Delivered' ? 'bg-[#E5EAD9] text-[#0F5C47]' : 'bg-[#C9A24B]/20 text-[#3B1F1A]'}">
                      ${o.status}
                    </span>
                  </td>
                  <td class="py-3.5 text-right">
                    <button class="account-invoice-btn text-xs text-[#0F5C47] hover:underline font-bold border-none bg-transparent cursor-pointer" data-id="${o.orderId}">
                      Invoice
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

// 2. Product Management Tab
function renderProductsTab(products) {
  return `
    <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#3B1F1A]/8 shadow-sm flex flex-col gap-6">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#3B1F1A]/10 gap-3">
        <div>
          <h2 class="font-display text-2xl font-bold text-[#1F2A1A]">Product Catalogue Management</h2>
          <p class="text-xs text-[#5A4A42]">Modify prices, update stock, and edit SKU specifications in real time</p>
        </div>

        <div class="flex items-center gap-2">
          <button id="adminResetProductsBtn" class="btn-secondary py-2 px-4 text-xs font-semibold">
            ${Icons.Refresh("w-3.5 h-3.5")} Reset to Factory Defaults
          </button>
        </div>
      </div>

      <!-- Products Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse min-w-[700px]">
          <thead>
            <tr class="border-b-2 border-[#1F2A1A]/10 text-[#82756E] uppercase tracking-wider">
              <th class="py-3 font-bold">Product</th>
              <th class="py-3 font-bold">Capacity</th>
              <th class="py-3 font-bold">Pack Quantity</th>
              <th class="py-3 font-bold">Price (₹)</th>
              <th class="py-3 font-bold">Stock</th>
              <th class="py-3 font-bold text-center">Status</th>
              <th class="py-3 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#3B1F1A]/8">
            ${products.map(p => `
              <tr class="hover:bg-[#F8F8F2] transition-colors">
                <td class="py-3.5">
                  <div class="flex items-center gap-3">
                    <img src="${p.fallbackImage || p.primaryImage}" alt="${p.name}" class="w-12 h-12 object-cover rounded-xl bg-[#E5EAD9]" onerror="this.src='/public/images/client/product_100ml_regular.jpg'">
                    <div>
                      <div class="font-bold text-sm text-[#1F2A1A]">${p.name}</div>
                      <div class="text-[11px] text-[#5A4A42]">${p.suitableFor}</div>
                    </div>
                  </div>
                </td>
                <td class="py-3.5 font-bold text-[#0F5C47]">${p.capacity}</td>
                <td class="py-3.5 text-[#5A4A42] font-medium">${p.quantity} cups</td>
                <td class="py-3.5">
                  <input type="number" 
                         class="admin-price-input w-24 px-2.5 py-1 rounded-lg border border-[#3B1F1A]/20 font-bold text-[#6B2F33] text-xs focus:outline-none focus:border-[#0F5C47]" 
                         data-id="${p.id}" 
                         value="${p.price}">
                </td>
                <td class="py-3.5">
                  <input type="number" 
                         class="admin-stock-input w-20 px-2.5 py-1 rounded-lg border border-[#3B1F1A]/20 font-bold text-xs focus:outline-none focus:border-[#0F5C47]" 
                         data-id="${p.id}" 
                         value="${p.stockCount}">
                </td>
                <td class="py-3.5 text-center">
                  <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${p.stockCount <= p.lowStockThreshold ? 'bg-red-100 text-red-600' : 'bg-[#E5EAD9] text-[#0F5C47]'}">
                    ${p.stockCount <= p.lowStockThreshold ? 'Low Stock' : 'Active'}
                  </span>
                </td>
                <td class="py-3.5 text-right">
                  <button class="admin-save-product-btn btn-primary py-1 px-3 text-xs font-bold" data-id="${p.id}">
                    Save Changes
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

    </div>
  `;
}

// 3. Orders Management Tab
function renderOrdersTab(orders) {
  return `
    <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#3B1F1A]/8 shadow-sm flex flex-col gap-6">
      
      <div class="flex items-center justify-between pb-4 border-b border-[#3B1F1A]/10">
        <div>
          <h2 class="font-display text-2xl font-bold text-[#1F2A1A]">Customer Order Pipeline</h2>
          <p class="text-xs text-[#5A4A42]">Update shipment statuses to reflect in customer tracking in real time</p>
        </div>
        <span class="text-xs font-bold text-[#0F5C47] bg-[#E5EAD9] px-3 py-1 rounded-full">
          ${orders.length} Active Orders
        </span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse min-w-[750px]">
          <thead>
            <tr class="border-b-2 border-[#1F2A1A]/10 text-[#82756E] uppercase tracking-wider">
              <th class="py-3 font-bold">Order Details</th>
              <th class="py-3 font-bold">Customer & Shipping</th>
              <th class="py-3 font-bold">Amount</th>
              <th class="py-3 font-bold">Payment</th>
              <th class="py-3 font-bold">Update Status</th>
              <th class="py-3 font-bold text-right">Invoice</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#3B1F1A]/8">
            ${orders.map(o => `
              <tr class="hover:bg-[#F8F8F2]">
                <td class="py-3.5">
                  <div class="font-mono font-bold text-sm text-[#0F5C47]">${o.orderId}</div>
                  <div class="text-[10px] text-[#82756E]">${o.displayDate || new Date(o.date).toLocaleDateString()}</div>
                  <div class="text-[11px] text-[#5A4A42] mt-1">${o.items.length} items (${o.items.map(i => i.name).join(', ')})</div>
                </td>
                <td class="py-3.5">
                  <div class="font-bold text-[#1F2A1A]">${o.customer.name}</div>
                  <div class="text-[11px] text-[#5A4A42]">${o.customer.phone}</div>
                  <div class="text-[10px] text-[#82756E] truncate max-w-xs">${o.customer.address}</div>
                </td>
                <td class="py-3.5">
                  <div class="font-display font-bold text-sm text-[#6B2F33]">₹${o.total.toLocaleString()}</div>
                </td>
                <td class="py-3.5">
                  <span class="px-2 py-0.5 rounded-md bg-[#E5EAD9] text-[#0F5C47] text-[10px] font-bold">
                    ${o.paymentMethod}
                  </span>
                </td>
                <td class="py-3.5">
                  <select class="admin-status-select px-3 py-1.5 rounded-xl border border-[#3B1F1A]/20 text-xs font-bold bg-[#F8F8F2] focus:outline-none focus:border-[#0F5C47]" data-id="${o.orderId}">
                    <option value="Order Placed" ${o.status === 'Order Placed' ? 'selected' : ''}>Order Placed</option>
                    <option value="Confirmed" ${o.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
                    <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                    <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                  </select>
                </td>
                <td class="py-3.5 text-right">
                  <button class="account-invoice-btn btn-secondary py-1 px-3 text-xs font-semibold" data-id="${o.orderId}">
                    ${Icons.Printer("w-3.5 h-3.5")} Invoice
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

    </div>
  `;
}

// 4. Inventory Management Tab
function renderInventoryTab(products) {
  return `
    <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#3B1F1A]/8 shadow-sm flex flex-col gap-6">
      <div class="flex items-center justify-between pb-4 border-b border-[#3B1F1A]/10">
        <div>
          <h2 class="font-display text-2xl font-bold text-[#1F2A1A]">Warehouse Inventory Status</h2>
          <p class="text-xs text-[#5A4A42]">Master box counts stored in climate-controlled storage</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${products.map(p => `
          <div class="p-5 rounded-2xl border ${p.stockCount <= p.lowStockThreshold ? 'border-red-300 bg-red-50/50' : 'border-[#3B1F1A]/10 bg-[#F8F8F2]'} flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-xs uppercase tracking-wider text-[#0F5C47]">${p.capacity}</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${p.stockCount <= p.lowStockThreshold ? 'bg-red-500 text-white' : 'bg-[#0F5C47] text-white'}">
                  ${p.stockCount <= p.lowStockThreshold ? 'Restock Needed' : 'Healthy'}
                </span>
              </div>
              <h4 class="font-display font-bold text-base text-[#1F2A1A]">${p.name}</h4>
              <p class="text-xs text-[#5A4A42] mt-0.5">${p.packLabel}</p>
            </div>

            <div class="mt-4 pt-3 border-t border-[#3B1F1A]/10 flex items-center justify-between">
              <div>
                <span class="text-[10px] text-[#82756E] uppercase block">In Stock:</span>
                <span class="font-display font-black text-xl text-[#1F2A1A]">${p.stockCount} boxes</span>
              </div>

              <div class="flex items-center gap-1.5">
                <button class="inventory-quick-adj btn-secondary py-1 px-2.5 text-xs font-bold" data-id="${p.id}" data-delta="-5">-5</button>
                <button class="inventory-quick-adj btn-primary py-1 px-2.5 text-xs font-bold" data-id="${p.id}" data-delta="10">+10</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 5. Customer Accounts Tab
function renderCustomersTab(orders) {
  // Aggregate unique customers
  const customerMap = new Map();
  orders.forEach(o => {
    const email = o.customer.email;
    if (!customerMap.has(email)) {
      customerMap.set(email, {
        name: o.customer.name,
        email: o.customer.email,
        phone: o.customer.phone,
        address: o.customer.address,
        orderCount: 1,
        totalSpend: o.total
      });
    } else {
      const c = customerMap.get(email);
      c.orderCount += 1;
      c.totalSpend += o.total;
    }
  });

  const customerList = Array.from(customerMap.values());

  return `
    <div class="bg-white p-6 sm:p-8 rounded-3xl border border-[#3B1F1A]/8 shadow-sm flex flex-col gap-6">
      <div class="flex items-center justify-between pb-4 border-b border-[#3B1F1A]/10">
        <div>
          <h2 class="font-display text-2xl font-bold text-[#1F2A1A]">Customer Database</h2>
          <p class="text-xs text-[#5A4A42]">Registered customer profiles and commercial B2B accounts</p>
        </div>
        <span class="text-xs font-bold text-[#0F5C47] bg-[#E5EAD9] px-3 py-1 rounded-full">
          ${customerList.length} Customer Profiles
        </span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse min-w-[650px]">
          <thead>
            <tr class="border-b-2 border-[#1F2A1A]/10 text-[#82756E] uppercase tracking-wider">
              <th class="py-3 font-bold">Customer Name</th>
              <th class="py-3 font-bold">Email</th>
              <th class="py-3 font-bold">Phone (WhatsApp)</th>
              <th class="py-3 font-bold">Total Orders</th>
              <th class="py-3 font-bold text-right">Lifetime Spend</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#3B1F1A]/8">
            ${customerList.map(c => `
              <tr class="hover:bg-[#F8F8F2]">
                <td class="py-3.5 font-bold text-[#1F2A1A]">${c.name}</td>
                <td class="py-3.5 text-[#5A4A42]">${c.email}</td>
                <td class="py-3.5 text-[#5A4A42]">${c.phone}</td>
                <td class="py-3.5 font-semibold text-[#0F5C47]">${c.orderCount} order(s)</td>
                <td class="py-3.5 text-right font-display font-bold text-[#6B2F33]">₹${c.totalSpend.toLocaleString()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

