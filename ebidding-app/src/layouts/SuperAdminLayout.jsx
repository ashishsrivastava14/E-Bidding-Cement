import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Building, CreditCard, LogOut, Menu } from 'lucide-react';

export default function SuperAdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const links = [
    { to: '/superadmin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/superadmin/companies', icon: Building, label: 'Companies' },
    { to: '/superadmin/subscriptions', icon: CreditCard, label: 'Subscriptions' },
  ];

  return (
    <div className="h-screen flex flex-col">
      <nav className="bg-black px-4 py-2 flex items-center justify-between border-b border-dark-border shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => setCollapsed(!collapsed)} className="text-yellow hover:text-yellow-dark">
            <Menu size={20} />
          </button>
          <span className="font-heading font-bold text-xl text-yellow tracking-wide">E-BIDDING</span>
          <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded font-bold">SUPER ADMIN</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">Super Admin Panel</span>
          <button onClick={() => navigate('/login')} className="text-gray-400 hover:text-red-400">
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
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
        </aside>
        <main className="flex-1 overflow-y-auto p-4 bg-dark">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
