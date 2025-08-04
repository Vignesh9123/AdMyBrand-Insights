// components/DebugWrapper.tsx
'use client';

import { useEffect } from 'react';

export default function DebugWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log('DebugWrapper rendered');
  });

  return <div>{children}</div>;
}
