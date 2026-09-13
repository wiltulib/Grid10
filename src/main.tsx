// Ensure window.fetch has both getter and setter in iframe environments
if (typeof window !== 'undefined') {
  try {
    let currentFetch = window.fetch ? window.fetch.bind(window) : undefined;
    const patch = (target: unknown) => {
      try {
        if (target && typeof target === 'object') {
          Object.defineProperty(target, 'fetch', {
            get: () => currentFetch,
            set: (fn) => {
              currentFetch = fn;
            },
            configurable: true,
            enumerable: true,
          });
        }
      } catch {
        // Ignore fallback
      }
    };
    patch(window);
    if (typeof Window !== 'undefined' && Window.prototype) {
      patch(Window.prototype);
    }
  } catch {
    // Ignore fallback
  }
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
