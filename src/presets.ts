import { PresetBackground, PresetCharacter } from './types';

// Raw SVG strings for beautiful kids illustrations
const FOREST_SVG = `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#caf0f8"/>
      <stop offset="100%" stop-color="#ffccd5"/>
    </linearGradient>
    <linearGradient id="hillGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#b7e4c7"/>
      <stop offset="100%" stop-color="#74c69d"/>
    </linearGradient>
    <linearGradient id="hillGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#95d5b2"/>
      <stop offset="100%" stop-color="#52b788"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#skyGrad)"/>
  <circle cx="700" cy="120" r="55" fill="#ffd166"/>
  <path d="M 120,180 A 25,25 0 0,1 170,180 A 35,35 0 0,1 230,180 A 25,25 0 0,1 280,180 L 120,180 Z" fill="#ffffff" opacity="0.85"/>
  <path d="M 450,130 A 20,20 0 0,1 490,130 A 28,28 0 0,1 540,130 A 20,20 0 0,1 580,130 L 450,130 Z" fill="#ffffff" opacity="0.9"/>
  <path d="M-100,600 L-100,320 Q120,220 380,350 T880,300 L880,600 Z" fill="url(#hillGrad1)"/>
  <path d="M-50,600 L-50,420 Q200,300 480,450 T900,400 L900,600 Z" fill="url(#hillGrad2)"/>
  <g transform="translate(140, 480) scale(1.5)">
    <path d="M10 20 Q10 10 20 10 T30 20 Z" fill="#e63946"/>
    <rect x="17" y="20" width="6" height="12" rx="3" fill="#f1faee"/>
    <circle cx="15" cy="15" r="2" fill="#ffffff"/>
    <circle cx="25" cy="16" r="1.5" fill="#ffffff"/>
  </g>
  <g transform="translate(580, 490) scale(1.2)">
    <path d="M10 20 Q10 10 20 10 T30 20 Z" fill="#ffb703"/>
    <rect x="17" y="20" width="6" height="12" rx="3" fill="#f1faee"/>
    <circle cx="20" cy="14" r="1.8" fill="#ffffff"/>
  </g>
  <g transform="translate(80, 240)">
    <rect x="35" y="100" width="14" height="60" rx="3" fill="#6f4e37"/>
    <ellipse cx="42" cy="70" rx="45" ry="50" fill="#2d6a4f"/>
    <circle cx="30" cy="50" r="12" fill="#ffd166" opacity="0.15"/>
  </g>
  <g transform="translate(680, 280) scale(0.8)">
    <rect x="35" y="100" width="14" height="60" rx="3" fill="#5c4033"/>
    <ellipse cx="42" cy="65" rx="40" ry="45" fill="#40916c"/>
  </g>
</svg>`;

