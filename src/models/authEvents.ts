const target = new EventTarget();
const UNAUTHORIZED = 'unauthorized';

export const authEvents = {
  emitUnauthorized: () => target.dispatchEvent(new Event(UNAUTHORIZED)),
  onUnauthorized: (listener: () => void) => {
    target.addEventListener(UNAUTHORIZED, listener);
    return () => target.removeEventListener(UNAUTHORIZED, listener);
  },
};
