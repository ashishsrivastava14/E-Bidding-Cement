import { Check } from 'lucide-react';
import { subscriptionPlans } from '../../data/mockData';

export default function Subscriptions() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading font-bold text-2xl text-yellow">Subscription Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan, i) => (
          <div
            key={plan.name}
            className={`bg-dark-card border rounded-xl p-6 flex flex-col ${
              i === 2 ? 'border-yellow shadow-[0_0_20px_rgba(245,197,24,0.2)]' : 'border-dark-border'
            }`}
          >
            {i === 2 && (
              <div className="text-center mb-3">
                <span className="bg-yellow text-black px-3 py-0.5 rounded-full text-xs font-bold">MOST POPULAR</span>
              </div>
            )}
            <h2 className="font-heading font-bold text-xl text-yellow text-center">{plan.name}</h2>
            <p className="text-3xl font-bold text-theme text-center mt-2">{plan.price}</p>
            <p className="text-xs text-theme-subtle text-center mb-4">{plan.activeCompanies} active companies</p>

            <div className="flex-1 space-y-2 mb-6">
              {plan.features.map(f => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <Check size={14} className="text-green-400 shrink-0" />
                  <span className="text-theme-muted">{f}</span>
                </div>
              ))}
            </div>

            <button className={`w-full py-2.5 rounded-lg font-bold text-sm ${
              i === 2
                ? 'bg-yellow text-black hover:bg-yellow-dark'
                : 'bg-dark border border-dark-border text-theme hover:border-yellow hover:text-yellow'
            }`}>
              {i === 2 ? 'Current Plan' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