const CASTLE_SVG = `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="skyCastGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4a0e4e"/>
      <stop offset="60%" stop-color="#7f1d1d"/>
      <stop offset="100%" stop-color="#ffedd5"/>
    </linearGradient>
    <linearGradient id="hillCastGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#db2777"/>
      <stop offset="100%" stop-color="#831843"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#skyCastGrad)"/>
  <circle cx="150" cy="100" r="2.5" fill="#fff" opacity="0.8"/>
  <circle cx="320" cy="80" r="1.5" fill="#fff" opacity="0.6"/>
  <circle cx="580" cy="140" r="2" fill="#fff" opacity="0.9"/>
  <circle cx="710" cy="90" r="3" fill="#ffd166" opacity="0.75"/>
  <path d="M-100,600 L-100,380 Q100,280 400,420 T900,350 L900,600 Z" fill="#9d174d" opacity="0.6"/>
  <path d="M-100,600 L-100,450 Q250,350 500,480 T900,430 L900,600 Z" fill="url(#hillCastGrad)"/>
  <g transform="translate(240, 220) scale(1.1)">
    <rect x="50" y="100" width="120" height="90" fill="#f3e8ff" stroke="#3b0764" stroke-width="4" rx="4"/>
    <rect x="50" y="90" width="20" height="15" fill="#e9d5ff" stroke="#3b0764" stroke-width="3"/>
    <rect x="90" y="90" width="20" height="15" fill="#e9d5ff" stroke="#3b0764" stroke-width="3"/>
    <rect x="130" y="90" width="20" height="15" fill="#e9d5ff" stroke="#3b0764" stroke-width="3"/>
    <rect x="150" y="90" width="20" height="15" fill="#e9d5ff" stroke="#3b0764" stroke-width="3"/>
    <rect x="25" y="50" width="30" height="140" fill="#e9d5ff" stroke="#3b0764" stroke-width="4"/>
    <polygon points="15,50 40,-10 65,50" fill="#f472b6" stroke="#3b0764" stroke-width="4"/>
    <rect x="165" y="50" width="30" height="140" fill="#e9d5ff" stroke="#3b0764" stroke-width="4"/>
    <polygon points="155,50 180,-10 205,50" fill="#f472b6" stroke="#3b0764" stroke-width="4"/>
    <rect x="90" y="30" width="40" height="70" fill="#f3e8ff" stroke="#3b0764" stroke-width="4"/>
    <polygon points="80,30 110,-40 140,30" fill="#ec4899" stroke="#3b0764" stroke-width="4"/>
    <path d="M95,190 Q95,145 110,145 T125,190 Z" fill="#3b0764"/>
    <rect x="100" y="50" width="20" height="30" rx="10" fill="#fef08a" stroke="#3b0764" stroke-width="3"/>
    <rect x="30" y="80" width="20" height="30" rx="10" fill="#fef08a" stroke="#3b0764" stroke-width="3"/>
    <rect x="170" y="80" width="20" height="30" rx="10" fill="#fef08a" stroke="#3b0764" stroke-width="3"/>
    <polygon points="110,-40 130,-50 110,-60" fill="#ffd166"/>
  </g>
</svg>`;

const SPACE_SVG = `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="spaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#030712"/>
      <stop offset="50%" stop-color="#0b1528"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
    <linearGradient id="planetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff70a6"/>
      <stop offset="100%" stop-color="#ff9770"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#spaceGrad)"/>
  <g fill="#fff">
    <circle cx="80" cy="120" r="1.5" opacity="0.6"/>
    <circle cx="200" cy="70" r="3" opacity="0.9"/>
    <polygon points="200,60 203,67 210,70 203,73 200,80 197,73 190,70 197,67" fill="#ffd166"/>
    <circle cx="340" cy="180" r="1.2" opacity="0.4"/>
    <circle cx="480" cy="110" r="2.5" opacity="0.8"/>
    <circle cx="620" cy="90" r="2" opacity="0.7"/>
    <circle cx="710" cy="220" r="3.2" opacity="0.95"/>
    <polygon points="710,210 713,217 720,220 713,223 710,230 707,223 700,220 707,217" fill="#fff"/>
    <circle cx="150" cy="380" r="1" opacity="0.5"/>
    <circle cx="680" cy="400" r="2" opacity="0.8"/>
  </g>
  <g transform="translate(140, 220) rotate(-15)">
    <ellipse cx="60" cy="60" rx="90" ry="20" fill="none" stroke="#e9ff70" stroke-width="12" opacity="0.3"/>
    <circle cx="60" cy="60" r="55" fill="url(#planetGrad)" stroke="#1e1b4b" stroke-width="4"/>
    <path d="M 12,40 Q 60,65 108,40" fill="none" stroke="#ffd166" stroke-width="6" opacity="0.5"/>
    <path d="M 8,75 Q 60,100 112,75" fill="none" stroke="#ffd166" stroke-width="8" opacity="0.5"/>
    <path d="M -25,55 A 90,20 0 0,0 145,55" fill="none" stroke="#e9ff70" stroke-width="12" stroke-linecap="round"/>
    <path d="M -25,55 A 90,20 0 0,0 145,55" fill="none" stroke="#ff9770" stroke-width="4" stroke-linecap="round"/>
  </g>
  <circle cx="650" cy="150" r="40" fill="#4ea8de" stroke="#1e1b4b" stroke-width="4"/>
  <path d="M630 120 Q640 135 635 150 T665 185" fill="none" stroke="#48cae4" stroke-width="14" stroke-linecap="round" opacity="0.8"/>
</svg>`;

