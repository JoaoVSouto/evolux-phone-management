import * as React from 'react';

// got this from https://epicreact.dev/how-react-uses-closures-to-avoid-bugs/

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export default function useDebounce(callback, delay) {
  const callbackRef = React.useRef(callback);

  React.useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return React.useMemo(
    () => debounce((...args) => callbackRef.current(...args), delay),
    [delay]
  );
}
