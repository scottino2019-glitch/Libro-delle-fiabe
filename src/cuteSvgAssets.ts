export interface CuteSvgAsset {
  id: string;
  name: string;
  category: string;
  url: string;
}

// Helper to wrap raw SVG xml into an image-safe data URL
function makeSvgDataUrl(svgXml: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgXml)}`;
}

export const CUTE_SVG_ASSETS: CuteSvgAsset[] = [
  {
    id: 'sole',
    name: '☀️ Sole Radioso',
    category: 'Natura',
    url: makeSvgDataUrl(`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF176"/>
      <stop offset="100%" stop-color="#FBC02D"/>
    </radialGradient>
  </defs>
  <g fill="#FFA000">
    <path d="M50 5 L55 25 L45 25 Z"/>
    <path d="M50 95 L55 75 L45 75 Z"/>
    <path d="M5 50 L25 55 L25 45 Z"/>
    <path d="M95 50 L75 55 L75 45 Z"/>
    <path d="M18 18 L33 30 L27 35 Z"/>
    <path d="M82 82 L67 70 L73 65 Z"/>
    <path d="M18 82 L33 70 L27 65 Z"/>
    <path d="M82 18 L67 30 L73 35 Z"/>
  </g>
  <circle cx="50" cy="50" r="30" fill="url(#sunGrad)" stroke="#E65100" stroke-width="2"/>
  <circle cx="42" cy="45" r="3.5" fill="#263238"/>
  <circle cx="58" cy="45" r="3.5" fill="#263238"/>
  <circle cx="40.5" cy="43.5" r="1" fill="#FFFFFF"/>
  <circle cx="56.5" cy="43.5" r="1" fill="#FFFFFF"/>
  <circle cx="37" cy="51" r="3" fill="#FF8A80" opacity="0.8"/>
  <circle cx="63" cy="51" r="3" fill="#FF8A80" opacity="0.8"/>
  <path d="M44 52 Q50 58 56 52" fill="none" stroke="#D84315" stroke-width="3" stroke-linecap="round"/>
</svg>`)
  },
  {
    id: 'nuvoletta',
    name: '☁️ Nuvoletta Felice',
    category: 'Natura',
    url: makeSvgDataUrl(`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#E1F5FE"/>
    </linearGradient>
  </defs>
  <path d="M25 60 A18 18 0 0 1 25 24 A24 24 0 0 1 70 20 A20 20 0 0 1 78 60 Z" fill="url(#cloudGrad)" stroke="#0288D1" stroke-width="2.5" stroke-linejoin="round"/>
  <circle cx="40" cy="42" r="3" fill="#263238"/>
  <circle cx="56" cy="42" r="3" fill="#263238"/>
  <circle cx="39" cy="40.5" r="0.8" fill="#FFFFFF"/>
  <circle cx="55" cy="40.5" r="0.8" fill="#FFFFFF"/>
  <circle cx="34" cy="48" r="3" fill="#FF8A80" opacity="0.7"/>
  <circle cx="62" cy="48" r="3" fill="#FF8A80" opacity="0.7"/>
  <path d="M45 48 Q48 51 51 48" fill="none" stroke="#37474F" stroke-width="2" stroke-linecap="round"/>
</svg>`)
  },
  {
    id: 'stella',
    name: '⭐ Stella d\'Oro',
    category: 'Natura',
    url: makeSvgDataUrl(`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,5 64,36 98,36 70,57 81,91 50,70 19,91 30,57 2,36 36,36" fill="#FFF59D" stroke="#FBC02D" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="40" cy="52" r="3.5" fill="#FF8A80" opacity="0.8"/>
  <circle cx="60" cy="52" r="3.5" fill="#FF8A80" opacity="0.8"/>
  <circle cx="43" cy="45" r="3" fill="#37474F"/>
  <circle cx="57" cy="45" r="3" fill="#37474F"/>
  <path d="M46 51 Q50 55 54 51" fill="none" stroke="#E65100" stroke-width="2.5" stroke-linecap="round"/>
</svg>`)
  },
  {
    id: 'fungo',
    name: '🍄 Funghetto delle Fiabe',
    category: 'Fiori',
    url: makeSvgDataUrl(`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFF9C4"/>
      <stop offset="100%" stop-color="#F0F4C3"/>
    </linearGradient>
  </defs>
  <path d="M40 50 L35 85 Q50 90 65 85 L60 50 Z" fill="url(#stemGrad)" stroke="#8D6E63" stroke-width="2"/>
  <path d="M15 50 Q10 45 20 20 Q50 5 80 20 Q90 45 85 50 Q50 55 15 50 Z" fill="#EF5350" stroke="#B71C1C" stroke-width="2.5"/>
  <circle cx="32" cy="22" r="6" fill="#FFFFFF"/>
  <circle cx="50" cy="18" r="8" fill="#FFFFFF"/>
  <circle cx="68" cy="24" r="5" fill="#FFFFFF"/>
  <circle cx="24" cy="38" r="4.5" fill="#FFFFFF"/>
  <circle cx="76" cy="38" r="5.5" fill="#FFFFFF"/>
  <circle cx="44" cy="64" r="2.5" fill="#2d3748"/>
  <circle cx="56" cy="64" r="2.5" fill="#2d3748"/>
  <circle cx="40" cy="69" r="2" fill="#FF8A80"/>
  <circle cx="60" cy="69" r="2" fill="#FF8A80"/>
  <path d="M48 70 Q50 72 52 70" fill="none" stroke="#5d4037" stroke-width="1.5" stroke-linecap="round"/>