const CANDY_SVG = `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="candySky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f3c4fb"/>
      <stop offset="100%" stop-color="#ffccd5"/>
    </linearGradient>
    <linearGradient id="marshGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffc8dd"/>
      <stop offset="100%" stop-color="#ffafcc"/>
    </linearGradient>
    <linearGradient id="marshGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#bde0fe"/>
      <stop offset="100%" stop-color="#a2d2ff"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#candySky)"/>
  <path d="M 80,140 Q 140,90 200,140 T 320,140 L 320,180 L 80,180 Z" fill="#fff" opacity="0.4"/>
  <path d="M 480,110 Q 530,70 580,110 T 680,110 L 680,150 L 480,150 Z" fill="#fff" opacity="0.4"/>
  <path d="M-100,600 L-100,400 C100,320 300,300 500,420 C600,480 700,400 900,450 L900,600 Z" fill="url(#marshGrad2)"/>
  <path d="M-50,600 L-50,470 C150,420 350,400 550,510 C650,560 750,450 900,500 L900,600 Z" fill="url(#marshGrad1)"/>
  <g transform="translate(620, 260)">
    <rect x="25" y="100" width="10" height="150" fill="#f1faee" rx="4" stroke="#d62828" stroke-width="3"/>
    <circle cx="30" cy="100" r="50" fill="#ffb703" stroke="#d62828" stroke-width="4"/>
    <circle cx="30" cy="100" r="40" fill="#e63946" stroke="#d62828" stroke-width="3"/>
    <circle cx="30" cy="100" r="28" fill="#ffb703"/>
    <circle cx="30" cy="100" r="16" fill="#e63946"/>
  </g>
  <g transform="translate(120, 310) scale(0.8)">
    <rect x="25" y="100" width="10" height="150" fill="#ffffff" rx="4" stroke="#0077b6" stroke-width="3"/>
    <circle cx="30" cy="100" r="45" fill="#90e0ef" stroke="#0077b6" stroke-width="4"/>
    <path d="M-5,100 Q30,140 65,100" fill="none" stroke="#ffffff" stroke-width="6"/>
    <path d="M-5,100 Q30,60 65,100" fill="none" stroke="#0077b6" stroke-width="6"/>
  </g>
</svg>`;

const OCEAN_SVG = `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="seaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#00b4d8"/>
      <stop offset="50%" stop-color="#0077b6"/>
      <stop offset="100%" stop-color="#03045e"/>
    </linearGradient>
    <linearGradient id="sandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#e9c46a"/>
      <stop offset="100%" stop-color="#e76f51"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#seaGrad)"/>
  <polygon points="0,0 200,0 350,600 0,600" fill="#90e0ef" opacity="0.12"/>
  <polygon points="250,0 480,0 680,600 350,600" fill="#90e0ef" opacity="0.08"/>
  <polygon points="550,0 800,0 900,600 750,600" fill="#90e0ef" opacity="0.15"/>
  <circle cx="120" cy="450" r="12" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.4"/>
  <circle cx="130" cy="420" r="6" fill="none" stroke="#fff" stroke-width="1" opacity="0.3"/>
  <circle cx="350" cy="250" r="16" fill="none" stroke="#fff" stroke-width="2" opacity="0.4"/>
  <circle cx="365" cy="210" r="8" fill="none" stroke="#fff" stroke-width="1" opacity="0.3"/>
  <circle cx="680" cy="380" r="10" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5"/>
  <path d="M-50,600 Q200,500 500,550 T900,520 L900,600 L-50,600 Z" fill="url(#sandGrad)"/>
  <g transform="translate(640, 420) scale(1.3)">
    <path d="M 20,80 Q 15,50 5,45 Q -2,40 10,35 Q 20,30 18,10 Q 25,5 30,15 Q 32,35 40,40 Q 50,45 42,55 Q 35,62 38,80 Z" fill="#ff70a6" stroke="#03045e" stroke-width="3"/>
  </g>
  <g transform="translate(80, 440)">
    <path d="M 20,80 Q 15,50 5,45 Q -2,40 10,35 Q 20,30 18,10 Q 25,5 30,15 Q 32,35 40,40 Q 50,45 42,55 Q 35,62 38,80 Z" fill="#ff9770" stroke="#03045e" stroke-width="3"/>
  </g>
</svg>`;

