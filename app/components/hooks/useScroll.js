import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

export function useScroll() {
  const debounceDelay = 100; // in miliseconds
  const [scrollPosition, setScrollPosition] = useState({
    horizontalScrollPos: 0,
    verticalScrollPos: 0
  });

  const getScrollPosition = () => {
    const doc = document.documentElement;
    const left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    return { horizontalScrollPos: left, verticalScrollPos: top };
  };

  const listener = useCallback((evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    const scrollPos = getScrollPosition();
    setScrollPosition(scrollPos);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', debounce(listener, debounceDelay), false);

    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, [listener]);

  return scrollPosition;
}
