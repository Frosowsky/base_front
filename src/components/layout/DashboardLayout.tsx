import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Users, ShoppingCart, Settings, Menu, Package, LogOut, Activity } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', to: '/', icon: Activity },
    { name: 'Klienci', to: '/customers', icon: Users },
    { name: 'Produkty', to: '/products', icon: Package },
    { name: 'Zamówienia', to: '/orders', icon: ShoppingCart },
    { name: 'Ustawienia', to: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#f4f7f6] text-gray-900 font-sans">
      {/* Mobile sidebar overlay */}
      <div 
        className={`fixed inset-0 z-20 bg-gray-900/50 backdrop-blur-sm transition-opacity lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-72 bg-white border-r border-gray-100 shadow-sm transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-center h-20 border-b border-gray-100 px-6 shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-200">
               <Activity className="w-5 h-5 text-white" />
             </div>
             <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-emerald-500">BaseSaaS</span>
          </div>
        </div>
        <nav className="p-4 space-y-1.5 mt-2 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100/50'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className={`w-5 h-5 mr-3 transition-colors ${
                  item.to === window.location.pathname || (item.to === '/' && window.location.pathname === '/') ? 'text-emerald-600' : 'text-gray-400'
              }`} />
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-100">
           <button 
             onClick={logout}
             className="w-full flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 text-red-600 hover:bg-red-50"
           >
             <LogOut className="w-5 h-5 mr-3 text-red-500" />
             Wyloguj się
           </button>
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
            <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-white shadow-sm flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-emerald-500 hover:ring-offset-2 transition-all">
              <span className="text-emerald-700 font-bold text-sm">A</span>
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
