export interface Book {
  id: string;
  title: string;
  author: string;
  pages: BookPage[];
  createdAt: string;
  updatedAt: string;
}

export interface BookPage {
  id: string;
  backgroundUrl?: string; // Base64 uploaded or pre-defined URL
  backgroundColor: string; // Hex color fallback or primary background color
  backgroundPattern?: 'none' | 'polka-dots' | 'stripes' | 'stars' | 'hearts' | 'clouds';
  backgroundPatternColor?: string; // custom pattern color
  backgroundPatternOpacity?: number; // 0 to 100
  backgroundPatternSize?: number; // 10 to 100
  elements: BookElement[];
}

export type ElementType = 'text' | 'character';

export interface BookElement {
  id: string;
  type: ElementType;
  x: number; // Percentage from left of page (0 to 100)
  y: number; // Percentage from top of page (0 to 100)
  width: number; // Percentage of page width (0 to 100)
  height: number; // Percentage of page height (0 to 100)
  rotation: number; // Rotation in degrees (0 to 360)
  zIndex: number; // Depth layer order
  
  // Custom Visuals / Customization options
  opacity?: number; // 0 to 100, default 100
  shadowStyle?: 'none' | 'sm' | 'md' | 'lg' | 'glow-yellow' | 'glow-pink' | 'glow-blue' | 'comic-3d';
  borderStyle?: 'none' | 'solid' | 'dashed' | 'dotted' | 'bubbly';
  borderColor?: string;
  borderWidth?: number; // in pixels
  borderRadius?: number; // in pixels (e.g. rounded corners)
  
  // Text element specific fields
  text?: string;
  fontSize?: number; // scale relative to page base (e.g. 14 to 120)
  fontFamily?: 'sans' | 'fredoka' | 'pacifico' | 'lilita' | 'cinzel' | 'creepster' | 'bangers';
  color?: string; // Hex color
  align?: 'left' | 'center' | 'right';
  bold?: boolean;
  italic?: boolean;
  styleType?: 'normal' | 'artistic-giant' | 'artistic-shadow' | 'artistic-glow' | 'artistic-spooky' | 'artistic-stroke';
  
  // Speech Bubble / Balloon styling (new super customization!)
  bubbleType?: 'none' | 'speech' | 'thought' | 'banner' | 'cloud' | 'heart';
  bubbleColor?: string; // Bubble background color
  bubbleBorderColor?: string;
  
  // Character/Prop element specific fields
  url?: string; // Base64 uploaded or pre-defined URL
  name?: string;
  flipX?: boolean; // Horizontal mirror
  
  // Filter adjustments
  brightness?: number; // 50 to 150, default 100
  saturation?: number; // 0 to 200, default 100
  hueRotate?: number; // 0 to 360, default 0
  blur?: number; // 0 to 10, default 0
}

export interface PresetBackground {
  id: string;
  name: string;
  url: string;
  theme: string;
}

export interface PresetCharacter {
  id: string;
  name: string;
  url: string;
  category: string;
}
