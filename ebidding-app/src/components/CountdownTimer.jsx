import { useCountdown } from '../hooks/useCountdown';

export default function CountdownTimer({ initialSeconds = 30, onExpire, timerHook }) {
  const timer = timerHook || useCountdown(initialSeconds);
  const { minutes, seconds, isExpired, remaining } = timer;

  const color = isExpired
    ? 'text-red-500'
    : remaining < 10
    ? 'text-red-500 animate-pulse'
    : remaining < 20
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
