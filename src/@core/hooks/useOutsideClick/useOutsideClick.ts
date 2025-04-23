// system
import { useEffect } from 'react';

/**
 * Hook that detects click events outside of a referenced element
 * and triggers a callback when such a click is detected
 * @param {React.RefObject<HTMLElement | null>} ref  a reference to the DOM element that you want to detect clicks outside of
 * @param {() => void} callback a callback function that is triggered when a click outside the referenced element is detected
 * @returns {void}
 */
export function useOutsideClick(ref: React.RefObject<HTMLElement | null>, callback: () => void): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}
