import { useState, useEffect, useCallback, useRef } from 'react';

export function useCountdown(initialSeconds = 30) {
  const [remaining, setRemaining] = useState(initialSeconds);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 0) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const isExpired = remaining <= 0;

  const reset = useCallback((newSeconds) => {
    setRemaining(newSeconds ?? initialSeconds);
  }, [initialSeconds]);

  const addTime = useCallback((extraSeconds) => {
    setRemaining(prev => prev + extraSeconds);
  }, []);

  return { minutes, seconds, remaining, isExpired, reset, addTime };
}
