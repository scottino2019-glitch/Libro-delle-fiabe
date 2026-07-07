import { BookElement } from './types';

/**
 * Returns the exact CSS classes needed to render specialized artistic and normal texts.
 */
export function getArtisticTextClass(element: BookElement): string {
  let classes = 'whitespace-pre-wrap select-none break-words leading-tight ';
  
  // Font family mappings
  if (element.fontFamily === 'fredoka') classes += 'font-fredoka ';
  else if (element.fontFamily === 'pacifico') classes += 'font-pacifico ';
  else if (element.fontFamily === 'lilita') classes += 'font-lilita ';
  else if (element.fontFamily === 'cinzel') classes += 'font-cinzel ';
  else if (element.fontFamily === 'creepster') classes += 'font-creepster ';
  else if (element.fontFamily === 'bangers') classes += 'font-bangers ';
  else classes += 'font-sans ';

  // Text Alignment
  if (element.align === 'center') classes += 'text-center ';
  else if (element.align === 'right') classes += 'text-right ';
  else classes += 'text-left ';

  // Font weight utilities
  if (element.bold) classes += 'font-bold ';
  if (element.italic) classes += 'italic ';

  // Artistic shadow overlays & outlines
  if (element.styleType === 'artistic-giant') {
    classes += 'text-stroke-sm uppercase tracking-wider scale-110 duration-200 ';
  } else if (element.styleType === 'artistic-shadow') {
    classes += 'text-shadow-artistic text-stroke-sm text-yellow-300 ';
  } else if (element.styleType === 'artistic-glow') {
    classes += 'text-shadow-glow text-stroke-sm ';
  } else if (element.styleType === 'artistic-spooky') {
    classes += 'text-shadow-spooky uppercase font-extrabold text-green-400 ';
  } else if (element.styleType === 'artistic-stroke') {
    classes += 'text-stroke-md text-white font-extrabold ';
  }

  return classes;
}

/**
 * Generates a random alphanumeric ID.
 */
export function generateUUID(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Generates the CSS rules for a background pattern.
 */
export function getPatternStyle(
  pattern?: string,
  patternColor?: string,
  patternOpacity?: number,
  patternSize?: number
) {
  if (!pattern || pattern === 'none') return {};

  const col = patternColor || '#1e293b';
  const op = patternOpacity !== undefined ? patternOpacity / 100 : 0.15;
  const size = patternSize !== undefined ? patternSize : 32;

  // For data SVGs, we need to encode the `#` character as `%23`
  const encodedCol = col.replace('#', '%23');

  if (pattern === 'polka-dots') {
    return {
      backgroundImage: `radial-gradient(${col} 18%, transparent 18%)`,
      backgroundSize: `${size}px ${size}px`,
      opacity: op * 5 // adjust opacity scale for dots
    };
  }
  if (pattern === 'stripes') {
    return {
      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent ${size / 2}px, ${col} ${size / 2}px, ${col} ${size / 2 + 2}px)`,
      opacity: op * 2
    };
  }
  if (pattern === 'stars') {
    return {
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 24 24'><path fill='${encodedCol}' fill-opacity='${op}' d='M12 1.5l2.6 5.3 5.9.8-4.3 4.2 1 5.9-5.2-2.7-5.2 2.7 1-5.9-4.3-4.2 5.9-.8z'/></svg>")`,
      backgroundSize: `${size}px ${size}px`
    };
  }
  if (pattern === 'hearts') {
    return {
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 24 24'><path fill='${encodedCol}' fill-opacity='${op}' d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>")`,
      backgroundSize: `${size}px ${size}px`
    };
  }
  if (pattern === 'clouds') {
    return {
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 24 24'><path fill='${encodedCol}' fill-opacity='${op}' d='M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96z'/></svg>")`,
      backgroundSize: `${size}px ${size}px`
    };
  }
  return {};
}

/**
 * Generates the filter string for elements.
 */
export function getElementFilter(element: BookElement): string {
  const b = element.brightness !== undefined ? element.brightness : 100;
  const s = element.saturation !== undefined ? element.saturation : 100;
  const h = element.hueRotate !== undefined ? element.hueRotate : 0;
  const bl = element.blur !== undefined ? element.blur : 0;
  return `brightness(${b}%) saturate(${s}%) hue-rotate(${h}deg) blur(${bl}px)`;
}

/**
 * Generates border styling object.
 */
export function getElementBorderStyle(element: BookElement) {
  if (!element.borderStyle || element.borderStyle === 'none') return {};
  
  const width = element.borderWidth !== undefined ? element.borderWidth : 3;
  const color = element.borderColor || '#3b82f6';
  
  if (element.borderStyle === 'bubbly') {
    return {
      border: `${width}px solid ${color}`,
      borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' // Beautiful hand-drawn wiggly box border!
    };
  }
  
  const radius = element.borderRadius !== undefined ? element.borderRadius : 12;
  return {
    border: `${width}px ${element.borderStyle} ${color}`,
    borderRadius: `${radius}px`
  };
}

/**
 * Generates drop shadows and box shadows.
 */
export function getElementShadowStyle(element: BookElement) {
  if (!element.shadowStyle || element.shadowStyle === 'none') return {};
  
  switch (element.shadowStyle) {
    case 'sm':
      return { boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' };
    case 'md':
      return { boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' };
    case 'lg':
      return { boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' };
    case 'glow-yellow':
      return { filter: 'drop-shadow(0 0 8px rgba(253, 224, 71, 0.8))' };
    case 'glow-pink':
      return { filter: 'drop-shadow(0 0 8px rgba(244, 63, 94, 0.8))' };
    case 'glow-blue':
      return { filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.8))' };
    case 'comic-3d':
      return {
        boxShadow: '6px 6px 0px 0px rgba(30, 41, 59, 1)',
        border: '3px solid rgba(30, 41, 59, 1)',
        borderRadius: '12px'
      };
    default:
      return {};
  }
}
