import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Gavel, History, ChevronLeft, ChevronRight,
  LogOut, Menu, Eye, EyeOff
} from 'lucide-react';

export default function VendorLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchVisible, setSearchVisible] = useState(true);
  const navigate = useNavigate();

  const links = [
    { to: '/vendor/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/vendor/bidding', icon: Gavel, label: 'Live Bidding' },
    { to: '/vendor/history', icon: History, label: 'Bid History' },
  ];

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-black px-4 py-2 flex items-center justify-between border-b border-dark-border shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => setCollapsed(!collapsed)} className="text-yellow hover:text-yellow-dark">
            <Menu size={20} />
          </button>
          <span className="font-heading font-bold text-xl text-yellow tracking-wide">E-BIDDING</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">2905283 - GANGOTRI STEEL</span>
          <button
            onClick={() => setSearchVisible(!searchVisible)}
            className="flex items-center gap-1 bg-yellow text-black px-3 py-1 rounded text-sm font-bold hover:bg-yellow-dark"
          >
            {searchVisible ? <EyeOff size={14} /> : <Eye size={14} />}
            {searchVisible ? 'Hide Search' : 'Show Search'}
          </button>
          <button onClick={() => navigate('/login')} className="text-gray-400 hover:text-red-400">
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`bg-black border-r border-dark-border transition-all duration-200 shrink-0 ${collapsed ? 'w-14' : 'w-48'}`}>
          <div className="flex flex-col py-2">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                    isActive ? 'bg-yellow text-black font-bold' : 'text-gray-300 hover:bg-dark-row hover:text-white'
                  }`
                }
              >
                <link.icon size={18} />
                {!collapsed && <span>{link.label}</span>}
              </NavLink>
            ))}
          </div>
          <button
            className="absolute bottom-4 left-2 text-gray-500 hover:text-yellow"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-dark">
          <Outlet context={{ searchVisible }} />
        </main>
      </div>
    </div>
  );
}
