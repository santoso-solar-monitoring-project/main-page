export default function throttle(
  eventType: string,
  customEventType: string,
  _window = window
) {
  let ready = true;

  const dispatcher = () => {
    // dispatchEvent is synchronous (waits for event listener to finish running)
    _window.dispatchEvent(new CustomEvent(customEventType));
    ready = true;
  };

  const throttler = () => {
    if (ready) {
      ready = false;
      requestAnimationFrame(dispatcher);
    }
  };

  _window.addEventListener(eventType, throttler, { passive: true });

  const cleanup = () => {
    _window.removeEventListener(eventType, throttler);
  };

  return cleanup;
}

export const optimizedResize = 'optimized-resize';
throttle('resize', optimizedResize, window);
