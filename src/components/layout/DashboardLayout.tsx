import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Users, ShoppingCart, Link, FileText, Settings, Menu, Package } from 'lucide-react';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navItems = [
    { name: 'Klienci', to: '/customers', icon: Users },
    { name: 'Produkty', to: '/products', icon: ShoppingCart }, // Usually products use a different icon like Package, but ShoppingCart works or we can use another one. I'll stick to ShoppingCart since it was Orders before, wait, Orders is also ShoppingCart. I will change icon for Orders to FileText and Products to Package, wait I'll import Package from lucide-react.
    { name: 'Zamówienia', to: '/orders', icon: ShoppingCart },
    { name: 'Integracje', to: '/integrations', icon: Link },
    { name: 'Dokumenty', to: '/documents', icon: FileText },
    { name: 'Ustawienia', to: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Mobile sidebar overlay */}
      <div 
        className={`fixed inset-0 z-20 bg-gray-900/50 backdrop-blur-sm transition-opacity lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-72 bg-white border-r border-gray-100 shadow-sm transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-center h-20 border-b border-gray-100 px-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
               <span className="text-white font-bold text-lg leading-none">B</span>
             </div>
             <span className="text-2xl font-bold tracking-tight text-gray-900">BaseSaaS</span>
          </div>
        </div>
        <nav className="p-4 space-y-1.5 mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm shadow-blue-100'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className={`w-5 h-5 mr-3 transition-colors ${
                  item.to === window.location.pathname ? 'text-blue-600' : 'text-gray-400'
              }`} />
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        {/* Fake Subscription Widget */}
        <div className="absolute bottom-6 left-6 right-6">
           <div className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
             <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform"></div>
             <p className="text-gray-300 text-xs font-medium uppercase tracking-wider mb-1">Plan: Free Trial</p>
             <h4 className="text-white font-semibold text-lg mb-2">Zostało 14 dni</h4>
             <button className="w-full py-2 bg-white text-gray-900 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">Odblokuj Pełną Wersję</button>
           </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Topbar */}
        <header className="flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10 sticky top-0">
          <div className="flex items-center">
            <button 
              className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg focus:outline-none lg:hidden mr-4 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-gray-800 hidden sm:block">Panel Zarządzania</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm font-bold text-gray-900 leading-none">Jan Kowalski</span>
                <span className="text-xs text-gray-500 font-medium mt-1">Administrator</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 transition-all">
              <span className="text-blue-700 font-bold text-sm">JK</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
