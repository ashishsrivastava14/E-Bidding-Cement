import { useCountdown } from '../hooks/useCountdown';

export default function CountdownTimer({ initialSeconds = 600, onExpire, timerHook }) {
  const timer = timerHook || useCountdown(initialSeconds);
  const { minutes, seconds, isExpired, remaining } = timer;

  const color = isExpired
    ? 'text-red-500'
    : remaining < 60
    ? 'text-red-500 animate-pulse'
    : remaining < 120
    ? 'text-orange-400'
    : 'text-yellow';

  if (isExpired) {
    return (
      <span className="text-red-500 font-heading font-bold text-lg">
        BIDDING CLOSED
      </span>
    );
  }

  return (
    <span className={`font-heading font-bold text-lg ${color}`}>
      Expires in {minutes}:{seconds.toString().padStart(2, '0')}
    </span>
  );
}
