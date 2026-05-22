/* eslint-disable react/no-unknown-property */
'use client';

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const LanyardScene = dynamic(() => import('./LanyardScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-gradient-to-b from-bg-card/40 to-bg-card/20 rounded border border-line flex items-center justify-center animate-pulse">
      <span className="text-phosphor/30 font-mono text-sm">Loading card...</span>
    </div>
  ),
});

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Suspense
      fallback={
        <div className="w-full h-[300px] bg-gradient-to-b from-bg-card/40 to-bg-card/20 rounded border border-line" />
      }
    >
      <LanyardScene position={position} gravity={gravity} />
    </Suspense>
  );
}
