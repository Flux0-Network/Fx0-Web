'use client';
import LiquidChrome from './LiquidChrome';

export default function AboveFoldBg() {
  return (
    <div className="above-fold-bg" aria-hidden="true">
      <LiquidChrome baseColor={[0.1, 0.1, 0.1]} speed={0.3} amplitude={0.3} interactive />
    </div>
  );
}
