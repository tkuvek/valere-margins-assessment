declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'set',
      targetId: string,
      config?: Record<string, string | number | boolean>
    ) => void;
  }
}

export {}; 