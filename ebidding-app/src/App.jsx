import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/Login/LoginPage';

import VendorLayout from './layouts/VendorLayout';
import VendorDashboard from './pages/vendor/VendorDashboard';
import LiveBidding from './pages/vendor/LiveBidding';
import BidHistory from './pages/vendor/BidHistory';

import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import TenderManagement from './pages/admin/TenderManagement';
import LiveBidMonitor from './pages/admin/LiveBidMonitor';
import VendorManagement from './pages/admin/VendorManagement';
import Reports from './pages/admin/Reports';

import CustomerLayout from './layouts/CustomerLayout';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import MyOrders from './pages/customer/MyOrders';

import SuperAdminLayout from './layouts/SuperAdminLayout';
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import Companies from './pages/superadmin/Companies';
import Subscriptions from './pages/superadmin/Subscriptions';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Vendor */}
      <Route path="/vendor" element={<VendorLayout />}>
        <Route index element={<Navigate to="bidding" replace />} />
        <Route path="dashboard" element={<VendorDashboard />} />
        <Route path="bidding" element={<LiveBidding />} />
        <Route path="history" element={<BidHistory />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="tenders" element={<TenderManagement />} />
        <Route path="live" element={<LiveBidMonitor />} />
        <Route path="vendors" element={<VendorManagement />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* Customer */}
      <Route path="/customer" element={<CustomerLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="orders" element={<MyOrders />} />
      </Route>

      {/* Super Admin */}
      <Route path="/superadmin" element={<SuperAdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="companies" element={<Companies />} />
        <Route path="subscriptions" element={<Subscriptions />} />
      </Route>

      {/* Default */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
