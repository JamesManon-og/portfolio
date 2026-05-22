'use client';

import dynamic from 'next/dynamic';

const Lanyard = dynamic(() => import('./Lanyard'), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-bg-card/30 rounded animate-pulse" />,
});

export default function LanyardClient(props) {
  return <Lanyard {...props} />;
}