</svg>`)
  },
  {
    id: 'corona',
    name: '👑 Corona Reale',
    category: 'Oggetti',
    url: makeSvgDataUrl(`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 80 L20 40 L40 60 L50 30 L60 60 L80 40 L85 80 Z" fill="#FFE082" stroke="#FFB300" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="25" cy="74" r="4" fill="#E91E63"/>
  <circle cx="50" cy="74" r="4" fill="#2196F3"/>
  <circle cx="75" cy="74" r="4" fill="#9C27B0"/>
  <circle cx="20" cy="40" r="4" fill="#00E676"/>
  <circle cx="50" cy="30" r="5" fill="#FF1744"/>
  <circle cx="80" cy="40" r="4" fill="#00E676"/>
</svg>`)
  },
  {
    id: 'caramella',
    name: '🍬 Caramella Dolce',
    category: 'Oggetti',
    url: makeSvgDataUrl(`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g stroke="#AD1457" stroke-width="2">
    <polygon points="10,35 10,65 30,50" fill="#FF80AB"/>
    <polygon points="90,35 90,65 70,50" fill="#FF80AB"/>
    <circle cx="50" cy="50" r="24" fill="#FF4081"/>
    <path d="M50 50 Q40 40 50 34 Q62 38 58 50 Q50 62 42 50 Q50 42 50 50" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
  </g>
</svg>`)
  },
  {
    id: 'albero',
    name: '🌳 Albero Incantato',
    category: 'Natura',
    url: makeSvgDataUrl(`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M45 60 L42 90 Q50 93 58 90 L55 60 Z" fill="#8D6E63" stroke="#5D4037" stroke-width="2"/>
  <path d="M50 15 C30 15 20 30 25 45 C15 55 30 70 50 68 C70 70 85 55 75 45 C80 30 70 15 50 15 Z" fill="#81C784" stroke="#2E7D32" stroke-width="3"/>
  <circle cx="38" cy="35" r="3.5" fill="#E53935"/>
  <circle cx="62" cy="38" r="4" fill="#E53935"/>
  <circle cx="50" cy="52" r="3.5" fill="#E53935"/>
  <circle cx="45" cy="43" r="2" fill="#37474F"/>
  <circle cx="55" cy="43" r="2" fill="#37474F"/>
  <path d="M48 47 Q50 49 52 47" fill="none" stroke="#37474F" stroke-width="1.5" stroke-linecap="round"/>
</svg>`)
  },
  {
    id: 'palloncino',
    name: '🎈 Palloncino Volante',
    category: 'Oggetti',
    url: makeSvgDataUrl(`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 64 Q45 80 52 95" fill="none" stroke="#78909C" stroke-width="2" stroke-linecap="round"/>
  <ellipse cx="50" cy="40" rx="22" ry="26" fill="#29B6F6" stroke="#0288D1" stroke-width="2.5"/>
  <polygon points="46,65 54,65 50,60" fill="#0288D1" stroke="#0288D1" stroke-width="2"/>
  <path d="M38 28 A12 16 0 0 1 48 20" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
</svg>`)
  },
  {
    id: 'biscotto',
    name: '🍪 Biscotto Sorridente',
    category: 'Oggetti',
    url: makeSvgDataUrl(`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="32" fill="#D7CCC8" stroke="#8D6E63" stroke-width="3"/>
  <rect x="34" y="28" width="6" height="6" rx="2" fill="#5D4037"/>
  <rect x="62" y="32" width="5" height="5" rx="1.5" fill="#5D4037"/>
  <rect x="28" y="52" width="6" height="5" rx="1.5" fill="#5D4037"/>
  <rect x="58" y="62" width="5" height="6" rx="1.5" fill="#5D4037"/>
  <rect x="46" y="22" width="4" height="4" rx="1" fill="#5D4037"/>
  <circle cx="42" cy="46" r="2.5" fill="#3E2723"/>
  <circle cx="58" cy="46" r="2.5" fill="#3E2723"/>
  <circle cx="37" cy="51" r="2" fill="#FF8A80"/>
  <circle cx="63" cy="51" r="2" fill="#FF8A80"/>
  <path d="M46 51 Q50 55 54 51" fill="none" stroke="#3E2723" stroke-width="2" stroke-linecap="round"/>
</svg>`)
  },
  {
    id: 'fiore',
    name: '🌸 Margherita Sorridente',
    category: 'Fiori',
    url: makeSvgDataUrl(`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Stem & leaves -->
  <path d="M50 60 L50 90" stroke="#4CAF50" stroke-width="4"/>
  <path d="M50 75 Q35 70 40 65 Q45 65 50 75" fill="#4CAF50" stroke="#388E3C" stroke-width="1.5"/>
  <path d="M50 80 Q65 75 60 70 Q55 70 50 80" fill="#4CAF50" stroke="#388E3C" stroke-width="1.5"/>
  <!-- Petals -->
  <g fill="#FFFFFF" stroke="#CFD8DC" stroke-width="1.5">
    <circle cx="50" cy="22" r="12"/>
    <circle cx="50" cy="58" r="12"/>
    <circle cx="32" cy="40" r="12"/>
    <circle cx="68" cy="40" r="12"/>
    <circle cx="37" cy="28" r="12"/>
    <circle cx="63" cy="52" r="12"/>
    <circle cx="37" cy="52" r="12"/>
    <circle cx="63" cy="28" r="12"/>
  </g>
  <!-- Center -->
  <circle cx="50" cy="40" r="16" fill="#FFEB3B" stroke="#FBC02D" stroke-width="2"/>
  <!-- Face -->
  <circle cx="44" cy="36" r="2.5" fill="#3E2723"/>
  <circle cx="56" cy="36" r="2.5" fill="#3E2723"/>
  <path d="M46 41 Q50 45 54 41" fill="none" stroke="#E65100" stroke-width="2" stroke-linecap="round"/>
</svg>`)
  }
];
