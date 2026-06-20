'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';

export default function GlobalCanvas() {
  // We use state/effect to ensure eventSource uses document.body only on the client
  const [eventSource, setEventSource] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEventSource(document.body);
  }, []);

  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        pointerEvents: 'none',
        zIndex: 40,
      }}
      eventSource={eventSource || undefined}
    >
      <View.Port />
    </Canvas>
  );
}
