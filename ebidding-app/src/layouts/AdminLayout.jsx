import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Radio, Users, BarChart3,
  LogOut, Menu, ChevronLeft, ChevronRight, Sun, Moon
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/tenders', icon: FileText, label: 'Tenders' },
    { to: '/admin/live', icon: Radio, label: 'Live Monitor' },
    { to: '/admin/vendors', icon: Users, label: 'Vendors' },
    { to: '/admin/reports', icon: BarChart3, label: 'Reports' },
  ];

  return (
    <div className="h-screen flex flex-col">
      <nav className="bg-surface px-4 py-2 flex items-center justify-between border-b border-dark-border shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => setCollapsed(!collapsed)} className="text-yellow hover:text-yellow-dark">
            <Menu size={20} />
          </button>
          <span className="font-heading font-bold text-xl text-yellow tracking-wide">E-BIDDING</span>
          <span className="text-xs bg-yellow text-black px-2 py-0.5 rounded font-bold">ADMIN</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-theme-muted">Admin Panel</span>
          <button onClick={toggleTheme} className="text-theme-subtle hover:text-yellow" title="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => navigate('/login')} className="text-theme-subtle hover:text-red-400">
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <aside className={`bg-surface border-r border-dark-border transition-all duration-200 shrink-0 ${collapsed ? 'w-14' : 'w-48'}`}>
          <div className="flex flex-col py-2">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                    isActive ? 'bg-yellow text-black font-bold' : 'text-theme-muted hover:bg-dark-row hover:text-theme'
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