const RAINBOW_SVG = `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="rainbowSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#a2d2ff"/>
      <stop offset="60%" stop-color="#caf0f8"/>
      <stop offset="100%" stop-color="#ffccd5"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#rainbowSkyGrad)"/>
  <g transform="translate(100, 160)">
    <circle cx="300" cy="300" r="260" fill="none" stroke="#ffafcc" stroke-width="18" opacity="0.9"/>
    <circle cx="300" cy="300" r="242" fill="none" stroke="#ffc8dd" stroke-width="18" opacity="0.9"/>
    <circle cx="300" cy="300" r="224" fill="none" stroke="#ffd166" stroke-width="18" opacity="0.9"/>
    <circle cx="300" cy="300" r="206" fill="none" stroke="#06d6a0" stroke-width="18" opacity="0.9"/>
    <circle cx="300" cy="300" r="188" fill="none" stroke="#118ab2" stroke-width="18" opacity="0.9"/>
  </g>
  <g transform="translate(80, 360) scale(1.5)">
    <path d="M 20,50 A 20,20 0 0,1 50,30 A 28,28 0 0,1 95,32 A 20,20 0 0,1 125,50 Z" fill="#ffffff" stroke="#03045e" stroke-width="3"/>
    <circle cx="45" cy="50" r="3" fill="#03045e"/>
    <circle cx="75" cy="50" r="3" fill="#03045e"/>
    <ellipse cx="60" cy="55" rx="5" ry="3" fill="#ff70a6"/>
  </g>
  <g transform="translate(480, 360) scale(1.5)">
    <path d="M 20,50 A 20,20 0 0,1 50,30 A 28,28 0 0,1 95,32 A 20,20 0 0,1 125,50 Z" fill="#ffffff" stroke="#03045e" stroke-width="3"/>
    <circle cx="45" cy="50" r="3" fill="#03045e"/>
    <circle cx="75" cy="50" r="3" fill="#03045e"/>
    <ellipse cx="60" cy="55" rx="5" ry="3" fill="#ff70a6"/>
  </g>
</svg>`;

