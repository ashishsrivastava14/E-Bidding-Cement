import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Gavel, KeyRound, Phone, Lock, Send } from 'lucide-react';

const roles = ['Vendor', 'Admin', 'Customer', 'Super Admin'];
const roleRoutes = {
  Vendor: '/vendor/bidding',
  Admin: '/admin/dashboard',
  Customer: '/customer/dashboard',
  'Super Admin': '/superadmin/dashboard',
};

export default function LoginPage() {
  const [role, setRole] = useState('Vendor');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (!username) { toast.error('Enter username/mobile first'); return; }
    setOtpSent(true);
    setCountdown(30);
    toast.success('OTP sent to registered mobile');
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    toast.success(`Logged in as ${role}`);
    navigate(roleRoutes[role]);
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Gavel size={40} className="text-yellow" />
            <h1 className="font-heading font-bold text-4xl text-yellow tracking-wider">E-BIDDING</h1>
          </div>
          <p className="text-gray-400 text-sm">Logistics Bidding Platform</p>
        </div>

        {/* Card */}
        <div className="bg-dark-card border border-dark-border rounded-xl p-6 shadow-[0_0_30px_rgba(245,197,24,0.15)]">
          {/* Role Tabs */}
          <div className="flex mb-6 bg-dark rounded-lg overflow-hidden">
            {roles.map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 text-xs font-bold transition-colors ${
                  role === r ? 'bg-yellow text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs text-gray-400 mb-1">Username / Mobile</label>
              <div className="flex items-center bg-dark border border-dark-border rounded px-3 focus-within:border-yellow">
                <Phone size={16} className="text-gray-500" />
                <input
                  className="flex-1 bg-transparent text-white py-2.5 px-2 text-sm outline-none"
                  placeholder="Enter username or mobile"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
            </div>

            {!otpMode ? (
              /* Password */
              <div>
                <label className="block text-xs text-gray-400 mb-1">Password</label>
                <div className="flex items-center bg-dark border border-dark-border rounded px-3 focus-within:border-yellow">
                  <Lock size={16} className="text-gray-500" />
                  <input
                    type="password"
                    className="flex-1 bg-transparent text-white py-2.5 px-2 text-sm outline-none"
                    placeholder="Enter password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              /* OTP */
              <div>
                <label className="block text-xs text-gray-400 mb-1">OTP</label>
                <div className="flex gap-2">
                  <div className="flex items-center bg-dark border border-dark-border rounded px-3 flex-1 focus-within:border-yellow">
                    <KeyRound size={16} className="text-gray-500" />
                    <input
                      className="flex-1 bg-transparent text-white py-2.5 px-2 text-sm outline-none"
                      placeholder="Enter OTP"
                      maxLength={6}
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={countdown > 0}
                    className="bg-dark-card border border-yellow text-yellow px-3 py-2 rounded text-xs font-bold hover:bg-yellow hover:text-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 whitespace-nowrap"
                  >
                    <Send size={12} />
                    {countdown > 0 ? `${countdown}s` : 'Send OTP'}
                  </button>
                </div>
              </div>
            )}

            {/* Toggle OTP / Password */}
            <button
              type="button"
              onClick={() => { setOtpMode(!otpMode); setOtpSent(false); }}
              className="text-yellow text-xs hover:underline"
            >
              {otpMode ? 'Login with Password' : 'Login with OTP'}
            </button>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-yellow text-black font-bold py-3 rounded-lg text-sm hover:bg-yellow-dark transition-colors tracking-wider"
            >
              LOGIN
            </button>

            <div className="text-center">
              <button type="button" className="text-gray-500 text-xs hover:text-yellow">
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