// Helper to convert raw SVG to a safe base64-ish inline SVG data URI
function svgToUri(svg: string): string {
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

export const PRESET_BACKGROUNDS: PresetBackground[] = [
  {
    id: 'bosco_magico',
    name: '🌲 Bosco delle Fiabe',
    url: svgToUri(FOREST_SVG),
    theme: 'Natura/Fiaba'
  },
  {
    id: 'castello_rosa',
    name: '🏰 Castello Incantato',
    url: svgToUri(CASTLE_SVG),
    theme: 'Fiaba'
  },
  {
    id: 'spazio_bambini',
    name: '🚀 Spazio Stellato',
    url: svgToUri(SPACE_SVG),
    theme: 'Avventura'
  },
  {
    id: 'regno_caramelle',
    name: '🍬 Regno Dolcioso',
    url: svgToUri(CANDY_SVG),
    theme: 'Pastello'
  },
  {
    id: 'mare_segreto',
    name: '🐳 Oceano dei Segreti',
    url: svgToUri(OCEAN_SVG),
    theme: 'Natura'
  },
  {
    id: 'cielo_arcobaleno',
    name: '🌈 Isola dell\'Arcobaleno',
    url: svgToUri(RAINBOW_SVG),
    theme: 'Sogno'
  }
];

// Raw SVG strings for cute vector characters
const DRAGON_STICKER = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="50" cy="55" rx="25" ry="30" fill="#4caf50" stroke="#1b5e20" stroke-width="3"/>
  <ellipse cx="50" cy="62" rx="16" ry="20" fill="#fff9c4" stroke="#1b5e20" stroke-width="2"/>
  <circle cx="50" cy="30" r="20" fill="#4caf50" stroke="#1b5e20" stroke-width="3"/>
  <circle cx="43" cy="25" r="5" fill="#ffffff" stroke="#1b5e20" stroke-width="2"/>
  <circle cx="43" cy="25" r="2" fill="#000000"/>
  <circle cx="57" cy="25" r="5" fill="#ffffff" stroke="#1b5e20" stroke-width="2"/>
  <circle cx="57" cy="25" r="2" fill="#000000"/>
  <circle cx="38" cy="32" r="3" fill="#ff8a80"/>
  <circle cx="62" cy="32" r="3" fill="#ff8a80"/>
  <ellipse cx="50" cy="35" rx="10" ry="6" fill="#81c784"/>
  <circle cx="47" cy="35" r="1.5" fill="#1b5e20"/>
  <circle cx="53" cy="35" r="1.5" fill="#1b5e20"/>
  <path d="M 28,50 C 15,40 10,55 25,60 Z" fill="#ff9800" stroke="#e65100" stroke-width="2"/>
  <path d="M 72,50 C 85,40 90,55 75,60 Z" fill="#ff9800" stroke="#e65100" stroke-width="2"/>
  <polygon points="50,6 46,12 54,12" fill="#ff9800" stroke="#e65100" stroke-width="2"/>
  <polygon points="50,12 46,18 54,18" fill="#ff9800" stroke="#e65100" stroke-width="2"/>
  <path d="M 48,38 Q 50,40 52,38" fill="none" stroke="#1b5e20" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const KITTEN_STICKER = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="50" cy="65" rx="22" ry="22" fill="#b0bec5" stroke="#37474f" stroke-width="3"/>
  <path d="M 72,70 Q 85,60 80,45" fill="none" stroke="#b0bec5" stroke-width="8" stroke-linecap="round"/>
  <path d="M 72,70 Q 85,60 80,45" fill="none" stroke="#37474f" stroke-width="3" stroke-linecap="round"/>
  <circle cx="50" cy="38" r="22" fill="#b0bec5" stroke="#37474f" stroke-width="3"/>
  <polygon points="30,24 35,6 48,20" fill="#90a4ae" stroke="#37474f" stroke-width="3"/>
  <polygon points="70,24 65,6 52,20" fill="#90a4ae" stroke="#37474f" stroke-width="3"/>
  <ellipse cx="42" cy="36" rx="4" ry="6" fill="#cddc39" stroke="#37474f" stroke-width="2"/>
  <circle cx="42" cy="36" r="1.5" fill="#000000"/>
  <ellipse cx="58" cy="36" rx="4" ry="6" fill="#cddc39" stroke="#37474f" stroke-width="2"/>
  <circle cx="58" cy="36" r="1.5" fill="#000000"/>
  <polygon points="50,42 47,39 53,39" fill="#ff8a80"/>
  <path d="M 46,46 Q 50,48 54,46" fill="none" stroke="#37474f" stroke-width="2"/>
  <line x1="28" y1="42" x2="16" y2="40" stroke="#37474f" stroke-width="2"/>
  <line x1="28" y1="46" x2="14" y2="48" stroke="#37474f" stroke-width="2"/>
  <line x1="72" y1="42" x2="84" y2="40" stroke="#37474f" stroke-width="2"/>
  <line x1="72" y1="46" x2="86" y2="48" stroke="#37474f" stroke-width="2"/>
  <polygon points="32,22 50,-8 68,22" fill="#673ab7" stroke="#311b92" stroke-width="3"/>
  <ellipse cx="50" cy="22" rx="22" ry="5" fill="#5e35b1" stroke="#311b92" stroke-width="3"/>
  <polygon points="50,2 52,7 57,7 53,10 55,15 50,12 45,15 47,10 43,7 48,7" fill="#ffd166"/>
</svg>`;

const BEAR_STICKER = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="32" y="55" width="36" height="35" rx="15" fill="#eceff1" stroke="#37474f" stroke-width="3"/>
  <circle cx="50" cy="72" r="8" fill="#4fc3f7" stroke="#37474f" stroke-width="2"/>
  <rect x="30" y="86" width="16" height="8" rx="3" fill="#b0bec5" stroke="#37474f" stroke-width="2"/>
  <rect x="54" y="86" width="16" height="8" rx="3" fill="#b0bec5" stroke="#37474f" stroke-width="2"/>
  <circle cx="50" cy="38" r="20" fill="#8d6e63" stroke="#4e342e" stroke-width="3"/>
  <circle cx="32" cy="24" r="6" fill="#8d6e63" stroke="#4e342e" stroke-width="3"/>
  <circle cx="32" cy="24" r="3" fill="#d7ccc8"/>
  <circle cx="68" cy="24" r="6" fill="#8d6e63" stroke="#4e342e" stroke-width="3"/>
  <circle cx="68" cy="24" r="3" fill="#d7ccc8"/>
  <circle cx="43" cy="34" r="2.5" fill="#000"/>
  <circle cx="57" cy="34" r="2.5" fill="#000"/>
  <ellipse cx="50" cy="42" rx="7" ry="5" fill="#d7ccc8"/>
  <polygon points="50,41 47,38 53,38" fill="#4e342e"/>
  <path d="M 48,44 Q 50,46 52,44" fill="none" stroke="#4e342e" stroke-width="1.5"/>
  <circle cx="36" cy="40" r="2.5" fill="#ff8a80"/>
  <circle cx="64" cy="40" r="2.5" fill="#ff8a80"/>
  <circle cx="50" cy="38" r="28" fill="none" stroke="#80deea" stroke-width="3" opacity="0.85"/>
  <path d="M 68,20 Q 74,28 72,36" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
</svg>`;

const FAIRY_STICKER = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M 28,45 Q 10,25 22,12 T 40,38 Z" fill="#f8bbd0" stroke="#c2185b" stroke-width="2" opacity="0.8"/>
  <path d="M 72,45 Q 90,25 78,12 T 60,38 Z" fill="#f8bbd0" stroke="#c2185b" stroke-width="2" opacity="0.8"/>
  <polygon points="35,88 50,50 65,88" fill="#e91e63" stroke="#880e4f" stroke-width="3"/>
  <ellipse cx="50" cy="88" rx="16" ry="5" fill="#f06292" stroke="#880e4f" stroke-width="2"/>
  <circle cx="50" cy="35" r="16" fill="#ffdbac" stroke="#880e4f" stroke-width="3"/>
  <circle cx="44" cy="32" r="2" fill="#000"/>
  <circle cx="56" cy="32" r="2" fill="#000"/>
  <path d="M 42,28 Q 44,26 46,28" fill="none" stroke="#880e4f" stroke-width="1.5"/>
  <path d="M 54,28 Q 56,26 58,28" fill="none" stroke="#880e4f" stroke-width="1.5"/>
  <path d="M 46,39 Q 50,43 54,39" fill="none" stroke="#880e4f" stroke-width="2" stroke-linecap="round"/>
  <path d="M 34,35 Q 50,15 66,35" fill="none" stroke="#ffd166" stroke-width="12" stroke-linecap="round"/>
  <path d="M 34,35 Q 30,55 35,62" fill="none" stroke="#ffd166" stroke-width="8" stroke-linecap="round"/>
  <path d="M 66,35 Q 70,55 65,62" fill="none" stroke="#ffd166" stroke-width="8" stroke-linecap="round"/>
  <polygon points="40,20 44,8 50,14 56,8 60,20" fill="#ffd166" stroke="#b58900" stroke-width="2"/>
  <circle cx="50" cy="14" r="1.5" fill="#d62828"/>
</svg>`;

const WHALE_STICKER = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M 50,30 Q 50,10 40,12" fill="none" stroke="#90e0ef" stroke-width="3" stroke-linecap="round"/>
  <path d="M 50,30 Q 50,10 60,12" fill="none" stroke="#90e0ef" stroke-width="3" stroke-linecap="round"/>
  <path d="M 15,55 C 10,35 45,25 75,35 C 90,40 95,50 85,60 C 80,65 50,75 25,68 Z" fill="#0288d1" stroke="#01579b" stroke-width="3"/>
  <path d="M 25,68 C 35,60 55,60 70,64" fill="none" stroke="#01579b" stroke-width="2"/>
  <polygon points="15,55 5,45 8,62" fill="#0288d1" stroke="#01579b" stroke-width="3"/>
  <path d="M 68,45 Q 73,50 78,45" fill="none" stroke="#01579b" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="78" cy="50" r="3.5" fill="#ff8a80"/>
  <path d="M 72,53 Q 75,56 78,52" fill="none" stroke="#01579b" stroke-width="2" stroke-linecap="round"/>
  <path d="M 45,60 Q 42,72 52,68 Z" fill="#03a9f4" stroke="#01579b" stroke-width="2"/>
</svg>`;

const UNICORN_STICKER = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="42" cy="65" rx="22" ry="16" fill="#f8f9fa" stroke="#6c757d" stroke-width="3"/>
  <rect x="28" y="75" width="6" height="15" rx="2" fill="#f8f9fa" stroke="#6c757d" stroke-width="2"/>
  <rect x="48" y="75" width="6" height="15" rx="2" fill="#f8f9fa" stroke="#6c757d" stroke-width="2"/>
  <rect x="36" y="78" width="6" height="12" rx="2" fill="#f8f9fa" stroke="#6c757d" stroke-width="2"/>
  <rect x="54" y="78" width="6" height="12" rx="2" fill="#f8f9fa" stroke="#6c757d" stroke-width="2"/>
  <rect x="28" y="87" width="6" height="3" fill="#ffd166"/>
  <rect x="48" y="87" width="6" height="3" fill="#ffd166"/>
  <path d="M 50,55 L 62,35 Q 68,20 54,22 L 48,32 Z" fill="#f8f9fa" stroke="#6c757d" stroke-width="3"/>
  <ellipse cx="52" cy="30" rx="14" ry="10" fill="#f8f9fa" stroke="#6c757d" stroke-width="3"/>
  <path d="M 40,32 Q 32,45 42,55" fill="none" stroke="#ff70a6" stroke-width="6" stroke-linecap="round"/>
  <path d="M 44,28 Q 36,40 46,50" fill="none" stroke="#ffd166" stroke-width="5" stroke-linecap="round"/>
  <path d="M 46,24 Q 40,35 50,45" fill="none" stroke="#4ea8de" stroke-width="4" stroke-linecap="round"/>
  <circle cx="56" cy="28" r="2" fill="#000"/>
  <path d="M 55,24 Q 57,23 59,25" fill="none" stroke="#6c757d" stroke-width="1"/>
  <circle cx="58" cy="33" r="2.5" fill="#ff8a80"/>
  <path d="M 60,34 Q 62,36 64,34" fill="none" stroke="#6c757d" stroke-width="1.5" stroke-linecap="round"/>
  <polygon points="46,21 40,-4 52,18" fill="#ffd166" stroke="#b58900" stroke-width="2"/>
</svg>`;

export const PRESET_CHARACTERS: PresetCharacter[] = [
  {
    id: 'draghetto',
    name: 'Bernardo 🐲',
    url: svgToUri(DRAGON_STICKER),
    category: 'Creature'
  },
  {
    id: 'gatto_mago',
    name: 'Romeo Mago 🐱',
    url: svgToUri(KITTEN_STICKER),
    category: 'Animali'
  },
  {
    id: 'orsetto_astronauta',
    name: 'Orsetto Spaziale 🐻‍🚀',
    url: svgToUri(BEAR_STICKER),
    category: 'Avventura'
  },
  {
    id: 'fata_rosa',
    name: 'Fatina Celeste 🧚‍♀️',
    url: svgToUri(FAIRY_STICKER),
    category: 'Creature'
  },
  {
    id: 'balenottera',
    name: 'Sveva Balena 🐳',
    url: svgToUri(WHALE_STICKER),
    category: 'Oceano'
  },
  {
    id: 'unicorno_magico',
    name: 'Unicorno Lulù 🦄',
    url: svgToUri(UNICORN_STICKER),
    category: 'Creature'
  }
];
